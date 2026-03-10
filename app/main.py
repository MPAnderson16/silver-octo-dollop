from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.services.openai_service import create_chat_response

app = FastAPI(title="silver-octo-dollop")

# Allow the frontend (running separately) to call this API during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EchoRequest(BaseModel):
    message: str

class ChatRequest(BaseModel):
    message: str

@app.get("/", tags=["health"])
def read_root():
    """Health check / root endpoint."""
    return {"message": "Hello, world!"}


@app.post("/echo", tags=["utility"])
def echo(request: EchoRequest):
    """Echoes back the received message."""
    return {"echo": request.message}


@app.post("/chat", tags=["ai"])
def chat(req: ChatRequest):
    """Chat endpoint that replies via OpenAI."""

    try:
        reply = create_chat_response(req.message)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

    return {"reply": reply}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
