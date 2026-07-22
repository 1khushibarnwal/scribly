# Scribly

A fast, no-fuss notes app. Sign up, write a note in seconds, and pick up right where you left off — from anywhere. Every note is private to your account, and you can summarize, tag, pin, share, and export your notes with a click.

**Live app:** [https://scribly.vercel.app](https://scribly.vercel.app)

---

## Features

- 🔐 **Authentication** — signup, login, logout with JWT access tokens + httpOnly refresh token cookies
- 📝 **Notes** — create, edit, delete, all scoped privately to your account
- 🔍 **Search & tags** — filter notes by keyword or click a tag to filter instantly
- 📌 **Pin notes** — keep important notes at the top of your dashboard
- ✨ **AI summarization** — one-click note summaries powered by Groq
- 🖊️ **Markdown support** — write in Markdown, preview it rendered
- 🔗 **Share links** — generate a public, read-only link for any note
- 📄 **Export** — download any note as `.txt` or `.pdf`
- 🌗 **Light/dark theme** — toggle and persists across sessions
- 👤 **Account settings** — edit profile, change password, forgot-password via email
- 🗑️ **Full account deletion** — permanently erase your account and all notes on request
- 🛡️ **Rate limiting** — Redis-backed request throttling to prevent abuse
- ✅ **Input validation** — Zod schemas validate every request server-side

---

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS + DaisyUI, Axios, react-hot-toast, react-markdown, jsPDF

**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, Zod, Upstash Redis (rate limiting), Groq SDK (AI summaries), Resend (transactional email)

**Hosting:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Project Structure

```
Scribly/
├── backend/
│   ├── src/
│   │   ├── config/          # DB, Groq, Resend, Upstash clients
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, validation, rate limiting
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routers
│   │   ├── validators/      # Zod schemas
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # NavBar, NoteCard, ProtectedRoute, etc.
│   │   ├── context/         # AuthContext, AuthProvider, useAuth
│   │   ├── pages/           # Landing, Login, Signup, Dashboard, etc.
│   │   ├── lib/             # Axios instance, utils
│   │   └── App.jsx
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

---

---

## Getting Started Locally

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB)
- API keys for [Groq](https://console.groq.com), [Resend](https://resend.com), and [Upstash Redis](https://console.upstash.com)

### 1. Clone the repo

```bash
git clone https://github.com/1khushibarnwal/Scribly.git
cd Scribly
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/notes_db?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_long_random_secret
JWT_REFRESH_SECRET=a_different_long_random_secret
GROQ_API_KEY=your_groq_key
RESEND_API_KEY=your_resend_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=5001
```

Run it:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

Run it:

```bash
npm run dev
```

Visit `http://localhost:5173`.

---

## Deployment

Scribly supports two deployment approaches:

### Option A — Split hosting (frontend + backend separately)

- **Backend (Render):** Root directory `backend`, build command `npm install`, start command `node src/server.js`. Add all backend `.env` variables in Render's dashboard, plus `NODE_ENV=production` and `CLIENT_URL` set to your deployed frontend URL.
- **Frontend (Vercel):** Root directory `frontend`, framework preset Vite. Add `VITE_API_URL` pointing to your deployed backend URL + `/api`.
- **MongoDB Atlas:** allow network access from anywhere (`0.0.0.0/0`) since Render doesn't use a fixed IP.

### Option B — Single host

The root `package.json` supports building and running both frontend and backend from one service:

```bash
npm run build   # installs both frontend & backend deps, builds the frontend
npm start        # runs the backend, which serves the built frontend as static files
```

Use this if deploying to a single platform (e.g. one Render web service) rather than splitting frontend/backend across two hosts. In this mode, `CLIENT_URL` and `VITE_API_URL` aren't needed since everything is served from the same origin.

---

## Security Notes

- Passwords are hashed with bcrypt before storage.
- Access tokens are short-lived (15 min) and never persisted; refresh tokens are httpOnly cookies, invalidated in the database on logout.
- All note routes are scoped to the authenticated user — no cross-account access is possible.
- All request bodies are validated server-side with Zod, independent of frontend validation.
- Password reset always returns a generic success message, regardless of whether the email exists, to avoid leaking registered emails.

---

## License

ISC
