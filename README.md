# ZertteHub 🎓

**The Ultimate Navigation Platform for International University Admissions**

> *Empowering Kazakhstani students to achieve their academic dreams through technology-driven guidance.*

![Project Banner](https://placehold.co/1200x400/0f172a/ffffff?text=ZertteHub+Preview)

## 🚀 Project Overview

ZertteHub is a cutting-edge web application designed to simplify the complex process of applying to foreign universities. By bridging the gap between ambition and information, it provides students with a centralized, intelligent platform to manage their application journey.

Built with a focus on **performance**, **scalability**, and **user experience**, this project demonstrates the power of modern web development stacks in solving real-world educational challenges.

## ✨ Key Features

- **🤖 AI-Powered Insights**: Integrated with **Google Gemini** via the **Vercel AI SDK** to provide intelligent, context-aware guidance and "roasts" of student profiles.
- **🔐 Secure Authentication**: Robust user management system powered by **Supabase Auth**.
- **⚡ Real-time Data**: Instant updates and data synchronization using **Supabase Realtime** capabilities.
- **🎨 Modern UI/UX**: A stunning, responsive interface crafted with **Tailwind CSS v4** and **Framer Motion** for fluid animations.
- **📱 Fully Responsive**: Optimized for seamless experience across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

This project leverages the latest and most efficient technologies in the ecosystem:

- **Framework**: [Next.js](https://nextjs.org/) (App Router) - For server-side rendering and static generation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe, maintainable code.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - For rapid, utility-first design.
- **Backend & Database**: [Supabase](https://supabase.com/) - For PostgreSQL database, Authentication, and Storage.
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) & [Google Gemini](https://deepmind.google/technologies/gemini/) - For generative AI features.
- **Icons**: [Lucide React](https://lucide.dev/) - For beautiful, consistent iconography.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For production-ready animations.

## 🏗️ System Architecture

The application follows a modern, scalable architecture designed for performance and maintainability:

-   **Frontend**: Next.js 15 (App Router) for server-side rendering and optimized client-side navigation.
-   **Backend**: Serverless functions via Next.js API Routes, integrated with Supabase for backend-as-a-service (BaaS) capabilities.
-   **Database**: PostgreSQL (via Supabase) with Row Level Security (RLS) for robust data protection.
-   **AI Layer**: Vercel AI SDK orchestrating calls to Google Gemini, with context injection from the database for personalized responses.

## 📂 Project Structure

The codebase is organized to promote separation of concerns and scalability:

```
src/
├── app/              # Next.js App Router pages and API endpoints
│   ├── api/          # Backend logic (e.g., chat, auth)
│   ├── dashboard/    # Protected user routes
│   └── ...
├── components/       # Reusable UI components
│   ├── ui/           # Atomic design elements (buttons, inputs)
│   └── ...
├── lib/              # Core utilities and business logic
│   ├── ai-context.ts # AI context retrieval and prompt engineering
│   └── supabase.ts   # Database client configuration
├── types/            # TypeScript interfaces and type definitions
└── middleware.ts     # Edge middleware for authentication protection
```

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your .env file. See `.env.example` for a template.

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |
| `OPENAI_API_KEY` | API Key for AI services (Google Gemini configured via AI SDK) |

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/doublew300/zerttehub.git
    cd zerttehub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy the example environment file and fill in your credentials:
    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👨‍💻 Developer

**Developed with ❤️ by [doublew300](https://github.com/doublew300)**

I am a passionate Full Stack Developer focused on building high-impact web applications with modern technologies. I specialize in creating intuitive user experiences backed by robust architecture.

---

*Note: This project is a portfolio piece demonstrating proficiency in Next.js, React, and Cloud Services.*
