# Employee Management System - Complete Guide

## Project Overview
This is a **full-stack Employee Management application** with a Node.js/Express backend using Prisma ORM and SQLite database.

### Purpose
- **Authentication System**: User signup/login with JWT tokens
- **Employee Management**: Create, read, update, delete employees
- **Department Management**: Create, read, update, delete departments
- **Database**: SQLite with Prisma for ORM

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: SQLite with Prisma ORM v6.19.3
- **Authentication**: 
  - JWT (jsonwebtoken) for token-based auth
  - bcryptjs for password hashing
- **Middleware**: CORS for cross-origin requests
- **Development**: Nodemon for auto-reload

### Dependencies
```json
{
  "@prisma/client": "^6.19.3",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "prisma": "^6.19.3",
  "sqlite3": "^6.0.1"
}
```

---

## Project Structure

```
Employee_management/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   ├── seed.js             # Database seed data
│   │   ├── dev.db              # SQLite database (auto-created)
│   │   └── migrations/          # Database migrations
│   │
│   ├── src/
│   │   ├── server.js            # Main server entry point
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # JWT token verification
│   │   ├── routes/
│   │   │   ├── authRoutes.js    # Signup/Login endpoints
│   │   │   ├── employeeRoutes.js # Employee CRUD operations
│   │   │   └── departmentRoutes.js # Department CRUD operations
│   │   ├── controllers/          # (Placeholder for business logic)
│   │   └── db/                   # (Placeholder for DB utilities)
│   │
│   ├── .env                      # Environment variables
│   ├── package.json              # Project dependencies
│   └── package-lock.json
│
└── README.md
```

---

## Database Schema

### User Model
```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
```
**Used for**: Authentication (signup/login)

### Department Model
```prisma
model Department {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  employees Employee[]
}
```
**Used for**: Managing company departments

### Employee Model
```prisma
model Employee {
  id           Int        @id @default(autoincrement())
  name         String
  email        String     @unique
  salary       Float
  joiningDate  DateTime
  departmentId Int
  
  department Department @relation(fields: [departmentId], references: [id])
}
```
**Used for**: Managing employee records linked to departments

---

## Setup Instructions

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
File: `.env` (already configured)
```
DATABASE_URL="file:./dev.db"      # SQLite database file location
JWT_SECRET=supersecretkey          # Secret key for JWT tokens
PORT=5000                           # Server port
```

### Step 4: Setup Database
```bash
# Create the database and run migrations
npx prisma migrate dev --name init

# OR if migrations already exist, just generate Prisma client
npx prisma generate
```

### Step 5: Seed Database (Optional)
```bash
npx prisma db seed
```
This adds sample data to the database.

### Step 6: Start the Server
```bash
npm run dev
```

**Expected Output:**
```
Server running on 5000
```

Server will be running at: **http://localhost:5000**

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes
**Route**: `/auth`

#### 1. **Signup** - Create a new user
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10..."  // hashed
}
```

#### 2. **Login** - Get JWT token
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Department Routes
**Route**: `/departments`

#### 1. **Get All Departments** (Public)
```
GET /api/departments

Response (200):
[
  { "id": 1, "name": "Engineering" },
  { "id": 2, "name": "HR" }
]
```

#### 2. **Create Department** (Protected - Requires JWT)
```
POST /api/departments
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Sales"
}

Response (201):
{ "id": 3, "name": "Sales" }
```

#### 3. **Update Department** (Protected)
```
PUT /api/departments/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Marketing"
}

Response (200):
{ "id": 3, "name": "Marketing" }
```

#### 4. **Delete Department** (Protected)
```
DELETE /api/departments/:id
Authorization: Bearer <JWT_TOKEN>

Response (200):
{ "id": 3, "name": "Marketing" }
```

---

### Employee Routes
**Route**: `/employees`

#### 1. **Get All Employees** (Protected)
```
GET /api/employees
Authorization: Bearer <JWT_TOKEN>

Response (200):
[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "salary": 75000,
    "joiningDate": "2024-01-15T00:00:00.000Z",
    "departmentId": 1,
    "department": { "id": 1, "name": "Engineering" }
  }
]
```

#### 2. **Create Employee** (Protected)
```
POST /api/employees
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "salary": 65000,
  "joiningDate": "2024-03-20",
  "departmentId": 2
}

Response (201):
{
  "id": 2,
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "salary": 65000,
  "joiningDate": "2024-03-20T00:00:00.000Z",
  "departmentId": 2,
  "department": { "id": 2, "name": "HR" }
}
```

#### 3. **Update Employee** (Protected)
```
PUT /api/employees/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Bob Johnson Updated",
  "salary": 70000
}

Response (200):
{ "id": 2, "name": "Bob Johnson Updated", ... }
```

#### 4. **Delete Employee** (Protected)
```
DELETE /api/employees/:id
Authorization: Bearer <JWT_TOKEN>

Response (200):
{ "id": 2, "name": "Bob Johnson Updated", ... }
```

---

## How to Test the API

### Option 1: Using Postman
1. Download and open **Postman**
2. Create requests for each endpoint above
3. For protected endpoints, add header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Option 2: Using cURL
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login (get token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get departments (no auth needed)
curl http://localhost:5000/api/departments

# Get employees (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/employees
```

### Option 3: Using VS Code REST Client Extension
Create a file `test.http` and use:
```http
### Signup
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

### Get Departments
GET http://localhost:5000/api/departments

### Get Employees
GET http://localhost:5000/api/employees
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Running the Project

### Development Mode (with auto-reload)
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Common Commands

```bash
# View database GUI
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (DANGEROUS - deletes all data)
npx prisma migrate reset

# View database schema
npx prisma generate
```

---

## Troubleshooting

### Issue: "Cannot find module" error
**Solution**: 
```bash
rm -rf node_modules
npm install
```

### Issue: Database connection failed
**Solution**: 
- Check `.env` file has correct `DATABASE_URL`
- Ensure `prisma` folder exists
- Run: `npx prisma generate`

### Issue: JWT token invalid
**Solution**:
- Copy token from login response exactly
- Add `Authorization: Bearer <token>` in header
- Token format must be: `Bearer eyJhbGc...`

### Issue: Port 5000 already in use
**Solution**: 
- Change `PORT` in `.env` to another value (e.g., 5001)
- Or kill the process using port 5000

---

## What's Implemented ✅

- ✅ **User Authentication** (Signup/Login with JWT)
- ✅ **Password Hashing** (bcryptjs)
- ✅ **Token Verification** (Auth middleware)
- ✅ **Department CRUD** operations
- ✅ **Employee CRUD** operations
- ✅ **Error Handling** for duplicate emails
- ✅ **Input Validation** for required fields
- ✅ **Database Relationships** (Employee → Department)
- ✅ **CORS** enabled for cross-origin requests

---

## Next Steps (Future Features)

- 🔄 Add frontend (React, Vue, etc.)
- 🔄 Add role-based authorization (Admin, Manager, Employee)
- 🔄 Add employee salary management
- 🔄 Add employee performance reviews
- 🔄 Add department reporting
- 🔄 Add email notifications
- 🔄 Deployment to production server

---

## Project Status
✅ **Backend API: COMPLETE** - Ready for frontend integration
- All CRUD operations working
- Authentication system functional
- Database properly configured
- API endpoints tested and documented

