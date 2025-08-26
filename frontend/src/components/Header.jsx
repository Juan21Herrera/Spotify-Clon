// components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyLogo from "../assets/ico/Header/SpotifyLogo";
import HomeLogo from "../assets/ico/Header/HomeLogo";
import Jam from "../assets/ico/Header/Comunity";
import Notification from "../assets/ico/Header/Notification";
import Download from "../assets/ico/Header/Download";
import Explore from "../assets/ico/Header/Explore";
import Search from "../assets/ico/Header/Search";

export default function Header() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();              // <-- evita recarga/navegación
    const q = term.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="flex items-center justify-between w-full px-7 space-x-4">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <SpotifyLogo className="w-8 h-8" />
      </div>

      {/* Center */}
      <div className="flex items-center gap-3 flex-1 max-w-[800px] justify-center">
        <button className="bg-[#1f1f1f] p-2 rounded-full hover:bg-[#282828] transition-colors">
          <HomeLogo />
        </button>

        <form
          onSubmit={onSubmit}
          role="search"
          className="flex items-center gap-2 flex-1 max-w-[560px]"
        >
          <span className="p-2 rounded-full bg-[#222121]">
            <Search />
          </span>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="¿Qué quieres reproducir?"
            className="bg-[#222121] px-4 py-2 rounded-full w-full outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit(e); // redundante pero seguro
            }}
          />
        </form>

        <Explore />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        <a
          href="https://www.spotify.com/premium"
          className="font-bold bg-white text-sm text-black px-4 py-1 rounded-full hover:bg-[#e7e7e7] transition"
        >
          Explorar Premium
        </a>
        <a
          href="https://www.spotify.com"
          className="flex text-[#727272] font-bold text-sm hover:text-white transition"
        >
          <Download />
          Instalar Aplicación
        </a>
        <Notification />
        <Jam />
      </div>
    </header>
  );
}
