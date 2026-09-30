import React, { useState } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Heart,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { ThemeConfig } from "../types";

interface CommunityShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
}

export const CommunityShareModal: React.FC<CommunityShareModalProps> = ({
  isOpen,
  onClose,
  themeConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const shareUrl = `https://wptemplatestudio.dev/community/theme/${themeConfig.themeSlug || "sample-theme"}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none text-xs">
      <div className="w-full max-w-xl bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 tracking-tight">Chia Sẻ Lên Cộng Đồng WP Studio</h2>
              <p className="text-zinc-400 text-[11px]">
                Chia sẻ thiết kế của bạn để nhận góp ý và cho phép cộng đồng nhân bản (Fork).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 bg-[#0A0A0C]">
          {/* Card Preview */}
          <div className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">{themeConfig.themeName}</h3>
                <p className="text-zinc-400 text-[11px]">Tác giả: {themeConfig.author}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Community Hub
              </span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400 pt-2 border-t border-white/[0.08]">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  hasLiked ? "text-rose-500" : "hover:text-rose-400"
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? "fill-rose-500" : ""}`} />
                <span>{likes} Yêu thích</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>34 Bình luận</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>512 Lượt nhân bản</span>
              </div>
            </div>
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <label className="text-zinc-300 font-semibold">Đường dẫn chia sẻ công khai:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-300 font-mono text-[11px]"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
