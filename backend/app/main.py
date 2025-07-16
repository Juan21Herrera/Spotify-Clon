from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routers import artist, playlist, search, track, home

app = FastAPI(
    title="Spotify Clon Backend",
    description="Using Deezer API to get info + songs",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home.router)
app.include_router(artist.router)
app.include_router(playlist.router)
app.include_router(search.router)
app.include_router(track.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

