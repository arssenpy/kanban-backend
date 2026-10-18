# Kanban — Backend

REST API for a Kanban application with boards, lists, and cards. Supports drag-and-drop reordering, JWT authentication, and per-user data isolation.

**Live API:** [kanban-backend-production-7623.up.railway.app]
**Frontend repository:** [[frontend repo link](https://github.com/arssenpy/kanban-frontend)]

![Demo](docs/DnDGIF.gif)

## Tech Stack

- **Node.js** + **Express** — HTTP server
- **TypeScript** — type safety
- **PostgreSQL** — database
- **Prisma ORM** — database access, migrations
- **Zod** — request validation
- **JWT** (`jsonwebtoken`) + **bcrypt** — authentication
- **Layered Architecture** (routes → controllers → services)

## Architectural Decisions

- **Layered Architecture** instead of "fat" controllers: `routes` handle only routing, `controllers` handle the HTTP layer (parsing requests, status codes), and `services` handle business logic and Prisma calls. This separates concerns and makes services easy to test independently of Express.
- **Centralized error handling** via `errorMiddleware` + a custom `AppError` class, instead of scattered `try/catch` blocks in every controller. Prisma-specific errors (`P2025`, `P2002`, `P2003`) are mapped to meaningful HTTP status codes.
- **Zod validation at the middleware level**, before the request reaches the controller — controllers stay focused on business logic, not input checking.
- **Per-user data isolation**: every request to `List`/`Card` verifies that the parent `Board` belongs to the user from the JWT token, not just that the user is authenticated — otherwise anyone could access another user's board by guessing its `id`.
- **Bulk reorder via Prisma transactions**: when dragging cards/lists, multiple position updates happen atomically (`$transaction`) to avoid an inconsistent state on partial failure.

## Project Structure

```
src
├── config/          # Prisma Client setup
├── controllers/      # HTTP layer: req/res, status codes
├── middlewares/       # auth, validate, error handling, asyncHandler
├── routes/           # Routing
├── services/          # Business logic, database access
├── utils/            # AppError, JWT helpers
├── validators/         # Zod schemas
└── index.ts           # Entry point
prisma/
└── schema.prisma       # User, Board, List, Card models
```

## Data Model

```
User 1───* Board 1───* List 1───* Card
```

Each board belongs to one user; lists and cards are tied to a board/list respectively, with cascading deletes.

## Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL (locally or via Docker)

### Steps

```bash
git clone <backend-repo-url>
cd <backend-repo-folder>
npm install
```

Create a `.env` file based on `.env.example`:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/kanban_db?schema=public"
JWT_SECRET="your-random-secret-here"
JWT_EXPIRES_IN="7d"
PORT=5000
```

Apply migrations and generate the Prisma Client:

```bash
npx prisma migrate dev
```

Start the dev server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Endpoints

| Method | Path                  | Description          | Auth required |
| ------ | --------------------- | -------------------- | ------------- |
| POST   | `/api/auth/register`  | Register             | —             |
| POST   | `/api/auth/login`     | Log in               | —             |
| GET    | `/api/auth/me`        | Current user         | ✅            |
| GET    | `/api/boards`         | List user's boards   | ✅            |
| POST   | `/api/boards`         | Create a board       | ✅            |
| GET    | `/api/lists?boardId=` | List a board's lists | ✅            |
| POST   | `/api/lists`          | Create a list        | ✅            |
| PATCH  | `/api/lists/reorder`  | Reorder lists        | ✅            |
| GET    | `/api/cards?listId=`  | List a list's cards  | ✅            |
| POST   | `/api/cards`          | Create a card        | ✅            |
| PATCH  | `/api/cards/reorder`  | Reorder/move a card  | ✅            |

Authenticated requests require the `Authorization: Bearer <token>` header.

## Deployment

The live API runs on free tiers that don't expire:

- **Database** — [Neon](https://neon.tech) serverless PostgreSQL (free plan, scales to zero when idle).
- **API** — [Render](https://render.com) free web service, configured by [`render.yaml`](render.yaml) (Blueprint).
  `npm start` runs `prisma migrate deploy` before starting the server, so every deploy applies pending migrations.
- **Keep-alive** — a [cron-job.org](https://cron-job.org) job calls `GET /` every 14 minutes, so the free Render instance doesn't spin down. The health route doesn't touch the database, so Neon can still sleep.

Environment variables on Render:

| Variable         | Value                                                     |
| ---------------- | --------------------------------------------------------- |
| `DATABASE_URL`   | Neon connection string (`...?sslmode=require`)            |
| `DIRECT_URL`     | Optional: non-pooled Neon string, used by `prisma migrate` |
| `JWT_SECRET`     | Generated by Render                                       |
| `JWT_EXPIRES_IN` | `7d`                                                      |
| `FRONTEND_URL`   | `https://kanban-mu-ten.vercel.app` (comma-separated list) |

## Scripts

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Run in development mode (with auto-restart) |
| `npm run build`     | Compile TypeScript to `dist/`               |
| `npm start`         | Run the compiled build                      |
| `npx prisma studio` | Visual database browser                     |
