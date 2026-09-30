export type DeviceType = "desktop" | "laptop" | "tablet" | "mobile" | "ultrawide";

export type LanguageCode = "vi" | "en" | "ja" | "fr";

export type ThemeMode = "light" | "dark" | "system";

export type BlockCategory =
  | "all"
  | "header"
  | "hero"
  | "features"
  | "ecommerce"
  | "content"
  | "testimonials"
  | "pricing"
  | "cta"
  | "faq"
  | "stats"
  | "team"
  | "contact"
  | "footer"
  | "custom";

export interface BlockItemContent {
  title?: string;
  desc?: string;
  icon?: string;
  image?: string;
  price?: string;
  period?: string;
  rating?: number;
  highlight?: boolean;
  tag?: string;
  linkText?: string;
  linkUrl?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
}

export interface WPBlockContent {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnUrl?: string;
  secondaryBtnText?: string;
  secondaryBtnUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  align?: "left" | "center" | "right";
  columns?: number;
  items?: BlockItemContent[];
  rawHtml?: string;
  rawPhp?: string;
  shortcode?: string;
  formAction?: string;
  newsletterPlaceholder?: string;
  copyrightText?: string;
}

export interface WPBlockStyles {
  paddingTop?: string;
  paddingBottom?: string;
  bgColor?: string;
  bgGradient?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: string;
  shadow?: string;
  fontFamily?: string;
  customClasses?: string;
  hideOnMobile?: boolean;
}

export interface WPBlock {
  id: string;
  name: string;
  type: BlockCategory;
  category: BlockCategory;
  description?: string;
  content: WPBlockContent;
  styles: WPBlockStyles;
  isLocked?: boolean;
  phpTemplate?: string;
}

export interface WPTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  blocks: WPBlock[];
  createdAt: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  schemaType: "WebSite" | "Organization" | "Article" | "Product" | "LocalBusiness";
  author: string;
  robotsIndex: boolean;
  score: number;
}

export interface ThemeConfig {
  themeName: string;
  themeSlug: string;
  author: string;
  authorUri: string;
  version: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  containerWidth: "1140px" | "1280px" | "1440px" | "full";
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
}

export interface SecurityConfig {
  twoFactorEnabled: boolean;
  encryptionKeySet: boolean;
  lastBackupDate: string;
  role: "admin" | "editor" | "developer";
  e2eeSignature: string;
  loginAttempts: number;
  trustedDevices: string[];
}

export interface RevisionSnapshot {
  id: string;
  timestamp: string;
  title: string;
  blockCount: number;
  blocks: WPBlock[];
  themeConfig: ThemeConfig;
  seoConfig: SEOConfig;
  autoSaved?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: "hero" | "product" | "avatar" | "illustration" | "icon";
  size: string;
  dimensions: string;
  altText: string;
}

export interface AnalyticsReport {
  scoreLCP: string;
  scoreFID: string;
  scoreCLS: string;
  domNodes: number;
  cssSizeKb: number;
  seoAuditScore: number;
  a11yScore: number;
  estimatedLoadTime: string;
  mobileFriendlyScore: number;
}
