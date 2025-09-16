# Click-Fox

A modern web application for testing clicking speed and reaction time.

## Tech Stack

### Frontend
- **React** - UI framework with functional components and hooks
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Firebase** - Authentication and hosting

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
- Responsive design for all devices
- User authentication and data persistence

## License

This project is open source and available under the [MIT License](LICENSE).
