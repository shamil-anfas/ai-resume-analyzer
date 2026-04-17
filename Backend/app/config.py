import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env file
load_dotenv(dotenv_path=".env", override=True)

class Settings(BaseSettings):
    groq_api_key: str  # Replaced gemini_api_key with groq_api_key for the new provider
    app_name: str = "AI Resume Optimizer"
    debug: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8',
        extra="ignore"
    )

# Single instance used across the app
settings = Settings()