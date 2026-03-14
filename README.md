# 🤖 AI Website Builder (MERN Stack)

An **AI-powered MERN Stack application** that generates full website layouts from a user prompt.

Users can describe their website idea and the AI will automatically generate **HTML code**, which can be **previewed, edited live, and copied for deployment anywhere**.

---

# 🚀 Features

- 🤖 AI Website Generation using OpenRouter API
- 🧠 DeepSeek AI model for generating website code
- 🔐 Google Authentication using Firebase
- 📊 Dashboard to manage generated websites
- 📝 Live Website Editor
- 👀 Real-time HTML Preview
- 📋 Copy Code functionality
- 💬 AI conversation history stored
- 💳 Credit system for AI usage

---

# 🛠 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Redux Toolkit
- React Router
- Framer Motion
- Axios
- Firebase (Google Authentication)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- OpenRouter AI API

---

# 📂 Frontend Project Structure

```
src
 ┣ components
 ┃ ┣ Chat.jsx
 ┃ ┣ Header.jsx
 ┃ ┣ LoginModal.jsx
 ┃
 ┣ hooks
 ┃ ┣ useGetCurrentUser.jsx
 ┃
 ┣ pages
 ┃ ┣ Home.jsx
 ┃ ┣ Dashboard.jsx
 ┃ ┣ Generate.jsx
 ┃ ┣ Editor.jsx
 ┃ ┣ Footer.jsx
 ┃ ┣ NotFound.jsx
 ┃
 ┣ redux
 ┃ ┣ Store.js
 ┃ ┣ userSlice.js
 ┃
 ┣ App.jsx
 ┣ Firebase.js
 ┣ main.jsx
```

---

# 📂 Backend Project Structure

```
Backend
 ┣ Config
 ┃ ┣ db.js
 ┃ ┣ openRouter.js
 ┃
 ┣ Controllers
 ┃ ┣ authController.js
 ┃ ┣ userControllers.js
 ┃ ┣ websiteController.js
 ┃
 ┣ Middlewares
 ┃ ┣ isAuth.js
 ┃
 ┣ Models
 ┃ ┣ UserModel.js
 ┃ ┣ WebsiteModel.js
 ┃
 ┣ Routes
 ┃ ┣ authRoutes.js
 ┃ ┣ userRoutes.js
 ┃ ┣ websiteRoutes.js
 ┃
 ┣ utils
 ┃ ┣ extractJson.js
 ┃
 ┣ server.js
```

---

# 🔐 Authentication

Authentication is implemented using:

- **Google Authentication via Firebase (Frontend)**
- **JWT Token stored in HTTP Cookies (Backend)**

The `isAuth` middleware verifies the token and attaches the authenticated user to the request.

---

# 🤖 AI Website Generation Flow

1️⃣ User enters a website description.

2️⃣ Frontend sends the prompt to backend.

3️⃣ Backend sends the prompt to **OpenRouter AI API**.

4️⃣ AI returns JSON like:

```
{
  "message": "Website generated successfully",
  "code": "<full html code>"
}
```

5️⃣ Backend stores:

- Generated HTML code
- Conversation history
- User reference

6️⃣ Website appears inside the **Dashboard**.

---

# 💳 Credit System

Each user has credits for AI usage.

| Action           | Credits Used |
| ---------------- | ------------ |
| Generate Website | 50           |
| Update Website   | 25           |

New users start with **200 free credits**.

---

# ⚙️ Environment Variables

Create a `.env` file in backend:

```
PORT=3000
MONGO_URL=your_mongodb_connection
SECRET_KEY=your_jwt_secret
OPENROUTER_API=your_openrouter_api_key
```

## 2️⃣ Install dependencies

Frontend

```
npm install
```

Backend

```
npm install
```

---

## 3️⃣ Start backend

```
node server.js and nodemon server.js
```

---

## 4️⃣ Start frontend

```
npm run dev
```

---

# 📡 API Routes

## Auth Routes

```
POST /api/auth/google
GET  /api/auth/logout
```

---

## User Routes

```
GET /api/user/me
```

---

## Website Routes

```
POST /api/website/generate
GET  /api/website/get-all
GET  /api/website/get-by-id/:id
POST /api/website/update/:id
```

---

# 📸 Screenshots

(Add screenshots of your project here)

Example:

- Home Page
- Dashboard
- AI Generator Page
- Live Editor

---

# 👨‍💻 Author

**Abhinash Kumar**

Full Stack MERN Developer

---

# ⭐ Support

If you like this project, give it a **⭐ star on GitHub**.
