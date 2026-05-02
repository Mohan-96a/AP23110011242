# AP23110011242

Campus notification system with priority inbox functionality.

## Project Structure

- `Notification_System_Design.md` — Stage 1 & 2 design and implementation
- `notification_app_be/` — Backend API for notifications
- `notification_app_fe/` — Stage 2: React/Next.js frontend
- `screenshots/` — Stage 1 and Stage 2 screenshot references
- `.gitignore` — Git ignore rules

## Stage 1 Complete

Priority notification sorting logic with top 10 selector.

**Run:**
```bash
cd notification_app_be
npm run stage1
```

## Stage 2: Frontend

React/Next.js application with Material UI.

**Run:**
```bash
cd notification_app_fe
npm install
npm run dev
```

Open `http://localhost:3000`.

## Features

- Priority Inbox (top N notifications)
- Filter by type (Placement, Result, Event)
- Pagination (limit, page)
- Read/Unread state for notifications
- Responsive mobile and desktop UI
- Material UI styling

## Notes

- Backend uses logging middleware for API requests.
- Frontend fetches notifications through the local proxy.
- No database is required for the current implementation.
