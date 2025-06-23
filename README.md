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

CREATE Leads
POST /api/lead_registration

---

## 📄 API Endpoints

### ➕ Create Lead

**POST** `/api/lead_registration`

**Body:**
```json
{
    "name":"Labeeb",
    "email":"labeeb@gmail.com",
    "phone":"123456",
    "source":"any",
    "submitted_at": "2025-06-23T12:00:00Z",
    "isActive": "true"
}

### ➕ Get Leads (Paginated & Filtered)

**GET** `/api/get_all_leads?source=any&page=1&limit=10`

### ➕ Get Single Lead

**GET** `/api/get_lead_data/:id`

### ➕ Update Lead

**PUT** `/api/update_lead/:id`

**Body:**
```json
{
    "name":"Labeeb Updated",
    "email":"labeebUpdated@gmail.com",
    "phone":"123456",
    "source":"any",
    "submitted_at": "2025-06-24T12:00:00Z",
    "isActive": "true"
}

### ➕ Delete Lead

**DELETE** `/api/delete_lead/:id`
