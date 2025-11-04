# 🤖 AGENT.md - Building with GitHub Copilot Agent

**Version**: 1.0  
**Date**: November 03, 2025  
**Goal**: Guide Copilot to generate 80% of the code/docs. Treat this repo as an "AI Agent Project"!

## 🚀 How to Use Copilot Agent in VSCode
1. Open **Copilot Chat** (`Ctrl+Shift+P` → "Copilot: Open Chat").
2. Use prefixes:
   - `@workspace`: References entire project (PRD.md, etc.).
   - `@git`: For commits.
   - `@terminal`: Run commands.
3. Inline: Highlight code → `Ctrl+I` → "Explain/Fix".
4. Always commit after generation: `@git Generate commit message`.

## 📝 Prompt Best Practices
- **Be Specific**: Reference files/PRD.
- **Chain**: Generate → Review → Refine.
- **Pro Tips**:
  - Add "with TypeScript, Zod validation, style component styling".
  - "Follow Airbnb ESLint rules".
  - "Include error handling and loading states".

## 🔧 Example Prompts (Copy-Paste!)
1. Setup:  
   `@workspace Initialize monorepo with npm, Vue 3 frontend, Express backend. Use Prisma for PostgreSQL. Add docker-compose.yml.`

2. Backend:  
   `@workspace In packages/backend, create Prisma schema from PRD.md tables. Add Excel export with exceljs styling.`

3. Frontend:  
   `@workspace Create AnimalList.vue with Pinia store, fetching from /animals..`

4. Docs:  
   `@workspace Generate API.md from backend routes. Include examples in JSON.`

5. Polish:  
   `@workspace Add tests: Vitest for components, Jest for API. Enforce with Husky hooks.`

6. Deploy:  
   `@workspace Create GitHub Actions for lint/test/build. Suggest Vercel for frontend.`

## 🎉 Motivation
- Let Copilot do boilerplate—you focus on architecture!
- Track progress in [CHANGELOG.md](CHANGELOG.md).
- Final: "This app was supercharged by Copilot Agent" in README.

> Pro Tip: After pasting a prompt, say "Explain your changes" for insights.

Badges: ![Copilot](https://img.shields.io/badge/Powered_by-GitHub_Copilot-purple)