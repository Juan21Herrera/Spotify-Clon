from fastapi import APIRouter, HTTPException
import requests

URL_FETCH = "https://api.deezer.com"

router = APIRouter(
    prefix="/artist",
    tags=["Artist"],
    responses={
        404: {"description": "Artist not found"},
        500: {"description": "Internal Server Error"},
    },
)


# Get artist by id
@router.get("/{artist_id}")
def get_artist(artist_id: int):
    try:
        response = requests.get(f"{URL_FETCH}/artist/{artist_id}")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Artist not found")
        return response.json()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get album artist
@router.get("/{artist_id}/albums")
def get_artist_albums(artist_id: int):
    try:
        response = requests.get(f"{URL_FETCH}/artist/{artist_id}/albums")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Albums not found")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Top tracks by artist
@router.get("/{artist_id}/top")
def get_artist_top(artist_id: int):
    try:
        response = requests.get(f"{URL_FETCH}/artist/{artist_id}/top")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Top tracks not found")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))