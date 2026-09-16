# Series Tracker API

REST API developed for a full-stack web application that allows users to discover, track and manage TV series.

The backend handles authentication, users, series, categories, progress tracking, ratings and favorites. It also integrates external services to provide additional series information and personalized recommendations.

## Features

* User registration and authentication using JWT
* Password hashing with bcrypt
* Role-based authorization (`viewer` / `admin`)
* TV series management
* Categories management
* User series tracking
* Episode and season progress
* Favorites and ratings
* User statistics
* Personalized series recommendations using Google Gemini
* Integration with the TVMaze API
* Image upload and management with Cloudinary
* Request validation with Joi
* MongoDB persistence using Mongoose

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **Joi**
* **Multer**
* **Cloudinary**
* **Google Gemini API**
* **TVMaze API**

## Architecture

The project follows a layered structure to separate responsibilities.

```text
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validators/
└── ...
```

* **Routes** define the API endpoints.
* **Controllers** handle HTTP requests and responses.
* **Services** contain the application and business logic.
* **Models** define MongoDB schemas using Mongoose.
* **Middlewares** handle authentication, authorization and other cross-cutting concerns.
* **Validators** validate incoming request data.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication.

Protected routes require a valid token to be included in the request headers.

```http
Authorization: Bearer <token>
```

Authorization middleware is also used to restrict certain operations according to the user's role.

## External APIs

### TVMaze

TVMaze is used to retrieve additional information about TV series and support the recommendation functionality.

### Google Gemini

Google Gemini is used to generate personalized series recommendations based on user information and viewing activity.

### Cloudinary

Cloudinary is used for image storage and management.

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and configure the environment variables required by the application.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start the application:

```bash
npm start
```

For development:

```bash
npm run dev
```

## API

The REST API provides resources for:

* Authentication
* Users
* Series
* Categories
* Series tracking and progress
* Favorites
* Ratings
* Statistics
* Recommendations

## Deployment

The backend is deployed on **Vercel**.

Data persistence is handled through **MongoDB** using **Mongoose**.

## Frontend

The application includes a separate frontend developed with:

* React
* Vite
* Redux Toolkit
* React Router
* Axios
* Chart.js

The frontend communicates with this REST API and is maintained in a separate repository.

## Project Context

This project was developed as an academic full-stack application with emphasis on REST API development, authentication and authorization, persistence, integration with external APIs and separation of responsibilities.

## Authors

* Diego de Brun
* Karina Krysztal

## License

This project was developed for educational purposes.
