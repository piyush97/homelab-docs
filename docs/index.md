---
layout: home

hero:
  name: "Homelab Infrastructure"
  text: "Verified Proxmox Snapshot"
  tagline: "23 live LXC containers; Terraform configuration documented separately"
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
    details: Terraform and Ansible configuration lives in the separate homelab-gitops repository; declarations may differ from live Proxmox state.
    
  - icon: 📊
    title: Monitoring
    details: Monitoring services run in Proxmox CT 114; refer to its current configuration for deployed components and retention.
    
  - icon: 🔒
    title: Security First
    details: Network segmentation, VPN access, SSL termination, and comprehensive firewall rules. Vaultwarden for credential management.
    
  - icon: 🎬
    title: Media Stack
    details: Complete media automation with Plex, Sonarr, Radarr, qBittorrent, and the full *arr stack. GPU passthrough for transcoding.
    
  - icon: 🚀
    title: GitOps Workflow
    details: Automated deployments via GitHub Actions. Infrastructure changes through pull requests with automated testing and rollback capabilities.
    
---

## Current live environment

Proxmox currently reports **23 LXC containers: 16 running and 7 stopped**. This site documents the observed live environment; it is not a Terraform deployment guide. See the [infrastructure overview](/infrastructure/) and [container inventory](/infrastructure/containers). Verify runtime details in Proxmox and review GitOps drift before applying changes.

### Live inventory

- **16** containers running; **7** stopped
- **23** containers listed in Proxmox
- Proxmox node: `piyushmehta`; LAN subnet: `192.168.0.0/24`
- See the [live inventory](/infrastructure/containers) for names, addresses, and states.

### Architecture

The environment uses one documented LAN bridge (`vmbr0`), Caddy for reverse proxying, Pi-hole for DNS, and WireGuard for a VPN tunnel. Current storage details and verified service links are on the [infrastructure overview](/infrastructure/). Older category counts, service mappings, uptime, and capacity claims have been removed where they could not be confirmed against current Proxmox state.

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