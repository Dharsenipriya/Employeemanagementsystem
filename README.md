# Employee Management System

A full-stack employee management application with authentication, CRUD operations, and dashboard.

## Features

✅ **Module 1: Authentication**
- User signup and login with JWT token-based authentication
- Secure password hashing with bcryptjs
- Protected routes

✅ **Module 2: Employee CRUD**
- Add, view, edit, and delete employees
- List all employees in a table format
- Search employees by name with instant filtering
- Delete confirmation prompt

✅ **Module 3: Database Design**
- Three core tables: Users, Employees, Departments
- Foreign key relationships between Employees and Departments
- Pre-seeded departments: Engineering, HR, Sales

✅ **Module 4: REST API**
- Complete RESTful API with proper HTTP status codes
- Error handling for validation and database operations
- Token-based authentication middleware

✅ **Module 5: Dashboard**
- Employee list with all details in table format
- Search functionality with real-time filtering
- Department-wise employee distribution chart
- Statistics cards showing totals and averages
- Add/Edit employee form in modal

## Tech Stack

### Backend
- Node.js with Express.js
- Prisma ORM for database management
- SQLite database
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Chart.js for data visualization
- Responsive CSS

## Installation

### Backend Setup
```bash
cd backend
npm install
npm run setup  # Initializes database and seeds data
npm run dev    # Starts development server on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev    # Starts development server on port 3000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user and get JWT token
- `POST /api/auth/logout` - Logout user

### Employees
- `GET /api/employees` - Get all employees (requires auth)
- `POST /api/employees` - Create new employee (requires auth)
- `PUT /api/employees/:id` - Update employee (requires auth)
- `DELETE /api/employees/:id` - Delete employee (requires auth)
- `GET /api/employees/search?name=...` - Search employees by name (requires auth)

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department (requires auth)
- `PUT /api/departments/:id` - Update department (requires auth)
- `DELETE /api/departments/:id` - Delete department (requires auth)

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Login with your credentials
3. **Dashboard**: View all employees and statistics
4. **Add Employee**: Click "Add Employee" button to add a new employee
5. **Search**: Use search bar to filter employees by name
6. **Edit**: Click edit button to modify employee details
7. **Delete**: Click delete button to remove an employee (with confirmation)

## Project Structure

```
Employee_management/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   ├── src/
│   │   ├── server.js
│   │   ├── middleware/
│   │   └── routes/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/
    │   └── App.jsx
    └── package.json
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=your_secret_key
PORT=5000
```

## License

MIT
