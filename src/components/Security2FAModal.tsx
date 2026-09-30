import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  KeyRound,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { SecurityConfig } from "../types";

interface Security2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityConfig: SecurityConfig;
  onUpdateSecurity: (config: SecurityConfig) => void;
}

export const Security2FAModal: React.FC<Security2FAModalProps> = ({
  isOpen,
  onClose,
  securityConfig,
  onUpdateSecurity,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleToggle2FA = () => {
    if (!securityConfig.twoFactorEnabled) {
      setOtpSent(true);
    } else {
      onUpdateSecurity({ ...securityConfig, twoFactorEnabled: false });
    }
  };

  const handleVerifyOtp = () => {
    if (otpCode.length === 6) {
      setVerifySuccess(true);
      setTimeout(() => {
        onUpdateSecurity({ ...securityConfig, twoFactorEnabled: true });
        setOtpSent(false);
        setVerifySuccess(false);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 tracking-tight">Trung Tâm Bảo Mật & Xác Thực 2FA</h2>
              <p className="text-zinc-400 text-[11px]">
                Bảo vệ mã nguồn theme và thông tin cấu hình với mã hóa đầu cuối E2EE
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

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-[#0A0A0C]">
          {/* Status card */}
          <div className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  securityConfig.twoFactorEnabled ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">
                  {securityConfig.twoFactorEnabled
                    ? "Xác Thực 2 Lớp (2FA) Đang Bật"
                    : "Xác Thực 2 Lớp Chưa Được Kích Hoạt"}
                </h3>
                <p className="text-zinc-400 text-[11px]">
                  {securityConfig.twoFactorEnabled
                    ? "Tài khoản của bạn được bảo vệ bởi mã OTP thời gian thực."
                    : "Khuyến nghị kích hoạt 2FA để ngăn chặn truy cập trái phép."}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggle2FA}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                securityConfig.twoFactorEnabled
                  ? "bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              }`}
            >
              {securityConfig.twoFactorEnabled ? "Tắt 2FA" : "Bật 2FA Ngay"}
            </button>
          </div>

          {/* OTP Simulator */}
          {otpSent && !securityConfig.twoFactorEnabled && (
            <div className="p-4 rounded-2xl bg-[#121217] border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100">Nhập mã xác thực OTP (6 chữ số):</span>
                <span className="text-[10px] text-emerald-400 font-mono">Mã thử nghiệm: 888666</span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Nhập 888666..."
                className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                {verifySuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Thực Thành Công!</span>
                  </>
                ) : (
                  <span>Xác Nhận & Kích Hoạt 2FA</span>
                )}
              </button>
            </div>
          )}

          {/* E2EE Cryptographic Signature Card */}
          <div className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-100 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Chữ Ký Mã Hóa Đầu Cuối (E2EE Signature)</span>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(securityConfig.e2eeSignature);
                  setCopiedKey(true);
                  setTimeout(() => setCopiedKey(false), 1500);
                }}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px] font-semibold"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? "Đã Copy" : "Sao Chép"}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#0A0A0C] text-zinc-400 font-mono text-[10px] break-all border border-white/[0.08]">
              {securityConfig.e2eeSignature || "SHA256:8f4c2e8a1b9d7e6f3a0c4e5b7a8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d"}
            </div>
            <p className="text-[11px] text-zinc-400">
              Mã khóa này dùng để giải mã và xác thực tính toàn vẹn của mã nguồn theme khi xuất bản.
            </p>
          </div>

          {/* Access Logs */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-100">Nhật Ký Bảo Mật Gần Đây</h4>
            <div className="space-y-1.5">
              <div className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đăng nhập an toàn từ trình duyệt hiện tại (IP: 118.69.12.*)</span>
                </div>
                <span className="text-zinc-500 font-mono">Vừa xong</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tự động sao lưu phiên bản theme lên Cloud Storage</span>
                </div>
                <span className="text-zinc-500 font-mono">5 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
