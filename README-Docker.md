# React Now FC Academy - Docker Setup

This guide explains how to containerize and deploy the React Now FC Academy Next.js application using Docker.

## 🐳 Docker Configuration Files

### Core Files
- `Dockerfile` - Production container configuration
- `Dockerfile.dev` - Development container with hot reload
- `docker-compose.yml` - Production services orchestration
- `docker-compose.dev.yml` - Development services
- `.dockerignore` - Files to exclude from Docker context

### Supporting Files
- `nginx/nginx.conf` - Nginx reverse proxy configuration
- `scripts/docker-build.sh` - Automated build and deployment script
- `app/api/health/route.ts` - Health check endpoint

## 🚀 Quick Start

### Prerequisites
- Docker installed on your system
- Docker Compose installed
- At least 2GB RAM available

### Development Mode (Hot Reload)
```bash
# Make the build script executable
chmod +x scripts/docker-build.sh

# Run development container with hot reload
./scripts/docker-build.sh run-dev
```

The application will be available at `http://localhost:3000` with hot reload enabled.

### Production Mode
```bash
# Build and run production container
./scripts/docker-build.sh build-prod
./scripts/docker-build.sh run-prod
```

### Full Stack (App + Nginx + Redis + PostgreSQL)
```bash
# Run all services
./scripts/docker-build.sh run-full
```

Services available:
- **Next.js App**: `http://localhost:3000`
- **Nginx Proxy**: `http://localhost`
- **Redis**: `localhost:6379`
- **PostgreSQL**: `localhost:5432`

## 📋 Available Commands

### Using the Build Script
```bash
./scripts/docker-build.sh [COMMAND]

Commands:
  build-prod     Build production Docker image
  run-prod       Run production container
  run-dev        Run development container with hot reload
  run-full       Run full stack (app + nginx + redis + postgres)
  stop           Stop all containers
  logs           Show container logs
  health         Perform health check
  cleanup        Clean up all Docker resources
  help           Show help message
```

### Using Docker Compose Directly
```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose up -d

# Full Stack
docker-compose --profile cache --profile database up -d

# Stop
docker-compose down
```

## 🏗️ Container Architecture

### Production Container
- **Base Image**: `node:18-alpine`
- **User**: Non-root user (`nextjs`)
- **Port**: 3000
- **Health Check**: `/api/health` endpoint
- **Output**: Standalone build (optimized size)

### Development Container
- **Base Image**: `node:18-alpine`
- **Features**: Hot reload, volume mounting
- **Port**: 3000
- **Environment**: Development mode

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Configuration (Optional)
```bash
POSTGRES_DB=reactnowfc
POSTGRES_USER=reactnowfc_user
POSTGRES_PASSWORD=reactnowfc_password
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
- **URL**: `http://localhost:3000/api/health`
- **Method**: GET
- **Response**: JSON with application status

Example response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600.5,
  "environment": "production",
  "version": "1.0.0",
  "memory": {
    "used": 45.67,
    "total": 128.0
  }
}
```

### Container Health Check
```bash
# Check container health
docker ps

# View health logs
docker inspect react-nowfc-academy | grep Health -A 10
```

## 🌐 Nginx Configuration

The included Nginx configuration provides:
- **Reverse Proxy**: Routes requests to Next.js app
- **Static File Caching**: Optimized caching for static assets
- **Gzip Compression**: Reduces response sizes
- **Rate Limiting**: Prevents abuse
- **Security Headers**: Adds security headers
- **SSL Support**: Ready for HTTPS (configuration commented out)

### Enable Nginx
```bash
# Run with Nginx profile
docker-compose --profile production up -d
```

## 🗃️ Data Persistence

### Volumes
- **Redis Data**: `react-nowfc-redis-data`
- **PostgreSQL Data**: `react-nowfc-postgres-data`
- **Uploads**: `./public/uploads:/app/public/uploads`

### Backup Data
```bash
# Backup PostgreSQL
docker exec react-nowfc-postgres pg_dump -U reactnowfc_user reactnowfc > backup.sql

# Backup Redis
docker exec react-nowfc-redis redis-cli BGSAVE
```

## 🔒 Security Features

### Container Security
- **Non-root User**: Application runs as non-root user
- **Minimal Base**: Alpine Linux for reduced attack surface
- **Health Checks**: Automated health monitoring
- **Resource Limits**: Configurable resource constraints

### Nginx Security
- **Security Headers**: X-Frame-Options, XSS Protection, etc.
- **Rate Limiting**: Prevents DoS attacks
- **Hidden Server Info**: Exposes minimal server information

## 🚀 Deployment Options

### Option 1: Single Container
```bash
docker run -d \
  --name react-nowfc-academy \
  -p 3000:3000 \
  -e NODE_ENV=production \
  react-nowfc-academy:latest
```

### Option 2: Docker Compose
```bash
docker-compose up -d
```

### Option 3: With Nginx
```bash
docker-compose --profile production up -d
```

## 🐛 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker logs react-nowfc-academy

# Check if port is in use
netstat -tulpn | grep :3000
```

#### Build Fails
```bash
# Clean build
docker system prune -f
docker-compose build --no-cache
```

#### Health Check Fails
```bash
# Manual health check
curl http://localhost:3000/api/health

# Check container health
docker ps
```

#### Hot Reload Not Working
```bash
# Ensure proper volume mounting
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

### Performance Issues
```bash
# Monitor resource usage
docker stats

# Check memory usage
docker exec react-nowfc-academy node -e "console.log(process.memoryUsage())"
```

## 📈 Optimization

### Image Size Optimization
- Multi-stage builds reduce final image size
- Alpine Linux base image
- `.dockerignore` excludes unnecessary files

### Performance Optimization
- Nginx static file caching
- Gzip compression
- Rate limiting
- Health checks for load balancers

### Production Best Practices
- Use specific image tags
- Implement proper logging
- Monitor container health
- Regular security updates

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t react-nowfc-academy .
      - name: Run tests
        run: docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📞 Support

For issues with the Docker setup:
1. Check container logs: `docker logs react-nowfc-academy`
2. Verify port availability: `netstat -tulpn | grep :3000`
3. Check health endpoint: `curl http://localhost:3000/api/health`
4. Review this documentation for common solutions

## 📝 Additional Notes

- The application supports both development and production Docker configurations
- Redis and PostgreSQL are optional and can be enabled via Docker Compose profiles
- The health check endpoint provides monitoring and load balancer integration
- Nginx configuration is production-ready with SSL support (certificates required)
