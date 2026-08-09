# KOFFIE Café Banyuwangi

> **Bahasa / Language:** English | [Bahasa Indonesia](README.id.md)

---

> Specialty Coffee Shop Experience & Integrated Admin Management System

## Overview

**KOFFIE Café Banyuwangi** is a full-stack web application designed for a specialty coffee shop in Banyuwangi, East Java. It bridges the gap between an elegant customer-facing digital experience and an efficient operational management system for café owners and staff.

Customers can explore the coffee shop's artisan menu, view upcoming community events and workshops, browse the ambient photo gallery, check operating hours and location, and make table reservations directly online. On the operational side, café managers can log into a secure Admin Panel to manage menu items, review and update customer table reservations, organize events, moderate customer testimonials, manage photo assets, and update café operating details in real-time.

---

## Problem

Specialty coffee shops often face operational and digital engagement challenges, including:

1. **Manual & Disorganized Table Reservations**: Reservations taken via scattered phone calls or social media DMs lead to double bookings, lost customer details, and unconfirmed slots.
2. **Static & Outdated Menus**: Printed or static digital menus cannot dynamically reflect seasonal coffee offerings, daily pastri availability, or price changes.
3. **Low Visibility for Workshops & Events**: Community events, live music, and cupping workshops are hard to promote effectively through social media alone.
4. **Lack of Centralized Content Management**: Café owners without technical expertise struggle to keep website information (hours, location, contact, gallery, reviews) up to date.

---

## Solution

**KOFFIE** solves these challenges by providing an end-to-end digital platform divided into two seamlessly connected interfaces:

* **Customer Experience**: A responsive web application designed with warm, premium aesthetics where customers can seamlessly browse categorized menus, learn about coffee origins, check venue ambiance, and request table reservations in seconds.
* **Management Experience**: An administrative dashboard where café staff can monitor incoming table reservations, control menu items and availability, publish upcoming events, moderate customer reviews, and update business configuration without touching code.

---

## Users

The application caters to two primary user roles:

### 1. Customer / Visitor
* Browses food, beverage, pastri, and specialty coffee offerings with filter tags (Single Origin, Favorit, Musiman).
* Submits online table reservations with guest counts, dates, times, and special requests.
* Discovers upcoming café events, community music nights, and coffee workshops.
* Explores interior and food photos in the interactive gallery.
* Views operating hours, location on Google Maps, and contacts the café via WhatsApp or Phone.

### 2. Staff / Admin
* Logged-in café manager or owner managing daily café operations.
* Reviews pending table reservations and updates status (`pending` → `confirmed` → `completed` / `cancelled`).
* Performs full CRUD operations on menu items (add new drinks/dishes, set categories, toggle availability, assign badges).
* Creates and manages events, workshops, and community schedule items.
* Moderates customer testimonials before displaying them publicly.
* Manages photo gallery assets and café business settings (hours, phone, email, address).

---

## Features

### Customer Features

* **Dynamic Menu Showcase**: Filter items by category (Kopi, Pastri, Brunch, Beverage) or badges (Single Origin, Favorit, Musiman) with real-time pricing and descriptions.
* **Online Table Reservation System**: Interactive modal and dedicated section to reserve tables by specifying name, contact details, date, time slot, guest capacity, and special requests.
* **Community Events & Workshops**: Showcase upcoming events (e.g., Jazz Night, Cupping Workshop) with event dates, schedule times, status badges, and action links.
* **Ambient Photo Gallery**: Categorized photo grid (Interior, Food, Events, Team) showcasing the physical café space and coffee crafting process.
* **Customer Testimonial Showcase**: Verified customer reviews with star ratings, custom quotes, and average score display.
* **Interactive Location & Operating Hours**: Embedded Google Maps view, weekly schedule breakdown, and direct contact actions.
* **Mobile-First Action Bar**: Sticky mobile floating action bar with direct call, location, and quick reservation triggers.
* **Newsletter Subscription**: Guestbook subscription section for seasonal menu updates and announcements.

### Management Features

* **Secure Admin Authentication**: Demo credentials login (`admin@koffie.id` / `koffie2024`) with protected routing and session expiration safety.
* **Interactive Operational Dashboard**: High-level statistical cards displaying total menu items, upcoming events, today's reservation queue, pending confirmations, and overall average customer rating.
* **Menu Item Management**: Add, edit, delete, or toggle active status for food and beverage items with category and badge management.
* **Reservation Queue Management**: Filter table reservations by status, inspect customer notes and guest numbers, approve/confirm bookings, or cancel requests.
* **Event & Workshop Manager**: Create new community events, edit event banners/schedules, toggle between draft and active states.
* **Photo Gallery Asset Manager**: Upload and categorize gallery photos, set hero image highlights, and remove obsolete media.
* **Testimonial Moderation**: Review submitted feedback, approve items for public listing, or hide inappropriate ratings.
* **Café Profile & Hours Configurator**: Edit café name, tagline, address, contact details, social media handles, and daily operating hours.
* **Automated Database Seeding Tool**: Single-click database population utility to fill all tables with full sample data during initial setup or demonstration.

---

## Customer Flow

```text
Visit Website
    ↓
Browse Menu & Filter Categories (Kopi / Pastri / Brunch)
    ↓
Explore Venue Ambiance & Community Events
    ↓
Click "Pesan Meja" / Open Reservation Modal
    ↓
Fill Reservation Details (Name, Date, Time, Guests, Requests)
    ↓
Submit Reservation Request
    ↓
Reservation Received by Admin Panel for Processing
```

### Step Explanation
1. **Visit Website**: Customer arrives at the home page and experiences the brand atmosphere, philosophy, and key statistics.
2. **Browse Menu**: Customer filters coffee beans, pastri items, or brunch meals by preferences.
3. **Explore Venue**: Customer checks past event highlights and interior photos.
4. **Open Reservation**: Customer clicks the reservation trigger on the navigation bar, floating bar, or location section.
5. **Submit Form**: Customer inputs contact data, date, preferred time, party size, and special notes.
6. **Processing**: System saves the reservation record to the backend queue for staff confirmation.

---

## Management Flow

```text
Admin Login (/admin/login)
    ↓
Dashboard Overview (/admin/dashboard)
    ↓
Select Management Module (Reservations / Menu / Events / Gallery / Settings)
    ↓
Perform Action (Add / Edit / Update Status / Delete)
    ↓
Changes Persisted to Database / Local State
    ↓
Instant Update Reflected on Customer Interface
```

### Step Explanation
1. **Admin Login**: Staff authenticates using admin credentials.
2. **Dashboard Overview**: Staff reviews quick metrics (e.g., pending reservations needing confirmation).
3. **Module Selection**: Staff navigates to the relevant panel via the sidebar or quick action buttons.
4. **Action Execution**: Staff confirms a pending table reservation, adjusts a menu item price, or adds a new event.
5. **Real-Time Sync**: Updated records are stored in Supabase/state and immediately reflected on the customer-facing website.

---

## Customer Experience

The customer interface is built around **warmth, clarity, and friction-free interaction**:

* **Atmospheric Visuals**: Elegant typography (Playfair Display & DM Sans), warm espresso and amber color palettes, and glassmorphism touches create a welcoming digital storefront.
* **Zero Friction Reservations**: Customers can request a table from anywhere on the page without navigating away or undergoing complex multi-step registration.
* **Instant Information Access**: Operating hours, Google Maps directions, and one-click WhatsApp messaging are always accessible on desktop and mobile screens.

---

## Management Experience

The administrative interface focuses on **speed, operational control, and simplicity**:

* **Consolidated Overview**: Staff can see today's reservations and key stats at a glance upon logging in.
* **Inline Status Toggling**: Updating a reservation from `pending` to `confirmed` or `completed` takes a single click.
* **Structured Modal Forms**: Creating or editing menu items and events is guided by formatted modal inputs with instant toast feedback notifications.

---

## UI Showcase

> Screenshots will be added after final UI capture.

### Customer Interface
* **Homepage & Hero Section**: Brand introduction, philosophy, and call-to-action triggers.
* **Interactive Menu**: Categorized coffee and food grid with badge indicators.
* **Reservation Modal**: Clean table booking form with date/time pickers.
* **Our Space Gallery**: Ambiance photo gallery with filter tabs.
* **Find Us Section**: Embedded map, business hours table, and contact buttons.

### Management Interface
* **Admin Login Screen**: Secure access point with brand summary and demo credentials guide.
* **Admin Dashboard**: Overview metrics, recent reservations table, activity feed, and quick actions.
* **Menu Management**: Data grid of menu items with edit/delete options and status indicators.
* **Reservations Management**: Reservation queue with status filtering (`pending`, `confirmed`, `completed`, `cancelled`).
* **Events & Gallery Manager**: Content creation forms and asset listing.

---

## Tech Stack

### Frontend & Application Framework
* **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, Server-Side Rendering, File-Based Routing)
* **Routing**: [TanStack Router](https://tanstack.com/router)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com), Custom Design System, Lucide React Icons
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with client-side local persistence & server sync)
* **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev)
* **UI Components & Motion**: Radix UI primitives, Framer Motion, Sonner / React Hot Toast

### Backend & Database
* **Database & BaaS**: [Supabase](https://supabase.com) (PostgreSQL Database, Real-Time Client)
* **Server Logic**: TanStack Start Server Functions

### Testing & Tooling
* **Test Runner**: [Vitest](https://vitest.dev), Testing Library React
* **Linting & Code Quality**: ESLint, Prettier, TypeScript `tsc`

---

## Project Structure

```text
koffie/
├── src/
│   ├── admin/                  # Admin Management System
│   │   ├── components/         # Admin UI components (Layout, Sidebar, Forms, Modals)
│   │   ├── context/            # Admin Auth Context
│   │   ├── guards/             # ProtectedRoute route guard
│   │   ├── hooks/              # Admin custom hooks (useAuth)
│   │   └── pages/              # Admin pages (Dashboard, Menu, Events, Reservations, etc.)
│   ├── components/             # Customer Interface Components
│   │   ├── layout/             # Navbar, Footer, FloatingActionBar
│   │   ├── sections/           # Hero, Menu, OurSpace, Events, Reservation, FindUs, etc.
│   │   └── ui/                 # Reusable UI primitives (Button, Modal, Card, Badge, etc.)
│   ├── data/                   # Business configuration & static brand metadata
│   ├── hooks/                  # Global shared hooks (useScrolled, useMobile)
│   ├── lib/                    # Supabase client, seed helpers, utility functions
│   ├── routes/                 # File-based router routes (__root, index, /admin/*)
│   ├── store/                  # Zustand state management stores (menu, events, reservations, etc.)
│   ├── test/                   # Unit & integration tests for stores and components
│   └── types/                  # TypeScript interfaces & domain models
├── .env.example                # Template for environment variables
├── package.json                # Project manifest & script runner
├── supabase-seed.sql           # Database schema & sample dataset script
└── vite.config.ts              # Vite & build bundler configuration
```

---

## Getting Started

### Prerequisites

* Node.js v18.x or higher
* npm, pnpm, or bun package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/koffie.git
   cd koffie
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase project credentials if connecting to a live database:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   *(Note: If Supabase credentials are left empty, the application seamlessly runs in fallback mode using Zustand local state).*

4. **Database Setup (Optional for live Supabase sync)**:
   Run the SQL statements from `supabase-seed.sql` in your Supabase SQL Editor to create tables (`menu_items`, `events`, `testimonials`, `gallery_photos`, `reservations`) and seed initial sample data.

5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to view the customer interface.
   Access `http://localhost:3000/admin/login` to access the Admin Management Panel.

### Available Scripts

* `npm run dev`: Starts the Vite development server with hot module replacement.
* `npm run build`: Compiles production bundles for client and server environments.
* `npm run lint`: Runs ESLint across the codebase.
* `npm run test`: Executes Vitest test suite.

---

## Project Status

**Concept & Portfolio Project**

This repository is a showcase project demonstrating modern full-stack web engineering, server-side rendering with TanStack Start, responsive UI design, database integration with Supabase, state management patterns, and administrative workflow design.

---

## Future Improvements

* **Online Ordering & Cart System**: Allow customers to place takeaway orders directly online with item selection, cart review, and automated order numbers.
* **Payment Gateway Integration**: Integrate Midtrans / Xendit for instant online payments (QRIS, E-Wallet, Virtual Account).
* **Automated WhatsApp / Email Notifications**: Trigger instant WhatsApp confirmations to customers when staff approves or changes their reservation status.
* **Table QR Code Ordering**: In-café table ordering system where scanning a table QR code pre-fills the table number for customer orders.
* **Sales Analytics & Reports**: Revenue reporting graphs, popular menu item statistics, and peak reservation hour insights in the admin dashboard.
