import { WPBlock } from "../types";

export const defaultBlockTemplates: WPBlock[] = [
  // 1. Header Block
  {
    id: "block-header-default",
    name: "Header Điều Hướng Hiện Đại",
    type: "header",
    category: "header",
    description: "Thanh điều hướng cố định với Logo, Menu đa cấp và Nút liên hệ",
    content: {
      title: "WP Studio Pro",
      items: [
        { title: "Trang Chủ", linkUrl: "#home" },
        { title: "Tính Năng", linkUrl: "#features" },
        { title: "Sản Phẩm", linkUrl: "#products" },
        { title: "Bảng Giá", linkUrl: "#pricing" },
        { title: "Tin Tức", linkUrl: "#blog" },
      ],
      primaryBtnText: "Tư Vấn Miễn Phí",
      primaryBtnUrl: "#contact",
    },
    styles: {
      paddingTop: "py-4",
      paddingBottom: "py-4",
      bgColor: "bg-slate-900/90",
      textColor: "text-white",
      accentColor: "#3b82f6",
      shadow: "shadow-md backdrop-blur-md sticky top-0 z-50",
    },
  },

  // 2. Hero SaaS / Tech
  {
    id: "block-hero-saas",
    name: "Hero Section Chuyển Đổi Cao",
    type: "hero",
    category: "hero",
    description: "Phần mở đầu ấn tượng với Huy hiệu, Tiêu đề lớn, Mô tả và Kêu gọi hành động",
    content: {
      badge: "🚀 Phiên bản WordPress 6.x & FSE Ready",
      title: "Xây Dựng Website WordPress Đỉnh Cao Nhanh Gấp 10 Lần",
      subtitle: "Giải pháp thiết kế trực quan kết hợp xuất mã nguồn PHP/CSS chuẩn SEO và tốc độ 100/100 Core Web Vitals.",
      description: "Hỗ trợ kéo thả thông minh, tối ưu hóa công cụ tìm kiếm tự động và tích hợp trí tuệ nhân tạo Gemini AI.",
      primaryBtnText: "Bắt Đầu Ngay Hôm Nay",
      primaryBtnUrl: "#get-started",
      secondaryBtnText: "Xem Bản Trực Tiếp",
      secondaryBtnUrl: "#demo",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
      imageAlt: "Giao diện website WordPress hiện đại",
      align: "center",
    },
    styles: {
      paddingTop: "pt-24",
      paddingBottom: "pb-24",
      bgColor: "bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950",
      textColor: "text-white",
      accentColor: "#6366f1",
      borderRadius: "rounded-3xl",
    },
  },

  // 3. Features Bento Grid
  {
    id: "block-features-grid",
    name: "Lưới Tính Năng & Giải Pháp (3 Cột)",
    type: "features",
    category: "features",
    description: "Bộ 3 thẻ tính năng nổi bật với Icon, tiêu đề và giải thích chi tiết",
    content: {
      badge: "TÍNH NĂNG ĐỘT PHÁ",
      title: "Mọi Thứ Bạn Cần Để Thống Trị Thị Trường",
      subtitle: "Kiến trúc mã nguồn mở mạnh mẽ, an toàn tuyệt đối và mở rộng không giới hạn.",
      items: [
        {
          title: "Mã Nguồn PHP/CSS Sạch",
          desc: "Tuân thủ nghiêm ngặt chuẩn WordPress Coding Standards, không chứa code rác thừa thãi.",
          icon: "Code2",
          highlight: true,
          tag: "Tốc Độ Cao",
        },
        {
          title: "Chuẩn SEO & Schema Tự Động",
          desc: "Tự động tạo thẻ meta, OpenGraph, JSON-LD Schema giúp website xếp hạng TOP Google nhanh chóng.",
          icon: "SearchCheck",
          tag: "SEO 100%",
        },
        {
          title: "Đồng Bộ Cloud & 2FA Bảo Mật",
          desc: "Sao lưu tự động thời gian thực lên đám mây và mã hóa đầu cuối với xác thực 2 lớp.",
          icon: "ShieldCheck",
          tag: "Bảo Mật Cao",
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-900",
      textColor: "text-white",
      accentColor: "#3b82f6",
    },
  },

  // 4. WooCommerce / Product Grid
  {
    id: "block-woocommerce-grid",
    name: "Lưới Sản Phẩm WooCommerce",
    type: "ecommerce",
    category: "ecommerce",
    description: "Danh sách sản phẩm tương thích WooCommerce với nhãn giảm giá và nút thêm vào giỏ",
    content: {
      badge: "SẢN PHẨM BÁN CHẠY",
      title: "Khám Phá Bộ Sưu Tập Nổi Bật",
      subtitle: "Được tin dùng bởi hơn 15,000+ khách hàng trên toàn quốc",
      items: [
        {
          title: "Gói Theme Doanh Nghiệp Pro",
          desc: "Tối ưu hóa chuyển đổi cho công ty công nghệ & dịch vụ",
          price: "1.250.000₫",
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
          rating: 5,
          tag: "HOT",
          linkText: "Thêm Vào Giỏ",
        },
        {
          title: "Gói Template Bán Hàng E-Commerce",
          desc: "Tích hợp sẵn cổng thanh toán Momo, VNPay & COD",
          price: "1.890.000₫",
          image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=80",
          rating: 5,
          tag: "SALE -30%",
          linkText: "Thêm Vào Giỏ",
        },
        {
          title: "Gói Tạp Chí & Tin Tức Premium",
          desc: "Tốc độ tải dưới 0.6s, hỗ trợ hiển thị quảng cáo Google AdSense",
          price: "950.000₫",
          image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
          rating: 4.9,
          tag: "NEW",
          linkText: "Thêm Vào Giỏ",
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-950",
      textColor: "text-white",
      accentColor: "#10b981",
    },
  },

  // 5. Blog Posts Grid
  {
    id: "block-blog-grid",
    name: "Lưới Bài Viết Tin Tức / Blog",
    type: "content",
    category: "content",
    description: "Hiển thị các bài viết mới nhất từ WordPress Loop theo dạng lưới thẻ",
    content: {
      badge: "KIẾN THỨC & TIN TỨC",
      title: "Chia Sẻ Kinh Nghiệm WordPress Chuyên Sâu",
      subtitle: "Cập nhật xu hướng thiết kế web và chiến lược SEO mới nhất năm 2026",
      items: [
        {
          title: "10 Kỹ Thuật Tối Ưu Tốc Độ WordPress Đạt 100 Điểm PageSpeed",
          desc: "Khám phá cách tinh chỉnh Caching, nén hình ảnh WebP và giảm thiểu JavaScript thừa.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
          authorName: "Nguyễn Văn Hùng",
          authorRole: "Senior WP Architect",
          tag: "Tối Ưu Tốc Độ",
          linkText: "Đọc Tiếp",
        },
        {
          title: "Hướng Dẫn Xây Dựng Schema JSON-LD Chuẩn Rank Math & Yoast",
          desc: "Tăng tỷ lệ click (CTR) trên kết quả tìm kiếm với các đoạn trích giàu tính năng (Rich Snippets).",
          image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80",
          authorName: "Trần Thị Mai",
          authorRole: "SEO Specialist",
          tag: "SEO Nâng Cao",
          linkText: "Đọc Tiếp",
        },
        {
          title: "Full Site Editing (FSE) & Tương Lai Theme WordPress",
          desc: "Làm chủ Block Theme và tận dụng các block Gutenberg tùy biến trong dự án doanh nghiệp.",
          image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80",
          authorName: "Lê Hoàng Phúc",
          authorRole: "Frontend Lead",
          tag: "Gutenberg FSE",
          linkText: "Đọc Tiếp",
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-900",
      textColor: "text-white",
      accentColor: "#f59e0b",
    },
  },

  // 6. Pricing Tables
  {
    id: "block-pricing-table",
    name: "Bảng Giá Gói Dịch Vụ (3 Gói)",
    type: "pricing",
    category: "pricing",
    description: "Bảng giá so sánh các gói thành viên với công tắc tháng/năm và gói nổi bật",
    content: {
      badge: "BẢNG GIÁ MINH BẠCH",
      title: "Đầu Tư Thông Minh Cho Doanh Nghiệp Của Bạn",
      subtitle: "Không phí ẩn. Hủy bỏ bất kỳ lúc nào. Hoàn tiền 100% trong 30 ngày.",
      items: [
        {
          title: "Cá Nhân (Starter)",
          price: "499.000₫",
          period: "/tháng",
          desc: "Phù hợp cho lập trình viên cá nhân và blogger",
          tag: "Cơ Bản",
          linkText: "Chọn Gói Starter",
        },
        {
          title: "Chuyên Nghiệp (Pro Agency)",
          price: "1.299.000₫",
          period: "/tháng",
          desc: "Đầy đủ tính năng cao cấp cho Agency & Doanh nghiệp vừa",
          highlight: true,
          tag: "ĐƯỢC CHỌN NHIỀU NHẤT",
          linkText: "Nâng Cấp Gói Pro",
        },
        {
          title: "Doanh Nghiệp (Enterprise)",
          price: "3.499.000₫",
          period: "/tháng",
          desc: "Hỗ trợ riêng 24/7, xuất mã nguồn không giới hạn và AI Gemini VIP",
          tag: "Không Giới Hạn",
          linkText: "Liên Hệ Doanh Nghiệp",
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-950",
      textColor: "text-white",
      accentColor: "#6366f1",
    },
  },

  // 7. Testimonials & Social Proof
  {
    id: "block-testimonials-reviews",
    name: "Đánh Giá Khách Hàng & Uy Tín",
    type: "testimonials",
    category: "testimonials",
    description: "Các đánh giá chân thực từ khách hàng với đánh giá sao và chức danh",
    content: {
      badge: "KHÁCH HÀNG NÓI GÌ",
      title: "Được Yêu Thích Bởi Hơn 500+ Doanh Nghiệp",
      subtitle: "Tỉ lệ hài lòng 99.4% và đạt điểm đánh giá 4.9/5 trên Trustpilot",
      items: [
        {
          title: "“Tiết kiệm hơn 70% thời gian code theme WordPress!”",
          desc: "Từ khi dùng WP Studio, team mình hoàn thiện dự án website cho khách chỉ trong 2 ngày thay vì 2 tuần. Mã nguồn xuất ra cực kỳ sạch và dễ mở rộng.",
          authorName: "Đặng Quốc Hưng",
          authorRole: "CEO @ MediaCore Agency",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          rating: 5,
        },
        {
          title: "“Tốc độ tải trang đạt 99 điểm Google PageSpeed ngay lập tức.”",
          desc: "Khách hàng của mình rất ấn tượng vì điểm SEO và Core Web Vitals xanh mướt. Thao tác kéo thả mượt mà và trực quan hơn bất kỳ builder nào.",
          authorName: "Phạm Thu Hương",
          authorRole: "Trưởng phòng Marketing @ VinFashion",
          authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
          rating: 5,
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-900",
      textColor: "text-white",
      accentColor: "#ec4899",
    },
  },

  // 8. Call To Action (CTA)
  {
    id: "block-cta-banner",
    name: "Khối Kêu Gọi Hành Động (CTA Banner)",
    type: "cta",
    category: "cta",
    description: "Khối nổi bật thu hút tương tác, đăng ký nhận tin hoặc dùng thử",
    content: {
      badge: "SẴN SÀNG BỨT PHÁ?",
      title: "Bắt Đầu Xây Dựng Template WordPress Của Bạn Ngay Hôm Nay",
      subtitle: "Tham gia cùng hàng ngàn nhà phát triển web hàng đầu để trải nghiệm quy trình làm việc hiện đại nhất.",
      primaryBtnText: "Tạo Theme Miễn Phí Ngay",
      primaryBtnUrl: "#start-now",
      secondaryBtnText: "Xem Tài Liệu Hướng Dẫn",
      secondaryBtnUrl: "#docs",
      newsletterPlaceholder: "Nhập địa chỉ email của bạn...",
    },
    styles: {
      paddingTop: "pt-16",
      paddingBottom: "pb-16",
      bgColor: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700",
      textColor: "text-white",
      accentColor: "#ffffff",
      borderRadius: "rounded-3xl",
    },
  },

  // 9. FAQ Accordion
  {
    id: "block-faq-accordion",
    name: "Câu Hỏi Thường Gặp (FAQ Accordion)",
    type: "faq",
    category: "faq",
    description: "Danh sách câu hỏi giải đáp thắc mắc người dùng với hiệu ứng mở rộng",
    content: {
      badge: "GIẢI ĐÁP THẮC MẮC",
      title: "Các Câu Hỏi Phổ Biến Nhất",
      subtitle: "Nếu bạn có câu hỏi khác, đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng hỗ trợ 24/7.",
      items: [
        {
          title: "Mã nguồn xuất ra có cài đặt được trực tiếp lên WordPress không?",
          desc: "Hoàn toàn được! Gói ZIP xuất ra là một Theme WordPress hoàn chỉnh theo chuẩn WordPress.org Codex. Bạn chỉ cần vào Quản trị WP > Giao diện > Thêm mới > Tải giao diện lên để kích hoạt.",
        },
        {
          title: "Template có tương thích với WooCommerce và Gutenberg không?",
          desc: "Có! Tất cả các template và khối đều được thiết kế để tương thích 100% với WooCommerce, block Gutenberg, cũng như các plugin SEO như Yoast SEO, Rank Math.",
        },
        {
          title: "Tôi có thể chỉnh sửa mã nguồn PHP và CSS sau khi xuất không?",
          desc: "Chắc chắn rồi. Mã nguồn được cấu trúc module hóa rất sạch sẽ và chú thích chi tiết, giúp bạn dễ dàng bổ sung hàm trong functions.php hoặc viết thêm style tùy ý.",
        },
      ],
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-950",
      textColor: "text-white",
      accentColor: "#06b6d4",
    },
  },

  // 10. Stats & Numbers
  {
    id: "block-stats-counter",
    name: "Số Liệu & Thành Tựu Nổi Bật",
    type: "stats",
    category: "stats",
    description: "Thống kê chỉ số ấn tượng tạo niềm tin với khách hàng",
    content: {
      badge: "CHỈ SỐ THÀNH CÔNG",
      title: "Những Con Số Biết Nói",
      items: [
        { title: "250K+", desc: "Template Đã Tạo", highlight: true },
        { title: "99.9%", desc: "Thời Gian Uptime", highlight: false },
        { title: "0.45s", desc: "Tốc Độ Tải Trung Bình", highlight: false },
        { title: "50+", desc: "Quốc Gia Sử Dụng", highlight: false },
      ],
    },
    styles: {
      paddingTop: "pt-16",
      paddingBottom: "pb-16",
      bgColor: "bg-slate-900",
      textColor: "text-white",
      accentColor: "#3b82f6",
    },
  },

  // 11. Contact Form Block
  {
    id: "block-contact-form",
    name: "Biểu Mẫu Liên Hệ & Bản Đồ",
    type: "contact",
    category: "contact",
    description: "Form liên hệ chuẩn tương thích Contact Form 7 và WPForms",
    content: {
      badge: "KẾT NỐI VỚI CHÚNG TÔI",
      title: "Gửi Tin Nhắn Cho Đội Ngũ Hỗ Trợ",
      subtitle: "Chúng tôi sẽ phản hồi trong vòng tối đa 2 giờ làm việc.",
      description: "Trụ sở chính: Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM | Hotline: 1900 6868",
      primaryBtnText: "Gửi Tin Nhắn Ngay",
    },
    styles: {
      paddingTop: "pt-20",
      paddingBottom: "pb-20",
      bgColor: "bg-slate-950",
      textColor: "text-white",
      accentColor: "#3b82f6",
    },
  },

  // 12. Footer Block
  {
    id: "block-footer-default",
    name: "Footer Chân Trang Chuyên Nghiệp",
    type: "footer",
    category: "footer",
    description: "Chân trang đa cột với bản tin, liên kết điều hướng và bản quyền",
    content: {
      title: "WordPress Template Studio",
      description: "Nền tảng kiến tạo giao diện WordPress thế hệ mới với hiệu năng vượt trội và mã nguồn sạch chuẩn quốc tế.",
      copyrightText: "© 2026 WordPress Template Studio. Tất cả quyền được bảo lưu. Thiết kế & phát triển cho cộng đồng WordPress.",
      items: [
        { title: "Điều Khoản Sử Dụng", linkUrl: "#terms" },
        { title: "Chính Sách Bảo Mật", linkUrl: "#privacy" },
        { title: "Tài Liệu API", linkUrl: "#api" },
        { title: "Trung Tâm Trợ Giúp", linkUrl: "#help" },
      ],
    },
    styles: {
      paddingTop: "pt-16",
      paddingBottom: "pb-12",
      bgColor: "bg-slate-950 border-t border-slate-800",
      textColor: "text-slate-400",
      accentColor: "#3b82f6",
    },
  },

  // 13. Custom Shortcode / PHP Block
  {
    id: "block-custom-shortcode",
    name: "Khối Code Tùy Chỉnh (Custom PHP / Shortcode)",
    type: "custom",
    category: "custom",
    description: "Cho phép chèn mã HTML, CSS tùy biến hoặc mã PHP hook của WordPress",
    content: {
      title: "Mã Tùy Chỉnh & WordPress Hook",
      rawHtml: `<div class="p-6 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-center">
  <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 mb-3">Custom Hook Output</span>
  <h4 class="text-xl font-bold text-white mb-2">Chạy Shortcode hoặc PHP Action</h4>
  <p class="text-sm text-slate-300">Khối này sẽ được nhúng chính xác vào vị trí mong muốn trong file template của theme.</p>
</div>`,
      rawPhp: `<?php\n// Custom WordPress Hook\ndo_action('wp_template_studio_custom_section');\n?>`,
      shortcode: `[woocommerce_product_categories number="4"]`,
    },
    styles: {
      paddingTop: "pt-12",
      paddingBottom: "pb-12",
      bgColor: "bg-slate-900",
      textColor: "text-white",
      accentColor: "#8b5cf6",
    },
  },
];
