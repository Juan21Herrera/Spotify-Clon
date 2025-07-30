import { useEffect, useState } from "react";
import axios from "axios";
import useMenuPlaylists from "../hooks/useMenuPlaylists";
import PlaylistRowCard from "../components/PlaylistRowCard";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlists } = useMenuPlaylists();

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

  if (loading)
    return <p className="text-center mt-10">Loading recommendations</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-10">
      <section>
        <h1 className="text-xl font-bold mb-4">Tu Biblioteca</h1>
        <div className="flex flex-wrap gap-4">
          {homeData?.made_for_you?.map((playlist) => (
            <PlaylistRowCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.name || playlist.title}
              subtitle={playlist.description || "Playlist personal"}
              image={
                playlist.picture_medium ||
                playlist.picture ||
                playlist.cover_medium
              }
            />
          ))}
        </div>
      </section>
      <Section title="Made for you" items={homeData.made_for_you} />
      <Section title="Daily Mix" items={homeData.daily_mix} />
      <Section title="Popular Stations" items={homeData.popular_stations} />
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded-lg text-white shadow hover:bg-[#252525] transition-all"
          >
            <img
              src={item.picture_medium || item.picture || item.cover_medium}
              alt={item.title}
              className="rounded-md mb-2 w-full h-40 object-cover"
            />
            <h3 className="text-lg font-semibold truncate">
              {item.name || item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
