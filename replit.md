# Astrellion Tech - Rocket Engineering Website

## Overview

This is a modern web application for Astrellion Tech, a rocket engineering company. The application features a sleek, space-themed landing page with animated elements, service descriptions, and a contact form. Built with React/TypeScript frontend and Express.js backend, it demonstrates modern web development practices with a focus on user experience and performance.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom space-themed design tokens
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API**: RESTful API design
- **Data Validation**: Zod schemas for type-safe validation
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Development Storage**: In-memory storage implementation with interface for easy database switching

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for server bundling
- **Development**: Hot module replacement (HMR) via Vite
- **TypeScript**: Strict mode enabled with path mapping

## Key Components

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Contacts Table**: Contact form submissions (id, firstName, lastName, email, projectType, message)
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations

### API Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Retrieve all contact submissions (admin)

### Frontend Pages
- **Home Page**: Hero section, services showcase, contact form
- **404 Page**: Custom not found page

### UI Components
- Comprehensive component library based on shadcn/ui
- Custom space-themed styling with rocket red accent colors
- Responsive design with mobile-first approach
- Smooth scrolling navigation

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - React Hook Form handles validation using Zod schema
   - TanStack Query manages API request to backend
   - Backend validates data and stores in database
   - Success/error feedback displayed via toast notifications

2. **Development Storage**:
   - In-memory storage simulates database operations
   - Interface-based design allows easy swapping to real database
   - Data persists only during application runtime

## External Dependencies

### Frontend Dependencies
- **UI/UX**: @radix-ui components, framer-motion, lucide-react icons
- **Forms**: react-hook-form, @hookform/resolvers
- **HTTP Client**: TanStack Query with fetch API
- **Routing**: wouter
- **Styling**: tailwindcss, class-variance-authority, clsx

### Backend Dependencies
- **Database**: @neondatabase/serverless, drizzle-orm, drizzle-kit
- **Validation**: zod, drizzle-zod
- **Server**: express, tsx for development

### Development Tools
- **Build**: vite, esbuild
- **TypeScript**: Latest with strict configuration
- **Replit Integration**: Custom plugins for development environment

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist/index.js` using esbuild
3. Production server serves static files and API endpoints

### Environment Configuration
- **Development**: `npm run dev` - runs backend with frontend HMR
- **Production**: `npm run build && npm run start`
- **Database**: Configured via `DATABASE_URL` environment variable

### Replit Configuration
- Node.js 20 runtime with PostgreSQL 16 module
- Auto-scaling deployment target
- Port 5000 mapped to external port 80
- Development workflow with hot reloading

## Changelog

```
Changelog:
- June 13, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```