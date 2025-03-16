# ChinnaBit URL Shortener

A full-stack URL shortener application with FastAPI backend and Next.js frontend with Google authentication.

## Features

- URL shortening service
- User authentication with Google OAuth
- Responsive and modern UI with Tailwind CSS
- API to create and redirect shortened URLs

## Project Structure

```
/
├── Backend/            # FastAPI backend
│   ├── crud.py         # Database operations
│   ├── database.py     # Database connection setup
│   ├── main.py         # FastAPI app and routes
│   ├── models.py       # SQLAlchemy models
│   └── schemas.py      # Pydantic schemas
│
└── Frontend/           # Next.js frontend
    ├── src/
    │   ├── app/        # Next.js app router
    │   ├── components/ # React components
    │   └── lib/        # Utility functions
    ├── public/         # Static assets
    └── .env.local      # Environment variables (not tracked by git)
```

## Setup Instructions

### Backend

1. Create a `.env` file in the Backend directory with your database configuration:

```
DATABASE_URL=your_database_connection_string
```

2. Activate the virtual environment:

```bash
source venv/bin/activate  # On Linux/macOS
# OR
venv\Scripts\activate     # On Windows
```

3. Start the FastAPI server:

```bash
cd Backend
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

1. Update the `.env.local` file in the Frontend directory with your Google OAuth credentials:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

To get Google OAuth credentials:
- Go to the [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Configure the OAuth consent screen
- Create OAuth client ID credentials
- Add authorized redirect URIs (http://localhost:3000/api/auth/callback/google)

2. Install the dependencies:

```bash
cd Frontend
npm install
```

3. Start the Next.js development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Frontend**: Next.js, React, Auth.js, Tailwind CSS
- **Database**: MySQL (via PyMySQL)
