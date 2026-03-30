# Real Estate Favorites App

A full-stack web application built as part of the TechKraft assignment. Users can sign up, log in, browse properties, and manage their favorites list.

## Live Demo
https://tech-kraft-sushil.vercel.app/

## Tech Stack

| Layer      | Technology                                                     |
| ---------- | -------------------------------------------------------------- |
| Frontend   | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query     |
| Backend    | Node.js, Express 5, TypeScript, Passport.js (session-based)    |
| Database   | PostgreSQL, Prisma ORM                                         |
| Validation | Zod (shared on both frontend & backend)                        |
| UI         | shadcn/ui, Lucide React, Sonner (toasts)                       |



## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** — [Download](https://www.postgresql.org/download/) or use a hosted service like [Supabase](https://supabase.com/) / [Neon](https://neon.tech/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd techKraftAssignment
```

### 2. Set Up the Backend

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Open `backend/.env` and fill in your database connection:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> **Note:** If you're using a local PostgreSQL instance, a typical connection string looks like:
> `postgresql://postgres:yourpassword@localhost:5432/techkraft`

### 3. Set Up the Database

```bash
# Generate the Prisma client
npx prisma generate

# Run database migrations (creates tables)
npx prisma migrate dev

# Seed the database with sample properties
npx prisma db seed
```

### 4. Start the Backend Server

```bash
npm run start:dev
```

The API server will start on **http://localhost:3000**. You can verify by visiting http://localhost:3000/health.

### 5. Set Up the Frontend

Open a **new terminal** and run:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

The default `frontend/.env` should look like:

```env
VITE_API_BASE_URL=http://localhost:3000/api/
```

### 6. Start the Frontend Dev Server

```bash
npm run dev
```

The app will open at **http://localhost:5173**.

---

## Example Flows

### Flow 1: Sign Up → Log In → Browse Properties

1. Open http://localhost:5173 — you will be redirected to the **Sign In** page.
2. Click **"Sign Up"** in the footer to navigate to the registration page.
3. Fill in your details:
   - **Full Name:** `John Doe`
   - **Email:** `john@example.com`
   - **Password:** `password123`
4. Click **"Create Account"** — on success, you're redirected to the Sign In page.
5. Enter the credentials you just created and click **"Sign In"**.
6. You're now on the **Dashboard** showing all seeded properties.

### Flow 2: Add / Remove Favorites

1. After logging in, you'll see the **"All Properties"** tab with 8 sample properties.
2. Click the **heart icon** (♡) on any property card to mark it as a favorite.
3. The heart fills in and a success toast appears.
4. Click the **"My Favorites"** tab to see only your saved properties.
5. Click the heart icon again on a favorited property to **remove** it from your favorites.

### Flow 3: Session Persistence & Logout

1. After logging in, refresh the page — your session is preserved (no need to log in again).
2. Click the **"Logout"** button in the header.
3. You are redirected back to the Sign In page.
4. Attempting to visit `/dashboard` directly while logged out will redirect you to the Sign In page.

---

## API Endpoints

| Method | Endpoint            | Description                      | Auth Required |
| ------ | ------------------- | -------------------------------- | ------------- |
| POST   | `/api/auth/signUp`  | Register a new user              | No            |
| POST   | `/api/auth/signIn`  | Log in with email & password     | No            |
| POST   | `/api/auth/logout`  | End the current session          | Yes           |
| GET    | `/api/auth/me`      | Get the current logged-in user   | Yes           |
| GET    | `/api/properties`   | List all properties              | Yes           |
| GET    | `/api/favorite`     | List the user's favorites        | Yes           |
| POST   | `/api/favorite`     | Toggle a property as favorite    | Yes           |

---

## Key Design Decisions

- **Session-based auth** (via Passport.js + express-session) was chosen over JWT for simplicity and server-side session management using Prisma-backed session store.
- **TanStack Query** manages all server state (user session, properties, favorites), providing automatic caching, background refetching, and optimistic UI updates.
- **Protected / Public routes** ensure unauthenticated users can't access the dashboard, and authenticated users are auto-redirected away from login/signup pages.
- **Shared TypeScript interfaces** (`src/types/index.ts`) keep the `Property` and `User` types DRY across the frontend.
