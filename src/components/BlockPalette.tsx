import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  Search,
  Layout,
  Star,
  ShoppingBag,
  FileText,
  MessageSquareQuote,
  DollarSign,
  Megaphone,
  HelpCircle,
  BarChart3,
  Users,
  Mail,
  PanelBottom,
  Code2,
  Layers,
  Check,
} from "lucide-react";
import { BlockCategory, LanguageCode, WPBlock } from "../types";
import { defaultBlockTemplates } from "../data/blockLibrary";
import { translations } from "../utils/translations";

interface BlockPaletteProps {
  lang: LanguageCode;
  onAddBlock: (block: WPBlock) => void;
  onOpenAi: () => void;
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({
  lang,
  onAddBlock,
  onOpenAi,
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<BlockCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories: { id: BlockCategory; label: string; icon: any }[] = [
    { id: "all", label: "Tất Cả Khối", icon: Layers },
    { id: "header", label: "Header & Menu", icon: Layout },
    { id: "hero", label: "Hero & Banner", icon: Star },
    { id: "features", label: "Tính Năng", icon: Sparkles },
    { id: "ecommerce", label: "WooCommerce", icon: ShoppingBag },
    { id: "content", label: "Blog & Tin Tức", icon: FileText },
    { id: "testimonials", label: "Đánh Giá", icon: MessageSquareQuote },
    { id: "pricing", label: "Bảng Giá", icon: DollarSign },
    { id: "cta", label: "Kêu Gọi (CTA)", icon: Megaphone },
    { id: "faq", label: "Hỏi Đáp (FAQ)", icon: HelpCircle },
    { id: "stats", label: "Số Liệu & Stats", icon: BarChart3 },
    { id: "contact", label: "Liên Hệ & Form", icon: Mail },
    { id: "footer", label: "Footer Chân Trang", icon: PanelBottom },
    { id: "custom", label: "PHP / Shortcode", icon: Code2 },
  ];

  const filteredBlocks = defaultBlockTemplates.filter((block) => {
    const matchesCat = selectedCategory === "all" || block.category === selectedCategory;
    const matchesSearch =
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (block.description && block.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleInsert = (block: WPBlock) => {
    // Generate fresh unique ID
    const newBlock: WPBlock = {
      ...block,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    onAddBlock(newBlock);
    setRecentlyAddedId(block.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-[#0A0A0C] border-r border-white/[0.08] select-none overflow-hidden text-xs">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.08] space-y-3 bg-[#0A0A0C]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-extrabold text-zinc-100 tracking-tight">{t.blocks}</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16161D] text-indigo-400 border border-white/[0.08]">
            {defaultBlockTemplates.length} Mẫu Khối
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 hover:border-white/[0.15] transition-all"
          />
        </div>

        {/* AI Quick Generator Callout */}
        <button
          onClick={onOpenAi}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-pink-950/30 border border-indigo-500/30 hover:border-indigo-400 text-xs text-indigo-200 transition-all text-left group shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-zinc-100 text-[11px]">Tạo Khối Tự Động Với AI</p>
              <p className="text-[10px] text-indigo-300/80">Nhập ý tưởng, Gemini dựng khối tức thì</p>
            </div>
          </div>
          <Plus className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="px-3 py-2 border-b border-white/[0.08] flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-[#0A0A0C]">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                  : "bg-[#121217] text-zinc-400 hover:text-zinc-100 hover:bg-[#181820] border border-white/[0.06]"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#0A0A0C]">
        {filteredBlocks.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="text-xs text-zinc-400">Không tìm thấy khối phù hợp với từ khóa.</p>
          </div>
        ) : (
          filteredBlocks.map((block) => {
            const isJustAdded = recentlyAddedId === block.id;

            return (
              <div
                key={block.id}
                className="group relative p-3.5 rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-[#16161E] transition-all shadow-sm flex flex-col justify-between"
              >
                {/* Block preview card */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#181822] text-indigo-400 border border-indigo-500/20">
                      {block.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">WP Core</span>
                  </div>

                  <h3 className="text-xs font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                    {block.name}
                  </h3>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {block.description || "Khối giao diện tối ưu tốc độ và chuẩn SEO cho WordPress."}
                  </p>
                </div>

                {/* Insert Button */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium">Bấm hoặc Kéo để chèn</span>
                  <button
                    onClick={() => handleInsert(block)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isJustAdded
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
                        : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Đã Thêm!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>+ Chèn Khối</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
