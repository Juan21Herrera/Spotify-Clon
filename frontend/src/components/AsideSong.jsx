// src/components/AsideSong.jsx
import { usePlayer } from "../context/PlayerContext";

export default function AsideSong() {
  const { current, playing, playTrack } = usePlayer();
  if (!current) return <div className="text-gray-400">No song playing</div>;

  return (
    <div className="flex flex-col items-center sm:items-start sm:space-y-4 p-4 bg-[#181818] rounded-lg">
      {/* Imagen responsiva */}
      <img
        src={current.album?.cover_big || current.picture_xl || "/placeholder.png"}
        alt={current.title}
        className="w-32 h-32 sm:w-full sm:h-auto rounded-lg object-cover"
      />

      {/* Texto */}
      <div className="mt-2 sm:mt-0 text-center sm:text-left">
        <h3 className="text-white text-base sm:text-lg font-semibold truncate max-w-[200px] sm:max-w-full">
          {current.title}
        </h3>
        <p className="text-gray-400 text-sm sm:text-base truncate max-w-[200px] sm:max-w-full">
          {current.artist?.name}
        </p>
      </div>

      {/* Botón */}
      <button
        onClick={() => playTrack(current)}
        className="mt-3 sm:mt-0 bg-green-500 px-4 py-2 rounded-full text-black font-medium hover:bg-green-400 transition"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
