# 🐾 VetClinic Pro

[![Vue.js](https://img.shields.io/badge/Vue-3-brightgreen)](https://vuejs.org)
[![Node.js](https://img.shields.io/badge/Node-Express-blue)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-336791)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com)
[![Copilot](https://img.shields.io/badge/Built_with-Copilot-purple)](https://github.com/features/copilot)

**A professional veterinary event tracker with Excel exports.** Built in <6 hours using GitHub Copilot Agent for 80% of code/docs.


## 🚀 Quickstart

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn
- PostgreSQL (if not using Docker)

### Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/amirhauftman/clinic.git
cd clinic
```

2. Start the PostgreSQL database:
```bash
docker-compose up -d
```

3. Install dependencies:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd packages/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

4. Set up the backend:
```bash
cd packages/backend
# Copy the example env file and update with your settings
cp .env.example .env
# Run database migrations
npx prisma migrate dev
```

5. Start the development servers:

Backend:
```bash
cd packages/backend
npm run start:dev
```

Frontend:
```bash
cd packages/frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📚 Docs
- [PRD.md](PRD.md) - Requirements
- [AGENT.md](AGENT.md) - Copilot Guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Design
- [API.md](API.md) - Endpoints

## 🛠️ Tech Stack
- Frontend: Vue 3 + Pinia + Axios
- Backend: Express + Prisma + exceljs + Zod
- DB: PostgreSQL (Docker)
- Tools: npm, ESLint, Husky, Vitest/Jest

**Submission Note**: Fully compliant with test specs. Excel reports styled for professionalism.