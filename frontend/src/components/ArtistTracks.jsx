import { useState } from "react";
import axios from "axios";

export default function ArtistTracks() {
  const [artist, setArtist] = useState("");
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const fetchTracks = async () => {
    if (!artist.trim()) return;
    try {
      const res = await axios.get("http://localhost:8000/artist/top", {
        params: { artist_name: artist },
      });
      setTracks(res.data.tracks || []);
    } catch (err) {
      console.error("Error al buscar canciones:", err);
      setTracks([]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* 🔎 Barra de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Buscar artista..."
          className="w-full sm:flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={fetchTracks}
          className="w-full sm:w-auto px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-semibold"
        >
          Buscar
        </button>
      </div>

      {/* 🎵 Lista de canciones */}
      <div className="mt-6 grid gap-4">
        {tracks.length === 0 && (
          <p className="text-gray-400 text-center">No se encontraron canciones.</p>
        )}
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-[#1e1e1e] p-3 rounded-xl shadow-md hover:bg-[#2c2c2c] transition"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={track.album.cover_medium}
                alt={track.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium truncate">{track.title}</span>
                <span className="text-gray-400 text-sm truncate">{track.artist.name}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentTrack(track.id)}
              className="mt-3 sm:mt-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-semibold"
            >
              ▶ Reproducir
            </button>
          </div>
        ))}
      </div>

      {/* 🎧 Reproductor */}
      {currentTrack && (
        <div className="mt-8">
          <iframe
            title="deezer-player"
            scrolling="no"
            frameBorder="0"
            allowTransparency="true"
            src={`https://widget.deezer.com/widget/dark/track/${currentTrack}`}
            className="w-full rounded-lg shadow-lg"
            height="100"
          ></iframe>
        </div>
      )}
    </div>
  );
}
