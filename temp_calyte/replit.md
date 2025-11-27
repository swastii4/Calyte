# Calyte Mental Wellness App

## Overview

Calyte is a comprehensive mental wellness application that combines meditation, mood tracking, AI-powered therapy chat, community support, and therapeutic games. The app features a distinctive glassmorphic design with animated gradient backgrounds inspired by modern wellness apps like Calm and Headspace. Built as a full-stack React application with Express backend, it provides users with tools for meditation, breathing exercises, wellness assessments, goal tracking, group sessions, support circles, and an interactive music playlist.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn UI component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom theme configuration
- Custom glassmorphic design system with animated gradient backgrounds
- Component aliases configured via tsconfig paths (@/components, @/lib, @/hooks)

**State Management Strategy**
- Context API for global theme state (ThemeContext for dark mode, breathing animations, audio)
- Local component state using React hooks for feature-specific UI state
- TanStack Query for all server-side data with optimistic updates and caching
- No Redux or external state management libraries

**Key Design Patterns**
- Layout component wrapper pattern for consistent page structure with animated backgrounds and navigation
- Custom animated background system using CSS gradients with JavaScript-controlled position and scale
- Breathing animation synchronized with gradient movements for therapeutic effect
- Responsive design with mobile-first approach and collapsible navigation

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and routing
- TypeScript for type safety across the stack
- Custom middleware for request logging and JSON parsing with raw body capture
- Vite integration in development mode for SSR and HMR support

**API Design**
- RESTful API endpoints under `/api` prefix
- Session-based authentication (preparation for connect-pg-simple sessions)
- CRUD operations for users, assessments, goals, chat messages, sessions, circles, and streaks
- Password hashing using bcryptjs for security

**Storage Layer**
- In-memory storage implementation (MemStorage class) for development
- Interface-based design (IStorage) allowing easy swap to database implementation
- Prepared for PostgreSQL migration with Drizzle ORM schema already defined
- UUID-based primary keys for all entities

**Authentication & Security**
- Username/password authentication with bcrypt password hashing
- Session management ready (connect-pg-simple configured in dependencies)
- Credential validation and error handling
- User data sanitization (password excluded from API responses)

### Data Storage Solutions

**Current Implementation**
- In-memory Map-based storage for all entities during development
- All data operations return Promises to match future database interface
- Structured data models for: users, assessments, goals, chat messages, group sessions, support circles, streaks, playlists

**Database Schema (Prepared)**
- Drizzle ORM schema defined in `shared/schema.ts` for PostgreSQL
- Tables: users, assessments, goals, chatMessages, groupSessions, supportCircles, streaks, playlists
- UUID primary keys with `gen_random_uuid()` default
- JSONB fields for complex data (assessment responses, playlist tracks)
- Timestamp tracking for created/updated dates
- Foreign key relationships ready for implementation

**Migration Strategy**
- Drizzle Kit configured for schema migrations to PostgreSQL
- Migration output directory: `./migrations`
- Database URL expected via environment variable: `DATABASE_URL`
- Schema sync command: `npm run db:push`

### External Dependencies

**UI & Styling**
- Radix UI component primitives (accordion, dialog, dropdown, tabs, etc.) for accessible headless components
- Tailwind CSS with PostCSS for utility-first styling
- Custom font integration: Cormorant Garamond (serif) and Montserrat (sans-serif) from Google Fonts
- Lucide React for consistent icon system

**Database & ORM**
- Drizzle ORM for type-safe database queries and migrations
- @neondatabase/serverless for PostgreSQL serverless driver (prepared for deployment)
- drizzle-zod for schema validation integration
- connect-pg-simple for PostgreSQL session storage (configured but not yet active)

**Form & Validation**
- React Hook Form with @hookform/resolvers for form state management
- Zod for runtime schema validation and type inference
- Integration between Drizzle schemas and Zod for consistent validation

**Development Tools**
- Replit-specific plugins for development banner, cartographer, and runtime error overlay
- ESBuild for production server bundling
- TSX for TypeScript execution in development

**Browser APIs**
- Web Speech API (SpeechRecognition) for speech-to-speech chatbot mode
- Web Audio API for text-to-speech synthesis in chat
- Local Storage for theme persistence

**Future Integration Points**
- AI chatbot backend (currently uses mock responses)
- Audio streaming service for meditation/music playlist
- Real-time WebSocket support for group sessions and live chat
- OAuth providers for social authentication
- Payment processing for premium features