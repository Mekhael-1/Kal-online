# Kal Online: website

Vite + React + TypeScript + React Router + Framer Motion + CSS Modules.

## Run
    npm install
    npm run dev        # http://localhost:5173

## Local mock data (default)
Stats and rankings use local mock data, so no backend is needed and there are no proxy errors.
When the Express server exists, set `VITE_USE_API=true` in `.env` and restart `npm run dev`.

## Routes
    /           Home (hero video + live server stats)
    /download   Mirrors, install steps, system requirements
    /rankings   Podium, search, level / PvP tabs
    /schedule   Next-event countdown + weekly table (server time = UTC)
    /wiki       Kalypedia: features, class skills, bosses
    /login /register   Auth forms (client-side validation only)

## Where to edit
    src/config/site.ts      name, hero video, Discord invite, download links, nav
    src/data/mock.ts        server stats + ranked players (replace with API)
    src/data/content.ts     schedule, wiki features/skills/bosses
    src/styles/tokens.css   colors, fonts, glow

## Structure
    src/components/  Layout, Navbar, Footer, Hero, Stats, Embers, ui/ (Button, Tabs, Field, PageHeader)
    src/pages/       Home, Download, Rankings, Schedule, Wiki, Auth, NotFound
    src/hooks/       useStats, useNow
    src/utils/       schedule.ts (countdown math)

## Notes
Production hosting needs a rewrite so every path serves index.html (e.g. Netlify _redirects, Nginx try_files),
otherwise refreshing /rankings returns 404.

## Roadmap
Gallery/Media section | Express API in server/ (stats, rankings, auth)
