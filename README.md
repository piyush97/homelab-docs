# 📖 Enterprise Homelab Documentation

Modern documentation site for a sophisticated 28-container Proxmox homelab built with VitePress and deployed on GitHub Pages.

[![Deploy Status](https://github.com/piyush97/homelab-docs/workflows/Deploy%20VitePress%20site%20to%20Pages/badge.svg)](https://github.com/piyush97/homelab-docs/actions)
[![VitePress](https://img.shields.io/badge/VitePress-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitepress.dev/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

## 🌐 Live Documentation

**🔗 Visit: [https://piyush97.github.io/homelab-docs/](https://piyush97.github.io/homelab-docs/)**

## 🏗️ What's Documented

This site provides comprehensive documentation for:

- **28-Container Infrastructure** - Complete architecture overview
- **GitOps Workflow** - Terraform and Ansible implementation  
- **Advanced Monitoring** - Prometheus, Grafana, Loki, AlertManager
- **Service Categories** - Media, Security, Business, and Monitoring stacks
- **Operations Guide** - Deployment, maintenance, and troubleshooting

## 🚀 Source Infrastructure

The infrastructure documented here is managed in the main GitOps repository:

**🔗 [homelab-gitops](https://github.com/piyush97/homelab-gitops)** - Complete Infrastructure as Code

## 💻 Local Development

Run the documentation site locally:

```bash
# Clone the repository
git clone https://github.com/piyush97/homelab-docs.git
cd homelab-docs

# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## 📁 Documentation Structure

```
docs/
├── index.md                 # Homepage
├── getting-started/         # Setup and prerequisites
├── infrastructure/          # Architecture and containers  
├── gitops/                  # Terraform and Ansible
├── monitoring/              # Observability stack
├── services/                # Service-specific guides
└── .vitepress/             # VitePress configuration
```

## 🛠️ Built With

- **[VitePress](https://vitepress.dev/)** - Modern documentation framework
- **[Vue.js](https://vuejs.org/)** - Progressive JavaScript framework  
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[GitHub Actions](https://github.com/features/actions)** - Automated deployment

## 📊 Key Features

### 🎨 Modern Design
- Responsive layout with dark/light mode
- Syntax highlighting for code blocks
- Interactive navigation and search

### 🔍 Enhanced User Experience  
- Full-text search across all documentation
- Mobile-optimized responsive design
- Fast loading with optimized assets

### 🚀 Automated Deployment
- Automatic builds on push to main branch
- GitHub Actions CI/CD pipeline
- Zero-downtime deployments

### 📱 Progressive Features
- Offline-ready documentation
- Fast page transitions
- SEO optimized with meta tags

## 🤝 Contributing

Documentation improvements are welcome! Please:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes and test locally
4. Commit with descriptive messages
5. Push and create a Pull Request

## 📄 License

This documentation is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🔗 Related Projects

- **[homelab-gitops](https://github.com/piyush97/homelab-gitops)** - Main infrastructure repository
- **[VitePress](https://github.com/vuejs/vitepress)** - Documentation framework
- **[Vue.js](https://github.com/vuejs/vue-next)** - JavaScript framework

---

> **Enterprise Homelab**: Demonstrating enterprise-grade DevOps practices in a home environment with comprehensive Infrastructure as Code, advanced monitoring, and modern documentation practices.