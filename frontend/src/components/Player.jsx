import { useRef, useState } from "react";

export default function Player({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  if (!track) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[#181818] rounded-lg">
      <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
      <p className="text-white">{track.title}</p>
      <audio ref={audioRef} src={track.preview} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
