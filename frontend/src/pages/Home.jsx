import { useEffect, useState } from "react";
import axios from "axios";
import useMenuPlaylists from "../hooks/useMenuPlaylists";
import PlaylistRowCard from "../components/PlaylistRowCard";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlists, loading: playlistLoading, error: playlistsError } = useMenuPlaylists();

  useEffect(() => {
    axios
      .get("http://localhost:8000/home/")
      .then((response) => {
        setHomeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Loading content error.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading || playlistLoading) return <p className="text-center mt-10">Loading recommendations</p>;
  if (error || playlistsError) return <p className="text-center mt-10 text-red-500">{error || playlistsError}</p>;

  return (
    <div className="p-6 space-y-10">
      {/* Your Library Section */}
      <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">Your Library NO EXISTE EN SPOTIFY PERO REFERENCIA TEMPORAL</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <PlaylistRowCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title || playlist.name}
                image={playlist.image_medium || playlist.picture || playlist.cover_medium}
                layout="horizontal"
              />
            ))
          ) : (
            <p className="text-gray-400">Don't have playlists yet</p>
          )}
        </div>
      </section>
        {/* Recommendation Section */}

      <section className="overflow-x-auto scrollbar-hide flex gap-4 py-2">

          {Array.isArray(homeData?.made_for_you) && homeData.made_for_you.length > 0 && (
            <Section title="Made for you" items={homeData.made_for_you} />
          )}

          {Array.isArray(homeData?.daily_mix) && homeData.daily_mix.length > 0 && (
            <Section title="Daily Mix" items={homeData.daily_mix} />
          )}

          {Array.isArray(homeData?.popular_stations) && homeData.popular_stations.length > 0 && (
            <Section title="Popular Stations" items={homeData.popular_stations} />
          )}
      </section>

    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {items.map((item) => (
          <PlaylistRowCard
            key={item.id}
            id={item.id}
            title={item.name || item.title}
            image={item.picture_medium || item.picture || item.cover_medium}
            layout="vertical"
          />
        ))}
      </div>
    </div>
  );
}
