
---

### **API.md** (API Documentation)

```markdown
# 🔌 API.md - REST API Documentation

**Base URL**: `http://localhost:3000/api` (or production URL)  
**Version**: 1.0  
**Auth**: None (test scope)  
**Format**: JSON  

## 📡 Endpoints
| Method | Endpoint | Description | Params/Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/animals` | List all animals | - | 200: Array of animals (id, name, species, birthDate, age) |
| POST | `/animals` | Create animal | Body: `{ name: string, species: string, birthDate: string (YYYY-MM-DD) }` | 201: Created animal |
| GET | `/animals/:id` | Get animal + events | Path: `id` (int) | 200: `{ animal: {...}, events: [...] }` |
| POST | `/animals/:id/events` | Add event | Path: `id`<br>Body: `{ type: "Visit\|Treatment\|Observation", description: string, eventDate: string }` | 201: Created event |
| GET | `/animals/:id/export` | Export Excel | Path: `id`<br>Query: optional `format=xlsx` | 200: Streamed `.xlsx` file (Content-Type: application/vnd.openxmlformats) |

## 📝 Examples
### Create Animal (cURL)
```bash
curl -X POST http://localhost:3000/api/animals \
  -H "Content-Type: application/json" \
  -d '{"name": "Whiskers", "species": "Cat", "birthDate": "2022-01-01"}'