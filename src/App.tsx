import React, { useState, useEffect, useCallback } from "react";
import { HeaderNav } from "./components/HeaderNav";
import { BlockPalette } from "./components/BlockPalette";
import { CanvasEditor } from "./components/CanvasEditor";
import { InspectorPanel } from "./components/InspectorPanel";
import { TemplateLibraryModal } from "./components/TemplateLibraryModal";
import { ExportCodeModal } from "./components/ExportCodeModal";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { MediaLibraryModal } from "./components/MediaLibraryModal";
import { Security2FAModal } from "./components/Security2FAModal";
import { HistoryRevisionModal } from "./components/HistoryRevisionModal";
import { CommunityShareModal } from "./components/CommunityShareModal";
import { VoiceSearchModal } from "./components/VoiceSearchModal";
import {
  DeviceType,
  LanguageCode,
  RevisionSnapshot,
  SecurityConfig,
  SEOConfig,
  ThemeConfig,
  WPBlock,
  WPTemplate,
} from "./types";
import { defaultTemplates } from "./data/defaultTemplates";
import { defaultBlockTemplates } from "./data/blockLibrary";

export function App() {
  // Default to the first template (SaaS Modern)
  const initialTemplate = defaultTemplates[0];

  const [blocks, setBlocks] = useState<WPBlock[]>(initialTemplate.blocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    initialTemplate.blocks[0]?.id || null
  );
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [lang, setLang] = useState<LanguageCode>("vi");

  // Theme & SEO & Security State
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    themeName: "WP Studio Ultra 2026",
    themeSlug: "wp-studio-ultra",
    author: "WP Template Studio Core Team",
    authorUri: "https://wptemplatestudio.dev",
    description: "Modern WordPress 6.x Full Site Editing (FSE) & WooCommerce Clean Theme",
    version: "2.4.0",
    primaryColor: "#2563eb",
    secondaryColor: "#4f46e5",
    accentColor: "#10b981",
    fontHeading: "Plus Jakarta Sans",
    fontBody: "Inter",
    containerWidth: "1280px",
  });

  const [seoConfig, setSeoConfig] = useState<SEOConfig>({
    metaTitle: "WP Studio - Trình Tạo Theme WordPress Đột Phá 2026",
    metaDescription:
      "Thiết kế giao diện WordPress kéo thả trực quan, xuất mã nguồn sạch 100%, tích hợp WooCommerce và tối ưu SEO On-page.",
    keywords: ["wordpress theme builder", "keo tha wordpress", "fse theme", "woocommerce"],
    canonicalUrl: "https://wptemplatestudio.dev",
    ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    schemaType: "WebSite",
    score: 95,
  });

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    twoFactorEnabled: true,
    e2eeSignature: "SHA256:d8a2f1b4c9e785023fa1c94b7e8d021f45a6b8c9e01f2a3b4c5d6e7f8a9b0c1d",
    lastBackupTimestamp: new Date().toLocaleTimeString(),
  });

  // Undo / Redo History
  const [historyStack, setHistoryStack] = useState<WPBlock[][]>([initialTemplate.blocks]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Cloud snapshots & revisions
  const [revisions, setRevisions] = useState<RevisionSnapshot[]>([
    {
      id: "rev-init",
      timestamp: new Date().toLocaleTimeString(),
      blockCount: initialTemplate.blocks.length,
      title: "Bản sao lưu ban đầu (SaaS Theme)",
      autoSaved: true,
      blocks: initialTemplate.blocks,
    },
  ]);

  // Modals state
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false);
  const [isExportCodeOpen, setIsExportCodeOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isAuditingSeo, setIsAuditingSeo] = useState(false);

  // Update block helper with history stack
  const updateBlocksWithHistory = useCallback((newBlocks: WPBlock[]) => {
    setBlocks(newBlocks);
    setHistoryStack((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newBlocks];
    });
    setHistoryIndex((prev) => prev + 1);

    // Auto-save snapshot every few changes
    if (Math.random() > 0.6) {
      setRevisions((prev) => [
        {
          id: `rev-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          blockCount: newBlocks.length,
          title: `Tự động lưu (${newBlocks.length} khối)`,
          autoSaved: true,
          blocks: newBlocks,
        },
        ...prev.slice(0, 15),
      ]);
    }
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setBlocks(historyStack[nextIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setBlocks(historyStack[nextIndex]);
    }
  };

  // Block manipulations
  const handleAddBlock = (block: WPBlock) => {
    const updated = [...blocks, block];
    updateBlocksWithHistory(updated);
    setSelectedBlockId(block.id);
  };

  const handleInsertBlockAt = (index: number) => {
    // Insert a recommended block or open palette
    const defaultBlock = defaultBlockTemplates[0]; // Hero or Feature
    const newBlock: WPBlock = {
      ...defaultBlock,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    const updated = [...blocks];
    updated.splice(index, 0, newBlock);
    updateBlocksWithHistory(updated);
    setSelectedBlockId(newBlock.id);
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const updated = [...blocks];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      updateBlocksWithHistory(updated);
    } else if (direction === "down" && index < blocks.length - 1) {
      const updated = [...blocks];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      updateBlocksWithHistory(updated);
    }
  };

  const handleDuplicateBlock = (index: number) => {
    const target = blocks[index];
    if (!target) return;
    const duplicated: WPBlock = {
      ...target,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${target.name} (Bản sao)`,
    };
    const updated = [...blocks];
    updated.splice(index + 1, 0, duplicated);
    updateBlocksWithHistory(updated);
    setSelectedBlockId(duplicated.id);
  };

  const handleDeleteBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    updateBlocksWithHistory(updated);
    if (selectedBlockId === id) {
      setSelectedBlockId(updated[0]?.id || null);
    }
  };

  const handleUpdateBlock = (updated: WPBlock) => {
    const newBlocks = blocks.map((b) => (b.id === updated.id ? updated : b));
    updateBlocksWithHistory(newBlocks);
  };

  // AI Rewrite single block
  const handleAiRewriteBlock = async (block: WPBlock) => {
    try {
      const res = await fetch("/api/gemini/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Viết lại nội dung hấp dẫn và chuyển đổi cao hơn cho khối: ${block.name}`,
          blockType: block.type,
          language: lang,
        }),
      });
      const data = await res.json();
      if (data.result) {
        const updated: WPBlock = {
          ...block,
          content: {
            ...block.content,
            title: data.result.title || block.content.title,
            subtitle: data.result.subtitle || block.content.subtitle,
            badge: data.result.badge || block.content.badge,
          },
        };
        handleUpdateBlock(updated);
      }
    } catch (err) {
      console.warn("AI rewrite fallback:", err);
    }
  };

  // Run AI SEO Audit
  const handleRunAiSeoAudit = async () => {
    setIsAuditingSeo(true);
    try {
      const res = await fetch("/api/gemini/optimize-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: seoConfig.metaTitle,
          description: seoConfig.metaDescription,
          siteType: "WordPress FSE & WooCommerce",
        }),
      });
      const data = await res.json();
      if (data.seo) {
        setSeoConfig((prev) => ({
          ...prev,
          metaTitle: data.seo.metaTitle || prev.metaTitle,
          metaDescription: data.seo.metaDescription || prev.metaDescription,
          score: 98,
        }));
      }
    } catch (err) {
      console.warn("SEO audit error:", err);
    } finally {
      setIsAuditingSeo(false);
    }
  };

  // Voice Command Handler
  const handleExecuteVoiceCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if (lower.includes("woocom") || lower.includes("sản phẩm")) {
      const wooBlock = defaultBlockTemplates.find((b) => b.type === "ecommerce");
      if (wooBlock) handleAddBlock(wooBlock);
    } else if (lower.includes("seo")) {
      handleRunAiSeoAudit();
    } else if (lower.includes("mẫu") || lower.includes("template")) {
      setIsTemplateLibraryOpen(true);
    } else if (lower.includes("xuất") || lower.includes("zip") || lower.includes("code")) {
      setIsExportCodeOpen(true);
    }
  };

  // Currently selected block object
  const currentSelectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0A0A0C] text-zinc-100 antialiased overflow-hidden font-sans">
      {/* Top Main Navigation Header */}
      <HeaderNav
        device={device}
        setDevice={setDevice}
        onDeviceChange={setDevice}
        lang={lang}
        setLang={setLang}
        onLanguageChange={setLang}
        onOpenTemplates={() => setIsTemplateLibraryOpen(true)}
        onOpenExport={() => setIsExportCodeOpen(true)}
        onOpenAi={() => setIsAiAssistantOpen(true)}
        onOpenSecurity={() => setIsSecurityModalOpen(true)}
        onOpen2FA={() => setIsSecurityModalOpen(true)}
        onOpenMedia={() => setIsMediaLibraryOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenCommunity={() => setIsCommunityModalOpen(true)}
        onOpenVoice={() => setIsVoiceSearchOpen(true)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < historyStack.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        twoFactorEnabled={securityConfig.twoFactorEnabled}
        siteTitle={themeConfig.themeName}
      />

      {/* Main 3-Column Studio Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Block Library Palette */}
        <BlockPalette
          lang={lang}
          onAddBlock={handleAddBlock}
          onOpenAi={() => setIsAiAssistantOpen(true)}
        />

        {/* Center Column: Interactive Visual Canvas */}
        <CanvasEditor
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onInsertBlockAt={handleInsertBlockAt}
          onAiRewriteBlock={handleAiRewriteBlock}
          device={device}
          lang={lang}
          themeConfig={themeConfig}
        />

        {/* Right Column: Inspector Panel */}
        <InspectorPanel
          selectedBlock={currentSelectedBlock}
          onUpdateBlock={handleUpdateBlock}
          themeConfig={themeConfig}
          onUpdateThemeConfig={setThemeConfig}
          seoConfig={seoConfig}
          onUpdateSeoConfig={setSeoConfig}
          lang={lang}
          onRunAiSeoAudit={handleRunAiSeoAudit}
          isAuditingSeo={isAuditingSeo}
        />
      </div>

      {/* Modals */}
      <TemplateLibraryModal
        isOpen={isTemplateLibraryOpen}
        onClose={() => setIsTemplateLibraryOpen(false)}
        onSelectTemplate={(tpl) => {
          setBlocks(tpl.blocks);
          updateBlocksWithHistory(tpl.blocks);
          setSelectedBlockId(tpl.blocks[0]?.id || null);
          setThemeConfig((prev) => ({
            ...prev,
            themeName: tpl.title,
            themeSlug: tpl.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          }));
        }}
        lang={lang}
      />

      <ExportCodeModal
        isOpen={isExportCodeOpen}
        onClose={() => setIsExportCodeOpen(false)}
        blocks={blocks}
        themeConfig={themeConfig}
        seoConfig={seoConfig}
        lang={lang}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onInsertGeneratedBlock={handleAddBlock}
        lang={lang}
        siteTitle={themeConfig.themeName}
      />

      <MediaLibraryModal
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
      />

      <Security2FAModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        securityConfig={securityConfig}
        onUpdateSecurity={setSecurityConfig}
      />

      <HistoryRevisionModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        revisions={revisions}
        onRestoreRevision={(rev) => {
          setBlocks(rev.blocks);
          updateBlocksWithHistory(rev.blocks);
          setSelectedBlockId(rev.blocks[0]?.id || null);
        }}
      />

      <CommunityShareModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        themeConfig={themeConfig}
      />

      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        onExecuteCommand={handleExecuteVoiceCommand}
      />
    </div>
  );
}

export default App;
