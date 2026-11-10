# Nova0 ✦

> **Autonomous Full-Stack Web Application Builder**  
> Prompt, build, run, and iterate on full-stack Next.js applications in live cloud sandboxes with Google Gemini and Inngest Agent Kit.

---

## ⚡ Overview

**Nova0** is an open-source generative engineering platform inspired by modern AI devtools (like v0, Bolt, and Lovable). It translates natural language prompts into complete, functional Next.js applications running inside secure, isolated cloud microVMs.

Unlike tools that only generate static code snippets, Nova0 provisions real execution environments, installs dependencies, runs development servers, and presents live, interactive previews with continuous conversational iteration.

---

## 🏗️ Architecture & Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Web as Nova0 Web (Next.js 16)
    participant DB as Database (Prisma + Postgres)
    participant Queue as Inngest Background Engine
    participant Agent as Code Agent (Gemini API)
    participant Sandbox as E2B Cloud Sandbox

    User->>Web: Submits Prompt ("Build a SaaS Dashboard")
    Web->>DB: Creates Project & User Message
    Web->>Queue: Dispatches "code-agent/run" event
    Web-->>User: Redirects to Project Workspace & displays live shimmer
    Queue->>Sandbox: Spawns / Connects isolated E2B microVM
    Queue->>Agent: Invokes Code Agent with sandbox tools
    loop Agentic Execution Loop
        Agent->>Sandbox: createOrUpdateFile (writes Next.js components)
        Agent->>Sandbox: terminal ("bun install <deps>")
        Sandbox-->>Agent: Execution logs & status
    end
    Agent-->>Queue: Emits <task_summary> & parsed fragment files
    Queue->>DB: Saves generated Fragment & assistant message
    Queue-->>Web: Signals completion
    Web->>Sandbox: Streams live sandbox URL to iframe preview
    Web-->>User: Displays assistant reply & live interactive app
```

---

## ✨ Key Features

- **Prompt-to-Application**: Generate multi-component, interactive React/Next.js applications from high-level descriptions.
- **Isolated Cloud Sandboxes**: Powered by [E2B](https://e2b.dev) Firecracker microVMs for true package installation (`bun`), hot-reloading dev servers, and instant iframe previews.
- **Multi-Agent Orchestration**: Built with [`@inngest/agent-kit`](https://www.inngest.com/agent-kit) for step-by-step tool invocation, error recovery, and structured task summaries.
- **Powered by Google Gemini**: Advanced code reasoning using Gemini models for context-aware component trees, TypeScript typing, and Tailwind styling.
- **Modern Minimalist UI**: Sleek, high-contrast dark-mode interface built with Next.js 16 (Turbopack), Tailwind CSS v4, Radix UI, and Base UI.
- **Conversational Iteration**: Chat back and forth with Nova0 to refine styling, add features, and fix bugs across versions (Fragments).
- **Authentication & Persistence**: Secure user accounts with [Clerk](https://clerk.com) and PostgreSQL data persistence via [Prisma 7](https://www.prisma.io).

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) | Fast full-stack React framework |
| **Language & UI** | [React 19](https://react.dev), [TypeScript 5](https://www.typescriptlang.org) | Modern concurrent React with strict type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com) | Utility-first styling with accessible headless primitives |
| **Agent Engine** | [Inngest](https://www.inngest.com) & `@inngest/agent-kit` | Resilient agentic execution and background workflows |
| **LLM Provider** | [Google Gemini API](https://ai.google.dev) | High-speed, high-context code generation |
| **Sandbox Runtime**| [E2B Code Interpreter](https://e2b.dev) | Ephemeral Linux microVMs running Next.js sandboxes |
| **Database** | [PostgreSQL](https://www.postgresql.org) & [Prisma ORM](https://www.prisma.io) | Relational database schema with type-safe queries |
| **Authentication**| [Clerk](https://clerk.com) | Frictionless user authentication and session management |

---

## 📁 Repository Structure

```text
nova0/
├── prisma/
│   └── schema.prisma            # PostgreSQL data models (User, Project, Message, Fragment)
├── prisma.config.ts             # Prisma configuration and adapter settings
├── public/                      # Static brand assets and vector icons
│   └── icon.svg                 # Nova0 celestial emblem
├── src/
│   ├── app/
│   │   ├── (auth)/              # Clerk sign-in / auth routes
│   │   ├── (root)/              # Core dashboard and project workspace pages
│   │   │   ├── page.tsx         # Nova0 landing page & prompt composer
│   │   │   └── projects/[id]/   # Workspace: Chat history, sandbox preview & code diff
│   │   ├── api/
│   │   │   └── inngest/         # Inngest webhook route endpoint
│   │   ├── icon.svg             # App router favicon asset
│   │   └── layout.tsx           # Root HTML layout with providers (Clerk, Theme, Query)
│   ├── components/
│   │   ├── brand/               # Nova0 logo mark & typography components
│   │   ├── home/                # Glass navbar, background mesh, prompt input & templates
│   │   ├── projects/            # Message cards, streaming shimmer loader, web previews
│   │   └── ui/                  # Reusable Shadcn UI component library
│   ├── features/
│   │   ├── inngest/             # Inngest client, task handlers, agents, and utils
│   │   │   ├── client.ts        # Inngest instance configuration
│   │   │   ├── functions.ts     # Code agent pipeline & sandbox orchestration
│   │   │   └── utils.ts         # Agent message parsing & task summary extractors
│   │   └── projects/            # Project mutations, queries, and fragment parsers
│   └── lib/
│       ├── db.ts                # Prisma database client singleton
│       ├── prompt.ts            # System instructions and constraints for code agent
│       └── utils.ts             # Tailwind class merging utility
├── .env.example                 # Environment variables blueprint
├── package.json                 # Project dependencies & scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org) (v20+ recommended)
- [npm](https://www.npmjs.com) or [pnpm](https://pnpm.io)
- A running [PostgreSQL](https://www.postgresql.org) database (local or hosted, e.g. Neon, Supabase)
- An [Inngest](https://www.inngest.com) account (or use local Inngest Dev Server)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Jadeja-Karmadeepsinh/Nova0.git
cd Nova0
npm install
```

### 2. Configure Environment Variables

Create your local `.env` file from the provided template:

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:

```ini
# Database (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/nova0?schema=public"

# Clerk Authentication (https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# E2B Sandbox (https://e2b.dev)
E2B_API_KEY="e2b_..."

# Google Gemini API (https://aistudio.google.com)
GEMINI_API_KEY="AIzaSy..."

# Inngest (Optional for local development; required for production)
INNGEST_EVENT_KEY=""
INNGEST_SIGNING_KEY=""
```

### 3. Initialize the Database

Run Prisma to generate the TypeScript client and sync your database schema:

```bash
npx prisma generate
npx prisma db push
```

### 4. Start the Inngest Background Dev Server

In a separate terminal window, launch the Inngest local development server to process agent jobs:

```bash
npx inngest-cli@latest dev
```
> The Inngest dashboard will be available at [http://localhost:8288](http://localhost:8288).

### 5. Start the Nova0 Next.js Development Server

In your main terminal, start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js with Turbopack in development mode |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Runs the compiled production build |
| `npm run lint` | Runs ESLint checks across the codebase |
| `npx tsc --noEmit` | Runs strict TypeScript type checking |
| `npx prisma generate` | Regenerates the Prisma Client |
| `npx prisma db push` | Pushes the schema to the database without migrations |
| `npx prisma studio` | Opens the visual database management GUI |

---

## 🔒 Security & Sandboxing Note

All untrusted code generated by the LLM executes strictly inside [E2B](https://e2b.dev) microVMs isolated from the host server. The host Next.js server only acts as the orchestrator and proxy, ensuring that client applications cannot access server environment variables, host files, or database credentials.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
