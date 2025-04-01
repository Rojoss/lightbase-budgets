Lightbase assessment - team budgets
By: Jos Roossien

## Requirements
* Node V18+
* Database connection details

## Installation
1. Add database connection string to `.env`
2. Install dependencies `pnpm i` (or `npm i`)

## Running locally
`pnpm run dev`

## Running tests
`pnpm run test:unit`

## Database
The project is using Drizzle ORM with a Neon DB (using PostgreSQL)

Create migrations:
`npx drizzle-kit generate`

Pushing migrations:
`npx drizzle-kit push`

Seeding database:
`npx tsx src/database/seed/ducks-seed.ts`

## Tech stack & tools
* NextJS
* Typescript
* ESlint
* Prettier
* Drizzle ORM
* Zod
* Neon Database
* ChadCN components
* Vitest