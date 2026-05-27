from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from contextlib import asynccontextmanager
import httpx
import os

from .config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 M1-Coder API starting up...")
    yield
    # Shutdown
    print("👋 M1-Coder API shutting down...")

app = FastAPI(
    title="M1-Coder API",
    description="AI-Powered Coding Assistant Backend",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    model: str = "anthropic/claude-3.5-sonnet"
    deep_thinking: bool = False
    files: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    message: str
    model: str
    thinking: Optional[str] = None

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(request: ChatRequest, authorization: Optional[str] = Header(None)):
    api_key = settings.openrouter_api_key or os.getenv("OPENROUTER_API_KEY")
    
    if not api_key:
        raise HTTPException(status_code=400, detail="OpenRouter API key not configured")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    
    system_prompt = "You are a helpful AI coding assistant."
    if request.deep_thinking:
        system_prompt += " Use detailed reasoning and explain your thought process."
    
    payload = {
        "model": request.model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ],
        "max_tokens": 4096,
    }
    
    async with httpx.AsyncClient(base_url="https://openrouter.ai/api/v1") as client:
        try:
            response = await client.post("/chat/completions", json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            return {
                "message": data["choices"][0]["message"]["content"],
                "model": request.model,
            }
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)