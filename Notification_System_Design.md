# Notification System Design

---

## Stage 1: Priority Inbox Implementation

### Overview
The objective of Stage 1 is to build a functional system that identifies and returns the **top 10 most important unread notifications** based on type priority and recency. This solution uses the provided Notification API and applies in-memory sorting without database persistence.

### Solution Implementation
A Node.js script (`topNotifications.js`) that:

1. **Fetches** notifications from the external API endpoint
2. **Normalizes** API response data to standard format
3. **Sorts** notifications using dual criteria:
   - Primary: Type priority (Placement=3, Result=2, Event=1)
   - Secondary: Timestamp in descending order (newest first)
4. **Returns** top 10 notifications with summary statistics

### Code Files
- **Backend Server**: [notification_app_be/server.js](notification_app_be/server.js) — Express API with priority sorting
- **Stage 1 Script**: [notification_app_be/topNotifications.js](notification_app_be/topNotifications.js) — Standalone CLI for top 10 selection
- **Middleware**: [notification_app_be/middleware.js](notification_app_be/middleware.js) — Request logging

### Running Stage 1
```bash
cd notification_app_be
npm install
npm run stage1
```

### Sample Output
The script outputs top 10 notifications in JSON format with sorting verification:

```
=== Stage 1: Top 10 Priority Notifications ===

{
  "top": 10,
  "notifications": [
    {
      "id": "2",
      "type": "Placement",
      "message": "CSX Corporation hiring",
      "timestamp": "2026-04-22 17:51:18"
    },
    ...
  ]
}

=== Summary ===
Total: 9 notifications displayed

By Type:
  Placement: 2
  Result: 5
  Event: 2

Sorting: By Type Priority (Placement > Result > Event), then by Timestamp (Newest First)
```

### Time Complexity
- Fetch: O(1) for API call
- Sort: O(N log N) where N = total notifications
- Select: O(K) where K = 10
- **Overall**: O(N log N)

### Efficient Handling of Continuous Notifications
For continuous incoming notifications, we employ a **Min Heap (Priority Queue)** approach:

- Maintain a heap of size K (10)
- When new notification arrives, insert into heap with O(log K) cost
- If heap size > K, remove minimum element
- This ensures O(log K) per insertion vs O(N log N) for repeated sorting

### Key Features
✅ No database required  
✅ Uses provided evaluation API  
✅ Actual working code (not pseudocode)  
✅ Handles continuous incoming notifications efficiently  
✅ Clear priority and recency logic  
✅ Request logging via middleware  

---

## 1. Problem Overview


The campus notification system generates a high volume of notifications across multiple categories such as Placements, Results, and Events. Users often miss important updates due to the volume.

To solve this, we introduce a **Priority Inbox** that displays the top `N` most important unread notifications based on:

- Notification type priority
- Recency (latest first)

## 2. Objectives

- Identify and display the top `N` important notifications
- Ensure efficient handling as new notifications continuously arrive
- Avoid database dependency (as per constraints)
- Use API data dynamically

## 3. Notification Data Structure

Each notification contains:

- `id` (unique identifier)
- `type` (Placement, Result, Event)
- `message` (text content)
- `timestamp` (date and time)

## 3.1 External Evaluation API

- API endpoint: `http://20.207.122.201/evaluation-service/notifications`
- The backend fetches this API dynamically and applies priority sorting
- No database persistence is used

## 4. Priority Logic

Priority is determined using:

### Type-based Priority:

- `Placement` → Highest priority
- `Result` → Medium priority
- `Event` → Lowest priority

### Recency:

- More recent notifications are prioritized within the same type

## 5. Sorting Strategy

Notifications are sorted using:

1. Priority weight (descending)
2. Timestamp (descending)

### Example Priority Map:

- `Placement` → 3
- `Result` → 2
- `Event` → 1

Sorting Rule:

- Higher priority first
- If same type → newer timestamp first

## 6. Approach to Find Top N Notifications

### Steps:

1. Fetch notifications from evaluation API
2. Assign priority weights based on type
3. Sort notifications using:
   - Priority (descending)
   - Timestamp (descending)
4. Select top `N` notifications

### Stage 1 Implementation

- The backend uses an Express route with logging middleware
- Notifications are fetched from the external API, normalized, sorted, and sliced
- The result is returned as the top `N` priority notifications

## 7. Handling Continuous Incoming Notifications

Since new notifications are continuously added:

### Efficient Strategy:

- Use a **Min Heap (Priority Queue)** of size `N`
- Maintain only top `N` notifications at any time

### Logic:

1. Insert notification into heap
2. If heap size > `N`:
   - Remove lowest priority notification
3. Heap always contains top `N` notifications

## 8. Complexity Analysis

- Sorting approach:
  - Time Complexity: `O(N log N)`

- Heap approach:
  - Time Complexity: `O(N log K)`
  - Where `K = N`

Heap is more efficient for large-scale systems

## 9. Edge Cases

- Empty notification list
- All notifications of same type
- Duplicate timestamps
- Large volume of notifications
- Invalid or missing fields

## 10. Assumptions

- API always returns valid notification objects
- Timestamp format is consistent
- No persistence required (no database)

## 11. Future Enhancements

- User-specific priority preferences
- Read/unread tracking
- Real-time updates using WebSockets
- Notification grouping

## 12. Conclusion

The proposed system ensures:

- Efficient prioritization of important notifications
- Scalability with continuous updates
- Clear and maintainable logic without database dependency

---

## Stage 2: Frontend Application

### Overview
Stage 2 implements a responsive React/Next.js frontend using Material UI that displays notifications with full filtering, pagination, and read/unread status tracking.

### Features
- **All Notifications Tab** — Display all notifications from evaluation API
- **Type Filtering** — Separate tabs for Placement, Result, Event
- **Pagination** — Support for limit and page query parameters
- **Read/Unread Tracking** — Toggle notification read status
- **Save Notifications** — Bookmark important notifications
- **Responsive Design** — Optimized for mobile and desktop
- **Material UI Styling** — Professional component library (no native CSS)
- **Error Handling** — Graceful error messages and loading states

### Tech Stack
- **React 18** — UI component library
- **Next.js 13** — React framework with server-side rendering
- **Material UI v5** — Professional component library (mandatory)
- **Emotion** — CSS-in-JS styling engine

### App Structure
```
notification_app_fe/
├── app/
│   ├── page.jsx           # Root page component
│   ├── layout.jsx         # App layout with theme
│   ├── dashboard.jsx      # Main notification dashboard
│   └── NotificationCard.jsx # Individual notification card
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md              # Frontend documentation
```

### Key Components

**page.jsx** — Root component with Material UI theme provider  
**layout.jsx** — AppBar header and page structure  
**dashboard.jsx** — Main dashboard with:
  - Tab navigation for filtering
  - Notification list rendering
  - Pagination controls
  - API data fetching

**NotificationCard.jsx** — Individual notification display with:
  - Type badge (color-coded)
  - Message and timestamp
  - Read/Unread toggle button
  - Save/Bookmark button

### API Integration
- Endpoint: `http://20.207.122.201/evaluation-service/notifications`
- Query Parameters:
  - `limit` — Number of notifications per page (default: 10)
  - `page` — Page number (default: 1)
  - `notification_type` — Filter by type (Placement, Result, Event)

### Running Stage 2
```bash
cd notification_app_fe
npm install
npm run dev
```
Open `http://localhost:3000` in browser

### UI Design Principles
✅ **No Clutter** — Clean, minimal interface  
✅ **Material Design** — Follow MUI guidelines  
✅ **Responsive** — Mobile-first approach  
✅ **Fast** — Optimized load times  
✅ **Accessible** — Proper ARIA labels and keyboard navigation  
✅ **Production-Ready** — Error handling, loading states, proper styling  

### Color Scheme
- **Placement** → Blue (#2196f3) — Highest priority
- **Result** → Orange (#ff9800) — Medium priority
- **Event** → Green (#4caf50) — Lower priority

### Time Complexity
- Fetch: O(1) API call
- Filter: O(N) where N = total notifications
- Display: O(K) where K = page size
- **Overall**: O(N)
