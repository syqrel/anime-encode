import { defineConfig } from 'vitepress'
import markdownItTaskLists from 'markdown-it-task-lists'

const siteUrl = 'https://syqrel.github.io/anime-encode'

export default defineConfig({
    title: "Anime FFmpeg Re-Encoder",
    description: "Automated anime encoding workflow for Google Colab with HEVC 10-bit support. Free GPU acceleration for high-quality video encoding.",
    lang: 'en-US',
    base: '/anime-encode/',
    cleanUrls: true,
    lastUpdated: true,

    // SEO: Sitemap generation
    sitemap: {
        hostname: siteUrl
    },

    head: [
        // Favicon
        ['link', { rel: 'icon', href: '/anime-encode/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/anime-encode/favicon.ico' }],

        // Theme
        ['meta', { name: 'theme-color', content: '#5b6cf0' }],

        // SEO Meta Tags
        ['meta', { name: 'author', content: 'syqrel' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['meta', { name: 'googlebot', content: 'index, follow' }],
        ['meta', { name: 'keywords', content: 'anime encoding, ffmpeg, hevc, h265, google colab, video encoding, nvenc, x265, free gpu encoding, anime re-encoder' }],

        // Open Graph (Facebook, LinkedIn)
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Anime FFmpeg Re-Encoder' }],
        ['meta', { property: 'og:title', content: 'Anime FFmpeg Re-Encoder - Free GPU Video Encoding' }],
        ['meta', { property: 'og:description', content: 'Automated anime encoding workflow for Google Colab with HEVC 10-bit support. Free GPU acceleration.' }],
        ['meta', { property: 'og:url', content: siteUrl }],
        ['meta', { property: 'og:locale', content: 'en_US' }],

        // Twitter Card
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: 'Anime FFmpeg Re-Encoder' }],
        ['meta', { name: 'twitter:description', content: 'Free GPU-accelerated anime encoding on Google Colab with HEVC 10-bit support.' }],

        // Canonical (helps prevent duplicate content)
        ['link', { rel: 'canonical', href: siteUrl }],

        // Performance: Preconnect
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ],

    markdown: {
        config: (md) => {
            md.use(markdownItTaskLists)
        }
    },

    themeConfig: {
        siteTitle: 'Anime Encode',

        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Getting Started',
                items: [
                    { text: 'Installation', link: '/installation' },
                    { text: 'Quick Start', link: '/quick-start' }
                ]
            },
            {
                text: 'User Guide',
                items: [
                    { text: 'Usage', link: '/usage' },
                    { text: 'Encoding Profiles', link: '/profiles' },
                    { text: 'Configuration', link: '/configuration' }
                ]
            },
            {
                text: 'Advanced',
                items: [
                    { text: 'Custom Profiles', link: '/advanced/custom-profiles' },
                    { text: 'Batch Processing', link: '/advanced/batch-processing' }
                ]
            },
            { text: 'Troubleshooting', link: '/troubleshooting' },
            { text: 'FAQ', link: '/faq' },
            { text: 'About', link: '/about' }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                collapsed: false,
                items: [
                    { text: 'Installation', link: '/installation' },
                    { text: 'Quick Start', link: '/quick-start' }
                ]
            },
            {
                text: 'User Guide',
                collapsed: false,
                items: [
                    { text: 'Usage', link: '/usage' },
                    { text: 'Encoding Profiles', link: '/profiles' },
                    { text: 'Configuration', link: '/configuration' }
                ]
            },
            {
                text: 'Advanced',
                collapsed: true,
                items: [
                    { text: 'Custom Profiles', link: '/advanced/custom-profiles' },
                    { text: 'Batch Processing', link: '/advanced/batch-processing' }
                ]
            },
            {
                text: 'Support',
                items: [
                    { text: 'Troubleshooting', link: '/troubleshooting' },
                    { text: 'FAQ', link: '/faq' },
                    { text: 'About', link: '/about' }
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/syqrel/anime-encode' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025 syqrel'
        },

        search: {
            provider: 'local'
        },

        editLink: {
            pattern: 'https://github.com/syqrel/anime-encode/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        }
    }
})
