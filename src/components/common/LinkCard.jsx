import  { useState } from "react";
import { CopyPlus, Download, Trash2, CopyMinus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { deleteUrl } from "@/lib/apiUrls";
import useFetch from "@/hooks/useFetch";

const APP_URL = import.meta.env.VITE_APP_URL || window.location.origin;

const LinkCard = ({ card, userId, refreshUrls }) => {
  const [copied, setCopied] = useState(false);
  const fullShortUrl = `${APP_URL}/${card.short_url}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);

  const handleDelete = async () => {
    try {
      await fnDelete(card.id, userId);
      await refreshUrls();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadQR = async () => {
    if (!card.qr_code) return;
    const response = await fetch(card.qr_code);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `qr-${card.short_url}.png`;
    link.click();
    URL.revokeObjectURL(link.href); 
  };

  return (
    <Card className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row gap-5">

          <div className="flex justify-center">
            {card.qr_code ? (
              <div className="w-28 h-28 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={card.qr_code}
                  alt={`QR for ${card.title}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-28 h-28 bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
                No QR
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold">{card.title}</h2>

            <div>
              <p className="text-xs text-zinc-500 mb-1">Original URL</p>
              <a
                href={card.original_url}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 break-all text-sm"
              >
                {card.original_url}
              </a>
            </div>

            <div>
              <p className="text-xs text-zinc-500 mb-1">Short URL</p>
              <a
                href={fullShortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 break-all text-sm"
              >
                {fullShortUrl}
              </a>
            </div>

            <p className="text-xs text-zinc-500 pt-2">
              Created At:{" "}
              {new Date(card.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex lg:flex-col gap-2">
            <button
              onClick={handleDownloadQR}
              disabled={!card.qr_code}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              QR
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-sm"
            >
              {copied ? <CopyMinus size={16} /> : <CopyPlus size={16} />}
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleDelete}
              disabled={loadingDelete}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 text-sm disabled:opacity-40"
            >
              <Trash2 size={16} />
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;