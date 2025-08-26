// pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(!!q);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Si tu backend es /api/search/track?name=...
        const { data } = await axios.get(
          `http://localhost:8000/search/`,
          { params: { q } }
        );
        console.log("Resultados de búsqueda:", data);
        setResults(Array.isArray(data) ? data : data.tracks || []);
      } catch (e) {
        setError("Error al buscar en Deezer");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q]);

  if (!q) return <p className="p-6">Escribe algo en la barra de búsqueda…</p>;
  if (loading) return <p className="p-6">Buscando “{q}”…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resultados para “{q}”</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Canciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {results.map((track) => (
            <TrackResult key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TrackResult({ track }) {
  const cover =
    track?.album?.cover_medium || track?.cover || track?.picture_medium;
  const preview = track?.preview; // url 30s

  return (
    <div className="flex items-center gap-3 bg-[#181818] hover:bg-[#232323] p-3 rounded-lg">
      <img src={cover} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{track.title}</p>
        <p className="text-sm text-gray-400 truncate">{track.artist?.name}</p>
      </div>
      {preview && (
        <audio controls src={preview} className="w-28">
          Tu navegador no soporta audio.
        </audio>
      )}
    </div>
  );
}
