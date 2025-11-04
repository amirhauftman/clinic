# 🏗️ ARCHITECTURE.md - System Architecture

**Version**: 1.0  
**Date**: November 03, 2025  
**Tech Decisions**: Modern, scalable, dev-friendly stack.

## 📊 High-Level Overview
Monorepo with separated concerns:
- **Frontend**: Client-side rendering, reactive UI.
- **Backend**: REST API, business logic, DB access.
- **Database**: Persistent storage.
- **DevOps**: Docker for local dev, CI/CD ready.

## 🗺️ Diagram
```mermaid
graph TD
    subgraph Frontend [Vue 3 + Vite]
        A[AnimalList.vue] -->|Pinia Store| B[API Client (Axios)]
        C[AnimalDetail.vue] --> B
        D[ExportButton.vue] --> B
    end

    B -->|REST Calls| E[Backend: Express Server]
    
    subgraph Backend [Node.js + TypeScript]
        E -->|Prisma ORM| F[PostgreSQL DB]
        E -->|exceljs| G[Excel Stream]
    end

    subgraph Docker
        E & F
    end

    style Frontend fill:#f9f,stroke:#333
    style Backend fill:#bbf,stroke:#333