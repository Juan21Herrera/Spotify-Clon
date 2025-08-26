// src/components/PlayerBar.jsx
import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const { current, playing, toggle, next, prev, progress, duration, seek, audioRef } = usePlayer();

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
      <div className="max-w-[1200px] mx-auto flex items-center gap-4 px-4 py-3">
        <img src={current.album?.cover_small || current.picture || "/placeholder.png"} alt={current.title} className="w-12 h-12 rounded object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-white truncate font-medium">{current.title}</div>
          <div className="text-gray-400 text-sm truncate">{current.artist?.name}</div>

          <div className="mt-2">
            <div className="h-1 bg-[#2a2a2a] rounded overflow-hidden cursor-pointer" onClick={onClickProgress}>
              <div className="h-1 bg-green-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{format((audioRef.current && audioRef.current.currentTime) || 0)}</span>
              <span>{format(duration || 30)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={prev} className="w-8 h-8 rounded-full bg-gray-700 text-white">⏮</button>
          <button onClick={toggle} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={next} className="w-8 h-8 rounded-full bg-gray-700 text-white">⏭</button>
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
}
