import { WPTemplate } from "../types";
import { defaultBlockTemplates } from "./blockLibrary";

export const defaultTemplates: WPTemplate[] = [
  {
    id: "template-saas-technova",
    title: "TechNova - SaaS & Doanh Nghiệp Công Nghệ",
    category: "SaaS & Tech",
    description: "Template hiện đại cho sản phẩm phần mềm, Startup và công ty công nghệ với giao diện chuyển đổi cao.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    author: "WP Studio Core Team",
    downloads: 14250,
    rating: 4.9,
    tags: ["SaaS", "Công Nghệ", "Chuyển Đổi Cao", "Gutenberg"],
    createdAt: "2026-03-10",
    blocks: [
      defaultBlockTemplates[0], // Header
      defaultBlockTemplates[1], // Hero SaaS
      defaultBlockTemplates[2], // Features
      defaultBlockTemplates[9], // Stats
      defaultBlockTemplates[5], // Pricing
      defaultBlockTemplates[6], // Testimonials
      defaultBlockTemplates[8], // FAQ
      defaultBlockTemplates[7], // CTA
      defaultBlockTemplates[11], // Footer
    ],
  },
  {
    id: "template-vietcraft-ecommerce",
    title: "VietCraft - Cửa Hàng Bán Hàng & Thời Trang",
    category: "E-Commerce",
    description: "Tối ưu 100% cho WooCommerce với lưới sản phẩm động, giỏ hàng nhanh và bảng khuyến mãi hấp dẫn.",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
    author: "WooDesign Experts",
    downloads: 18900,
    rating: 5.0,
    tags: ["WooCommerce", "Thời Trang", "Bán Hàng", "Tốc Độ Cao"],
    createdAt: "2026-04-05",
    blocks: [
      defaultBlockTemplates[0], // Header
      {
        ...defaultBlockTemplates[1],
        id: "hero-ecommerce-custom",
        content: {
          ...defaultBlockTemplates[1].content,
          badge: "🔥 Bộ Sưu Tập Mùa Hè 2026",
          title: "Khám Phá Thời Trang Đẳng Cấp & Phong Cách Tinh Tế",
          subtitle: "Giảm giá lên đến 40% cho đơn hàng đầu tiên. Miễn phí vận chuyển toàn quốc.",
          primaryBtnText: "Mua Sắm Ngay",
          secondaryBtnText: "Xem Ưu Đãi HOT",
        },
      },
      defaultBlockTemplates[3], // WooCommerce Grid
      defaultBlockTemplates[2], // Features
      defaultBlockTemplates[6], // Testimonials
      defaultBlockTemplates[7], // CTA
      defaultBlockTemplates[11], // Footer
    ],
  },
  {
    id: "template-zenith-agency",
    title: "Zenith - Creative Agency & Studio",
    category: "Agency",
    description: "Phong cách tối giản tinh tế, đậm chất nghệ thuật dành cho các Agency thiết kế, Marketing và Studio ảnh.",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80",
    author: "Studio Minimal",
    downloads: 9820,
    rating: 4.8,
    tags: ["Agency", "Tối Giản", "Portfolio", "Branding"],
    createdAt: "2026-05-18",
    blocks: [
      defaultBlockTemplates[0],
      {
        ...defaultBlockTemplates[1],
        id: "hero-agency-custom",
        content: {
          ...defaultBlockTemplates[1].content,
          badge: "✦ Creative Design Studio",
          title: "Chúng Tôi Định Hình Thương Hiệu Của Tương Lai",
          subtitle: "Kết hợp giữa chiến lược thương hiệu độc đáo và trải nghiệm kỹ thuật số đỉnh cao.",
          primaryBtnText: "Xem Dự Án Đã Thực Hiện",
          secondaryBtnText: "Liên Hệ Hợp Tác",
        },
      },
      defaultBlockTemplates[2],
      defaultBlockTemplates[9],
      defaultBlockTemplates[6],
      defaultBlockTemplates[10],
      defaultBlockTemplates[11],
    ],
  },
  {
    id: "template-pulse-magazine",
    title: "Pulse - Tạp Chí Tin Tức & Blog Cá Nhân",
    category: "Blog & Magazine",
    description: "Template báo chí tốc độ cao, hỗ trợ hiển thị bài viết nổi bật, chuyên mục và form nhận bản tin email.",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80",
    author: "PressMaster WP",
    downloads: 12100,
    rating: 4.9,
    tags: ["Blog", "Tin Tức", "Tạp Chí", "SEO"],
    createdAt: "2026-06-01",
    blocks: [
      defaultBlockTemplates[0],
      defaultBlockTemplates[4], // Blog Grid
      defaultBlockTemplates[2],
      defaultBlockTemplates[7], // CTA
      defaultBlockTemplates[8], // FAQ
      defaultBlockTemplates[11],
    ],
  },
  {
    id: "template-gourmet-restaurant",
    title: "Gourmet - Nhà Hàng & Ẩm Thực Cao Cấp",
    category: "F&B / Restaurant",
    description: "Giao diện quyến rũ cho nhà hàng, quán cafe, dịch vụ đặt bàn và thực đơn trực tuyến.",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    author: "ChefDesigners",
    downloads: 7600,
    rating: 4.9,
    tags: ["Nhà Hàng", "Cafe", "Đặt Bàn", "Ẩm Thực"],
    createdAt: "2026-07-12",
    blocks: [
      defaultBlockTemplates[0],
      {
        ...defaultBlockTemplates[1],
        id: "hero-fnb-custom",
        content: {
          ...defaultBlockTemplates[1].content,
          badge: "🍷 Trải Nghiệm Ẩm Thực 5 Sao",
          title: "Hương Vị Tinh Hoa Trong Từng Món Ăn",
          subtitle: "Đầu bếp chuẩn Michelin mang đến những trải nghiệm ẩm thực khó quên.",
          primaryBtnText: "Đặt Bàn Trực Tuyến",
          secondaryBtnText: "Xem Thực Đơn",
        },
      },
      defaultBlockTemplates[3],
      defaultBlockTemplates[6],
      defaultBlockTemplates[10],
      defaultBlockTemplates[11],
    ],
  },
];
