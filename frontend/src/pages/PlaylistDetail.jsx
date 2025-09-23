import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext.jsx";
import TrackRow from "../components/TrackRow.jsx";
import axios from "axios";

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playTrack, current, playing } = usePlayer();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/playlist/${id}`)
      .then((res) => {
        setPlaylist(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar la playlist.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando playlist...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-[#2e2e2e] to-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-10">
        <img
          src={playlist.picture_xl}
          alt={playlist.title}
          className="w-40 h-40 sm:w-56 sm:h-56 rounded shadow-lg object-cover mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left">
          <p className="uppercase text-xs sm:text-sm font-semibold text-gray-300">
            Public playlist
          </p>
          <h1 className="text-3xl sm:text-6xl font-bold mt-2">{playlist.title}</h1>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            With {playlist.nb_tracks} songs
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-6 justify-center sm:justify-start">
        <button 
          onClick={() => playTrack(playlist.tracks.data)} // Reproduce toda la playlist
          className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition"
        >
          <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
            <path d="M5 3v18l15-9L5 3z" />
          </svg>
        </button>
        <button className="hidden sm:block text-xl hover:text-gray-400">⤮</button>
        <button className="hidden sm:block text-xl hover:text-gray-400">⋯</button>
      </div>

      {/* Track list */}
      <div className="w-full">
        {/* Encabezados SOLO en desktop */}
        <div className="hidden md:grid grid-cols-[40px_1fr_1fr_80px] text-gray-400 text-sm font-semibold border-b border-gray-600 pb-2 mb-3">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Title</span>
          <span className="col-span-3">Album</span>
          <span className="col-span-3">Date</span>
          <span className="col-span-1 text-right">🕒</span>
        </div>

        {playlist.tracks?.data?.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
