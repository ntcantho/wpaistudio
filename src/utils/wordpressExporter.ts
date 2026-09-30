import JSZip from "jszip";
import { SEOConfig, ThemeConfig, WPBlock } from "../types";

export function generateStyleCss(themeConfig: ThemeConfig, blocks: WPBlock[]): string {
  return `/*
Theme Name: ${themeConfig.themeName || "WP Studio Pro Theme"}
Theme URI: ${themeConfig.authorUri || "https://example.com/wp-theme"}
Author: ${themeConfig.author || "WordPress Template Studio"}
Author URI: ${themeConfig.authorUri || "https://example.com"}
Description: ${themeConfig.description || "Clean, high-performance WordPress theme created with WordPress Template Studio."}
Version: ${themeConfig.version || "1.0.0"}
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${themeConfig.themeSlug || "wp-studio-theme"}
Tags: block-patterns, custom-colors, custom-menu, e-commerce, grid-layout, one-column, translation-ready

Generated with WordPress Template Studio (Clean Code Architecture)
*/

:root {
  --wp-primary-color: ${themeConfig.primaryColor || "#2563eb"};
  --wp-secondary-color: ${themeConfig.secondaryColor || "#1e293b"};
  --wp-accent-color: ${themeConfig.accentColor || "#38bdf8"};
  --wp-font-heading: '${themeConfig.fontHeading || "Plus Jakarta Sans"}', sans-serif;
  --wp-font-body: '${themeConfig.fontBody || "Inter"}', sans-serif;
  --wp-container-max: ${themeConfig.containerWidth === "full" ? "100%" : themeConfig.containerWidth};
}

/* Reset & Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--wp-font-body);
  color: #f8fafc;
  background-color: #020617;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--wp-font-heading);
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
}

.wp-container {
  width: 100%;
  max-width: var(--wp-container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Section Components */
.wp-section-header {
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
}

.wp-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: var(--wp-primary-color);
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.wp-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.wp-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.wp-btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.wp-card {
  background-color: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.wp-card:hover {
  transform: translateY(-4px);
  border-color: var(--wp-primary-color);
}
`;
}

export function generateFunctionsPhp(themeConfig: ThemeConfig): string {
  return `<?php
/**
 * ${themeConfig.themeName || "WP Studio Theme"} functions and definitions
 *
 * @package ${themeConfig.themeSlug || "wp_studio_theme"}
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'wp_template_studio_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function wp_template_studio_setup() {
		// Make theme available for translation.
		load_theme_textdomain( '${themeConfig.themeSlug || "wp-studio-theme"}', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register Navigation Menus.
		register_nav_menus(
			array(
				'primary-menu' => esc_html__( 'Primary Navigation Menu', '${themeConfig.themeSlug || "wp-studio-theme"}' ),
				'footer-menu'  => esc_html__( 'Footer Navigation Menu', '${themeConfig.themeSlug || "wp-studio-theme"}' ),
			)
		);

		// Switch default core markup for search form, comment form, and comments to output valid HTML5.
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Support Gutenberg align wide
		add_theme_support( 'align-wide' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );

		// WooCommerce Support
		add_theme_support( 'woocommerce' );
		add_theme_support( 'wc-product-gallery-zoom' );
		add_theme_support( 'wc-product-gallery-lightbox' );
		add_theme_support( 'wc-product-gallery-slider' );
	}
endif;
add_action( 'after_setup_theme', 'wp_template_studio_setup' );

/**
 * Enqueue scripts and styles.
 */
function wp_template_studio_scripts() {
	wp_enqueue_style( 'wp-studio-style', get_stylesheet_uri(), array(), '${themeConfig.version || "1.0.0"}' );
	wp_enqueue_style( 'wp-studio-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap', array(), null );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'wp_template_studio_scripts' );

/**
 * Custom template tags & helpers
 */
function wp_studio_render_custom_hook( $hook_name = 'default' ) {
	do_action( 'wp_studio_' . sanitize_key( $hook_name ) );
}
`;
}

export function generateHeaderPhp(themeConfig: ThemeConfig, seoConfig: SEOConfig, headerBlock?: WPBlock): string {
  const brandTitle = headerBlock?.content?.title || themeConfig.themeName || "WP Studio";
  const btnText = headerBlock?.content?.primaryBtnText || "Liên Hệ";
  const btnUrl = headerBlock?.content?.primaryBtnUrl || "#contact";

  return `<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	
	<!-- SEO & OpenGraph Meta Tags -->
	<meta name="description" content="<?php echo esc_attr( '${seoConfig.metaDescription || "Modern WordPress Theme"}' ); ?>">
	<meta property="og:title" content="<?php echo esc_attr( '${seoConfig.metaTitle || brandTitle}' ); ?>">
	<meta property="og:description" content="<?php echo esc_attr( '${seoConfig.metaDescription || ""}' ); ?>">
	<meta property="og:type" content="website">

	<?php wp_head(); ?>
</head>

<body <?php body_class( 'antialiased bg-slate-950 text-slate-100' ); ?>>
<?php wp_body_open(); ?>

<header id="site-header" class="wp-section-header w-full border-b border-slate-800/80 sticky top-0 z-50">
	<div class="wp-container flex items-center justify-between py-4">
		<!-- Site Branding -->
		<div class="site-branding flex items-center gap-3">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
					<span class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">WP</span>
					<?php echo esc_html( '${brandTitle}' ); ?>
				</a>
			<?php endif; ?>
		</div>

		<!-- Main Navigation Menu -->
		<nav id="site-navigation" class="main-navigation hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
			<?php
			if ( has_nav_menu( 'primary-menu' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'primary-menu',
						'menu_id'        => 'primary-menu',
						'container'      => false,
						'menu_class'     => 'flex items-center gap-6',
						'fallback_cb'    => false,
					)
				);
			} else {
				?>
				<a href="#home" class="hover:text-blue-400 transition-colors">Trang Chủ</a>
				<a href="#features" class="hover:text-blue-400 transition-colors">Tính Năng</a>
				<a href="#pricing" class="hover:text-blue-400 transition-colors">Bảng Giá</a>
				<a href="#blog" class="hover:text-blue-400 transition-colors">Tin Tức</a>
				<?php
			}
			?>
		</nav>

		<!-- Header CTA Button -->
		<div class="header-action flex items-center gap-4">
			<a href="<?php echo esc_url( '${btnUrl}' ); ?>" class="wp-btn-primary text-sm">
				<?php echo esc_html( '${btnText}' ); ?>
			</a>
		</div>
	</div>
</header>

<main id="primary" class="site-main">
`;
}

export function generateFooterPhp(themeConfig: ThemeConfig, footerBlock?: WPBlock): string {
  const brandTitle = footerBlock?.content?.title || themeConfig.themeName || "WP Studio";
  const desc = footerBlock?.content?.description || "Modern WordPress Template designed for performance and clean architecture.";
  const copyright = footerBlock?.content?.copyrightText || `© ${new Date().getFullYear()} ${themeConfig.themeName}. All rights reserved.`;

  return `</main><!-- #primary -->

<footer id="colophon" class="site-footer bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
	<div class="wp-container grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
		<div class="md:col-span-2">
			<h3 class="text-lg font-bold text-white mb-3"><?php echo esc_html( '${brandTitle}' ); ?></h3>
			<p class="max-w-md text-slate-400 leading-relaxed mb-4"><?php echo esc_html( '${desc}' ); ?></p>
		</div>
		<div>
			<h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Liên Kết Nhanh</h4>
			<ul class="space-y-2">
				<li><a href="#about" class="hover:text-blue-400 transition-colors">Giới Thiệu</a></li>
				<li><a href="#features" class="hover:text-blue-400 transition-colors">Tính Năng</a></li>
				<li><a href="#pricing" class="hover:text-blue-400 transition-colors">Bảng Giá Dịch Vụ</a></li>
				<li><a href="#contact" class="hover:text-blue-400 transition-colors">Liên Hệ Hỗ Trợ</a></li>
			</ul>
		</div>
		<div>
			<h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Bản Tin</h4>
			<p class="text-xs text-slate-400 mb-3">Đăng ký nhận thông tin cập nhật theme mới nhất.</p>
			<form class="flex gap-2">
				<input type="email" placeholder="Email của bạn..." class="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500" required />
				<button type="submit" class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">Gửi</button>
			</form>
		</div>
	</div>

	<div class="wp-container border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
		<p><?php echo esc_html( '${copyright}' ); ?></p>
		<p class="mt-2 md:mt-0">Powered by WordPress & WP Template Studio</p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`;
}

export function generateFrontPagePhp(blocks: WPBlock[]): string {
  let contentPhp = `<?php
/**
 * The template for displaying the front page
 *
 * @package WordPress
 */

get_header();
?>

`;

  blocks.forEach((block, index) => {
    if (block.type === "header" || block.type === "footer") return;

    contentPhp += `<!-- Block ${index + 1}: ${block.name} (${block.type}) -->
<section id="section-${block.id}" class="wp-block-section ${block.styles.paddingTop || "py-16"} ${block.styles.bgColor || "bg-slate-900"} text-white">
	<div class="wp-container">
`;

    if (block.type === "hero") {
      contentPhp += `		<div class="max-w-4xl mx-auto text-center space-y-6">
			<?php if ( ! empty( '${block.content.badge || ""}' ) ) : ?>
				<span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
					<?php echo esc_html( '${block.content.badge || ""}' ); ?>
				</span>
			<?php endif; ?>

			<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
				<?php echo esc_html( '${block.content.title || "Headline"}' ); ?>
			</h1>

			<p class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
				<?php echo esc_html( '${block.content.subtitle || block.content.description || ""}' ); ?>
			</p>

			<div class="flex flex-wrap items-center justify-center gap-4 pt-4">
				<a href="<?php echo esc_url( '${block.content.primaryBtnUrl || "#"}' ); ?>" class="wp-btn-primary">
					<?php echo esc_html( '${block.content.primaryBtnText || "Bắt Đầu"}' ); ?>
				</a>
				<?php if ( ! empty( '${block.content.secondaryBtnText || ""}' ) ) : ?>
					<a href="<?php echo esc_url( '${block.content.secondaryBtnUrl || "#"}' ); ?>" class="wp-btn-secondary">
						<?php echo esc_html( '${block.content.secondaryBtnText || ""}' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
`;
    } else if (block.type === "features") {
      contentPhp += `		<div class="text-center max-w-2xl mx-auto mb-16">
			<h2 class="text-3xl font-bold text-white mb-4"><?php echo esc_html( '${block.content.title || "Tính Năng Nổi Bật"}' ); ?></h2>
			<p class="text-slate-400"><?php echo esc_html( '${block.content.subtitle || ""}' ); ?></p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
`;
      (block.content.items || []).forEach((item) => {
        contentPhp += `			<div class="wp-card flex flex-col justify-between">
				<div>
					<div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 font-bold">✓</div>
					<h3 class="text-xl font-bold text-white mb-3">${item.title}</h3>
					<p class="text-slate-400 text-sm leading-relaxed">${item.desc}</p>
				</div>
			</div>
`;
      });
      contentPhp += `		</div>\n`;
    } else if (block.type === "pricing") {
      contentPhp += `		<div class="text-center max-w-2xl mx-auto mb-16">
			<h2 class="text-3xl font-bold text-white mb-4"><?php echo esc_html( '${block.content.title || "Bảng Giá Dịch Vụ"}' ); ?></h2>
			<p class="text-slate-400"><?php echo esc_html( '${block.content.subtitle || ""}' ); ?></p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
`;
      (block.content.items || []).forEach((item) => {
        contentPhp += `			<div class="wp-card ${item.highlight ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-slate-800/80" : ""} flex flex-col justify-between">
				<div>
					<span class="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 mb-4 inline-block">${item.tag || "Plan"}</span>
					<h3 class="text-2xl font-bold text-white mb-2">${item.title}</h3>
					<div class="text-3xl font-extrabold text-blue-400 mb-4">${item.price}<span class="text-sm font-normal text-slate-400">${item.period || "/tháng"}</span></div>
					<p class="text-slate-400 text-sm mb-6">${item.desc}</p>
				</div>
				<a href="#" class="wp-btn-primary w-full text-center mt-6">${item.linkText || "Chọn Gói"}</a>
			</div>
`;
      });
      contentPhp += `		</div>\n`;
    } else {
      contentPhp += `		<div class="text-center max-w-2xl mx-auto">
			<h2 class="text-3xl font-bold text-white mb-4"><?php echo esc_html( '${block.content.title || block.name}' ); ?></h2>
			<p class="text-slate-400"><?php echo esc_html( '${block.content.subtitle || block.content.description || ""}' ); ?></p>
		</div>
`;
    }

    contentPhp += `	</div>
</section>

`;
  });

  contentPhp += `<?php
get_footer();
`;

  return contentPhp;
}

export function generateSinglePhp(): string {
  return `<?php
/**
 * The template for displaying all single posts
 *
 * @package WordPress
 */

get_header();
?>

<div class="wp-container py-16">
	<div class="max-w-3xl mx-auto">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header mb-8 text-center">
					<h1 class="entry-title text-3xl sm:text-4xl font-extrabold text-white mb-4"><?php the_title(); ?></h1>
					<div class="entry-meta text-sm text-slate-400">
						<span><?php echo get_the_date(); ?></span> • <span>Tác giả: <?php the_author(); ?></span>
					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="post-thumbnail mb-8 rounded-2xl overflow-hidden shadow-xl">
						<?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-auto object-cover' ) ); ?>
					</div>
				<?php endif; ?>

				<div class="entry-content prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
					<?php the_content(); ?>
				</div>
			</article>

			<?php
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile;
		?>
	</div>
</div>

<?php
get_footer();
`;
}

export function generatePagePhp(): string {
  return `<?php
/**
 * The template for displaying all single pages
 *
 * @package WordPress
 */

get_header();
?>

<div class="wp-container py-16">
	<div class="max-w-4xl mx-auto">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header mb-8">
					<h1 class="entry-title text-3xl sm:text-4xl font-extrabold text-white mb-4"><?php the_title(); ?></h1>
				</header>

				<div class="entry-content text-slate-300 leading-relaxed space-y-6">
					<?php the_content(); ?>
				</div>
			</article>
			<?php
		endwhile;
		?>
	</div>
</div>

<?php
get_footer();
`;
}

export function generateThemeJson(themeConfig: ThemeConfig): string {
  return JSON.stringify(
    {
      $schema: "https://schemas.wp.org/trunk/theme.json",
      version: 3,
      settings: {
        color: {
          palette: [
            { slug: "primary", color: themeConfig.primaryColor || "#2563eb", name: "Primary" },
            { slug: "secondary", color: themeConfig.secondaryColor || "#1e293b", name: "Secondary" },
            { slug: "accent", color: themeConfig.accentColor || "#38bdf8", name: "Accent" },
            { slug: "dark", color: "#020617", name: "Dark Base" },
            { slug: "light", color: "#f8fafc", name: "Light Text" },
          ],
        },
        typography: {
          fontFamilies: [
            {
              fontFamily: themeConfig.fontHeading || "Plus Jakarta Sans",
              name: "Heading Font",
              slug: "heading",
            },
            {
              fontFamily: themeConfig.fontBody || "Inter",
              name: "Body Font",
              slug: "body",
            },
          ],
        },
        layout: {
          contentSize: "800px",
          wideSize: themeConfig.containerWidth === "full" ? "1440px" : themeConfig.containerWidth,
        },
      },
    },
    null,
    2
  );
}

export function generateGutenbergBlockJson(blocks: WPBlock[]): string {
  return JSON.stringify(
    {
      generator: "WordPress Template Studio",
      exportedAt: new Date().toISOString(),
      blockPatterns: blocks.map((b) => ({
        name: `wp-studio/${b.type}-${b.id}`,
        title: b.name,
        categories: [b.category],
        content: `<!-- wp:group {"className":"wp-studio-block-${b.type}"} -->\n<div class="wp-block-group ${b.styles.bgColor || ""}">\n  <h2>${b.content.title || ""}</h2>\n  <p>${b.content.subtitle || ""}</p>\n</div>\n<!-- /wp:group -->`,
      })),
    },
    null,
    2
  );
}

export async function generateThemeZip(themeConfig: ThemeConfig, seoConfig: SEOConfig, blocks: WPBlock[]): Promise<Blob> {
  const zip = new JSZip();
  const folderName = themeConfig.themeSlug || "wp-studio-theme";
  const root = zip.folder(folderName) || zip;

  const headerBlock = blocks.find((b) => b.type === "header");
  const footerBlock = blocks.find((b) => b.type === "footer");

  root.file("style.css", generateStyleCss(themeConfig, blocks));
  root.file("functions.php", generateFunctionsPhp(themeConfig));
  root.file("header.php", generateHeaderPhp(themeConfig, seoConfig, headerBlock));
  root.file("footer.php", generateFooterPhp(themeConfig, footerBlock));
  root.file("front-page.php", generateFrontPagePhp(blocks));
  root.file("index.php", generateFrontPagePhp(blocks));
  root.file("single.php", generateSinglePhp());
  root.file("page.php", generatePagePhp());
  root.file("theme.json", generateThemeJson(themeConfig));
  root.file("gutenberg-blocks.json", generateGutenbergBlockJson(blocks));
  root.file(
    "README.md",
    `# ${themeConfig.themeName}\n\nĐược tạo bởi **WordPress Template Studio**.\n\n## Hướng dẫn cài đặt:\n1. Nén thư mục này thành file \`.zip\` (nếu chưa nén).\n2. Vào Trang quản trị WordPress > **Giao diện (Appearance)** > **Thêm mới (Add New)** > **Tải giao diện lên (Upload Theme)**.\n3. Chọn file zip và nhấn **Cài đặt ngay (Install Now)** > **Kích hoạt (Activate)**.`
  );

  return await zip.generateAsync({ type: "blob" });
}
