# Game of Sword Kings 🗡️👑

A biblical knowledge quiz game that combines learning with competitive gameplay.

## Overview

Game of Sword Kings is an interactive web application that helps users deepen their understanding of scripture through engaging quizzes and competitive gameplay. Players can test their biblical knowledge, earn points, and compete with others on the global leaderboard.

## Features

- **📚 Biblical Knowledge Quizzes**: Explore scripture through carefully crafted questions spanning both Old and New Testaments
- **🏆 Points & Achievements**: Earn points as you progress through different difficulty levels
- **🌍 Global Leaderboard**: Compete with other believers worldwide
- **👤 User Profiles**: Track your progress and customize your profile
- **📱 Responsive Design**: Play on any device - mobile, tablet, or desktop

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase
- **Build Tool**: Vite
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd game-of-sword-kings
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Game Structure

### Levels
- **Level 1**: The Basics - Fundamental biblical knowledge
- **Level 2**: Advanced Concepts - Deeper theological understanding
- **Level 3**: Expert Challenges - Complex scriptural analysis

### Points System
- Points are awarded based on:
  - Correct answers
  - Completion time
  - Difficulty level
  - Consecutive correct answers (combo bonus)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── types/         # TypeScript type definitions
└── integrations/  # Third-party integrations
```

## Environment Variables

The following environment variables are required:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Visit our [FAQ page](/faq)
- Contact us through the [Support page](/support)
- Check our [Study Guide](/study-guide) for game tips

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to our community of players who make this game engaging and competitive

---

Project URL: https://lovable.dev/projects/185e2534-5c3e-4491-9f9d-c8d4cc3ed789