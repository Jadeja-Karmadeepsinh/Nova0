# Nova0

An AI-powered full-stack web application builder built with Next.js, E2B sandboxes, Inngest agent workflows, and Google Gemini.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (Turbopack) & [React 19](https://react.dev)
- **Styling**: Tailwind CSS v4 & Radix UI / Base UI
- **Authentication**: [Clerk](https://clerk.com)
- **Database & ORM**: PostgreSQL with [Prisma](https://www.prisma.io)
- **AI Agent & Workflows**: [Inngest Agent Kit](https://www.inngest.com) & Google Gemini API
- **Execution Sandbox**: [E2B Code Interpreter](https://e2b.dev)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in your API keys and credentials:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: Clerk authentication keys
- `GEMINI_API_KEY`: Google Gemini API key
- `E2B_API_KEY`: E2B Sandbox API key

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
