# Heartly — AI-Powered Dating App 💖

Heartly is a modern, real-time dating application built with a focus on meaningful connections, powered by advanced AI and a seamless user experience.

## ✨ Features

- **AI-Enhanced Onboarding**: Smart profile creation that helps you showcase the best version of yourself.
- **Smart Matching**: Intelligent discovery using Google Gemini embeddings to find your most compatible matches.
- **Real-time Discovery**: Fluid, high-performance swiping cards and discovery feed.
- **AI Daily Picks**: Personalized daily recommendations generated specifically for you.
- **Live Chat**: Real-time messaging with instant updates and typing indicators.
- **Glassmorphism Design**: A premium, modern UI with smooth animations and haptic feedback.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Expo](https://expo.dev) / [React Native](https://reactnative.dev)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction) (File-based routing)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **UI Components**: Custom Glassmorphism design system
- **Icons**: [Expo Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) & Ionicons

### Backend & AI
- **Database & Serverless**: [Convex](https://www.convex.dev) (Real-time sync)
- **AI Engine**: [Google Gemini Pro](https://ai.google.dev/)
  - **Embeddings**: `gemini-embedding-001` (3072 dimensions)
  - **Insights**: `gemini-1.5-flash` for match explanations
- **Authentication**: [Clerk](https://clerk.com)

---

## 🚀 Application Workflow

### 1. Unified Authentication
Users sign in via Clerk, which provides secure, multi-factor authentication. On first login, users are automatically directed to the onboarding flow.

### 2. AI-Powered Onboarding
During onboarding, users provide basic details and interest sets.
- **Vector Generation**: Heartly uses Google Gemini to generate a high-dimensional embedding (3072-dim) based on the user's bio and interests.
- **Storage**: This vector is stored in Convex's `users` table with a native `vectorIndex`.

### 3. Discovery & Matching
- **Semantic Search**: The discovery feed uses vector similarity search to find other users whose "personality vectors" are nearest to the current user.
- **Real-time Swipes**: Swipes are processed instantly via Convex mutations, triggering match notifications immediately when a mutual interest occurs.

### 4. AI Insights
When a match is found, Heartly uses Gemini Flash to analyze the shared interests and bios of both users, generating a "Why you matched" summary to kickstart the conversation.

---

## 📦 Getting Started

### Prerequisites
- Node.js installed
- Convex account & project setup
- Google AI (Gemini) API Key
- Clerk account for authentication

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env.local` file in the root:
   ```env
   # Clerk
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   
   # Convex
   CONVEX_DEPLOYMENT=...
   EXPO_PUBLIC_CONVEX_URL=https://...
   ```

3. **Set Backend Secrets**
   Set your Gemini API key in Convex:
   ```bash
   npx convex env set GEMINI_API_KEY your_key_here
   ```

4. **Start Development**
   ```bash
   # Terminal 1: Frontend
   npx expo start

   # Terminal 2: Backend
   npx convex dev
   ```

---

## 📸 Project Structure

- `/app`: Expo Router screens and layouts.
- `/components`: Reusable UI components (Design System).
- `/convex`: Backend schema, mutations, actions, and Gemini integration.
- `/lib`: Themes, constants, and utility functions.
- `/providers`: Context providers for Theme, Convex, and Auth.
