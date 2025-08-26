from fastapi import APIRouter, HTTPException, Query
import requests

URL_FETCH = "https://api.deezer.com"

router = APIRouter(
    prefix="/search",
    tags=["Search"],
    responses={
        404: {"description": "Search not found"},
        500: {"description": "Internal Server Error"},
    },
)

@router.get("")
async def search_all(q: str = Query(..., description="Texto a buscar en Deezer")):
    try:
        results = {}

        # Canciones
        track_res = requests.get(f"{URL_FETCH}/search/track", params={"q": q}).json()
        results["tracks"] = track_res.get("data", [])

        # Artistas
        artist_res = requests.get(f"{URL_FETCH}/search/artist", params={"q": q}).json()
        results["artists"] = artist_res.get("data", [])

        # Playlists
        playlist_res = requests.get(f"{URL_FETCH}/search/playlist", params={"q": q}).json()
        results["playlists"] = playlist_res.get("data", [])

        # Álbumes
        album_res = requests.get(f"{URL_FETCH}/search/album", params={"q": q}).json()
        results["albums"] = album_res.get("data", [])

        return results

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
