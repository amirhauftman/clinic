# 🐾 VetClinic Pro - Product Requirements Document (PRD)

**Version**: 1.0  
**Date**: November 03, 2025  
**Author**: [Your Name] (Built with GitHub Copilot Agent)  
**Status**: MVP Ready 🚀

## 🎯 Project Overview
A modern web app for veterinary clinics to track animal events and export detailed reports. Built as a full-stack solution with Vue.js frontend, Node.js/Express backend, and PostgreSQL database. Focus: Simplicity, reliability, and professional Excel exports.

**Goals**:
- Streamline event logging (visits, treatments, observations).
- Generate shareable Excel reports for animal histories.
- Demonstrate clean code, best practices, and AI-assisted development.

**Non-Functional Requirements**:
- Responsive UI (mobile-friendly).
- < 2s API response time.
- Secure (input validation, CORS).
- Accessible (ARIA labels, keyboard navigation).

## 👥 User Personas
| Persona | Description | Needs |
|---------|-------------|-------|
| **Vet Technician** 🩺 | Daily user entering events. | Quick forms, intuitive UI, fast exports. |
| **Clinic Admin** 📊 | Reviews records, shares reports. | Full animal list, detailed exports, search/filter. |
| **Pet Owner** 🐶 (Future) | Views shared reports. | Read-only PDF/Excel downloads. |

## 📋 Features & User Stories
### MVP (Must-Have)
| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-01 | As a vet, I want to view all animals so I can select one. | - Homepage lists animals in a table.<br>- Columns: Name, Species, Age (calculated from birth date).<br>- "Add Animal" button opens modal. |
| US-02 | As a vet, I want to add a new animal so records start fresh. | - Form: Name (text), Species (text), Birth Date (datepicker).<br>- Validation: Required fields, valid date.<br>- Success toast on save. |
| US-03 | As a vet, I want to view an animal's details and events. | - Detail page shows animal info + event list.<br>- Events sorted by date (newest first).<br>- "Add Event" form. |
| US-04 | As a vet, I want to add events for an animal. | - Form: Type (dropdown: Visit/Treatment/Observation), Description (textarea), Date (datepicker).<br>- Auto-set to today if blank.<br>- Real-time update without refresh. |
| US-05 | As an admin, I want to export an animal's events to Excel. | - Button downloads `.xlsx` file.<br>- Styled: Headers bold, auto-sized columns, clinic header.<br>- Columns: Date, Type, Description. |

### Nice-to-Haves (Stretch)
- Search/filter animals.
- Event editing/deletion.
- PDF export fallback.

## ✅ Success Metrics
- 100% spec compliance.
- Zero console errors.
- Excel file opens perfectly in Excel/Google Sheets.
- Built in <6 hours with Copilot Agent.

## 🔍 Out of Scope
- Authentication (keep simple for test).
- Multi-clinic support.
- Real-time collab (no WebSockets).

Badges: ![Vue.js](https://img.shields.io/badge/Vue.js-3-green) ![Node.js](https://img.shields.io/badge/Node.js-Express-blue) ![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-blue)

> Built 80% with GitHub Copilot 🚀 See [AGENT.md](AGENT.md) for AI prompts.