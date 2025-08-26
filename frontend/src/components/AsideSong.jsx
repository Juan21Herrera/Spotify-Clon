// src/components/AsideSong.jsx
import { usePlayer } from "../context/PlayerContext";

export default function AsideSong() {
  const { current, playing, playTrack } = usePlayer();
  if (!current) return <div className="text-gray-400">No song playing</div>;

  return (
    <div className="space-y-4">
      <img src={current.album?.cover_big || current.picture_xl || "/placeholder.png"} alt={current.title} className="w-full rounded" />
      <h3 className="text-white text-lg font-semibold">{current.title}</h3>
      <p className="text-gray-400">{current.artist?.name}</p>
      <button onClick={() => playTrack(current)} className="bg-green-500 px-3 py-2 rounded text-black">
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
