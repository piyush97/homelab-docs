import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Enterprise Homelab',
  description: '28-Container GitOps Infrastructure - Complete Documentation',
  
  // Clean URLs
  cleanUrls: true,
  
  // GitHub Pages base (update with your username/repo)
  base: '/homelab-docs/',
  
  // Theme configuration
  themeConfig: {
    // Site logo
    logo: '/logo.svg',
    
    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Infrastructure', link: '/infrastructure/' },
      { text: 'Services', link: '/services/' },
      { text: 'GitOps', link: '/gitops/' },
      { text: 'Monitoring', link: '/monitoring/' }
    ],

    // Sidebar configuration
    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Prerequisites', link: '/getting-started/prerequisites' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Installation', link: '/getting-started/installation' }
          ]
        }
      ],
      
      '/infrastructure/': [
        {
          text: 'Infrastructure',
          items: [
            { text: 'Architecture Overview', link: '/infrastructure/' },
            { text: 'Container Map', link: '/infrastructure/containers' },
            { text: 'Networking', link: '/infrastructure/networking' },
            { text: 'Storage', link: '/infrastructure/storage' },
            { text: 'Security', link: '/infrastructure/security' }
          ]
        }
      ],
      
      '/services/': [
        {
          text: 'Services',
          items: [
            { text: 'Overview', link: '/services/' },
            { text: 'Media Stack', link: '/services/media-stack' },
            { text: 'Monitoring Stack', link: '/services/monitoring-stack' },
            { text: 'Security Services', link: '/services/security' },
            { text: 'Business Applications', link: '/services/business' }
          ]
        }
      ],
      
      '/gitops/': [
        {
          text: 'GitOps Workflow',
          items: [
            { text: 'Overview', link: '/gitops/' },
            { text: 'Terraform', link: '/gitops/terraform' },
            { text: 'Ansible', link: '/gitops/ansible' },
            { text: 'CI/CD Pipeline', link: '/gitops/ci-cd' },
            { text: 'Deployment', link: '/gitops/deployment' }
          ]
        }
      ],
      
      '/monitoring/': [
        {
          text: 'Monitoring & Observability',
          items: [
            { text: 'Overview', link: '/monitoring/' },
            { text: 'Prometheus', link: '/monitoring/prometheus' },
            { text: 'Grafana Dashboards', link: '/monitoring/grafana' },
            { text: 'Loki Logging', link: '/monitoring/loki' },
            { text: 'AlertManager', link: '/monitoring/alerting' },
            { text: 'Uptime Monitoring', link: '/monitoring/uptime' }
          ]
        }
      ]
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/piyush97/homelab-gitops' },
      { icon: 'github', link: 'https://github.com/piyush97/homelab-docs' }
    ],

    // Footer
    footer: {
      message: 'Enterprise-Grade Homelab Infrastructure',
      copyright: 'Copyright © 2025 Piyush Mehta. Built with GitOps principles.'
    },

    // Search
    search: {
      provider: 'local'
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/piyush97/homelab-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  // Markdown configuration
  markdown: {
    // Enable line numbers in code blocks
    lineNumbers: true,
    
    // Configure Shiki for syntax highlighting
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // Head configuration for meta tags and favicon
  head: [
    ['link', { rel: 'icon', href: '/homelab-docs/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Enterprise Homelab Documentation' }],
    ['meta', { property: 'og:site_name', content: 'Enterprise Homelab' }],
    ['meta', { property: 'og:image', content: 'https://piyush97.github.io/homelab-docs/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://piyush97.github.io/homelab-docs/' }],
    ['meta', { property: 'og:description', content: '28-Container GitOps Infrastructure with Enterprise-Grade Monitoring & Observability' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://piyush97.github.io/homelab-docs/og-image.png' }]
  ]
})