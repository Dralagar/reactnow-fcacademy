#!/bin/bash

# React Now FC Academy Docker Build Script
# This script builds and runs the Docker containers for different environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  React Now FC Academy${NC}"
    echo -e "${BLUE}  Docker Build Script${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    print_status "Docker and Docker Compose are installed"
}

# Build production image
build_production() {
    print_status "Building production Docker image..."
    docker build -t react-nowfc-academy:latest .
    print_status "Production image built successfully"
}

# Run production container
run_production() {
    print_status "Starting production container..."
    docker-compose up -d app
    print_status "Production container started on http://localhost:3000"
}

# Run development container
run_development() {
    print_status "Starting development container with hot reload..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Run with all services (production + nginx + redis + postgres)
run_full_stack() {
    print_status "Starting full stack (app + nginx + redis + postgres)..."
    docker-compose --profile cache --profile database up -d
    print_status "Full stack started:"
    print_status "  - App: http://localhost:3000"
    print_status "  - Nginx: http://localhost"
    print_status "  - Redis: localhost:6379"
    print_status "  - PostgreSQL: localhost:5432"
}

# Stop all containers
stop_containers() {
    print_status "Stopping all containers..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    print_status "All containers stopped"
}

# Clean up containers and images
cleanup() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up Docker resources..."
        docker-compose down -v --rmi all
        docker system prune -f
        print_status "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Show logs
show_logs() {
    print_status "Showing logs..."
    docker-compose logs -f
}

# Health check
health_check() {
    print_status "Performing health check..."
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        print_status "Application is healthy ✓"
    else
        print_error "Application health check failed ✗"
        exit 1
    fi
}

# Show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build-prod     Build production Docker image"
    echo "  run-prod       Run production container"
    echo "  run-dev        Run development container with hot reload"
    echo "  run-full       Run full stack (app + nginx + redis + postgres)"
    echo "  stop           Stop all containers"
    echo "  logs           Show container logs"
    echo "  health         Perform health check"
    echo "  cleanup        Clean up all Docker resources"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build-prod    # Build production image"
    echo "  $0 run-prod      # Run production container"
    echo "  $0 run-dev       # Run development with hot reload"
    echo "  $0 run-full      # Run full stack"
}

# Main script logic
main() {
    print_header
    
    # Check Docker installation
    check_docker
    
    # Parse command line arguments
    case "${1:-help}" in
        "build-prod")
            build_production
            ;;
        "run-prod")
            run_production
            ;;
        "run-dev")
            run_development
            ;;
        "run-full")
            run_full_stack
            ;;
        "stop")
            stop_containers
            ;;
        "logs")
            show_logs
            ;;
        "health")
            health_check
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            show_usage
            ;;
    esac
}

# Run main function with all arguments
main "$@"
