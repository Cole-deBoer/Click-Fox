# Click-Fox

A modern web application for testing clicking speed and reaction time, built with React and Firebase.

**[Live Demo](https://clickfox.web.app)** 🦝

## Overview

Click-Fox is a responsive web application that provides multiple game modes for testing clicking performance. Built with modern web technologies, it features real-time performance tracking, customizable themes, and a clean, intuitive interface.

## Tech Stack

### Frontend
- **React 18** - UI framework with functional components and hooks
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Firebase** - Authentication and hosting
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **Firebase Hosting** - Static site hosting
- **Firebase Authentication** - User management
- **MongoDB Atlas** - Cloud database

## Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks
│   │   └── assets/          # Static assets
│   └── firebase.js          # Firebase configuration
├── backend/                  # Express server
│   ├── controllers/          # Business logic
│   ├── routes/              # API endpoints
│   └── models/              # Data models
└── firebase.json            # Hosting configuration
```

## Features

- Multiple game modes for different types of clicking tests
- Real-time performance tracking and analytics
- Customizable theme system
- Responsive design for all devices
- User authentication and data persistence
- Shareable results and performance levels

## Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Database
- Firebase Project

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Click-Fox
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Environment Configuration:**
   Create `.env` files with your Firebase and MongoDB credentials.

## API Endpoints

### Authentication
- `GET /api/auth/ping` - Verify authentication status

### User Management
- `POST /api/user/create` - Create new user
- `GET /api/user/:username` - Get user by username

## Contributing

We welcome contributions! Please feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Check out the live application: [Click-Fox](https://clickfox.web.app)** 🦝
