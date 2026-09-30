import React, { useState } from "react";
import {
  X,
  Image as ImageIcon,
  Upload,
  Search,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { MediaAsset } from "../types";

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (url: string) => void;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const assets: MediaAsset[] = [
    {
      id: "media-1",
      name: "Modern SaaS Dashboard Mockup",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      category: "hero",
      size: "142 KB",
      dimensions: "1920 × 1080",
      altText: "Giao diện website doanh nghiệp",
    },
    {
      id: "media-2",
      name: "Vietnamese Coffee Cup Minimal",
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
      category: "product",
      size: "98 KB",
      dimensions: "1200 × 800",
      altText: "Cà phê phong cách tối giản",
    },
    {
      id: "media-3",
      name: "Senior Software Architect Avatar",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      category: "avatar",
      size: "45 KB",
      dimensions: "400 × 400",
      altText: "Ảnh đại diện chuyên gia",
    },
    {
      id: "media-4",
      name: "Creative Marketing Team Office",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      category: "hero",
      size: "185 KB",
      dimensions: "1600 × 900",
      altText: "Không gian làm việc sáng tạo",
    },
    {
      id: "media-5",
      name: "Luxury Restaurant Dining Table",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
      category: "product",
      size: "160 KB",
      dimensions: "1400 × 933",
      altText: "Không gian nhà hàng sang trọng",
    },
    {
      id: "media-6",
      name: "Tech Workspace Laptop & Code",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
      category: "hero",
      size: "120 KB",
      dimensions: "1500 × 1000",
      altText: "Lập trình viên và máy tính xách tay",
    },
  ];

  const filtered = assets.filter((asset) => {
    const matchesCat = selectedCategory === "all" || asset.category === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-4xl h-[80vh] bg-[#121217] border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0A0A0C]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 tracking-tight">Thư Viện Tài Nguyên & Media</h2>
              <p className="text-xs text-zinc-400">
                Quản lý kho hình ảnh chuẩn định dạng WebP/PNG tối ưu hóa dung lượng cho WordPress.
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

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-white/[0.08] bg-[#0A0A0C]/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {["all", "hero", "product", "avatar"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-[#181822] text-zinc-400 hover:text-zinc-200 border border-white/[0.04]"
                }`}
              >
                {cat === "all" ? "Tất Cả" : cat}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tài nguyên..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#181822] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Assets Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#0A0A0C]">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl bg-[#121217] border border-white/[0.08] overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-40 overflow-hidden bg-[#181822]">
                <img
                  src={asset.url}
                  alt={asset.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md text-[10px] font-bold text-zinc-300 border border-white/[0.08]">
                  {asset.dimensions}
                </span>
              </div>

              <div className="p-3.5 space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-zinc-100 line-clamp-1">{asset.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">{asset.size} • WebP Optimized</p>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Đã Copy!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  {onSelectImage && (
                    <button
                      onClick={() => {
                        onSelectImage(asset.url);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                    >
                      Chọn Ảnh
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
