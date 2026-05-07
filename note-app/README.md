# Note App

A simple note-taking web app built with React.js, Express.js, and PostgreSQL.

## Features
- Create notes
- Read / view all notes
- Delete notes

## Tech Stack
- **Frontend**: React.js + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL

## How to Run Locally

### 1. Setup PostgreSQL
Run `backend/setup.sql` in your PostgreSQL client.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# fill in your DATABASE_URL in .env
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173

## Deployment
- Backend → Railway
- Frontend → Vercel
