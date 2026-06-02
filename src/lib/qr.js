import QRCode from 'qrcode';

export const generateQRCode = async (text) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    return qrDataUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};