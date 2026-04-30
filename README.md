# localhost3000

A lightweight mobile app to manage your Portainer instance without opening a browser.

## Features

- **Login/Config Screen** — Enter your Portainer URL, optionally save it locally, and connect
- **WebView Screen** — Full-screen WebView loading your Portainer dashboard with back navigation, pull-to-refresh, and disconnect button
- **Single Onboarding** — Shown once on first launch
- **Privacy First** — No data is sent to any remote server. Everything stays on your device

## Getting Started

```bash
npm install
npx expo start
```

## Tech Stack

- Expo 55 + React Native
- Expo Router (file-based routing)
- Zustand (persisted settings)
- React Native WebView
- TypeScript