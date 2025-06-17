# Backend-for-Sales

This is the backend for a sales management system, developed in **Node.js** with **TypeScript**. The API provides features to manage products, clients, users, and orders, following a modern and scalable architecture.

## 🚀 Features

### User Management:
- User creation and listing.
- Authentication using JSON Web Tokens (JWT).
- Profile update and avatar upload.
- Password recovery functionality via email.

### Client Management:
- Full CRUD for clients (Create, Read, Update, Delete).
- Paginated client listing.

### Product Management:
- Full CRUD for products.
- Paginated product listing.
- Redis cache to optimize product listing performance.

### Order Management:
- Order creation linked to clients and products.
- Order details retrieval.

### Security:
- Request data validation with **celebrate**.

## 📁 Project Structure

```
Backend-for-Sales/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── repositories/
│   ├── middlewares/
│   ├── routes/
│   └── index.ts
├── tests/
├── .env.example
├── jest.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── package.json
└── README.md
```



## ⚙️ How to Run

### Requirements

- Node.js (version >= 16)
- Docker (to run PostgreSQL and Redis)
- A database client like DBeaver or Postbird

### Installation

```bash
git clone https://github.com/olucas-o/Backend-for-Sales.git
cd Backend-for-Sales
npm install
