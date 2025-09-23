import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function Player({ track }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Play - Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  // Change progress manually
  const handleSeek = (e) => {
    const newProgress = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
    setProgress(newProgress);
  };

  // Volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex items-center justify-between">
      {/* Track info */}
      <div className="flex items-center gap-3">
        <img
          src={track.album?.cover_medium || "/placeholder.png"}
          alt={track.title}
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <p className="text-white text-sm truncate">
            {track?.title || "Sin título"}
          </p>
          <p className="text-zinc-400 text-xs truncate">{track?.artist?.name || "Artista desconocido"}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white">
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="bg-white rounded-full p-2 hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause size={20} className="text-black" />
            ) : (
              <Play size={20} className="text-black" />

            )}
          </button>

          <button className="text-zinc-400 hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <input 
          type="range" 
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full mt-2"
        />
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-32">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <input 
            type="range" 
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
      </div>

      {/* Audio */}
      <audio 
        ref={audioRef}
        src={track?.preview}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      </div>
  );
}
