# Notification App Backend

This backend folder contains an Express API that fetches notification data from the evaluation service and returns priority-sorted results.

## Features

- Uses the provided evaluation API at `http://20.207.122.201/evaluation-service/notifications`
- Sorts notifications by type priority and timestamp
- Supports top-N selection and optional filtering
- Uses logging middleware for all API requests
- No database required

## Stage 1 Run

1. `cd notification_app_be`
2. `npm install`
3. `npm run stage1`

Optional environment variable:
- `EVAL_API_AUTH` — pass Authorization token if required by the evaluation endpoint

## Server Run

1. `cd notification_app_be`
2. `npm start`

API endpoint:
- `GET /top-notifications?top=10`
- `GET /top-notifications?notification_type=Placement&top=10`

The backend proxies the evaluation API, applies priority sorting, and returns the top notifications.
