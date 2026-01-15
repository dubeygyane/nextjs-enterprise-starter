# Next.js 16 Enterprise Starter

A production-ready Next.js application template featuring robust authentication, a protected dashboard, static blog generation, and a fully integrated dark mode system. Built with modern best practices for performance and scalability.

## 🚀 Features

- **🔐 Advanced Authentication**
  - Edge-compatible Middleware protection
  - Secure HTTP-only cookie management
  - Automatic token rotation and refresh handling
  - Protected Service/API layers

- **🎨 Modern UI/UX**
  - **Dark/Light Theme**: Built-in support with automatic system detection
  - **Tailwind CSS v4**: Utility-first styling with custom design tokens
  - **Responsive Design**: Mobile-first layouts for all pages
  - **UI Components**: Reusable, accessible components (Buttons, Inputs, Skeletons)

- **⚡ High Performance**
  - **TanStack Query**: Server-state management with caching, optimistic updates, and background refetching
  - **Static Site Generation (SSG)**: Example implementation for high-performance content pages (`/posts`)
  - **Optimized Assets**: Font optimization and efficient layouts

- **🛡️ Developer Experience**
  - **TypeScript**: Strict type checking across the entire stack
  - **Form Handling**: React Hook Form integration with Zod schema validation
  - **Standardized Icons**: React Bootstrap Icons integration

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📂 Project Structure

```bash
├── app/
│   ├── api/              # standard Next.js API routes
│   ├── dashboard/        # Protected application area (requires auth)
│   ├── login/            # Authentication entry point
│   ├── posts/            # Static Site Generation example (Blog)
│   └── page.tsx          # Landing page
├── components/           
│   ├── providers/        # Context providers (Query, Theme)
│   └── ui/               # Shared UI components (Input, Button, ThemeToggle)
├── hooks/                
│   ├── auth/             # Authentication logic hooks
│   └── useFetch.ts       # Type-safe data fetching wrapper
├── lib/                  # Core configurations (Axios, Query Client)
├── middleware.ts         # Edge-based route protection
└── services/             # Business logic and API calls
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

Visit `http://localhost:3000` to view the application.

## 🔐 Credentials for Demo

Use these credentials to test the authentication flow:

- **Email**: `user@example.com`
- **Password**: `password123`

## 📖 Documentation

- See [HOOKS_USAGE.md](./HOOKS_USAGE.md) for detailed documentation on using the custom hooks.

## 📝 License

MIT
