import { useEffect, useState } from "react";


export default function useMenuPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch("http://localhost:8000/playlist");
                if (!res.ok) throw new Error("Error to get the playlists");
                const data = await res.json();
                setPlaylists(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    return { playlists, loading, error};
}