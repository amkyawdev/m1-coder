from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    openrouter_api_key: Optional[str] = None
    firebase_credentials: Optional[str] = None
    cors_origins: list = ["https://m1-coder.vercel.app"]
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()