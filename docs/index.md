---
layout: home

hero:
  name: "Enterprise Homelab"
  text: "28-Container GitOps Infrastructure"
  tagline: "Complete Infrastructure as Code with Advanced Monitoring & Observability"
  image:
    src: /hero-image.svg
    alt: Homelab Infrastructure
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: View Architecture
      link: /infrastructure/
    - theme: alt
      text: GitHub Repository
      link: https://github.com/piyush97/homelab-gitops

features:
  - icon: 🏗️
    title: Infrastructure as Code
    details: Complete GitOps implementation using Terraform for infrastructure provisioning and Ansible for configuration management. All 28 containers defined as code.
    
  - icon: 📊
    title: Enterprise Monitoring
    details: Advanced observability stack with Prometheus, Grafana, Loki, AlertManager, and Blackbox Exporter. 31-day log retention with intelligent alerting.
    
  - icon: 🔒
    title: Security First
    details: Network segmentation, VPN access, SSL termination, and comprehensive firewall rules. Vaultwarden for credential management.
    
  - icon: 🎬
    title: Media Stack
    details: Complete media automation with Plex, Sonarr, Radarr, qBittorrent, and the full *arr stack. GPU passthrough for transcoding.
    
  - icon: 🚀
    title: GitOps Workflow
    details: Automated deployments via GitHub Actions. Infrastructure changes through pull requests with automated testing and rollback capabilities.
    
  - icon: ⚡
    title: High Performance
    details: 99.9% uptime, optimized resource allocation (30.75GB RAM), and efficient storage management with automated backup and recovery.
---

## 🏠 Welcome to Enterprise-Grade Homelab

This documentation covers a sophisticated **28-container Proxmox homelab** that demonstrates enterprise-grade DevOps practices using Infrastructure as Code, comprehensive monitoring, and GitOps workflows.

### 📈 Key Metrics

<div class="stats-grid">
  <div class="stat-item">
    <div class="stat-number">28</div>
    <div class="stat-label">Containers</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">99.9%</div>
    <div class="stat-label">Uptime</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">30.75GB</div>
    <div class="stat-label">RAM Allocated</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">10TB</div>
    <div class="stat-label">Storage</div>
  </div>
</div>

### 🏗️ Architecture Overview

The infrastructure is built on **Proxmox VE 8.14** and organized into four main service categories:

- **🎬 Media Stack** (9 containers): Plex, Sonarr, Radarr, qBittorrent, Prowlarr, Lidarr, Overseerr, FlareSolverr, AutoBrr
- **📊 Advanced Monitoring** (9 containers): Grafana, Prometheus, Loki, AlertManager, Blackbox Exporter, Promtail, Uptime Kuma, PVE Exporter, Glance  
- **🔒 Security & Network** (4 containers): SWAG, Wireguard, Vaultwarden, RustDesk
- **🏢 Business & Storage** (6 containers): Odoo ERP, Paperless-ngx, Immich, File Server, Google Drive, ntfy

### 🚀 What Makes This Special

This homelab goes beyond typical home setups by implementing:

- **Complete GitOps workflow** with Infrastructure as Code
- **Enterprise-grade monitoring** with centralized logging and intelligent alerting
- **Advanced automation** including self-healing and automated backups
- **Professional documentation** and change management practices
- **Scalable architecture** designed for growth and experimentation

### 📱 Real-Time Notifications

Stay informed with comprehensive notification system:
- **🔴 Critical Alerts**: Container failures, storage issues
- **🟡 Warnings**: Resource thresholds, service degradation
- **ℹ️ Info**: Deployment status, system updates  
- **✅ Success**: Backup completion, service recovery

---

## 🎯 Quick Navigation

<div class="nav-grid">
  <a href="/getting-started/" class="nav-card">
    <div class="nav-icon">🚀</div>
    <div class="nav-title">Getting Started</div>
    <div class="nav-desc">Prerequisites and setup guide</div>
  </a>
  
  <a href="/infrastructure/" class="nav-card">
    <div class="nav-icon">🏗️</div>
    <div class="nav-title">Infrastructure</div>
    <div class="nav-desc">Architecture and container mapping</div>
  </a>
  
  <a href="/gitops/" class="nav-card">
    <div class="nav-icon">⚙️</div>
    <div class="nav-title">GitOps</div>
    <div class="nav-desc">Terraform, Ansible, and CI/CD</div>
  </a>
  
  <a href="/monitoring/" class="nav-card">
    <div class="nav-icon">📊</div>
    <div class="nav-title">Monitoring</div>
    <div class="nav-desc">Observability and alerting</div>
  </a>
</div>

---

> **Homelab Philosophy**: Embrace Infrastructure as Code principles while maintaining the flexibility and learning opportunities that make homelab environments special. This GitOps approach provides enterprise-grade automation without sacrificing the ability to experiment and grow.

<style>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.nav-card {
  display: block;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
}

.nav-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
}

.nav-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.nav-title {
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.nav-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>