
### Backend
- Node.js
- Express.js

## Features

- View notifications
- View unread notification count
- Mark notification as read
- Mark all notifications as read
- Delete notification
- Logging middleware integration

## Project Structure

```
project/
│
├── frontend/
├── backend/
├── notification_system_design.md
└── README.md
```

### Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
AUTH_TOKEN=your_access_token or use them inside the code
```



## API Endpoints

| Method | Endpoint |
|---------|----------|
| GET | /notifications |
| GET | /notifications/unread-count |
| PATCH | /notifications/:id/read |
| PATCH | /notifications/read-all |
| DELETE | /notifications/:id |

## Author

Damodara Prakash P


## STAGE 2

## Stage 2 - Database Design

### Recommended Database

PostgreSQL

### Reason

- Supports ACID transactions.
- Fast querying using indexes.
- Easy pagination and sorting.
- Reliable for storing notification data.
- Scales well for large datasets.

### Database Schema

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| title | VARCHAR(255) |
| message | TEXT |
| notification_type | VARCHAR(50) |
| is_read | BOOLEAN |
| priority | INT |
| created_at | TIMESTAMP |

### Sample SQL Queries

Get Notifications

```sql
SELECT *
FROM notifications
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

Unread Notification Count

```sql
SELECT COUNT(*)
FROM notifications
WHERE user_id = ?
AND is_read = FALSE;
```

Mark Notification as Read

```sql
UPDATE notifications
SET is_read = TRUE
WHERE id = ?;
```

Mark All Notifications as Read

```sql
UPDATE notifications
SET is_read = TRUE
WHERE user_id = ?;
```

Delete Notification

```sql
DELETE FROM notifications
WHERE id = ?;
```

### Scaling Challenges

As the number of users and notifications increases, the following issues may occur:

- Slow database queries
- Increased storage usage
- Longer response times
- High database load

### Optimizations

- Create indexes on `user_id`, `is_read`, and `created_at`.
- Use pagination for fetching notifications.
- Archive old notifications.
- Partition large tables by date.
- Use Redis caching for unread notification counts.


# Stage 3 – Query Optimization

## Given Query

```sql
SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

## Why is this query slow?

- `SELECT *` fetches all columns even if they are not needed.
- Without an index, the database checks every row (Full Table Scan).
- Sorting a large number of records takes more time.

---

## Better Query

```sql
SELECT title, message, createdAt
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

This fetches only the required columns.

---

## Recommended Index

```sql
CREATE INDEX idx_notifications
ON notifications(studentId, isRead, createdAt);
```

This helps the database find the required records much faster.

---

## Should Every Column Be Indexed?

**No.**

Because:

- It uses more storage.
- INSERT and UPDATE operations become slower.
- Only frequently searched columns should be indexed.

---

## SQL Query

Find students who received **Placement** notifications in the last 7 days.

```sql
SELECT studentId
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 DAY';
```

# Stage 3 – Query Optimization

## Given Query

```sql
SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

## Why is this query slow?

- `SELECT *` fetches all columns even if they are not needed.
- Without an index, the database checks every row (Full Table Scan).
- Sorting a large number of records takes more time.

---

## Better Query

```sql
SELECT title, message, createdAt
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

This fetches only the required columns.

---

## Recommended Index

```sql
CREATE INDEX idx_notifications
ON notifications(studentId, isRead, createdAt);
```

This helps the database find the required records much faster.

---

## Should Every Column Be Indexed?

**No.**

Because:

- It uses more storage.
- INSERT and UPDATE operations become slower.
- Only frequently searched columns should be indexed.

---

## SQL Query

Find students who received **Placement** notifications in the last 7 days.

```sql
SELECT studentId
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 DAY';
```

# Stage 4 – Performance Optimization

## Problem

When many users access the notification system, the database becomes slow because every request directly reads from it.

---

## Solutions

### 1. Redis Cache
Store frequently used notifications in Redis to reduce database load.

### 2. Pagination
Return only a small number of notifications at a time.

Example:

```http
GET /notifications?page=1&limit=20
```

### 3. Database Indexing
Create indexes on frequently searched columns like `studentId`, `isRead`, and `createdAt` to improve query speed.

### 4. Read Replica
Use replica databases for read requests to reduce the load on the main database.

### 5. WebSocket
Use WebSocket to send new notifications instantly instead of repeatedly calling the API.

---

## Trade-offs

- Redis improves speed but requires cache updates.
- Pagination reduces data transfer but needs multiple requests.
- Indexes improve reads but slow down inserts and updates.
- Read replicas improve scalability but data may have a slight delay.
- WebSockets provide real-time updates but require persistent connections.


