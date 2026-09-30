import React, { useState } from "react";
import {
  Sliders,
  Search,
  Palette,
  Activity,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Type,
  Link,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react";
import { LanguageCode, SEOConfig, ThemeConfig, WPBlock } from "../types";
import { translations } from "../utils/translations";

interface InspectorPanelProps {
  selectedBlock: WPBlock | null;
  onUpdateBlock: (updated: WPBlock) => void;
  themeConfig: ThemeConfig;
  onUpdateThemeConfig: (config: ThemeConfig) => void;
  seoConfig: SEOConfig;
  onUpdateSeoConfig: (config: SEOConfig) => void;
  lang: LanguageCode;
  onRunAiSeoAudit: () => void;
  isAuditingSeo: boolean;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedBlock,
  onUpdateBlock,
  themeConfig,
  onUpdateThemeConfig,
  seoConfig,
  onUpdateSeoConfig,
  lang,
  onRunAiSeoAudit,
  isAuditingSeo,
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<"block" | "seo" | "theme" | "analytics">("block");

  // Calculate quick SEO score
  const titleLength = seoConfig.metaTitle.length;
  const descLength = seoConfig.metaDescription.length;
  const isTitleGood = titleLength >= 30 && titleLength <= 65;
  const isDescGood = descLength >= 80 && descLength <= 160;

  return (
    <aside className="w-84 h-full flex flex-col bg-[#0A0A0C] border-l border-white/[0.08] select-none overflow-hidden text-xs">
      {/* Top Tab Bar */}
      <div className="flex items-center border-b border-white/[0.08] bg-[#0A0A0C] p-1.5 gap-1">
        <button
          onClick={() => setActiveTab("block")}
          className={`flex-1 py-1.5 px-1 text-center font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "block"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Khối</span>
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`flex-1 py-1.5 px-1 text-center font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "seo"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>SEO Suite</span>
        </button>

        <button
          onClick={() => setActiveTab("theme")}
          className={`flex-1 py-1.5 px-1 text-center font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "theme"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Theme</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 py-1.5 px-1 text-center font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "analytics"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Hiệu Năng</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#0A0A0C]">
        {/* TAB 1: BLOCK PROPERTIES */}
        {activeTab === "block" && (
          <div>
            {!selectedBlock ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#121217] border border-white/[0.08] flex items-center justify-center text-zinc-500 mx-auto shadow-inner">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-zinc-100">Chưa Chọn Khối Nào</h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Nhấp vào bất kỳ khối nào trên canvas ở giữa để chỉnh sửa nội dung và kiểu dáng.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                      {selectedBlock.category}
                    </span>
                    <h3 className="font-bold text-zinc-100 text-sm">{selectedBlock.name}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 bg-[#121217] border border-white/[0.08] px-2 py-0.5 rounded-md">
                    ID: {selectedBlock.id.substring(0, 8)}
                  </span>
                </div>

                {/* Badge text */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold flex items-center gap-1">
                    <span>Huy Hiệu / Tag (Badge)</span>
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.badge || ""}
                    onChange={(e) =>
                      onUpdateBlock({
                        ...selectedBlock,
                        content: { ...selectedBlock.content, badge: e.target.value },
                      })
                    }
                    placeholder="ví dụ: 🚀 Phiên bản mới 2026"
                    className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold">Tiêu Đề Chính (H1 / H2)</label>
                  <input
                    type="text"
                    value={selectedBlock.content.title || ""}
                    onChange={(e) =>
                      onUpdateBlock({
                        ...selectedBlock,
                        content: { ...selectedBlock.content, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Subtitle / Description */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold">Mô Tả / Phụ Đề</label>
                  <textarea
                    rows={3}
                    value={selectedBlock.content.subtitle || selectedBlock.content.description || ""}
                    onChange={(e) =>
                      onUpdateBlock({
                        ...selectedBlock,
                        content: {
                          ...selectedBlock.content,
                          subtitle: e.target.value,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                {/* Button 1 */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[11px]">Nút Chính (Text)</label>
                    <input
                      type="text"
                      value={selectedBlock.content.primaryBtnText || ""}
                      onChange={(e) =>
                        onUpdateBlock({
                          ...selectedBlock,
                          content: { ...selectedBlock.content, primaryBtnText: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 text-[11px]">Đường Dẫn (URL)</label>
                    <input
                      type="text"
                      value={selectedBlock.content.primaryBtnUrl || "#"}
                      onChange={(e) =>
                        onUpdateBlock({
                          ...selectedBlock,
                          content: { ...selectedBlock.content, primaryBtnUrl: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Image URL if applicable */}
                {selectedBlock.content.imageUrl !== undefined && (
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-semibold flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-emerald-400" />
                      <span>URL Hình Ảnh Nền / Minh Họa</span>
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.content.imageUrl || ""}
                      onChange={(e) =>
                        onUpdateBlock({
                          ...selectedBlock,
                          content: { ...selectedBlock.content, imageUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Dynamic Items (for Features, Pricing, Testimonials) */}
                {selectedBlock.content.items && selectedBlock.content.items.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <label className="text-zinc-300 font-semibold">
                        Danh Sách Mục ({selectedBlock.content.items.length})
                      </label>
                      <button
                        onClick={() => {
                          const newItems = [
                            ...(selectedBlock.content.items || []),
                            {
                              title: "Mục Mới",
                              desc: "Mô tả nội dung cho mục này...",
                              price: "500.000₫",
                              rating: 5,
                            },
                          ];
                          onUpdateBlock({
                            ...selectedBlock,
                            content: { ...selectedBlock.content, items: newItems },
                          });
                        }}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px] font-bold"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm Mục</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {selectedBlock.content.items.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-400">#{idx + 1}</span>
                            <button
                              onClick={() => {
                                const updated = (selectedBlock.content.items || []).filter((_, i) => i !== idx);
                                onUpdateBlock({
                                  ...selectedBlock,
                                  content: { ...selectedBlock.content, items: updated },
                                });
                              }}
                              className="text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={item.title || ""}
                            onChange={(e) => {
                              const copy = [...(selectedBlock.content.items || [])];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              onUpdateBlock({
                                ...selectedBlock,
                                content: { ...selectedBlock.content, items: copy },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-[#0A0A0C] border border-white/[0.08] text-zinc-100"
                          />
                          <input
                            type="text"
                            value={item.desc || ""}
                            onChange={(e) => {
                              const copy = [...(selectedBlock.content.items || [])];
                              copy[idx] = { ...copy[idx], desc: e.target.value };
                              onUpdateBlock({
                                ...selectedBlock,
                                content: { ...selectedBlock.content, items: copy },
                              });
                            }}
                            placeholder="Mô tả..."
                            className="w-full px-2 py-1 text-[11px] rounded-lg bg-[#0A0A0C] border border-white/[0.08] text-zinc-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEO SUITE */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">Tối Ưu Hóa SEO On-page</h3>
                <p className="text-[11px] text-zinc-400">Chuẩn Google Search & Schema Markup</p>
              </div>
              <button
                onClick={onRunAiSeoAudit}
                disabled={isAuditingSeo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                {isAuditingSeo ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                )}
                <span>AI Phân Tích</span>
              </button>
            </div>

            {/* SEO Score Gauge */}
            <div className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100">Điểm Đánh Giá SEO</span>
                <span className="text-base font-extrabold text-emerald-400">{seoConfig.score || 94}/100</span>
              </div>
              <div className="w-full bg-[#181822] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${seoConfig.score || 94}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cấu trúc thẻ Heading và Meta Tag đạt chuẩn</span>
              </div>
            </div>

            {/* Google SERP Preview Box */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Xem Trước Kết Quả Tìm Kiếm Google</span>
              </label>
              <div className="p-3.5 rounded-2xl bg-white text-slate-900 space-y-1 font-sans shadow-md">
                <div className="text-[11px] text-slate-600 flex items-center gap-1">
                  <span>https://example.com</span>
                  <span>›</span>
                  <span>{themeConfig.themeSlug || "home"}</span>
                </div>
                <h4 className="text-sm font-semibold text-blue-800 hover:underline leading-snug line-clamp-1">
                  {seoConfig.metaTitle || "Tiêu đề website WordPress chuyên nghiệp"}
                </h4>
                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                  {seoConfig.metaDescription || "Mô tả website đầy đủ, chuẩn SEO với các từ khóa mục tiêu..."}
                </p>
              </div>
            </div>

            {/* Meta Title Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-300 font-semibold">Thẻ Meta Title</label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isTitleGood ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {titleLength}/60 ký tự
                </span>
              </div>
              <input
                type="text"
                value={seoConfig.metaTitle}
                onChange={(e) => onUpdateSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Meta Description Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-300 font-semibold">Thẻ Meta Description</label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isDescGood ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {descLength}/160 ký tự
                </span>
              </div>
              <textarea
                rows={3}
                value={seoConfig.metaDescription}
                onChange={(e) => onUpdateSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Schema Type */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold">Cấu Trúc Dữ Liệu Schema.org</label>
              <select
                value={seoConfig.schemaType}
                onChange={(e) =>
                  onUpdateSeoConfig({ ...seoConfig, schemaType: e.target.value as any })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="WebSite">WebSite (Chung)</option>
                <option value="Organization">Organization (Doanh nghiệp)</option>
                <option value="Product">Product (Sản phẩm WooCommerce)</option>
                <option value="Article">Article (Bài viết Blog/Tin tức)</option>
                <option value="LocalBusiness">LocalBusiness (Địa điểm cửa hàng)</option>
              </select>
            </div>
          </div>
        )}

        {/* TAB 3: THEME SETTINGS */}
        {activeTab === "theme" && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-zinc-100 text-sm">Cài Đặt Theme WordPress</h3>
              <p className="text-[11px] text-zinc-400">Định dạng file style.css & Theme.json</p>
            </div>

            {/* Theme Name */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold">Tên Theme (Theme Name)</label>
              <input
                type="text"
                value={themeConfig.themeName}
                onChange={(e) => onUpdateThemeConfig({ ...themeConfig, themeName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-indigo-500 font-bold"
              />
            </div>

            {/* Theme Slug */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold">Theme Slug (Thư mục)</label>
              <input
                type="text"
                value={themeConfig.themeSlug}
                onChange={(e) => onUpdateThemeConfig({ ...themeConfig, themeSlug: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-300 font-mono text-[11px]"
              />
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold">Tác Giả (Author)</label>
              <input
                type="text"
                value={themeConfig.author}
                onChange={(e) => onUpdateThemeConfig({ ...themeConfig, author: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100"
              />
            </div>

            {/* Color Palette */}
            <div className="space-y-3 pt-2">
              <label className="text-zinc-300 font-semibold">Bảng Màu Chủ Đạo (Color Palette)</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] text-center space-y-1">
                  <span className="text-[10px] text-zinc-400 font-medium">Primary</span>
                  <input
                    type="color"
                    value={themeConfig.primaryColor}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, primaryColor: e.target.value })}
                    className="w-full h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-[10px] font-mono text-zinc-300">{themeConfig.primaryColor}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] text-center space-y-1">
                  <span className="text-[10px] text-zinc-400 font-medium">Secondary</span>
                  <input
                    type="color"
                    value={themeConfig.secondaryColor}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, secondaryColor: e.target.value })}
                    className="w-full h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-[10px] font-mono text-zinc-300">{themeConfig.secondaryColor}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121217] border border-white/[0.08] text-center space-y-1">
                  <span className="text-[10px] text-zinc-400 font-medium">Accent</span>
                  <input
                    type="color"
                    value={themeConfig.accentColor}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, accentColor: e.target.value })}
                    className="w-full h-7 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-[10px] font-mono text-zinc-300">{themeConfig.accentColor}</span>
                </div>
              </div>
            </div>

            {/* Fonts */}
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold">Font Tiêu Đề (Headings)</label>
              <select
                value={themeConfig.fontHeading}
                onChange={(e) => onUpdateThemeConfig({ ...themeConfig, fontHeading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/[0.08] text-zinc-100"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Inter">Inter</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Playfair Display">Playfair Display (Serif)</option>
                <option value="Outfit">Outfit</option>
              </select>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS & AUDIT */}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-zinc-100 text-sm">Báo Cáo Hiệu Năng & Tốc Độ</h3>
              <p className="text-[11px] text-zinc-400">Mô phỏng Core Web Vitals & DOM Node</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">LCP (Largest Paint)</span>
                <p className="text-lg font-black text-emerald-400">0.82s</p>
                <span className="text-[10px] text-emerald-400 font-bold">Rất Tốt (Good)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">FID (Input Delay)</span>
                <p className="text-lg font-black text-emerald-400">12ms</p>
                <span className="text-[10px] text-emerald-400 font-bold">Phản hồi tức thì</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">CLS (Layout Shift)</span>
                <p className="text-lg font-black text-emerald-400">0.005</p>
                <span className="text-[10px] text-emerald-400 font-bold">Không giật khung</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 font-medium">Dung lượng CSS</span>
                <p className="text-lg font-black text-indigo-400">18.4 KB</p>
                <span className="text-[10px] text-indigo-400 font-bold">Siêu nhẹ & sạch</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-2.5">
              <h4 className="font-bold text-zinc-100">Kiểm Tra Khả Năng Truy Cập (A11y)</h4>
              <div className="space-y-2 text-zinc-300 text-[11px]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Độ tương phản màu sắc đạt chuẩn WCAG AA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hình ảnh đều có thuộc tính alt text hợp lệ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hỗ trợ điều hướng bằng bàn phím (Tab/Enter)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
