import { usePlayer } from '../context/PlayerContext';

export default function TrackRow({ track, index }) {
    const { current, playing, playTrack, toggle } = usePlayer();
    const isCurrent = current && current.id === track.id;

    const handlePlay = () => {
        if (isCurrent) {
            toggle(); // pausar o reanudar si es la track actual
        } else {
            playTrack(track); // reproducir nueva track
        }
    };

    return (
        <div
            className='group grid grid-cols-[40px_1fr_1fr_80px] items-center pag-4 px-4 py-2 hover:bg-[#2a2a2a] rounded cursos-pointer transition' 
        >
            {/* Columna 1: Número track / Play Btn */}
            <div className='flex items-center justify-center text-gray-400 w-6'>
                {/* Número por defecto */}
                <span className='group-hover:hidden'>{index + 1}</span>

                {/* Btn Play/Pause en hover */}
                <button
                    onClick={handlePlay}
                    className='hidden group-hover:flex items-center justify-center w-6 h-6 rounded-full bg-white text-black hover:scale-110 transition'
                >
                    {isCurrent && playing ? "⏸" : "▶"}

                </button>
            </div>

            {/* Columna 2; Título y Artista */}
            <div className='flex items-center gap-3 overflow-hidden'>
                <img 
                    src={track.album?.cover_small || "/placeholder.png"} 
                    alt={track.album.title} 
                    className='w-10 h-10 rounded'
                />
                <div className='truncate'>
                    <div className='text-white font-medium'>{track.title}</div>
                    <div className='text-gray-400 text-sm'>{track.artist?.name}</div>
                </div>
            </div>

            {/* Columna 3: Álbum */}
            <div className='text-gray-400 text-sm truncate'>{track.album?.title}</div>

            {/* Columna 4: Duración */}
            <div className='text-gray-400 text-sm text-right pr-2'>{formatTime(track.duration)}</div>
        </div>
    );
}

function formatTime(seconds = 0) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}