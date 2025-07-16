from fastapi import APIRouter, HTTPException
import requests

URL_FETCH = "https://api.deezer.com"

router = APIRouter(
    prefix="/track",
    tags=["Track"],
    responses={
        404: {"description" : "Track not found"},
        500: {"description" : "Internal Server Error"},
    },
)

# Get track details by ID
@router.get("/{track_id}")
def get_track_by_id(track_id : int):
    try:
        response = requests.get(f"{URL_FETCH}/track/{track_id}")
        data = response.json()

        if response.status_code != 200 or not data.get("id"):
            raise HTTPException(status_code=404, detail="Track not found")
        
        return data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))