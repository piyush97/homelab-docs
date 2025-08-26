# Installation Guide

Complete step-by-step installation guide for deploying the 28-container enterprise homelab infrastructure.

## 📋 Pre-Installation Checklist

Before beginning the installation, ensure you have completed all [Prerequisites](/getting-started/prerequisites):

- [ ] **Hardware**: 32GB+ RAM, 10TB+ storage, 8+ CPU cores
- [ ] **Proxmox VE**: 8.14+ installed and configured
- [ ] **Tools**: Terraform >= 1.6.0, Ansible >= 2.15.0
- [ ] **Access**: Proxmox API credentials configured
- [ ] **Network**: Primary bridge (vmbr0) configured
- [ ] **Templates**: Container templates downloaded

## 🔧 Step 1: Environment Preparation

### Clone the GitOps Repository
```bash
# Clone the main infrastructure repository
git clone https://github.com/piyush97/homelab-gitops.git
cd homelab-gitops

# Verify repository structure
ls -la
# Should see: terraform/, ansible/, configs/, .github/
```

### Configure Proxmox API Access
```bash
# Create terraform.tfvars file
cat > terraform.tfvars << 'EOF'
# Proxmox Configuration
proxmox_api_url      = "https://your-proxmox-ip:8006/api2/json"
proxmox_api_token_id = "terraform@pve!mytoken"
proxmox_api_token_secret = "your-secret-token"

# Network Configuration
network_bridge       = "vmbr0"
network_gateway      = "192.168.0.1"
network_cidr         = "192.168.0.0/24"

# Storage Configuration
shared_data_storage  = "local-zfs:subvol-10000-disk-0"
docker_storage       = "local-zfs:subvol-docker-volumes"
monitoring_storage   = "local-zfs:subvol-monitoring"

# Resource Allocation
default_memory       = 1024
default_cores        = 2
enable_gpu_passthrough = true
EOF
```

### Verify Network Configuration
```bash
# On Proxmox host - verify bridges
ip link show vmbr0
ip route show

# Optional: Configure secondary bridge for VPN
cat >> /etc/network/interfaces << 'EOF'
auto vmbr1
iface vmbr1 inet static
    address 10.10.10.1/24
    bridge-ports none
    bridge-stp off
    bridge-fd 0
EOF

# Apply network changes (if adding vmbr1)
systemctl restart networking
```

## 🏗️ Step 2: Infrastructure Deployment

### Initialize Terraform
```bash
cd terraform

# Initialize Terraform with providers
terraform init

# Validate configuration
terraform validate

# Format configuration files
terraform fmt -recursive
```

### Plan Infrastructure Deployment
```bash
# Generate deployment plan
terraform plan -out=deployment.plan

# Review the plan (should show 28 containers + resources)
# Look for:
# - 28 proxmox_lxc resources
# - Network configurations
# - Storage mount points
# - Firewall rules
```

### Deploy Infrastructure
```bash
# Apply the deployment (15-20 minutes)
terraform apply deployment.plan

# Monitor deployment progress
watch 'pct list | grep -E "(VMID|running|stopped)"'
```

### Verify Infrastructure Deployment
```bash
# Check all containers are created
terraform show | grep -c "proxmox_lxc" 
# Should output: 28

# Verify containers are running
pct list | grep running | wc -l
# Should output: 27 (immich-backup is stopped by default)

# Check resource allocation
for id in {100..133}; do
  if pct status $id 2>/dev/null | grep -q running; then
    echo "Container $id: $(pct config $id | grep -E '^memory|^cores')"
  fi
done
```

## ⚙️ Step 3: Service Configuration

### Prepare Ansible Environment
```bash
cd ../ansible

# Install required Ansible collections
ansible-galaxy collection install community.docker
ansible-galaxy collection install ansible.posix

# Verify inventory
ansible-inventory --list -i inventory/

# Test connectivity to all containers
ansible all -i inventory/ -m ping
```

### Configure Service Groups

#### Media Stack Configuration
```bash
# Deploy media services
ansible-playbook -i inventory/ playbooks/media-stack.yml -v

# Verify media services
curl -I http://192.168.0.207:32400  # Plex
curl -I http://192.168.0.203:8989   # Sonarr
curl -I http://192.168.0.165:7878   # Radarr
```

#### Monitoring Stack Configuration
```bash
# Deploy monitoring services
ansible-playbook -i inventory/ playbooks/monitoring.yml -v

# Verify monitoring services
curl -I http://192.168.0.243:3000   # Grafana
curl -I http://192.168.0.109:9090   # Prometheus
curl -I http://192.168.0.200:3100   # Loki
```

#### Security Services Configuration
```bash
# Deploy security services
ansible-playbook -i inventory/ playbooks/security.yml -v

# Verify security services
curl -I http://192.168.0.3:80       # SWAG
curl -I http://192.168.0.248:8080   # Vaultwarden
```

#### Business Applications Configuration
```bash
# Deploy business applications
ansible-playbook -i inventory/ playbooks/business.yml -v

# Verify business applications
curl -I http://192.168.0.15:2283    # Immich
curl -I http://192.168.0.159:8069   # Odoo
curl -I http://192.168.0.149:8000   # Paperless-ngx
```

### Complete Service Deployment
```bash
# Deploy all remaining services
ansible-playbook -i inventory/ playbooks/site.yml -v

# This playbook includes:
# - Docker container configurations
# - Service dependencies
# - Configuration file templates
# - Initial user setup
```

## 🔐 Step 4: Security Configuration

### Configure SSL Certificates (SWAG)
```bash
# Configure domain and SSL
ansible-playbook -i inventory/ playbooks/configure-ssl.yml \
  -e domain_name=your-domain.com \
  -e email=your-email@domain.com
```

### Set Up VPN Access (Wireguard)
```bash
# Generate VPN configuration
ansible-playbook -i inventory/ playbooks/setup-wireguard.yml

# Client configurations will be available at:
# /data/wireguard/clients/
```

### Configure Authentication
```bash
# Set up secure passwords
ansible-playbook -i inventory/ playbooks/secure-passwords.yml

# Configure Vaultwarden admin token
ansible-playbook -i inventory/ playbooks/setup-vaultwarden.yml
```

## 📊 Step 5: Monitoring Setup

### Configure Prometheus Targets
```bash
# Set up monitoring targets
ansible-playbook -i inventory/ playbooks/configure-monitoring.yml

# Verify Prometheus targets
curl -s http://192.168.0.109:9090/api/v1/targets | \
  jq '.data.activeTargets[] | select(.health=="up") | .labels.instance'
```

### Import Grafana Dashboards
```bash
# Import pre-configured dashboards
ansible-playbook -i inventory/ playbooks/import-dashboards.yml

# Verify dashboards are imported
curl -s http://admin:admin@192.168.0.243:3000/api/search | \
  jq '.[].title'
```

### Configure Alerting
```bash
# Set up AlertManager
ansible-playbook -i inventory/ playbooks/configure-alerts.yml

# Configure ntfy notifications
ansible-playbook -i inventory/ playbooks/setup-notifications.yml \
  -e ntfy_topic=homelab-alerts

# Test notification system
curl -X POST http://192.168.0.124:80/homelab-test \
  -H "Content-Type: text/plain" \
  -d "🚀 Homelab installation completed successfully!"
```

## 🎯 Step 6: Post-Installation Configuration

### Initialize Media Services
```bash
# Configure Plex media library
# Access: http://your-ip:32400
# Follow Plex setup wizard

# Configure *arr applications
ansible-playbook -i inventory/ playbooks/configure-arr-stack.yml

# Set up Overseerr for media requests
# Access: http://your-ip:5055
```

### Set Up Business Applications
```bash
# Initialize Immich photo management
# Access: http://your-ip:2283
# Create admin user and configure mobile app

# Set up Odoo ERP
# Access: http://your-ip:8069
# Complete initial setup wizard

# Configure Paperless-ngx
# Access: http://your-ip:8000
# Set up document scanning workflows
```

### Configure File Sharing
```bash
# Set up SMB shares
ansible-playbook -i inventory/ playbooks/configure-file-shares.yml

# Access via:
# Windows: \\your-ip
# macOS: smb://your-ip
# Linux: mount -t cifs //your-ip/share /mount/point
```

## ✅ Step 7: Installation Verification

### Infrastructure Health Check
```bash
# Comprehensive health check script
cat > check-homelab-health.sh << 'EOF'
#!/bin/bash
echo "=== Homelab Health Check ==="

# Container status
echo "Container Status:"
for id in {100..133}; do
  if pct status $id 2>/dev/null | grep -q running; then
    name=$(pct config $id | grep hostname | cut -d' ' -f2)
    echo "  ✅ $id ($name): Running"
  elif pct status $id 2>/dev/null | grep -q stopped; then
    name=$(pct config $id | grep hostname | cut -d' ' -f2)
    echo "  🔴 $id ($name): Stopped"
  fi
done

# Service accessibility
echo -e "\nService Accessibility:"
services=(
  "192.168.0.243:3000:Grafana"
  "192.168.0.207:32400:Plex"
  "192.168.0.3:80:SWAG"
  "192.168.0.15:2283:Immich"
)

for service in "${services[@]}"; do
  IFS=':' read -r ip port name <<< "$service"
  if curl -s --max-time 5 http://$ip:$port >/dev/null; then
    echo "  ✅ $name: Accessible"
  else
    echo "  🔴 $name: Not accessible"
  fi
done

# Resource utilization
echo -e "\nResource Utilization:"
echo "  RAM: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "  Disk: $(df -h / | tail -1 | awk '{print $3"/"$2" ("$5" used)"}')"
echo "  Load: $(uptime | grep -o 'load average.*' | cut -d' ' -f3-5)"

echo -e "\n=== Health Check Complete ==="
EOF

chmod +x check-homelab-health.sh
./check-homelab-health.sh
```

### Monitoring Dashboard Verification
```bash
# Access Grafana and verify dashboards
echo "Grafana: http://your-ip:3000 (admin/admin)"
echo "Expected dashboards:"
echo "  - Proxmox VE Overview"
echo "  - Container Resource Usage"
echo "  - Media Stack Performance"
echo "  - Network Traffic Analysis"
echo "  - Application Performance"

# Check AlertManager configuration
curl -s http://192.168.0.201:9093/api/v1/status | jq '.data'
```

### Service Integration Testing
```bash
# Test service integrations
ansible-playbook -i inventory/ playbooks/test-integrations.yml

# Manual integration tests:
echo "Test Checklist:"
echo "  [ ] Plex can access media storage"
echo "  [ ] *arr services can communicate"
echo "  [ ] Monitoring collects all metrics"
echo "  [ ] Alerts are delivered to mobile"
echo "  [ ] VPN provides external access"
echo "  [ ] SSL certificates are valid"
```

## 🔄 Step 8: Backup and Maintenance Setup

### Configure Automated Backups
```bash
# Set up backup automation
ansible-playbook -i inventory/ playbooks/setup-backups.yml

# Configure backup retention
ansible-playbook -i inventory/ playbooks/configure-retention.yml \
  -e backup_retention_days=7
```

### Set Up Update Management
```bash
# Configure automated updates
ansible-playbook -i inventory/ playbooks/setup-updates.yml

# Schedule maintenance windows
crontab -e
# Add: 0 2 * * 0 /path/to/maintenance-script.sh
```

## 🎉 Installation Complete!

### Access Your Services

Your homelab is now fully operational! Access your services:

#### **Core Monitoring**
- **Grafana**: http://your-ip:3000 (admin/admin)
- **Prometheus**: http://your-ip:9090
- **Uptime Kuma**: http://your-ip:3001

#### **Media & Entertainment**
- **Plex**: http://your-ip:32400
- **Overseerr**: http://your-ip:5055
- **qBittorrent**: http://your-ip:8080

#### **Business Applications**
- **Immich Photos**: http://your-ip:2283
- **Paperless-ngx**: http://your-ip:8000
- **Odoo ERP**: http://your-ip:8069

#### **Security & Admin**
- **Vaultwarden**: http://your-ip:8080
- **File Server**: \\\\your-ip (SMB)
- **Cockpit**: http://your-ip:9090

### Next Steps

1. **📱 Install mobile apps** for Immich, Vaultwarden, ntfy
2. **🔐 Configure external access** via SWAG reverse proxy
3. **📊 Customize monitoring dashboards** in Grafana
4. **🎬 Set up media libraries** in Plex and *arr applications
5. **💼 Configure business workflows** in Odoo and Paperless

### Getting Help

- **Documentation**: This comprehensive documentation site
- **Logs**: Check container logs with `pct logs <container-id>`
- **Monitoring**: Use Grafana dashboards for troubleshooting
- **Community**: Share your setup on r/homelab

**Congratulations!** Your enterprise-grade homelab with 28 containers is now fully operational! 🚀🎊