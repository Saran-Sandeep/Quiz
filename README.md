# QuizQuest

A topic-focused quiz application built with Angular that helps users test and improve their knowledge in specific areas.

## Overview

QuizQuest is a frontend-only quiz application that allows users to:

- Select a specific topic of interest
- Take a timed quiz with multiple-choice questions
- Track their progress in real-time
- View detailed performance analysis

## Tech Stack

- Angular 19
- Angular Material 19
- TypeScript
- CSS3
- HTML5

## Features

### Authentication

- Login/Signup functionality (Frontend implementation)
- Form validation
- Error handling

### Quiz Flow

1. Topic Selection

   - Single topic selection
   - Topic preview
   - Clear selection option

2. Quiz Interface

   - Multiple choice questions
   - Timer functionality
   - Navigation controls (Previous, Next, Skip)
   - Progress tracking

3. Results Analysis
   - Score visualization
   - Performance metrics
   - Retry options

## Project Structure

```

quizquest/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── auth/
│ │ │ │ ├── login/
│ │ │ │ └── signup/
│ │ │ ├── landing/
│ │ │ ├── how-it-works/
│ │ │ ├── topic-selection/
│ │ │ ├── quiz/
│ │ │ └── results/
│ │ ├── shared/
│ │ │ ├── services/
│ │ │ ├── pipes/
│ │ │ └── interfaces/
│ │ └── app.component.ts
│ ├── assets/
│ └── styles/
└── README.md

```

## Application Flow

```

Login/Signup → Landing Page → Topic Selection → Quiz → Results
↓
How It Works

```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm (Latest version)
- Angular CLI (v19)

### Installation

1. Clone the repository

```

git clone https://github.com/Saran-Sandeep/Quiz.git

```

2. Install dependencies

```

cd quizquest
npm install

```

3. Start the development server

```

ng serve

```

4. Navigate to `http://localhost:4200`

## Component Documentation

### Auth Component

- Handles user authentication
- Form validation using Angular Reactive Forms
- Error message display
- Navigation to landing page

### Landing Component

- Welcome screen
- Navigation to topic selection
- Access to "How It Works" modal

### Topic Selection Component

- Single topic selection interface
- Topic preview
- Start quiz button
- Clear selection option

### Quiz Component

- Question display
- Multiple choice options
- Timer implementation
- Navigation controls
- Progress tracking

### Results Component

- Score display
- Performance metrics
- Retry option
- Back to topics option

## Services

### QuizStateService

Manages the application state including:

- Selected topic
- Quiz progress
- Score calculation
- Results storage

### AuthService

Handles authentication state:

- Login state
- User session
- Auth guards

## Development Guidelines

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper component lifecycle hooks
- Maintain consistent naming conventions

### CSS Guidelines

- Use BEM naming convention
- Maintain global variables
- Follow mobile-first approach
- Use responsive design principles

### Component Guidelines

- Keep components focused and maintainable
- Implement proper error handling
- Use Angular Material components effectively
- Follow accessibility guidelines

## Building

```

ng build --configuration production

```

## Testing

```

ng test

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Screenshots

### Login Page

[Login Screenshot]

### Landing Page

[Landing Screenshot]

### Topic Selection

[Topic Selection Screenshot]

### Quiz Interface

[Quiz Screenshot]

### Results Page

[Results Screenshot]

## Future Enhancements

- Backend integration
- User profile management
- Progress tracking across sessions
- Detailed analytics
- Social sharing features

## Contact

Your Name - [saransandeepyedla03@gmail.com]
Project Link: []()
