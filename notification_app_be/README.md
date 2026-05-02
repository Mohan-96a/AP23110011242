# Notification App Backend

This backend folder contains a small Express API for notification prioritization.

## Features

- Mock notification dataset without database dependency
- Notification sorting by type priority and timestamp
- Logging middleware for each API request

## Run backend

1. `cd notification_app_be`
2. `npm install`
3. `npm start`

API endpoint:
- `GET /notifications?top=5`

The backend returns the top notifications sorted by priority and recency.
