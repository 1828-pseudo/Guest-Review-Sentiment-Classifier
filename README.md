# Guest Review Sentiment Classifier

A full-stack machine learning–powered web application that analyzes guest reviews and classifies sentiment as **Positive**, **Negative**, or **Neutral**. The project helps hospitality businesses gain actionable insights from customer feedback through an intuitive web interface and a RESTful backend API.

---

## 🚀 Current Progress

### Frontend

* Built using **React + Vite**
* Styled with **Tailwind CSS**
* Client-side routing using **React Router DOM**
* Responsive layouts for mobile, tablet, and desktop
* Dark/Light mode with theme persistence using **localStorage**
* Reusable UI component library

### Backend

* Built with **FastAPI**
* RESTful API with CRUD operations
* Search endpoint for reviews
* CORS configured for frontend integration
* In-memory data storage (database integration planned)
* Interactive API documentation via Swagger UI

---

## ✨ Features

### Frontend

* Responsive user interface
* Route-based navigation
* Dark/Light theme switching
* Reusable component architecture
* UI Component Showcase page

### Backend

* REST API for guest reviews
* Create, Read, Update and Delete (CRUD) operations
* Search reviews by keyword
* JSON responses with proper HTTP status codes
* Error handling using FastAPI exceptions

---

## 📄 Pages

* Home
* About
* Dashboard
* Login
* UI Component Showcase

---

## 🧩 UI Component Library

* Button
* Input
* Modal
* Toast
* Loader

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* React Hot Toast

### Backend

* FastAPI
* Python
* Uvicorn
* Python Dotenv

### Planned ML Integration

* Scikit-learn
* Pandas
* NumPy

---

## 📂 Project Structure

```text
Guest-Review-Sentiment-Classifier/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

---

## 🔗 REST API Endpoints

| Method | Endpoint                        | Description      |
| ------ | ------------------------------- | ---------------- |
| GET    | `/`                             | API status       |
| GET    | `/api/reviews`                  | Get all reviews  |
| GET    | `/api/reviews/{id}`             | Get review by ID |
| POST   | `/api/reviews`                  | Create review    |
| PUT    | `/api/reviews/{id}`             | Update review    |
| DELETE | `/api/reviews/{id}`             | Delete review    |
| GET    | `/api/reviews/search/{keyword}` | Search reviews   |

---

## ⚙️ How to Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## ⚙️ How to Run Backend Locally

### Navigate to backend

```bash
cd backend
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate virtual environment

Windows:

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Create `.env`

```env
PORT=5000
```

### Run the backend

```bash
uvicorn main:app --reload --port 5000
```

Backend:

```
http://127.0.0.1:5000
```

Swagger Documentation:

```
http://127.0.0.1:5000/docs
```

---

## 🚧 Upcoming Development

* Machine Learning sentiment prediction
* Frontend-backend API integration
* Guest review submission workflow
* Dashboard analytics and visualizations
* Database integration
* User authentication
* Deployment to cloud platforms

---

## 📌 Project Status

🚧 **Project Under Active Development**

This project is currently being developed as part of a software development internship. The frontend foundation and RESTful backend API have been completed, while machine learning integration, database connectivity, and advanced analytics are actively being implemented.
