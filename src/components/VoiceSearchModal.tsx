import React, { useState, useEffect } from "react";
import { X, Mic, MicOff, Sparkles, Check, ArrowRight } from "lucide-react";

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (commandText: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript("");
      return;
    }

    // Auto-start listening simulation or real Web Speech API
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setTranscript("Trình duyệt không hỗ trợ Web Speech API trực tiếp. Hãy dùng micro ảo.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "vi-VN";
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.start();

      return () => {
        try {
          recognition.stop();
        } catch (e) {}
      };
    } catch (err) {
      console.warn("Speech API init error:", err);
      setIsListening(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quickVoiceCommands = [
    "Thêm khối WooCommerce sản phẩm",
    "Tối ưu SEO cho website",
    "Mở thư viện mẫu giao diện",
    "Xuất file zip theme WordPress",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/85 backdrop-blur-md flex items-center justify-center p-4 select-none text-xs">
      <div className="w-full max-w-lg bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-center p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-zinc-100 text-sm">Tìm Kiếm & Điều Khiển Bằng Giọng Nói</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/[0.04]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Mic Wave */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-rose-500/20 text-rose-400 ring-8 ring-rose-500/20 animate-pulse"
                  : "bg-[#181822] text-zinc-400 border border-white/[0.08]"
              }`}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
            </div>
          </div>

          <div>
            <p className="text-zinc-100 font-bold text-sm">
              {isListening ? "Đang lắng nghe bạn nói..." : "Bấm vào câu lệnh mẫu hoặc nói trực tiếp"}
            </p>
            <p className="text-zinc-400 text-[11px] mt-1">
              {transcript || "ví dụ: 'Thêm khối hero banner' hoặc 'Mở xuất mã nguồn'"}
            </p>
          </div>
        </div>

        {/* Suggested Voice Commands */}
        <div className="space-y-2 text-left">
          <span className="text-zinc-400 text-[11px] font-semibold">Câu lệnh phổ biến:</span>
          <div className="grid grid-cols-1 gap-2">
            {quickVoiceCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onExecuteCommand(cmd);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] hover:border-indigo-500/50 text-zinc-300 hover:text-zinc-100 transition-all shadow-sm"
              >
                <span>{cmd}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
