# Container Mapping

Complete mapping of all 28 containers with their configurations, resource allocations, and GitOps definitions.

## 🎬 Media Stack (9 containers)

### Core Media Services
| VMID | Container | IP Address | Resources | Key Features |
|------|-----------|------------|-----------|--------------|
| 120 | **plex** | 192.168.0.207 | 4GB RAM, 2 cores | GPU passthrough, privileged, media server |
| 107 | **qbittorrent** | 192.168.0.132 + 10.10.10.2 | 2GB RAM, 2 cores | Dual network, VPN routing |
| 108 | **prowlarr** | 192.168.0.119 + 10.10.10.3 | 1GB RAM, 2 cores | Indexer management, VPN |

### *arr Automation Stack
| VMID | Container | IP Address | Resources | Purpose |
|------|-----------|------------|-----------|---------|
| 112 | **sonarr** | 192.168.0.203 | 1GB RAM, 2 cores | TV show automation |
| 113 | **radarr** | 192.168.0.165 | 1GB RAM, 2 cores | Movie automation |
| 121 | **lidarr** | 192.168.0.177 | 512MB RAM, 1 core | Music automation |
| 114 | **overseerr** | 192.168.0.120 | 512MB RAM, 1 core | Media requests frontend |
| 115 | **flaresolverr** | 192.168.0.138 | 256MB RAM, 1 core | Captcha solver support |
| 118 | **autobrr** | 192.168.0.107 | 256MB RAM, 1 core | RSS automation |

### Media Stack Features
- **GPU Acceleration**: Plex with hardware transcoding
- **VPN Integration**: Torrenting through Wireguard tunnel
- **Automated Workflows**: Complete *arr stack integration
- **Request Management**: User-friendly Overseerr interface

## 📊 Advanced Monitoring (9 containers)

### Core Monitoring Infrastructure
| VMID | Container | IP Address | Resources | Function |
|------|-----------|------------|-----------|----------|
| 110 | **grafana** | 192.168.0.243 | 1GB RAM, 2 cores | Dashboard visualization |
| 109 | **alpine-prometheus** | DHCP | 512MB RAM, 1 core | Metrics collection |
| 130 | **loki** | 192.168.0.200 | 2GB RAM, 2 cores | Centralized logging |
| 131 | **alertmanager** | 192.168.0.201 | 512MB RAM, 1 core | Intelligent alerting |

### Specialized Monitoring
| VMID | Container | IP Address | Resources | Specialty |
|------|-----------|------------|-----------|-----------|
| 132 | **blackbox-exporter** | 192.168.0.202 | 256MB RAM, 1 core | External endpoint monitoring |
| 133 | **promtail** | 192.168.0.204 | 512MB RAM, 1 core | Log shipping to Loki |
| 106 | **prometheus-pve-exporter** | DHCP | 256MB RAM, 1 core | Proxmox metrics |
| 123 | **uptimekuma** | 192.168.0.181 | 256MB RAM, 1 core | Service uptime monitoring |
| 119 | **glance** | 192.168.0.44 | 256MB RAM, 1 core | Dashboard frontend |

### Monitoring Capabilities
- **31-day log retention** with Loki
- **Real-time alerting** via ntfy mobile notifications
- **External monitoring** with Blackbox Exporter
- **Infrastructure metrics** from Proxmox integration

## 🔒 Security & Network (4 containers)

| VMID | Container | IP Address | Resources | Function |
|------|-----------|------------|-----------|----------|
| 100 | **SWAG** | 192.168.0.3 | 1GB RAM, 2 cores | Reverse proxy, SSL, firewall |
| 116 | **wireguard** | 192.168.0.219 + 10.10.10.1 | 2GB RAM, 2 cores | VPN server, dual network |
| 104 | **alpine-vaultwarden** | 192.168.0.248 | 2GB RAM, 2 cores | Password manager |
| 103 | **rustdeskserver** | 192.168.0.140 | 512MB RAM, 1 core | Remote desktop server |

### Security Features
- **SSL Termination**: Let's Encrypt certificates via SWAG
- **VPN Access**: Secure remote access through Wireguard
- **Password Management**: Self-hosted Vaultwarden
- **Network Segmentation**: Firewall rules for container isolation

## 🏢 Business & Storage (6 containers)

### Photo & Document Management
| VMID | Container | IP Address | Resources | Purpose |
|------|-----------|------------|-----------|---------|
| 105 | **immich** | 192.168.0.15 | 4GB RAM, 4 cores | Photo management, GPU, privileged |
| 117 | **immich-backup** | 192.168.0.10 | 9GB RAM, 4 cores | Backup instance (stopped) |
| 128 | **paperless-ngx** | 192.168.0.149 | 2GB RAM, 2 cores | Document management |

### Storage & Business Applications
| VMID | Container | IP Address | Resources | Function |
|------|-----------|------------|-----------|----------|
| 102 | **fileserver** | 192.168.0.5 | 2GB RAM, 2 cores | NAS, Cockpit, SMB shares |
| 101 | **drive** | 192.168.0.126 | 512MB RAM, 1 core | Google Drive sync |
| 111 | **docker** | 192.168.0.153 | 2GB RAM, 2 cores | Container runtime host |
| 125 | **odoo** | 192.168.0.159 | 2GB RAM, 2 cores | ERP system |
| 124 | **ntfy** | 192.168.0.124 | 256MB RAM, 1 core | Notification server |

### Business Features
- **Photo AI**: Immich with GPU-accelerated face recognition
- **ERP Integration**: Full Odoo business management suite
- **Document OCR**: Paperless-ngx with automated processing
- **Cloud Sync**: Automated Google Drive integration

## 🌐 Network Configuration

### Primary Network (vmbr0) - 192.168.0.x/24
- **Gateway**: 192.168.0.1
- **DNS**: Cloudflare (1.1.1.1, 1.0.0.1)
- **Containers**: 26 containers with direct internet access
- **Firewall**: Port-specific rules for external access

### VPN Network (vmbr1) - 10.10.10.x/24  
- **Gateway**: 10.10.10.1 (Wireguard container)
- **Purpose**: Isolated torrent traffic routing
- **Containers**: qBittorrent (10.10.10.2), Prowlarr (10.10.10.3)
- **Routing**: All traffic through Wireguard VPN tunnel

## 💾 Storage Mounts

### Common Mount Patterns
```bash
# Media containers
/data/media     → 10TB shared media storage
/docker         → Container-specific volumes

# Business containers  
/data/documents → Document storage
/data/photos    → Photo storage with AI processing

# Monitoring containers
/monitoring     → 64GB specialized logging storage
/data/metrics   → Prometheus time-series data

# Security containers
/config         → Configuration persistence
/certs          → SSL certificate storage
```

## 🔧 Resource Summary

### Total Allocation
- **RAM**: 30.75GB across 28 containers (99% host utilization)
- **Storage**: 10TB shared + 128GB Docker volumes + 64GB monitoring
- **CPU**: Optimized core allocation based on service requirements
- **Network**: Dual-bridge setup with VPN routing

### High-Resource Containers
1. **Immich Backup**: 9GB RAM (stopped by default)
2. **Immich**: 4GB RAM + GPU passthrough
3. **Plex**: 4GB RAM + GPU passthrough
4. **qBittorrent**: 2GB RAM for heavy torrent workloads

## 🚀 GitOps Integration

All containers are defined in Terraform modules:
- **terraform/containers/media-stack.tf**: Media services
- **terraform/containers/monitoring.tf**: Observability stack  
- **terraform/containers/security.tf**: Security services
- **terraform/containers/business.tf**: Business applications

Each container includes:
- **Resource allocation** (RAM, CPU, storage)
- **Network configuration** (static IPs, firewall rules)
- **Feature settings** (privileged access, GPU passthrough)
- **Ansible integration** for service deployment