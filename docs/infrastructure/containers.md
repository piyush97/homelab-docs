# Live Container Inventory

Snapshot verified against Proxmox on October 8, 2026. Runtime IPs and states can change; verify them before operating services. This inventory is separate from Terraform declarations and is not a deployment plan.

**23 containers: 16 running, 7 stopped.**

| CTID | Service | Runtime IP | State |
|---:|---|---|---|
| 100 | Qdrant | `192.168.0.76` | Running |
| 101 | Home Assistant | `192.168.0.132` | Running; Docker host |
| 103 | WireGuard | `192.168.0.217` | Running; tunnel `10.0.0.1/24` |
| 104 | Jellyfin | `192.168.0.33` | Running |
| 105 | Pi-hole | `192.168.0.23` | Running; DNS only |
| 106 | Trilium | `192.168.0.106` | Running |
| 107 | Hermes Agent | `192.168.0.136` | Running |
| 108 | Actual Budget | `192.168.0.247` | Running |
| 110 | MQTT | DHCP; unknown | Running |
| 111 | Caddy | `192.168.0.97` | Running; reverse proxy |
| 112 | autobrr | DHCP; unknown | Stopped |
| 113 | 9router | `192.168.0.45` | Running |
| 114 | Monitoring | `192.168.0.229` | Running |
| 115 | Plex | `192.168.0.207` | Running |
| 116 | Redis | DHCP; unknown | Running |
| 117 | Immich | `192.168.0.111` | Running |
| 118 | Paperclip | DHCP; unknown | Stopped |
| 128 | Paperless-ngx | `192.168.0.36` | Stopped |
| 201 | Prowlarr | `192.168.0.40` | Stopped |
| 202 | Sonarr | `192.168.0.41` | Stopped |
| 203 | Radarr | `192.168.0.42` | Stopped |
| 204 | qBittorrent | `192.168.0.43` | Running |
| 205 | Seerr | `192.168.0.44` | Stopped |

## Verified layout notes

- LAN is `192.168.0.0/24` on `vmbr0`, via router `192.168.0.1`; Pi-hole provides DNS only.
- WireGuard is on the LAN and has tunnel interface `10.0.0.1/24`. The older `10.10.10.0/24` dual-bridge diagram is stale.
- Caddy is the reverse proxy. Exact upstream routes are not included here.
- TrueNAS media is mounted on Proxmox and passed to Jellyfin; Jellyfin transcodes use `/vault`.
- Local ZFS mirror uses two 12 TB disks attached over native SATA.
- Proxmox inventory is authoritative for live state. Terraform may differ; review drift before any apply.
