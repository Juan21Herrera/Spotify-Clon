// pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState({
    tracks: [],
    artists: [],
    playlists: [],
    albums: [],
  });
  const [loading, setLoading] = useState(!!q);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("http://localhost:8000/search/", {
          params: { q },
        });
        setResults(data);
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
    <div className="p-4 sm:p-6 space-y-10">
      <h1 className="text-2xl font-bold">Resultados para “{q}”</h1>

      {/* Tracks */}
      {results.tracks.length > 0 && (
        <Section title="Tracks">
          <div className="space-y-3">
            {results.tracks.map((track) => (
              <TrackResult key={track.id} track={track} />
            ))}
          </div>
        </Section>
      )}

      {/* Artists */}
      {results.artists.length > 0 && (
        <Section title="Artists">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.artists.map((artist) => (
              <ArtistResult key={artist.id} artist={artist} />
            ))}
          </div>
        </Section>
      )}

      {/* Albums */}
      {results.albums.length > 0 && (
        <Section title="Albums">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.albums.map((album) => (
              <AlbumResult key={album.id} album={album} />
            ))}
          </div>
        </Section>
      )}

      {/* Playlists */}
      {results.playlists.length > 0 && (
        <Section title="Playlists">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.playlists.map((playlist) => (
              <PlaylistResult key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function TrackResult({ track }) {
  const cover =
    track?.album?.cover_medium || track?.cover || track?.picture_medium;
  const [previewing, setPreviewing] = useState(false);
  const audio = new Audio(track?.preview);

  const togglePreview = () => {
    if (!track.preview) return;
    if (previewing) {
      audio.pause();
      setPreviewing(false);
    } else {
      audio.play();
      setPreviewing(true);
      audio.onended = () => setPreviewing(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-[#181818] hover:bg-[#232323] p-3 rounded-lg">
      <img
        src={cover}
        alt={track.title}
        className="w-14 h-14 rounded-md object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium line-clamp-2">{track.title}</p>
        <p className="text-sm text-gray-400 truncate">{track.artist?.name}</p>
      </div>
      {track.preview && (
        <button
          onClick={togglePreview}
          className="text-xl hover:scale-110 transition"
        >
          {previewing ? "⏸" : "▶"}
        </button>
      )}
    </div>
  );
}

function ArtistResult({ artist }) {
  return (
    <div className="text-center">
      <img
        src={artist.picture_medium}
        alt={`${artist.name} image`}
        className="w-32 h-32 sm:w-28 sm:h-28 rounded-full object-cover mx-auto"
      />
      <p className="mt-2 font-medium truncate">{artist.name}</p>
    </div>
  );
}

function AlbumResult({ album }) {
  return (
    <div className="text-center">
      <img
        src={album.cover_medium}
        alt={album.title}
        className="w-32 h-32 sm:w-28 sm:h-28 rounded-md object-cover mx-auto"
      />
      <p className="mt-2 font-medium line-clamp-2">{album.title}</p>
      <p className="text-sm text-gray-400 truncate">{album.artist?.name}</p>
    </div>
  );
}

function PlaylistResult({ playlist }) {
  return (
    <div className="text-center">
      <img
        src={playlist.picture_medium}
        alt={playlist.title}
        className="w-32 h-32 sm:w-28 sm:h-28 rounded-md object-cover mx-auto"
      />
      <p className="mt-2 font-medium truncate">{playlist.title}</p>
      <p className="text-sm text-gray-400 truncate">
        {playlist.user?.name || "Usuario"}
      </p>
    </div>
  );
}
