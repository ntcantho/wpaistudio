import React, { useState } from "react";
import {
  X,
  Sparkles,
  Search,
  Download,
  Star,
  Check,
  LayoutGrid,
  ExternalLink,
  Layers,
} from "lucide-react";
import { LanguageCode, WPTemplate } from "../types";
import { defaultTemplates } from "../data/defaultTemplates";
import { translations } from "../utils/translations";

interface TemplateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: WPTemplate) => void;
  lang: LanguageCode;
}

export const TemplateLibraryModal: React.FC<TemplateLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  lang,
}) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<WPTemplate | null>(null);

  if (!isOpen) return null;

  const categories = [
    "all",
    "SaaS & Tech",
    "E-Commerce",
    "Agency",
    "Blog & Magazine",
    "F&B / Restaurant",
  ];

  const filtered = defaultTemplates.filter((tpl) => {
    const matchesCat = activeCategory === "all" || tpl.category === activeCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-5xl h-[85vh] bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-100 tracking-tight">{t.templates}</h2>
              <p className="text-xs text-zinc-400">
                Kho giao diện WordPress mẫu đa dạng, chuẩn SEO và tối ưu hóa chuyển đổi
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

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-white/[0.08] bg-[#0A0A0C]/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-[#181822] text-zinc-400 hover:text-zinc-200 border border-white/[0.04]"
                }`}
              >
                {cat === "all" ? "Tất Cả Mẫu" : cat}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu giao diện..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#181822] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0A0A0C]">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-2xl bg-[#121217] border border-white/[0.08] overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="relative h-44 overflow-hidden bg-[#181822]">
                <img
                  src={tpl.thumbnail}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md text-indigo-400 text-[10px] font-bold border border-white/[0.08]">
                    {tpl.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md text-amber-400 text-[10px] font-bold border border-white/[0.08]">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{tpl.rating}</span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-[#181822] text-zinc-400 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>{tpl.downloads.toLocaleString()} lượt dùng</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onClose();
                    }}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                  >
                    Áp Dụng Mẫu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
