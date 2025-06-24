
# Lead Management REST API

A scalable RESTful API for managing leads, built with **Node.js**, **Express**, and **MongoDB**.

## Features

- Create, retrieve, update, and soft-delete leads
- Pagination and filtering support
- Environment-based configuration
- Proper HTTP status codes and error handling
- Asynchronous code using async/await

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- dotenv

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally or hosted)
- npm or yarn

### Installation

```bash
git clone https://github.com/Labeebopc/gtcfx-lead-backend.git
cd gtcfx-lead-backend
npm install
npm start
````

---

## 📄 API Endpoints

### ➕ Create Lead

**POST** `/api/leads`

**Request Body:**

```json
{
  "name": "Labeeb",
  "email": "labeeb@gmail.com",
  "phone": "123456",
  "source": "any",
  "submitted_at": "2025-06-23T12:00:00Z",
  "isActive": true
}
```

---

### 🔍 Get Leads (Paginated & Filtered)

**GET** `/api/leads?source=any&page=1&limit=10`

---

### 🔍 Get Single Lead

**GET** `/api/leads/:id`

---

### ✏️ Update Lead

**PUT** `/api/leads/:id`

**Request Body:**

```json
{
  "name": "Labeeb Updated",
  "email": "labeebUpdated@gmail.com",
  "phone": "123456",
  "source": "any",
  "submitted_at": "2025-06-24T12:00:00Z",
  "isActive": true
}
```

---

### ❌ Delete Lead (Soft Delete)

**DELETE** `/api/leads/:id`

Soft deletes the lead by setting `isActive` to `false`.

---
