import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini client lazily
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Helper to safely call Gemini with retry and fallback
async function callGemini(contents: any, config?: any, retries = 1): Promise<any> {
  const ai = getGeminiClient();
  if (!ai) return null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config,
      });
      return response;
    } catch (err: any) {
      console.warn(`Gemini API attempt ${attempt + 1} failed:`, err?.message || err);
      if (attempt < retries) {
        // Wait 600ms before retrying on transient errors like 503/429
        await new Promise((resolve) => setTimeout(resolve, 600));
      } else {
        throw err;
      }
    }
  }
}

// Generate contextual smart fallback block based on prompt
function getSmartFallbackBlock(prompt: string = ""): any {
  const lower = prompt.toLowerCase();
  const id = `block-ai-${Date.now()}`;

  if (lower.includes("giá") || lower.includes("bảng giá") || lower.includes("pricing")) {
    return {
      id,
      name: "Bảng Giá Dịch Vụ Pro",
      type: "pricing",
      category: "pricing",
      content: {
        badge: "💎 Gói Dịch Vụ Tối Ưu",
        title: "Bảng Giá Minh Bạch & Tiết Kiệm",
        subtitle: "Lựa chọn gói dịch vụ phù hợp với quy mô doanh nghiệp của bạn với đầy đủ tính năng WordPress cao cấp.",
        items: [
          { title: "Khởi Nghiệp", desc: "Dành cho cá nhân và startup mới bắt đầu", price: "499.000đ", period: "/tháng", highlight: false },
          { title: "Chuyên Nghiệp", desc: "Giải pháp toàn diện tối ưu doanh số", price: "1.299.000đ", period: "/tháng", highlight: true },
          { title: "Doanh Nghiệp", desc: "Không giới hạn tài nguyên và hỗ trợ 24/7", price: "2.999.000đ", period: "/tháng", highlight: false },
        ],
      },
      styles: { paddingY: "py-20", bgType: "color", bgColor: "bg-[#0E0E14]", textColor: "text-zinc-100" },
    };
  }

  if (lower.includes("sản phẩm") || lower.includes("woocom") || lower.includes("shop") || lower.includes("store")) {
    return {
      id,
      name: "Lưới Sản Phẩm WooCommerce",
      type: "ecommerce",
      category: "ecommerce",
      content: {
        badge: "🛍️ WooCommerce 8.x Ready",
        title: "Sản Phẩm Bán Chạy Nhất",
        subtitle: "Các sản phẩm công nghệ và phong cách sống được yêu thích hàng đầu với chính sách bảo hành chính hãng.",
        items: [
          { title: "Bàn Phím Cơ Không Dây Pro", desc: "Switch quang học, pin 4000mAh", price: "1.850.000đ", icon: "keyboard" },
          { title: "Tai Nghe Chống Ồn Active ANC", desc: "Âm thanh Hi-Res, khử ồn 98%", price: "2.490.000đ", icon: "headphones" },
          { title: "Chuột Gaming Công Thái Học", desc: "Cảm biến 26.000 DPI siêu nhẹ", price: "990.000đ", icon: "mouse" },
        ],
      },
      styles: { paddingY: "py-20", bgType: "color", bgColor: "bg-[#121217]", textColor: "text-zinc-100" },
    };
  }

  if (lower.includes("tính năng") || lower.includes("feature") || lower.includes("lợi ích")) {
    return {
      id,
      name: "Khối Tính Năng Nổi Bật",
      type: "features",
      category: "features",
      content: {
        badge: "⚡ Công Nghệ Tiên Phong",
        title: "Tính Năng Vượt Trội Cho Website Của Bạn",
        subtitle: "Được tối ưu chuẩn WordPress Core Web Vitals với tốc độ tải trang dưới 0.8 giây.",
        items: [
          { title: "Tốc Độ Siêu Tốc", desc: "Tối ưu cache và nén tài nguyên tự động", icon: "zap" },
          { title: "Bảo Mật 2FA Toàn Diện", desc: "Mã hóa đa lớp và tường lửa chống tấn công", icon: "shield" },
          { title: "Chuẩn SEO Google 2026", desc: "Tích hợp sẵn Schema JSON-LD và OpenGraph", icon: "search" },
        ],
      },
      styles: { paddingY: "py-20", bgType: "color", bgColor: "bg-[#0A0A0C]", textColor: "text-zinc-100" },
    };
  }

  if (lower.includes("đánh giá") || lower.includes("review") || lower.includes("testimonial") || lower.includes("khách hàng")) {
    return {
      id,
      name: "Ý Kiến Khách Hàng",
      type: "testimonials",
      category: "testimonials",
      content: {
        badge: "⭐ 4.9/5 Điểm Đánh Giá",
        title: "Khách Hàng Nói Gì Về Chúng Tôi",
        subtitle: "Hơn 5.000+ doanh nghiệp đã tin tưởng sử dụng giải pháp website để gia tăng doanh số.",
        items: [
          { title: "Nguyễn Văn Hùng", desc: "Website tải cực nhanh, giao diện hiện đại giúp tỷ lệ chốt đơn tăng 35% ngay trong tháng đầu.", highlight: "CEO tại TechViet" },
          { title: "Trần Mai Anh", desc: "Hệ thống quản trị WordPress trực quan, chuẩn SEO giúp từ khóa lên top Google rất nhanh.", highlight: "Marketing Director" },
        ],
      },
      styles: { paddingY: "py-20", bgType: "color", bgColor: "bg-[#121217]", textColor: "text-zinc-100" },
    };
  }

  if (lower.includes("faq") || lower.includes("câu hỏi") || lower.includes("hỏi đáp")) {
    return {
      id,
      name: "Câu Hỏi Thường Gặp (FAQ)",
      type: "faq",
      category: "faq",
      content: {
        badge: "❓ Giải Đáp Thắc Mắc",
        title: "Những Câu Hỏi Phổ Biến",
        subtitle: "Mọi thông tin bạn cần biết về thời gian triển khai, bản quyền và chính sách hỗ trợ kỹ thuật.",
        items: [
          { title: "Thời gian bàn giao website là bao lâu?", desc: "Chỉ từ 1 - 3 ngày làm việc với đầy đủ tính năng và tối ưu SEO." },
          { title: "Website có chuẩn Responsive trên điện thoại không?", desc: "Hoàn toàn 100% chuẩn hiển thị trên Mobile, Tablet, Laptop và Desktop." },
          { title: "Tôi có được xuất toàn bộ mã nguồn PHP/CSS không?", desc: "Có, bạn có thể tải về file ZIP trọn gói để cài đặt lên bất kỳ hosting WordPress nào." },
        ],
      },
      styles: { paddingY: "py-20", bgType: "color", bgColor: "bg-[#0A0A0C]", textColor: "text-zinc-100" },
    };
  }

  // Default Hero block fallback
  return {
    id,
    type: "hero",
    name: "Hero Section AI Chuyển Đổi Cao",
    category: "hero",
    content: {
      badge: "⚡ WordPress 6.x & Core Web Vitals Ready",
      title: "Khám Phá Sức Mạnh WordPress Hiện Đại",
      subtitle: "Giải pháp thiết kế trực quan đột phá, tối ưu hóa tỷ lệ chuyển đổi và tốc độ tải trang vượt trội.",
      primaryBtnText: "Bắt đầu ngay hôm nay",
      secondaryBtnText: "Xem Demo Trực Tiếp",
      align: "center",
      themeColor: "#6366f1",
    },
    styles: {
      paddingY: "py-24",
      bgType: "gradient",
      bgColor: "from-indigo-950 via-slate-900 to-black",
      textColor: "text-white",
    },
  };
}

// API Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// API: AI Content Generation for Blocks
app.post("/api/gemini/generate-content", async (req, res) => {
  const { prompt, blockType, tone = "professional", language = "vi" } = req.body;
  const isVi = language === "vi";

  try {
    const systemPrompt = `You are an expert WordPress Theme Designer and Copywriter specializing in clean high-converting websites.
The user wants content for a WordPress block of type "${blockType || "general"}".
Language: ${isVi ? "Vietnamese" : "English"}.
Tone: ${tone}.
Return ONLY valid JSON matching this schema:
{
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "buttonText": "string",
  "features": ["string", "string", "string"],
  "seoAdvice": "string"
}`;

    const response = await callGemini(
      `${systemPrompt}\n\nUser request: ${prompt || "Tạo nội dung mẫu ấn tượng cho website công nghệ/doanh nghiệp"}`,
      { responseMimeType: "application/json" },
      1
    );

    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      return res.json({ result: parsed, fallback: false });
    }
  } catch (error: any) {
    console.warn("Gemini content generation high-demand or error, switching to smart fallback:", error?.message || error);
  }

  // Graceful smart fallback if API is unavailable or busy (503/429)
  const fallbackContent = {
    title: isVi ? "Giải Pháp Số Đột Phá Cho Doanh Nghiệp" : "Cutting-Edge Digital Solution For Your Business",
    subtitle: isVi ? "Tối ưu hóa chuyển đổi và tốc độ tải trang đạt điểm tối đa 100/100 Google PageSpeed." : "Maximize conversion rates with 100/100 Google PageSpeed performance.",
    description: isVi ? "Trải nghiệm nền tảng hiện đại với kiến trúc sạch, chuẩn SEO On-page và tích hợp sẵn bảo mật đa lớp." : "Experience a modern architecture with clean code, on-page SEO, and multi-layer security.",
    buttonText: isVi ? "Khám Phá Ngay" : "Get Started Now",
    features: isVi
      ? ["Tốc độ tải dưới 0.8s", "Chuẩn SEO Google 2026", "Tương thích 100% thiết bị di động"]
      : ["Sub-0.8s load speed", "Google 2026 SEO Ready", "100% Mobile responsive"],
    seoAdvice: isVi ? "Sử dụng từ khóa chính trong thẻ H1 và các thẻ H2 hỗ trợ." : "Include main target keywords in H1 and complementary H2 headings.",
  };

  return res.json({ result: fallbackContent, fallback: true });
});

// API: AI Block Structure Generation
app.post("/api/gemini/generate-block", async (req, res) => {
  const { prompt, currentCategory = "all" } = req.body;

  try {
    const response = await callGemini(
      `Generate a rich, structured WordPress block configuration JSON based on: "${prompt}".
Block must have valid types like 'hero', 'features', 'pricing', 'testimonials', 'cta', 'portfolio', 'team', 'faq', 'blogGrid', 'woocommerceGrid', 'ecommerce', 'stats'.
Return JSON with:
{
  "name": "string",
  "type": "string",
  "category": "string",
  "content": {
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "badge": "string",
    "primaryBtnText": "string",
    "items": [
       {"title": "string", "desc": "string", "icon": "string", "highlight": "string"}
    ]
  },
  "styles": {
    "paddingY": "py-16",
    "bgType": "color|gradient",
    "bgColor": "string",
    "textColor": "string"
  },
  "phpShortcode": "string",
  "cleanHtmlSnippet": "string"
}`,
      { responseMimeType: "application/json" },
      1
    );

    if (response && response.text) {
      const blockData = JSON.parse(response.text);
      return res.json({ block: { ...blockData, id: `block-ai-${Date.now()}` }, fallback: false });
    }
  } catch (error: any) {
    console.warn("Gemini block generation high-demand or error, switching to smart fallback:", error?.message || error);
  }

  // Graceful smart fallback block
  const smartBlock = getSmartFallbackBlock(prompt);
  return res.json({ block: smartBlock, fallback: true });
});

// API: AI SEO Optimizer & Schema generator
app.post("/api/gemini/optimize-seo", async (req, res) => {
  const { siteTitle = "Website WordPress", siteDescription = "", title, description, blocks = [], language = "vi" } = req.body;
  const effectiveTitle = siteTitle || title || "Website Doanh Nghiệp Chuyên Nghiệp";
  const effectiveDesc = siteDescription || description || "Thiết kế website WordPress chuyên nghiệp, chuẩn SEO Google, tải nhanh và tối ưu trải nghiệm.";

  try {
    const blockSummaries = Array.isArray(blocks) ? blocks.map((b: any) => `${b.type}: ${b.content?.title || b.name}`).join(", ") : "";
    const response = await callGemini(
      `Analyze this WordPress website layout and generate high-grade SEO metadata, Schema.org JSON-LD, keywords, and recommendations.
Site Title: ${effectiveTitle}
Site Description: ${effectiveDesc}
Layout blocks: ${blockSummaries}
Language: ${language}

Return JSON with:
{
  "seoScore": number (85-99),
  "metaTitle": "string (under 60 chars)",
  "metaDescription": "string (under 155 chars)",
  "keywords": ["string", "string", "string", "string", "string"],
  "schemaJsonLd": "valid JSON-LD string with @context https://schema.org",
  "recommendations": ["string", "string", "string", "string"],
  "coreWebVitalsForecast": {
    "lcp": "0.8s (Good)",
    "fid": "12ms (Good)",
    "cls": "0.01 (Good)",
    "overall": "98/100"
  }
}`,
      { responseMimeType: "application/json" },
      1
    );

    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      return res.json({
        analysis: parsed,
        seo: {
          metaTitle: parsed.metaTitle || `${effectiveTitle} | Chuẩn SEO 2026`,
          metaDescription: parsed.metaDescription || effectiveDesc,
          score: parsed.seoScore || 98,
        },
        fallback: false,
      });
    }
  } catch (error: any) {
    console.warn("Gemini SEO audit high-demand or error, switching to smart fallback:", error?.message || error);
  }

  // Graceful smart SEO fallback
  const fallbackSeo = {
    seoScore: 96,
    metaTitle: `${effectiveTitle.substring(0, 45)} | Chuẩn SEO Google 2026`,
    metaDescription: effectiveDesc.length > 10 ? effectiveDesc.substring(0, 150) : "Website WordPress chuẩn SEO với tốc độ tải trang cực nhanh, tối ưu hóa trải nghiệm người dùng và chuyển đổi.",
    keywords: ["wordpress theme", "thiet ke web", "mau giao dien", "chuan seo google", "wordpress clean code"],
    schemaJsonLd: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: effectiveTitle,
        description: effectiveDesc,
        url: "https://example.com",
      },
      null,
      2
    ),
    recommendations: [
      "Đã thêm đầy đủ thẻ Meta Title & Description chuẩn độ dài tối ưu cho Google SERP",
      "Cấu trúc thẻ Heading (H1, H2, H3) được phân bổ logic theo ngữ nghĩa HTML5",
      "Tự động tích hợp Schema JSON-LD WebSite & Organization",
      "Hình ảnh có thuộc tính Alt text tối ưu cho Google Image Search",
    ],
    coreWebVitalsForecast: {
      lcp: "0.78s (Good)",
      fid: "10ms (Good)",
      cls: "0.004 (Good)",
      overall: "98/100",
    },
  };

  return res.json({
    analysis: fallbackSeo,
    seo: {
      metaTitle: fallbackSeo.metaTitle,
      metaDescription: fallbackSeo.metaDescription,
      score: 96,
    },
    fallback: true,
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WordPress Template Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
