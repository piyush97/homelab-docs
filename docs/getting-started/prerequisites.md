# Prerequisites

Ensure your environment meets the technical requirements for deploying and managing the 28-container homelab infrastructure.

## 🖥️ Hardware Requirements

### Minimum Requirements
- **CPU**: 8+ cores (Intel/AMD x64)
- **RAM**: 32GB minimum (current allocation: 30.75GB)
- **Storage**: 500GB for OS + containers, 10TB+ for data
- **Network**: Gigabit Ethernet connectivity

### Recommended Specifications
- **CPU**: 16+ cores with virtualization support (Intel VT-x/AMD-V)
- **RAM**: 64GB for comfortable headroom
- **Storage**: NVMe SSD for OS, high-capacity drives for data
- **Network**: Dual network interfaces for advanced configurations
- **GPU**: Optional for Plex/Immich hardware acceleration

### Tested Hardware
The current deployment runs on:
- **Proxmox VE 8.14** on Linux kernel 6.14.8-2-pve
- Optimized resource allocation achieving **99% RAM utilization**
- **ZFS storage** with 10TB shared data pool
- **GPU passthrough** for media transcoding

## 💿 Software Requirements

### Proxmox VE Environment
```bash
# Proxmox VE 8.14 or later
pve-manager/8.14+ 

# Required features
- LXC container support
- ZFS filesystem support (optional but recommended)
- Networking bridges configured (vmbr0 minimum)
- API access enabled
```

### Development Tools
```bash
# Terraform for Infrastructure as Code
terraform --version
# Required: >= 1.6.0

# Ansible for Configuration Management  
ansible --version
# Required: >= 2.15.0

# Git for version control
git --version
# Required: >= 2.30.0
```

### Network Configuration

#### Primary Network (Required)
```yaml
Bridge: vmbr0
Network: 192.168.0.0/24
Gateway: 192.168.0.1
DNS: 1.1.1.1, 1.0.0.1
```

#### Secondary Network (Optional - VPN)
```yaml
Bridge: vmbr1  
Network: 10.10.10.0/24
Purpose: Isolated VPN routing for torrents
```

## 🔐 Access Requirements

### Proxmox API Access
```bash
# Create dedicated API user
pveum user add terraform@pve
pveum passwd terraform@pve

# Assign necessary privileges
pveum aclmod / -user terraform@pve -role Administrator
```

### GitHub Account Setup
- **Repository Access**: Ability to create public repositories
- **GitHub Actions**: Enabled for CI/CD automation
- **SSH Keys**: Configured for Git authentication
- **Personal Access Token**: For automated deployments (optional)

### Domain & DNS (Optional)
- **Domain Name**: For external SSL access via SWAG
- **DNS Management**: Cloudflare recommended for Let's Encrypt
- **Wildcard Certificate**: Simplifies SSL management

## 📚 Knowledge Prerequisites

### Required Skills
- **Linux Administration**: Command line proficiency
- **Container Technology**: Understanding of LXC/Docker concepts
- **Networking**: Basic TCP/IP, DNS, firewall concepts
- **Version Control**: Git workflow familiarity

### Recommended Experience
- **Infrastructure as Code**: Terraform/Ansible basics helpful
- **Monitoring**: Prometheus/Grafana concepts
- **Security**: SSL/TLS, VPN configuration understanding
- **CI/CD**: GitHub Actions workflow knowledge

## 🛠️ Environment Preparation

### 1. Proxmox VE Setup
```bash
# Update Proxmox to latest version
apt update && apt full-upgrade

# Install required packages
apt install git curl wget unzip

# Verify container template availability
pveam available | grep -E "(debian-13|ubuntu-25.04|alpine-3.22)"
```

### 2. Network Bridge Configuration
```bash
# Verify primary bridge exists
ip link show vmbr0

# Create secondary bridge for VPN (optional)
# Add to /etc/network/interfaces:
auto vmbr1
iface vmbr1 inet static
    address 10.10.10.1/24
    bridge-ports none
    bridge-stp off
    bridge-fd 0
```

### 3. Storage Preparation
```bash
# Verify ZFS pool (recommended)
zpool status

# Or prepare directory storage
mkdir -p /var/lib/vz/shared-data
mkdir -p /var/lib/vz/docker-volumes
```

### 4. Container Templates
```bash
# Download required templates
pveam download local debian-13-standard_13.0-1_amd64.tar.zst
pveam download local ubuntu-25.04-standard_25.04-1_amd64.tar.zst  
pveam download local alpine-3.22-default_20240606_amd64.tar.xz
```

## ✅ Verification Checklist

Before proceeding with deployment:

### Hardware Verification
- [ ] **CPU**: 8+ cores with virtualization enabled
- [ ] **RAM**: 32GB+ available 
- [ ] **Storage**: 500GB+ system, 10TB+ data storage
- [ ] **Network**: Stable gigabit connectivity

### Software Verification
- [ ] **Proxmox VE**: 8.14+ installed and updated
- [ ] **Terraform**: >= 1.6.0 installed locally
- [ ] **Ansible**: >= 2.15.0 installed locally
- [ ] **Git**: Configured with SSH keys

### Access Verification
- [ ] **Proxmox API**: User created with Administrator role
- [ ] **GitHub**: Account setup with repository access
- [ ] **Network**: Primary bridge (vmbr0) configured
- [ ] **Templates**: Container templates downloaded

### Optional Enhancements
- [ ] **Secondary Bridge**: vmbr1 for VPN routing
- [ ] **GPU Passthrough**: Configured for media acceleration  
- [ ] **Domain Name**: For external SSL access
- [ ] **Monitoring**: External monitoring endpoints ready

## 🚀 Ready to Begin?

Once all prerequisites are met:

1. **Clone the Repository**: Get the GitOps infrastructure code
2. **Configure Variables**: Customize for your environment
3. **Run Terraform Plan**: Verify infrastructure changes
4. **Deploy Infrastructure**: Execute the full deployment
5. **Configure Services**: Run Ansible playbooks

The prerequisites ensure a smooth deployment experience and optimal performance of your enterprise-grade homelab infrastructure.

---

## 📞 Getting Help

If you encounter issues during prerequisite setup:

- **Hardware**: Consult Proxmox VE hardware compatibility lists
- **Software**: Check official documentation for version requirements
- **Network**: Verify router/firewall configurations
- **Access**: Ensure proper permissions and API access

Ready to proceed? Continue to the [Quick Start](/getting-started/quick-start) guide!