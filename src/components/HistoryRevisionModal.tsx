import React from "react";
import {
  X,
  History,
  RotateCcw,
  Cloud,
  CheckCircle,
  Clock,
  Layers,
} from "lucide-react";
import { RevisionSnapshot } from "../types";

interface HistoryRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  revisions: RevisionSnapshot[];
  onRestoreRevision: (revision: RevisionSnapshot) => void;
}

export const HistoryRevisionModal: React.FC<HistoryRevisionModalProps> = ({
  isOpen,
  onClose,
  revisions,
  onRestoreRevision,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0A0A0C]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 tracking-tight">Lịch Sử Phiên Bản & Sao Lưu Đám Mây</h2>
              <p className="text-zinc-400 text-[11px]">
                Hệ thống tự động chụp ảnh snapshot và lưu trữ an toàn mỗi khi bạn chỉnh sửa.
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

        {/* List of Revisions */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto bg-[#0A0A0C]">
          {revisions.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              Chưa có phiên bản nào được ghi nhận.
            </div>
          ) : (
            revisions.map((rev, index) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-amber-500/40 transition-all flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0A0A0C] border border-white/[0.08] flex items-center justify-center text-amber-400 font-bold text-xs">
                    v{revisions.length - index}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-100 text-xs">{rev.title}</h4>
                      {rev.autoSaved && (
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Auto-save Cloud
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>{rev.timestamp}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-zinc-500" />
                        <span>{rev.blockCount} khối giao diện</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onRestoreRevision(rev);
                    onClose();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 transition-all text-xs font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi Phục</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
