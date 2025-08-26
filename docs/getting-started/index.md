# Getting Started

Welcome to the Enterprise Homelab documentation! This guide will help you understand, deploy, and manage a sophisticated 28-container infrastructure using modern GitOps practices.

## 🎯 What You'll Learn

This documentation covers everything needed to build and operate an enterprise-grade homelab:

- **Infrastructure as Code** using Terraform and Ansible
- **Advanced Monitoring** with Prometheus, Grafana, Loki, and AlertManager  
- **GitOps Workflows** with automated deployment and rollback capabilities
- **Container Orchestration** across 28 specialized services
- **Security Best Practices** including network segmentation and VPN access

## 📋 Prerequisites

Before getting started, ensure you have:

### Hardware Requirements
- **Proxmox VE 8.14+** cluster with sufficient resources
- **Minimum 32GB RAM** (current allocation: 30.75GB)
- **10TB+ storage** for media and data
- **Dual network interfaces** for VPN routing (optional)

### Software Requirements
- **Terraform >= 1.6.0**
- **Ansible >= 2.15.0** 
- **Git** with SSH key configuration
- **Basic knowledge** of Linux, containers, and networking

### Access Requirements
- **Proxmox API access** with appropriate permissions
- **GitHub account** for repository hosting and CI/CD
- **Domain name** (optional, for SSL certificates and external access)

## 🚀 Quick Start Options

Choose your preferred approach:

### Option 1: Full Deployment
Deploy the complete 28-container infrastructure from scratch using the GitOps workflow.

[👉 Start Full Deployment](/getting-started/installation)

### Option 2: Selective Deployment  
Deploy specific service categories (media, monitoring, security, business) based on your needs.

[👉 Choose Services](/infrastructure/containers)

### Option 3: Learning Mode
Explore the architecture and understand the GitOps implementation without deploying.

[👉 Architecture Overview](/infrastructure/)

## 📚 Documentation Structure

Our documentation is organized into focused sections:

### 🏗️ Infrastructure
- Container architecture and resource allocation
- Network configuration and storage setup
- Security policies and firewall rules

### ⚙️ GitOps
- Terraform Infrastructure as Code
- Ansible configuration management  
- CI/CD pipeline setup and workflows

### 📊 Monitoring & Observability
- Prometheus metrics collection
- Grafana dashboard configuration
- Loki log aggregation and analysis
- AlertManager notification setup

### 🎬 Services
- Detailed configuration for each service category
- Integration patterns and best practices
- Troubleshooting and maintenance guides

## ⚡ Quick Commands Reference

Essential commands for managing your homelab:

```bash
# Infrastructure Management
terraform plan    # Preview infrastructure changes
terraform apply   # Apply infrastructure changes
terraform destroy # Remove infrastructure (careful!)

# Configuration Management  
ansible-playbook -i inventory playbooks/site.yml  # Deploy all services
ansible-playbook -i inventory playbooks/monitoring.yml  # Deploy monitoring only

# Service Management
systemctl status docker  # Check Docker service
docker ps -a            # List all containers
docker logs container   # View container logs

# Monitoring
curl -s http://localhost:9090/metrics | head  # Check Prometheus
journalctl -f -u docker                       # Follow Docker logs
```

## 🎯 Next Steps

1. **Review Prerequisites** - Ensure your environment meets requirements
2. **Choose Deployment Method** - Full, selective, or learning mode
3. **Follow Installation Guide** - Step-by-step deployment process
4. **Configure Monitoring** - Set up observability and alerting
5. **Customize Services** - Adapt configurations to your needs

## 💡 Best Practices

Keep these principles in mind:

- **Infrastructure as Code**: All changes should go through version control
- **Documentation**: Update docs when making infrastructure changes  
- **Testing**: Use staging environments for significant changes
- **Monitoring**: Implement comprehensive observability from day one
- **Security**: Follow least-privilege and network segmentation principles
- **Automation**: Automate repetitive tasks and maintenance procedures

## 🆘 Getting Help

If you encounter issues:

1. **Check Troubleshooting Guide** - Common issues and solutions
2. **Review Logs** - Use centralized logging via Grafana/Loki
3. **GitHub Issues** - Report bugs or request features
4. **Community** - Share experiences with r/homelab community

---

Ready to begin? Choose your path and let's build something amazing! 🚀