from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(
    prefix="/playlist",
    tags=["Playlist"],
    responses={
        404: {"description": "Playlist not found"},
        500: {"description": "Internal server error"},
    },
)

URL_FETCH = "https://api.deezer.com"

@router.get("/{playlist_id}")
def get_playlist_by_id(playlist_id: int):
    try:
        response = requests.get(f"{URL_FETCH}/playlist/{playlist_id}")
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Playlist not found")
        return response.json()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_default_playlists():
    default_ids = [5927348504, 6651436664, 1728268443, 3110429622, 6065606904, 13239088603, 4962683744]
    playlists = []

    for pid in default_ids:
        response = requests.get(f"{URL_FETCH}/playlist/{pid}")
        if response.status_code == 200:
            playlists.append(response.json())

    return playlists

