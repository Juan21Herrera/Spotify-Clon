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