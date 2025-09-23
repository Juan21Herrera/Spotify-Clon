import React from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function PlayerBar() {
  const {
    current,
    playing,
    toggle,
    next,
    prev,
    progress,
    duration,
    seek,
    audioRef,
    volume,
    setVolume,
    muted,
    toggleMute
  } = usePlayer();

  if (!current) return null;

  const format = (s = 0) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const onClickProgress = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const sec = (duration || 30) * pct;
    seek(sec);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#1f1f1f] z-50">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3">

        {/* Track info */}
        <div className="flex items-center gap-3 w-full sm:w-1/3">
          <img 
            src={current.album?.cover_small || current.picture || "/placeholder.png"} 
            alt={current.title}
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
            className="w-12 h-12 rounded object-cover flex-shrink-0" 
          />
          <div className="min-w-0 flex-1 truncate">
            <div className="text-white font-medium">{current.title}</div>
            <div className="text-gray-400 text-sm">{current.artist?.name}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-full sm:w-1/3">
          <div className="flex items-center gap-6 justify-center">
            <button
              onClick={prev}
              className="text-gray-400 hover:text-white"
              aria-label="Anterior"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={toggle}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button
              onClick={next}
              className="text-gray-400 hover:text-white"
              aria-label="Siguiente"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center pag-2 w-full mt-2">
            <span className="text-xs text-gray-400">
              {format((audioRef.current && audioRef.current.currentTime) || 0)}
            </span>
            <div
              className="h-1 bg-[#2a2a2a] rounded flex-1 cursos-pointer"
              onClick={onClickProgress}
            >
              <div 
                className="h-1 bg-green-500"
                style={{ width: `${progress}%`}}
              />
            </div>
            <span className="text-xs text-gray-400">
              {format(duration || 30)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden sm:flex items-center gap-2 w-32">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white"
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <input 
            type="range" 
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>

        {/* Audio */}
        <audio ref={audioRef} />
      </div>
    </div>
  );
}