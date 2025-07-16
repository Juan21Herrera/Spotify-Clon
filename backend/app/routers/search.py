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




# Search artist by name
@router.get("/artist")
def search_artist(name: str = Query(..., description="Artist name")):
    try:
        response = requests.get(f"{URL_FETCH}/search/artist", params={"q": name})
        data = response.json()

        if not data.get("data"):
            raise HTTPException(status_code=404, detail="Not artist found")
        
        return data["data"] # Return the first artist found
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Search playlist by artist name
@router.get("/playlist")
def search_playlist(name: str = Query(..., description="Playlist or artist name")):
    try:
        response = requests.get(f"{URL_FETCH}/search/playlist", params={"q": name})
        data = response.json()

        if not data.get("data"):
            raise HTTPException(status_code=404, detail="No playlist found")
        return data["data"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Search songs
@router.get("/track")
def search_track(name: str = Query(..., description="Track name")):
    try:
        response = requests.get(f"{URL_FETCH}/search/track", params={"q": name})
        data = response.json()

        if not data.get("data"):
            raise HTTPException(status_code=404, detail="No track found")
        return data["data"]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))