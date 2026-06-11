import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Link2, Shuffle, Download, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { createUrl } from "@/lib/apiUrls";
import { createUrlSchema } from "@/schema/urlSchema";
import useAuth from "@/hooks/useAuth";

const CreateLinkModal = ({ isOpen, onClose, onCreated }) => {
  const { user } = useAuth();
  const [step, setStep] = useState("form");
  const [apiError, setApiError] = useState("");
  const [createdUrl, setCreatedUrl] = useState(null);
  const [alreadyExisted, setAlreadyExisted] = useState(false);

  // ── REACT HOOK FORM SETUP ──
  // register   → connects each input to the form
  // handleSubmit → runs validation first, then your function
  // formState  → contains errors, isSubmitting etc
  // setValue   → lets you change a field value from outside (for the shuffle button)
  // watch      → lets you read a field's current value live
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createUrlSchema), // zod does all validation
    defaultValues: {
      title: "",
      original_url: "",
      custom_alias: "",
    },
  });

  // watch custom_alias so we can show it in the URL preview
  const customAlias = watch("custom_alias");

  // ── THIS IS THE REAL SUBMIT — only runs if zod says all fields are valid ──
  const onSubmit = async (data) => {
    // data here is already validated and typed correctly by zod
    // { title: "...", original_url: "https://...", custom_alias: "..." }
    setApiError("");

    try {
      const { data: urlData, alreadyExists } = await createUrl({
        title: data.title,
        original_url: data.original_url,
        custom_alias: data.custom_alias || null,
        user_id: user.id,
      });

      setAlreadyExisted(alreadyExists);
      setCreatedUrl(urlData);
      setStep("qr");
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleDownloadQR = async () => {
    if (!createdUrl?.qr_code) return;

    // fetch PNG blob from supabase storage URL
    const response = await fetch(createdUrl.qr_code);
    // response.blob() converts the response into a Blob (file in memory)
    const blob = await response.blob();

    // URL.createObjectURL turns blob into a temporary browser URL
    // so we can point an <a> tag at it and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `qr-${createdUrl.short_url}.png`;
    link.click();

    // cleanup — revoke frees the memory used by that temporary URL
    URL.revokeObjectURL(link.href);
  };

  const handleClose = () => {
    setStep("form");
    setApiError("");
    setCreatedUrl(null);
    setAlreadyExisted(false);
    reset(); // react hook form resets all fields back to defaultValues
    onClose();
    if (createdUrl) onCreated?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-[#0f1629] border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* ── STEP 1: FORM ── */}
        {step === "form" && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-zinc-800 p-2 rounded-lg">
                <Link2 size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Create New Link</h2>
                <p className="text-zinc-500 text-sm">
                  Shorten your URL and get a QR code
                </p>
              </div>
            </div>

            {/*
              handleSubmit(onSubmit) works like this:
              1. user clicks Create button
              2. react hook form collects all field values
              3. passes them through zodResolver (your schema)
              4. if any field fails → puts error in formState.errors, does NOT call onSubmit
              5. if all pass → calls onSubmit(data) with clean validated data
            */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* title */}
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Title
                </label>
                <input
                  // register("title") does three things:
                  // 1. tracks this input's value
                  // 2. runs validation on it
                  // 3. includes it in the data object passed to onSubmit
                  {...register("title")}
                  type="text"
                  placeholder="e.g. My Portfolio"
                  className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-sm outline-none transition-all
                    ${
                      errors.title
                        ? "border-red-500"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* original url */}
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Original URL
                </label>
                <input
                  {...register("original_url")}
                  type="text"
                  placeholder="https://your-long-url.com"
                  className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-sm outline-none transition-all
                    ${
                      errors.original_url
                        ? "border-red-500"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                />
                {errors.original_url && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.original_url.message}
                  </p>
                )}
              </div>

              {/* custom alias */}
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Custom Alias <span className="text-zinc-600">(optional)</span>
                </label>
                <div
                  className={`flex items-center bg-zinc-900 border rounded-xl overflow-hidden transition-all
                  ${
                    errors.custom_alias
                      ? "border-red-500"
                      : "border-zinc-800 focus-within:border-zinc-600"
                  }`}
                >
                  <span className="text-zinc-600 text-sm pl-4 pr-1 whitespace-nowrap">
                    {window.location.origin}/
                  </span>
                  <input
                    // register with onChange override to block invalid characters
                    {...register("custom_alias", {
                      onChange: (e) => {
                        setValue(
                          "custom_alias",
                          e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""),
                        );
                      },
                    })}
                    type="text"
                    placeholder="my-link"
                    className="flex-1 bg-transparent py-3 pr-2 text-sm outline-none"
                  />
                  {/* shuffle button — uses setValue to update the field from outside */}
                  <button
                    type="button"
                    title="Generate random alias"
                    onClick={() => setValue("custom_alias", nanoid(6))}
                    className="px-3 text-zinc-500 hover:text-white transition-colors"
                  >
                    <Shuffle size={15} />
                  </button>
                </div>
                {errors.custom_alias && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.custom_alias.message}
                  </p>
                )}
                {/* live preview of what the short url will look like */}
                {customAlias && (
                  <p className="text-zinc-500 text-xs mt-1">
                    Preview: {window.location.origin}/{customAlias}
                  </p>
                )}
              </div>

              {/* api level error (duplicate alias, db error etc) */}
              {apiError && (
                <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                // isSubmitting is true while onSubmit is running
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create & Generate QR"
                )}
              </button>
            </form>
          </>
        )}

        {/* ── STEP 2: QR ── */}
        {step === "qr" && createdUrl && (
          <>
            <div className="text-center mb-4">
              {alreadyExisted ? (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-2 rounded-lg mb-4">
                  Already shortened before. Here's your existing link.
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-2 rounded-lg mb-4">
                  ✓ Link created successfully!
                </div>
              )}
              <h2 className="text-lg font-semibold mb-1">Your Short URL</h2>
              <a
                href={`${window.location.origin}/${createdUrl.short_url}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm break-all"
              >
                {window.location.origin}/{createdUrl.short_url}
              </a>
            </div>

            {/* QR from supabase storage — simple img tag, no canvas */}
            <div className="flex justify-center mb-5">
              <div className="bg-white p-3 rounded-2xl">
                <img
                  src={createdUrl.qr_code}
                  alt="QR code"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadQR}
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl text-sm font-medium transition-all"
              >
                <Download size={15} />
                Download QR
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-white text-black py-3 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateLinkModal;
