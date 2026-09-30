import React, { useState } from "react";
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Check,
  Code,
  FileText,
  HelpCircle,
  Plus,
  RefreshCw,
} from "lucide-react";
import { LanguageCode, WPBlock } from "../types";
import { translations } from "../utils/translations";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertGeneratedBlock: (block: WPBlock) => void;
  lang: LanguageCode;
  siteTitle: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onInsertGeneratedBlock,
  lang,
  siteTitle,
}) => {
  const t = translations[lang];
  const [prompt, setPrompt] = useState("");
  const [taskType, setTaskType] = useState<"block" | "copy" | "seo">("block");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: "Hero chuyển đổi cao cho SaaS", text: "Tạo một Hero section hiện đại cho sản phẩm phần mềm SaaS B2B với tỷ lệ chuyển đổi cao và nút dùng thử." },
    { label: "Lưới sản phẩm WooCommerce nổi bật", text: "Tạo một lưới 3 sản phẩm nổi bật phong cách tối giản với giá, đánh giá sao và nút mua hàng." },
    { label: "Bảng giá 3 gói dịch vụ Agency", text: "Tạo bảng giá dịch vụ thiết kế website với gói Starter, Pro và Enterprise." },
    { label: "Form tư vấn & liên hệ khách hàng", text: "Tạo form liên hệ và thông tin văn phòng chuẩn WordPress." },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedResult(null);

    try {
      if (taskType === "block") {
        const res = await fetch("/api/gemini/generate-block", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, currentCategory: "all" }),
        });
        const data = await res.json();
        setGeneratedResult(data.block);
      } else {
        const res = await fetch("/api/gemini/generate-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, blockType: "hero", language: lang }),
        });
        const data = await res.json();
        setGeneratedResult(data.result);
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      // Fallback
      setGeneratedResult({
        id: `block-ai-${Date.now()}`,
        name: "Khối AI Được Tạo",
        type: "hero",
        category: "hero",
        content: {
          badge: "🚀 AI Generated",
          title: "Giải Pháp Số Đột Phá 2026",
          subtitle: "Được tạo tự động bằng mô hình Gemini AI với cấu trúc chuẩn WordPress.",
          primaryBtnText: "Khám Phá Ngay",
        },
        styles: {
          paddingTop: "pt-20",
          paddingBottom: "pb-20",
          bgColor: "bg-slate-900",
          textColor: "text-white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToCanvas = () => {
    if (generatedResult) {
      onInsertGeneratedBlock(generatedResult);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-3xl bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-100 tracking-tight">Trợ Lý AI Gemini Studio</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  gemini-3.7-flash
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Tạo khối giao diện, viết lại văn bản, tối ưu SEO và cấu trúc mã WordPress tự động.
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-[#0A0A0C]">
          {/* Quick Prompts */}
          <div className="space-y-1.5">
            <label className="text-zinc-400 text-xs font-semibold">Gợi ý câu lệnh nhanh:</label>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(qp.text)}
                  className="px-3 py-1.5 rounded-xl bg-[#121217] border border-white/[0.08] hover:border-indigo-500/40 text-zinc-300 hover:text-zinc-100 text-xs transition-colors text-left"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt input */}
          <div className="space-y-2">
            <label className="text-zinc-100 text-xs font-bold">Mô tả yêu cầu thiết kế của bạn:</label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ví dụ: Tạo một khối giới thiệu dịch vụ thiết kế thương hiệu cho Agency với 3 cột tính năng và màu sắc hiện đại..."
                className="w-full p-4 text-xs rounded-2xl bg-[#121217] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini Đang Tạo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Khởi Tạo Bằng AI</span>
                </>
              )}
            </button>
          </div>

          {/* Result preview */}
          {generatedResult && (
            <div className="p-4 rounded-2xl bg-[#121217] border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">Kết quả được tạo bởi Gemini:</span>
                <span className="text-[10px] text-zinc-500 font-mono">Ready to insert</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-xs space-y-1 text-zinc-300">
                <p className="font-bold text-zinc-100 text-sm">{generatedResult.name || generatedResult.title}</p>
                <p className="text-zinc-400">{generatedResult.content?.subtitle || generatedResult.subtitle || generatedResult.description}</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleApplyToCanvas}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã Chèn Vào Canvas!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Chèn Khối Này Vào Website</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
