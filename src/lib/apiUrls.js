import { supabase } from "./supabase";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

const APP_URL =
  import.meta.env.VITE_APP_URL ||
  window.location.origin;

export const getUrls = async (userId) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const QR_BUCKET = "qrs";

const generateQRBlob = (text) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");

    QRCode.toCanvas(canvas, text, { width: 400, margin: 2 }, (err) => {
      if (err) return reject(err);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("QR generation failed"));
        resolve(blob);
      }, "image/png");
    });
  });
};

const uploadQRToStorage = async (blob, shortUrl, user_id) => {
  const filePath = `${user_id}/${shortUrl}.png`;

  const { error } = await supabase.storage
    .from(QR_BUCKET)
    .upload(filePath, blob, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) throw new Error("QR upload failed: " + error.message);

  const { data } = supabase.storage
    .from(QR_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl; 
};

export const createUrl = async ({ title, original_url, custom_alias, user_id }) => {

  const { data: existingUrl } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id)
    .eq("original_url", original_url)
    .single();

  if (existingUrl) {
    return { data: existingUrl, alreadyExists: true };
  }

  let shortUrl;

  if (custom_alias?.trim()) {
    const { data: aliasTaken } = await supabase
      .from("urls")
      .select("id")
      .eq("short_url", custom_alias.trim())
      .single();

    if (aliasTaken) {
      throw new Error("This alias is already taken. Try a different one.");
    }

    shortUrl = custom_alias.trim();
  } else {
    shortUrl = nanoid(6);
  }

  const fullShortUrl = `${APP_URL}/${shortUrl}`;
  const qrBlob = await generateQRBlob(fullShortUrl);
  const qrPublicUrl = await uploadQRToStorage(qrBlob, shortUrl, user_id);
  const { data, error } = await supabase
    .from("urls")
    .insert([{
      title,
      original_url,
      short_url: shortUrl,
      qr_code: qrPublicUrl,
      user_id,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return { data, alreadyExists: false };
};

export const getUrlsWithClickCounts = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select(
      `
      *,
      clicks(count)
    `,
    )
    .eq("user_id", user_id);

  if (error) throw error;

  return data.map((url) => ({
    ...url,
    click_count: url.clicks?.[0]?.count ?? 0,
  }));
};

export const deleteUrl = async (urlId, userId) => {
  const { error } = await supabase
    .from("urls")
    .delete()
    .eq("id", urlId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
};
