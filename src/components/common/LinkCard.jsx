import React, { useState } from "react";
import { CopyPlus, Download, Trash2 , CopyMinus} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { generateQRCode } from "@/lib/qr";

const LinkCard = ({ card }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(card.short_url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  
  return (
    <Card className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-zinc-800 rounded-xl flex items-center justify-center text-xs text-zinc-400">
              QR CODE
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold">{card.title}</h2>

            <div>
              <p className="text-xs text-zinc-500 mb-1">Original URL</p>

              <a
                href={card.originalUrl}
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
                href={card.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 break-all text-sm"
              >
                {card.short_url}
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
            <button className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-sm">
              <Download size={16} />
              QR
            </button>

            <button className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-sm" onClick={handleCopy}>
              {copied ? <CopyMinus /> : <CopyPlus />}
              Copy
            </button>

            <button className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 text-sm">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
