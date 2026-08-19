# Kaseya Field Ops

A hands-on learning tool for MSP technicians to practice diagnosing, triaging, and solving realistic tickets across the Kaseya/Datto product stack. This is designed for active retrieval practice and scenario-based learning, not passive course reading.

## Features

- **Scenario Drills:** Branching, realistic ticket scenarios (e.g., offline endpoints, BEC email triage) where you must choose the next best action and receive immediate feedback.
- **Spaced Repetition Review:** A daily review queue that uses a spaced repetition algorithm (SM-2 style) to test your knowledge of Kaseya facts, configurations, and terminology.
- **Product Modules:** Covers Datto RMM, EDR, Backup products, INKY, DarkWeb ID, and more.
- **Local-First Architecture:** All progress, XP, and review schedules are saved entirely in your browser using local storage. No database required, completely private.

## Architecture

- **React + Vite:** Fast, modern frontend.
- **Tailwind CSS:** For clean, professional, custom styling.
- **Zustand:** For lightweight, persistent client-side state management.
- **Lucide Icons:** Clean iconography for a technical interface.

### Data Architecture

Content is structured in `src/data/` using strict TypeScript types:
- `modules.ts`: Defines the available product training modules.
- `scenarios.ts`: Contains the branching logic and steps for scenario drills.
- `deck.ts`: The flashcard database for spaced repetition.

To add new content, simply edit these files. The application UI will automatically reflect the new scenarios and flashcards.

## Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Adding Content from Kaseya University

You can manually add notes and scenarios from your own Kaseya University courses:
1. Open `src/data/deck.ts` to add new Q&A pairs for the review queue.
2. Open `src/data/scenarios.ts` to build out new branching situations based on your field experience or training.
*Note: Do not commit proprietary Kaseya University course material verbatim to a public repository.*

## Deployment to Vercel

This project is fully static and client-side, making it perfect for Vercel.

1. Create a new GitHub repository and push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/kaseya-field-ops.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click "Add New..." -> "Project".
4. Import the `kaseya-field-ops` repository.
5. Vercel will auto-detect the Vite framework. Click **Deploy**.

## Roadmap & Extension Points

- **Real-ticket ingest:** A UI form to ingest real sanitized tickets and convert them into scenario drills.
- **Shift Simulator:** A continuous queue mode that throws random scenarios at you from all unlocked modules.
- **Supabase Sync:** Optional module to sync local progress to a backend if multi-device support is needed.
