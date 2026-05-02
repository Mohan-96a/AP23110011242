# Notification App Frontend

## Stage 2: React/Next.js with Material UI

A responsive React-based frontend that displays campus notifications with priority inbox functionality.

## Features

- **All Notifications Tab** — Display all notifications from API
- **Priority Inbox** — Show top N notifications by priority
- **Filter by Type** — Separate tabs for Placement, Result, Event
- **Pagination** — Support for limit and page parameters
- **Read/Unread Status** — Toggle notification read state
- **Save Notifications** — Bookmark important notifications
- **Responsive Design** — Mobile and desktop optimized
- **Material UI** — Professional UI library for styling

## Tech Stack

- **React 18** — UI library
- **Next.js 13** — React framework
- **Material UI v5** — Component library
- **Emotion** — CSS-in-JS styling

## Run Frontend

1. `cd notification_app_fe`
2. `npm install`
3. `npm run dev`

Open `http://localhost:3000`

## API Integration

- Fetches from `http://20.207.122.201/evaluation-service/notifications`
- Supports query params: `limit`, `page`, `notification_type`
- Displays notifications with type-based coloring
- Handles read/unread state locally

## UI Components

- **AppBar** — Header with branding
- **Tabs** — Filter by notification type
- **NotificationCard** — Individual notification display
- **Pagination** — Navigate through notification pages
- **Chips** — Type and status badges

## Design Principles

✅ Clean, uncluttered interface
✅ Material Design compliance
✅ Responsive layout (mobile-first)
✅ Fast load times
✅ Error handling and loading states
✅ Production-ready code quality
