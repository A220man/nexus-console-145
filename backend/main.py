"""Nexus Console 145 - FastAPI Backend"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="Nexus Console 145",
    description="Anti-AI-slop design skill backend",
    version="0.1.0"
)

# CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str
    version: str


class Theme(BaseModel):
    id: str
    name: str
    genre: str
    description: str


class DealResponse(BaseModel):
    themes: list[Theme]
    genre: str


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Health check endpoint"""
    return HealthResponse(status="ok", version="0.1.0")


@app.get("/api/themes", response_model=list[Theme])
async def list_themes() -> list[Theme]:
    """List all available themes"""
    return [
        Theme(
            id="modern-minimal",
            name="Modern Minimal",
            genre="clean",
            description="Clean, spacious, high-contrast design"
        ),
        Theme(
            id="brutalist",
            name="Brutalist",
            genre="bold",
            description="Raw, unpolished, high-impact aesthetic"
        ),
        Theme(
            id="editorial",
            name="Editorial",
            genre="refined",
            description="Magazine-inspired typographic hierarchy"
        ),
    ]


@app.post("/api/themes/deal", response_model=DealResponse)
async def deal_themes(genre: Optional[str] = None) -> DealResponse:
    """Deal 3 themes, optionally filtered by genre"""
    all_themes = [
        Theme(
            id="modern-minimal",
            name="Modern Minimal",
            genre="clean",
            description="Clean, spacious, high-contrast design"
        ),
        Theme(
            id="brutalist",
            name="Brutalist",
            genre="bold",
            description="Raw, unpolished, high-impact aesthetic"
        ),
        Theme(
            id="editorial",
            name="Editorial",
            genre="refined",
            description="Magazine-inspired typographic hierarchy"
        ),
    ]
    if genre:
        filtered = [t for t in all_themes if t.genre == genre]
        return DealResponse(themes=filtered[:3], genre=genre)
    return DealResponse(themes=all_themes[:3], genre="mixed")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

