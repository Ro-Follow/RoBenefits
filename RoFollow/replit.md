# Replit.md - Ro-Follow Session Data Application

## Overview

This is a full-stack web application built with React (frontend) and Express (backend) that allows users to submit Roblox session data. The application validates the session data format and sends email notifications upon successful submission. It uses a modern tech stack with TypeScript, Tailwind CSS, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: Nodemailer for sending email notifications
- **Session Storage**: In-memory storage with optional database persistence
- **API Design**: RESTful endpoints with JSON responses

### Database Schema
- **Users Table**: Basic user management with username and password
- **Submissions Table**: Stores session data submissions with email and timestamp
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Frontend Components
1. **Home Page**: Main submission form with session data validation
2. **UI Components**: Comprehensive set of reusable components (buttons, cards, dialogs, forms, etc.)
3. **Toast System**: User feedback for actions and errors
4. **Responsive Design**: Mobile-first approach with dark theme

### Backend Services
1. **Route Handlers**: API endpoints for session submission
2. **Email Service**: Automated email notifications with HTML formatting
3. **Storage Layer**: Abstracted storage interface supporting both in-memory and database persistence
4. **Request Logging**: Comprehensive logging for API requests

### Validation Logic
- Session data must contain specific PowerShell cookie string
- Email format validation
- Input sanitization and error handling

## Data Flow

1. **User Submission**: User enters session data in textarea on home page
2. **Client Validation**: Frontend validates required PowerShell cookie string format
3. **API Request**: Data sent to `/api/submit-session` endpoint
4. **Server Processing**: Backend validates data and stores submission
5. **Email Notification**: Automated email sent to configured recipient
6. **User Feedback**: Success confirmation or error message displayed

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js for backend API
- Drizzle ORM for database operations
- Neon Database for PostgreSQL hosting

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for icons
- Class Variance Authority for component variants

### Development Tools
- TypeScript for type safety
- Vite for fast development and building
- ESBuild for backend bundling
- PostCSS for CSS processing

### Email and Communication
- Nodemailer for email sending
- Support for various SMTP providers (Gmail, custom SMTP)

## Deployment Strategy

### Development Environment
- Vite dev server for frontend hot reloading
- TSX for backend TypeScript execution
- Environment variables for configuration
- Replit-specific plugins for development

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- ESBuild bundles backend to `dist/index.js`
- Single server serves both static files and API routes
- Environment-based configuration for database and email

### Environment Configuration
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `EMAIL_USER`/`SMTP_USER`: Email service username
- `EMAIL_PASS`/`SMTP_PASS`: Email service password
- `EMAIL_HOST`/`SMTP_HOST`: SMTP server hostname
- `EMAIL_PORT`/`SMTP_PORT`: SMTP server port

### Database Management
- Drizzle migrations in `./migrations` directory
- Schema definition in `shared/schema.ts`
- Push migrations with `npm run db:push`

The application is designed to be easily deployable on platforms like Replit, with automatic database provisioning and email service integration.