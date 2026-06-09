# WorkBridge Server

This folder contains a simple Express-based backend for the WorkBridge frontend.

## Install

```bash
cd server
npm install
```

## Run

```bash
npm run dev
```

The API starts on `http://localhost:4000` by default.

## Available endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/verify-email`
- `GET /api/auth/me`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `POST /api/jobs/:id/apply`
- `POST /api/jobs/:id/shortlist`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `GET /api/users/:id/notifications`
- `GET /api/messages`
- `GET /api/messages/:conversationId`
- `POST /api/messages/:conversationId`
- `GET /api/payments`
- `POST /api/payments/charge`
- `GET /api/payments/subscriptions`
- `POST /api/payments/subscriptions`
- `GET /api/landing/jobs`
- `GET /api/landing/workers`
- `GET /api/landing/faq`
- `POST /api/landing/contact`
- `GET /api/support`
- `POST /api/support`
- `GET /api/admin/users`
- `GET /api/admin/jobs`
- `GET /api/admin/reports`
- `GET /api/admin/disputes`
- `PUT /api/admin/users/:id/verify`
- `PUT /api/admin/companies/:id/verify`
- `PATCH /api/admin/disputes/:id`

## Notes

- This backend uses in-memory sample data in `server/src/data/db.js`.
- Authentication is JWT-based and is intended for local development only.
