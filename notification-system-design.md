
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