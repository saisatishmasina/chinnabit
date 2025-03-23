# ChinnaBit URL Shortener

A full-stack URL shortener application with FastAPI backend and Next.js frontend with Google authentication.

Visit: [https://cibit.duckdns.org/]](https://cibit.duckdns.org/)
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

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Frontend**: Next.js, React, Auth.js, Tailwind CSS
- **Database**: MySQL (via PyMySQL)
