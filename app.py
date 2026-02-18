from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SentimentRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {
        "message": "Sentiment Analysis API",
        "endpoints": {
            "sentiment": "POST /sentiment",
            "docs": "GET /docs",
            "health": "GET /health"
        }
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/sentiment")
async def sentiment(payload: SentimentRequest):
    text = payload.text.lower()
    if "good" in text or "love" in text:
        return {"sentiment": "positive"}
    if "bad" in text or "hate" in text:
        return {"sentiment": "negative"}
    return {"sentiment": "neutral"}
