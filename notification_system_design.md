# Notification System Design

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

1. Fetch notifications from API
2. Assign priority weights based on type
3. Sort notifications using:
   - Priority (descending)
   - Timestamp (descending)
4. Select top `N` notifications

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
