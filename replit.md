# Bhikadiya Parivar Family Management System

## Overview

This is a full-stack family management system built with React, Express, TypeScript, and PostgreSQL. The application serves as a comprehensive platform for managing family members, students, events, notifications, and a photo gallery. It features role-based access control with three distinct user types: Super Admin, Admin, and Member.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context API for app-wide state (user role, language)
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: Custom translation hook supporting English and Gujarati

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Development**: Hot reload with Vite integration in development mode

### Component Architecture
- **Design System**: Consistent component library with variants using class-variance-authority
- **Layout System**: Responsive layout with header navigation and role-based menu items
- **Role-Based Rendering**: Components conditionally render based on user permissions

## Key Components

### Authentication & Authorization
- Role-based access control with three user types: Super Admin, Admin, Member
- Dynamic navigation menus based on user role
- RoleBasedWrapper component for conditional feature access

### Database Schema
- **Users**: Basic authentication with username/password
- **Members**: Comprehensive family member profiles with personal and professional details
- **Students**: Academic achievements tracking linked to family members
- **Notifications**: System-wide announcements with categorization
- **Gallery Events**: Photo collection management with year and event filtering

### User Interface Components
- **Dashboard**: Statistics overview with quick action buttons
- **Members Management**: CRUD operations with search and filtering
- **Student Achievements**: Academic performance tracking
- **Gallery**: Event-based photo organization with year filters
- **Registration Form**: Multi-step member onboarding
- **Notifications**: Category-based announcement system

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **API Layer**: Express routes handle HTTP requests with type-safe validation
3. **Business Logic**: Service layer processes data using Drizzle ORM
4. **Database**: PostgreSQL stores relational data with proper constraints
5. **Response**: JSON responses sent back to client with error handling

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe component variants

### Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **Vite**: Fast build tool with HMR support
- **Drizzle Kit**: Database migration and schema management
- **ESBuild**: Fast JavaScript bundler for production builds

### Database & Backend
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express
- **Drizzle ORM**: Type-safe database toolkit

## Deployment Strategy

### Development
- Vite dev server for frontend with hot module replacement
- Express server with TypeScript compilation via tsx
- Database migrations managed through Drizzle Kit

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles Node.js application to `dist/index.js`
- Single server deployment serving both API and static files

### Database Management
- Schema defined in shared TypeScript files
- Migrations generated and applied via Drizzle Kit
- Environment-based configuration for different deployment stages

The application follows a monorepo structure with shared types between client and server, ensuring type safety across the full stack. The architecture supports both development efficiency and production scalability.