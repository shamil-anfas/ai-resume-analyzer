from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze
from app.config import settings

app = FastAPI(
    title="AI Resume Optimizer",
    description="Upload a resume + job description, get ATS score and suggestions",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Resume Optimizer API is running ✅"}