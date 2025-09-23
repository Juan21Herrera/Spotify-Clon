import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function AudioPlayer({ previewUrl, trackTitle }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-4 bg-[#181818] rounded-lg w-full max-w-md">
      {/* Botón de play/pause */}
      <button
        onClick={togglePlay}
        className="text-white flex-shrink-0"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <Pause size={20} className="sm:size-24" /> : <Play size={20} className="sm:size-24" />}
      </button>

      {/* Texto con responsive */}
      <p className="text-white flex-1 truncate text-sm sm:text-base">{trackTitle}</p>

      {/* Audio oculto */}
      <audio
        ref={audioRef}
        src={previewUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
