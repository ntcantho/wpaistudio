import React from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Download,
  UploadCloud,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  Mic,
  LayoutGrid,
  Bell,
  Code,
  Share2,
  History,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Laptop,
  Undo2,
  Redo2,
} from "lucide-react";
import { DeviceType, LanguageCode, NotificationItem, ThemeMode } from "../types";
import { translations } from "../utils/translations";

export interface HeaderNavProps {
  device: DeviceType;
  setDevice?: (device: DeviceType) => void;
  onDeviceChange?: (device: DeviceType) => void;
  lang: LanguageCode;
  setLang?: (lang: LanguageCode) => void;
  onLanguageChange?: (lang: LanguageCode) => void;
  themeMode?: ThemeMode;
  setThemeMode?: (mode: ThemeMode) => void;
  syncStatus?: "synced" | "saving";
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onOpenAi: () => void;
  onOpenMedia: () => void;
  onOpen2FA?: () => void;
  onOpenSecurity?: () => void;
  onOpenHistory: () => void;
  onOpenCommunity: () => void;
  onOpenVoice: () => void;
  notifications?: NotificationItem[];
  unreadCount?: number;
  onOpenNotifications?: () => void;
  onQuickPublish?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  twoFactorEnabled?: boolean;
  siteTitle?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  device,
  setDevice,
  onDeviceChange,
  lang,
  setLang,
  onLanguageChange,
  themeMode = "dark",
  setThemeMode,
  syncStatus = "synced",
  onOpenTemplates,
  onOpenExport,
  onOpenAi,
  onOpenMedia,
  onOpen2FA,
  onOpenSecurity,
  onOpenHistory,
  onOpenCommunity,
  onOpenVoice,
  notifications = [],
  unreadCount = 0,
  onOpenNotifications,
  onQuickPublish,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  twoFactorEnabled = true,
  siteTitle,
}) => {
  const t = translations[lang] || translations.vi;

  const handleSetDevice = (newDevice: DeviceType) => {
    if (setDevice) setDevice(newDevice);
    if (onDeviceChange) onDeviceChange(newDevice);
  };

  const handleSetLang = (newLang: LanguageCode) => {
    if (setLang) setLang(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
  };

  const handleOpenSecurity = () => {
    if (onOpenSecurity) onOpenSecurity();
    else if (onOpen2FA) onOpen2FA();
  };

  const handlePublish = () => {
    if (onQuickPublish) {
      onQuickPublish();
    } else {
      onOpenExport();
    }
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0A0A0C]/95 backdrop-blur-xl px-4 flex items-center justify-between select-none z-40 sticky top-0">
      {/* Brand & Mode Badges */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            WP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-zinc-100 text-sm tracking-tight">Studio Bento</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                v6.7 Core
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Visual WordPress Template Builder
            </p>
          </div>
        </div>

        {/* Sync Status Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121217] border border-white/[0.08] text-[11px] text-zinc-300">
          {syncStatus === "saving" ? (
            <>
              <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
              <span>{t.syncing}</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{t.syncedJustNow}</span>
            </>
          )}
        </div>
      </div>

      {/* Middle: Undo/Redo & Device Viewport Switcher & Voice Search */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo controls */}
        <div className="hidden sm:flex items-center bg-[#121217] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Hoàn tác (Undo)"
            className="p-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-400 hover:bg-white/[0.04] transition-all"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Làm lại (Redo)"
            className="p-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-400 hover:bg-white/[0.04] transition-all"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center bg-[#121217] p-1 rounded-xl border border-white/[0.08] shadow-inner">
          <button
            onClick={() => handleSetDevice("desktop")}
            title={t.desktop}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              device === "desktop"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSetDevice("laptop")}
            title={t.laptop}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              device === "laptop"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
            }`}
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSetDevice("tablet")}
            title={t.tablet}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              device === "tablet"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSetDevice("mobile")}
            title={t.mobile}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              device === "mobile"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Voice Search Trigger */}
        <button
          onClick={onOpenVoice}
          title={t.voiceSearch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-rose-500/40 text-xs text-zinc-300 hover:text-white transition-all shadow-sm"
        >
          <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="hidden md:inline font-medium">{t.voiceSearch}</span>
        </button>

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAi}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-xs text-indigo-300 hover:text-white hover:border-indigo-400 transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold hidden sm:inline">AI Gemini</span>
        </button>
      </div>

      {/* Right Controls: Templates, Code Export, 2FA, History, Theme, Language, Publish */}
      <div className="flex items-center gap-2">
        {/* Templates Modal */}
        <button
          onClick={onOpenTemplates}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-indigo-500/40 text-xs text-zinc-200 transition-all"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-medium">{t.templates}</span>
        </button>

        {/* Media Manager */}
        <button
          onClick={onOpenMedia}
          title={t.mediaManager}
          className="p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-emerald-500/40 text-zinc-400 hover:text-white transition-all hidden sm:block"
        >
          <ImageIcon className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Security & 2FA */}
        <button
          onClick={handleOpenSecurity}
          title={t.security2fa}
          className="p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-emerald-500/40 text-zinc-400 hover:text-white transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Revisions History */}
        <button
          onClick={onOpenHistory}
          title={t.history}
          className="p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-amber-500/40 text-zinc-400 hover:text-white transition-all hidden lg:block"
        >
          <History className="w-4 h-4 text-amber-400" />
        </button>

        {/* Community Share */}
        <button
          onClick={onOpenCommunity}
          title={t.community}
          className="p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-sky-500/40 text-zinc-400 hover:text-white transition-all hidden sm:block"
        >
          <Share2 className="w-4 h-4 text-sky-400" />
        </button>

        {/* Notifications */}
        {onOpenNotifications && (
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white transition-all"
            title="Thông báo hệ thống"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce shadow-md">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Language selector */}
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => handleSetLang(e.target.value as LanguageCode)}
            className="bg-[#121217] text-zinc-300 text-xs rounded-xl border border-white/[0.08] px-2 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer hover:bg-[#181820]"
          >
            <option value="vi">🇻🇳 VI</option>
            <option value="en">🇺🇸 EN</option>
            <option value="ja">🇯🇵 JA</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>

        {/* Theme mode toggle */}
        {setThemeMode && (
          <button
            onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white transition-all"
            title={themeMode === "dark" ? t.lightMode : t.darkMode}
          >
            {themeMode === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        )}

        {/* Export Code */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121217] hover:bg-[#181820] border border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-all shadow-sm"
        >
          <Code className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.exportCode}</span>
        </button>

        {/* 1-Click Publish button */}
        <button
          onClick={handlePublish}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>{t.publish}</span>
        </button>
      </div>
    </header>
  );
};
