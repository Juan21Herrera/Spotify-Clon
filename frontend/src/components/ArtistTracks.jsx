import { useState } from "react";
import axios from "axios";

export default function ArtistTracks() {
    const [artist, setArtist] = useState("");
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    const fetchTracks = async () => {
        const res = await axios.get(`http://localhost:8000/artist/top`, {
            params: {artist_name: artist},
        });
        setTracks(res.data.tracks);
    };

    return (
        <div>
            <input 
                type="text" 
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Buscar artista"
                className="p-2 rounded bg-gray-800 text-white mr-2"
            />
            <button onClick={fetchTracks} className="px-4 py-2 bg-green-200 rounded">
                Buscar
            </button>

            <div className="mt-6 space-y-4">
                {tracks.map((track) => (
                    <div key={track.id} className="flex items-center justify-between bg-[#1e1e1e] p-2 rounded">
                        <div className="flex items-center gap-4">
                            <img 
                                src={track.album.cover_small} 
                                alt={track.title}
                                className="w-10 h-10" 
                            />
                            <span>{track.title}</span>
                        </div>
                        <button
                            onClick={() => setCurrentTrack(track.id)}
                            className="bg-blue-500 px-2 py-1 rounded"
                        >
                            Reproducir
                        </button>
                    </div>
                ))}
            </div>

            {currentTrack && (
                <div className="mt-6">
                    <iframe 
                        title="deezer-player"
                        scrolling="no"
                        frameborder="0"
                        allowTransparency="true"
                        src={`https://widget.deezer.com/widget/dark/track/${currentTrack}`}
                        width="100%"
                        height="90"
                    ></iframe>
                </div>
            )}
        </div>
    )
}