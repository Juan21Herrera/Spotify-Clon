import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs }`
}

export default function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/playlist/${id}`)
            .then(res => {
                setPlaylist(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Error loading playlist");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading playlist...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gradient-to-b from-[#2e2e2e] to-black min-h-screen">
            {/* Header */}
            <div className="flex items-end gap-6 mb-10">
                <img 
                    src={playlist.picture_xl} 
                    alt={playlist.title}
                    className="w-56 h-56 shadow-lg" 
                />
                <div>
                    <p className="uppercase text-sm font-semibold">Public playlist</p>
                    <h1 className="text-6xl font-bold mt-2">{playlist.title}</h1>
                    <p className="mt-2 text-gray-300">With {playlist.nb_tracks} songs</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mb-6">
                <button className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition">
                    <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
                        <path d="M5 3v18l15-9L5 3z" />
                    </svg>
                </button>
                <button className="text-xl hover:text-gray-400">⤮</button>
                <button className="text-xl hover:text-gray-400">⋯</button>
            </div>

            {/* Track list */}
            <div className="w-full">
                <div className="grid grid-cols-12 text-gray-400 text-sm font-semibold border-b border-gray-600 pb-2 mb-3">
                    <span className="col-span-1">#</span>
                    <span className="col-span-4">Title</span>
                    <span className="col-span-3">Álbum</span>
                    <span className="col-span-3">Date</span>
                    <span className="col-span-1 text-right">🕒</span>

                </div>

                {playlist.tracks?.data?.map((track, index) => (
                    <div key={track.id} className="grid grid-cols-12 text-sm items-center py-2 hover:bg-[#333333] rounded px-2">
                        <div className="col-span-1 text-gray-400">{index + 1}</div>
                        <div className="col-span-4 flex items-center gap-3">
                            <img 
                                src={track.album.cover_small}
                                alt={track.title}
                                className="w-10 h-10 rounded"
                            />
                            <div>
                                <p className="font-medium">{track.title}</p>
                                <p className="text-gray-400 text-xs">{track.artist.name}</p>
                            </div>
                        </div>
                        <span className="col-span-3 text-gray-300 text-sm">{track.album.title}</span>
                        <span className="col-span-3 text-gray-400 text-sm">22 Jul 2025</span> {/* Placeholder */}
                        <span className="col-span-1 text-right text-gray-400">{formatDuration(track.duration)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}