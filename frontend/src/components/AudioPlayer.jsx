import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

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
        <div className="flex items-center gap-4 p-4 bg-[#181818] rounded-lg">
          <button onClick={togglePlay} className="text-white">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <p className="text-white truncate">{trackTitle}</p>
          <audio ref={audioRef} src={previewUrl} onEnded={() => setIsPlaying(false)} />
        </div>
    )
}
