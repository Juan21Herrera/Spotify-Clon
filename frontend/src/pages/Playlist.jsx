import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Playlist() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`http://localhost:8000/playlist/${id}`);
                const data = await response.json();
                setPlaylist(data);
            } catch (error) {
                console.error("Error loading playlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [id]);
}