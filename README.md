# PeerLance – Freelance Job Marketplace

A full-stack MERN application where users can post jobs, apply for jobs with comments and contact details, and manage their applications in one place.

**Live Demo**: [peerlance.shivamdev.me](https://peerlance.shivamdev.me/)  
**Backend API**: Hosted on Render

---

## Features

- User authentication with JWT and React Context API
- Post jobs with budget, deadline, and tags
- Apply for jobs with comments and contact details
- My Jobs dashboard – view, edit, and delete your own postings
- My Applications dashboard – track application status
- Cascade delete – automatically remove related applications when a job is deleted
- Responsive UI using Tailwind CSS and DaisyUI

---

## Tech Stack

**Frontend**
- React with Vite
- Tailwind CSS with DaisyUI
- Axios for API requests
- React Context for authentication

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- MVC architecture

**Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## Project Structure

```

.
├── backend
│   ├── controllers      # Request handlers
│   ├── models           # Mongoose schemas
│   ├── routes           # Express routes
│   ├── middleware       # Authentication, validation
│   └── server.js        # Entry point
├── frontend
│   ├── src
│   │   ├── components   # UI components
│   │   ├── pages        # Page-level components
│   │   ├── context      # Auth context
│   │   └── App.jsx
└── README.md

````

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shivam-Gupta-Github/peerlance.git
cd your-repo
````

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Setup environment variables

**Backend `.env`**

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend `.env`**

```
VITE_BACKEND_URL=http://localhost:5000
```

### 4. Run the app in development

You need to run the backend and frontend in separate terminals.

**Terminal 1 — Start Backend**
```bash
cd backend
node server.js
```
**Terminal 2 — Start Frontend**
```bash
cd frontend
npm run dev
```
The backend will run on the port defined in your .env (default is usually 5000),
and the frontend will run on Vite’s default port (5173) unless changed.

---

## Deployment

* **Frontend**: [Vercel](https://vercel.com/)
* **Backend**: [Render](https://render.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Future Improvements

* Dockerize frontend and backend for easier deployment
* Real-time in-app chat between job posters and applicants
* File attachments for job posts and applications
* Improved job search and filtering
* Role-based access control

---
