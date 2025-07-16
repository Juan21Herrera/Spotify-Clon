from fastapi import APIRouter, HTTPException
import requests

URL_FETCH = "https://api.deezer.com"

router = APIRouter(
    prefix="/home",
    tags=["Home"],
    responses={
        404: {"description" : "Content not found"},
        500: {"description" : "Internal Server Error"},
    },
)


@router.get("/")
def get_home_data():
    try:
        # Made for you
        artist_response = requests.get(f"{URL_FETCH}/search/artist", params={"q": "morat"}).json()
        artists = artist_response.get("data", [])[:4]

        # Daily Mix
        mix_response = requests.get(f"{URL_FETCH}/search/playlist", params={"q" : "Daily Mix"}).json()
        mixes = mix_response.get("data", [])[:4]

        # Poppular Radios
        radio_response = requests.get(f"{URL_FETCH}/search/playlist", params={"q": "radio"}).json()
        radios = radio_response.get("data", [])[:4]

        return {
            "made_for_you": artists,
            "daily_mix": mixes,
            "popular_stations": radios,
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Daily Recommendations