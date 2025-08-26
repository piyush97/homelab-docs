# Quick Start

Get your 28-container homelab up and running quickly with these streamlined deployment options.

## 🚀 Choose Your Path

### Option 1: Full Deployment (Recommended)
Deploy the complete infrastructure in one go:

```bash
# Clone the GitOps repository
git clone https://github.com/piyush97/homelab-gitops.git
cd homelab-gitops

# Initialize Terraform
terraform init

# Review the deployment plan
terraform plan

# Deploy infrastructure (15-20 minutes)
terraform apply -auto-approve

# Configure services
cd ansible
ansible-playbook -i inventory playbooks/site.yml
```

### Option 2: Selective Deployment
Choose specific service categories:

```bash
# Media Stack Only
terraform apply -target=module.media_stack

# Monitoring Stack Only  
terraform apply -target=module.monitoring_stack

# Security Services Only
terraform apply -target=module.security_stack

# Business Applications Only
terraform apply -target=module.business_stack
```

### Option 3: Development Mode
For testing and experimentation:

```bash
# Create development workspace
terraform workspace new development

# Deploy with minimal resources
terraform apply -var="environment=dev"
```

## ⏱️ Deployment Timeline

### Full Deployment (20-25 minutes)
- **Infrastructure Provisioning**: 10-12 minutes (28 containers)
- **Service Configuration**: 8-10 minutes (Ansible playbooks)
- **Monitoring Setup**: 3-5 minutes (Grafana, Prometheus)
- **Validation & Testing**: 2-3 minutes

### Service-Specific Deployments
- **Media Stack**: 6-8 minutes (9 containers)
- **Monitoring Stack**: 5-7 minutes (9 containers)
- **Security Services**: 3-4 minutes (4 containers)
- **Business Apps**: 4-6 minutes (6 containers)

## 🔧 Quick Configuration

### Essential Variables
Create `terraform.tfvars`:

```hcl
# Proxmox Configuration
proxmox_api_url      = "https://your-proxmox:8006/api2/json"
proxmox_api_token_id = "terraform@pve!mytoken"
proxmox_api_token_secret = "your-secret-key"

# Network Configuration
network_bridge       = "vmbr0"
network_gateway      = "192.168.0.1"
network_cidr         = "192.168.0.0/24"

# Storage Configuration
shared_data_storage  = "local-zfs:subvol-10000-disk-0"
docker_storage       = "local-zfs:subvol-docker-volumes"
```

### Quick Ansible Setup
Create `ansible/inventory/hosts.yml`:

```yaml
all:
  children:
    media_stack:
      hosts:
        plex:
          ansible_host: 192.168.0.207
        qbittorrent:
          ansible_host: 192.168.0.132
    monitoring_stack:
      hosts:
        grafana:
          ansible_host: 192.168.0.243
        prometheus:
          ansible_host: 192.168.0.109
```

## 📊 Quick Validation

### Infrastructure Health Check
```bash
# Verify all containers are running
terraform show | grep "status.*running" | wc -l
# Should output: 28

# Check container resource usage
for id in {100..133}; do
  pct status $id 2>/dev/null | grep -q running && echo "Container $id: ✅"
done
```

### Service Accessibility
```bash
# Test web interfaces (adjust IPs as needed)
curl -I http://192.168.0.243:3000  # Grafana
curl -I http://192.168.0.207:32400 # Plex
curl -I http://192.168.0.3:80      # SWAG
```

### Monitoring Validation
```bash
# Check Prometheus targets
curl -s http://192.168.0.109:9090/api/v1/targets | jq '.data.activeTargets | length'

# Verify Grafana dashboards
curl -s http://admin:admin@192.168.0.243:3000/api/dashboards/home
```

## 🎯 Post-Deployment Tasks

### 1. Secure Admin Passwords
```bash
# Change default Grafana password
ansible-playbook -i inventory playbooks/secure-defaults.yml

# Update Vaultwarden admin token
ansible-playbook -i inventory playbooks/update-secrets.yml
```

### 2. Configure Monitoring Alerts
```bash
# Set up mobile notifications
ansible-playbook -i inventory playbooks/configure-alerts.yml

# Test alert delivery
curl -X POST http://192.168.0.124:80/homelab-test \
  -d "🚀 Homelab deployment successful!"
```

### 3. Initialize Services
```bash
# Configure media automation
ansible-playbook -i inventory playbooks/setup-media-stack.yml

# Set up business applications
ansible-playbook -i inventory playbooks/configure-business-apps.yml
```

## 🐛 Quick Troubleshooting

### Common Issues

**Container Failed to Start**
```bash
# Check container logs
pct logs <container-id>

# Restart container
pct restart <container-id>
```

**Network Connectivity Issues**
```bash
# Verify bridge configuration
ip link show vmbr0

# Check firewall rules
iptables -L -n | grep <container-ip>
```

**Storage Permission Problems**
```bash
# Fix storage permissions
chown -R 1000:1000 /path/to/storage
```

**Service Configuration Errors**
```bash
# Re-run Ansible configuration
ansible-playbook -i inventory playbooks/site.yml --limit <service-name>

# Check service logs
journalctl -u docker -f
```

## 📱 Access Your Services

Once deployment completes, access your services:

### Core Services
- **Grafana**: http://your-ip:3000 (admin/admin)
- **Plex**: http://your-ip:32400
- **Overseerr**: http://your-ip:5055
- **Uptime Kuma**: http://your-ip:3001

### Business Applications
- **Immich**: http://your-ip:2283
- **Paperless-ngx**: http://your-ip:8000
- **Odoo ERP**: http://your-ip:8069
- **Vaultwarden**: http://your-ip:8080

### Security & Admin
- **SWAG**: Reverse proxy (configure domains)
- **Wireguard**: VPN access (configure clients)
- **File Server**: SMB shares at \\\\your-ip

## 🚨 Emergency Procedures

### Rollback Deployment
```bash
# Terraform rollback
terraform destroy -target=<failed-resource>
terraform apply

# Ansible rollback
ansible-playbook -i inventory playbooks/rollback.yml
```

### Complete Cleanup
```bash
# WARNING: This destroys everything
terraform destroy -auto-approve
```

## 🎉 Success Indicators

Your deployment is successful when you see:
- ✅ **28 containers running** in Proxmox
- ✅ **Grafana dashboards** displaying metrics
- ✅ **Mobile notifications** from ntfy working
- ✅ **All services accessible** via web interfaces
- ✅ **Storage mounts** working correctly
- ✅ **VPN access** functional (if configured)

**Congratulations!** Your enterprise-grade homelab is now operational! 🎊

For detailed configuration and customization, proceed to the [Installation Guide](/getting-started/installation).