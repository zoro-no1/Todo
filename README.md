# Todo Application

This is a full-stack Todo Application built using React for the frontend and Node.js with Express for the backend. It allows users to create, manage, and track their tasks efficiently.

---

## Features

- User authentication (Sign Up, Login, Logout)
- Create, update, delete, and filter tasks
- Task prioritization (Low, Medium, High)
- Responsive design with Tailwind CSS
- Backend API with JWT-based authentication
- MongoDB for data storage

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm (comes with Node.js)

### Steps to Set Up the Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```plaintext
   PORT=4000
   JWT_TOKEN=<your-secret-key>
   DB_URI=<your-mongodb-uri>
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. The backend server will run on `http://localhost:4000`.

---

### Steps to Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will run on `http://localhost:5173`.

---

## Technical Choices and Architecture

### Frontend

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Zustand**: For state management.
- **Tailwind CSS**: For styling.
- **React Hot Toast**: For notifications.
- **Vite**: For fast development and build tooling.

### Backend

- **Node.js**: For building the server-side application.
- **Express.js**: For creating RESTful APIs.
- **MongoDB**: As the database for storing user and todo data.
- **Mongoose**: For object data modeling (ODM) with MongoDB.
- **Zod**: For schema validation of user inputs.
- **JWT**: For user authentication and session management.
- **Bcrypt**: For hashing and verifying passwords.

### Architecture

- **Modular Structure**: The project is organized into folders for `controllers`, `models`, `routers`, `middleware`, and `utils` to ensure separation of concerns.
- **Authentication**: JWT-based authentication is implemented with middleware to protect routes.
- **Database Models**: Mongoose schemas are used to define the structure of the data.
- **Validation**: Zod is used to validate user inputs for better error handling and security.

---

## Database Schema Description

### User Schema

- **username**: `String` (required)
- **email**: `String` (required, unique)
- **password**: `String` (required, hashed before saving)

### Todo Schema

- **title**: `String` (required)
- **description**: `String` (required)
- **status**: `String` (enum: `Complete`, `Incomplete`)
- **priority**: `String` (enum: `Low`, `Medium`, `High`)
- **owner**: `ObjectId` (reference to the `User` model)
- **timestamps**: Automatically adds `createdAt` and `updatedAt` fields.

---

## How to Run the Application Locally

1. **Start the Backend**:
   - Follow the setup instructions above to start the backend server.

2. **Start the Frontend**:
   - Follow the setup instructions above to start the frontend server.

3. **Test the APIs**:
   - Use tools like Postman or cURL to test the API endpoints.
   - Example endpoints:
     - `POST /api/auth/signup`: User signup
     - `POST /api/auth/login`: User login
     - `POST /api/todo/create`: Create a todo (requires authentication)

4. **Connect to the Database**:
   - Ensure your MongoDB instance is running and accessible via the `DB_URI` in the `.env` file.

5. **Access Logs**:
   - Check the terminal for logs to debug any issues.

---

## Folder Structure

### Backend

- **`src/controllers`**: Contains logic for handling API requests.
- **`src/models`**: Defines Mongoose schemas for `User` and `Todo`.
- **`src/routers`**: Defines API routes for authentication and todos.
- **`src/middleware`**: Contains middleware for authentication.
- **`src/utils`**: Utility functions like token generation and password comparison.

### Frontend

- **`src/pages`**: Contains React components for different pages (Home, Auth, Main).
- **`src/store`**: Zustand stores for managing state.
- **`src/util`**: Utility functions like Axios instance configuration.
- **`src/assets`**: Static assets like images.

---

Feel free to contribute or raise issues for improvements!