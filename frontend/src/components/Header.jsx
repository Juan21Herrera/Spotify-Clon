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
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="flex items-center justify-between w-full px-4 sm:px-7 py-2 sm:py-3 bg-[#121212] sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <SpotifyLogo className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      {/* Center */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-full sm:max-w-[800px] justify-center">
        {/* Home button (oculto en móvil) */}
        <button className="hidden sm:flex bg-[#1f1f1f] p-2 rounded-full hover:bg-[#282828] transition-colors">
          <HomeLogo />
        </button>

        <form
          onSubmit={onSubmit}
          role="search"
          className="flex items-center gap-2 flex-1 max-w-full sm:max-w-[560px]"
        >
          <span className="p-2 rounded-full bg-[#222121] flex-shrink-0">
            <Search />
          </span>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="¿Qué quieres reproducir?"
            className="bg-[#222121] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-full outline-none text-sm sm:text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit(e);
            }}
          />
        </form>

        <div className="flex-shrink-0">
          <Explore />
        </div>
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center space-x-4">
        <a
          href="https://www.spotify.com/premium"
          className="font-bold bg-white text-xs sm:text-sm text-black px-3 sm:px-4 py-1 rounded-full hover:bg-[#e7e7e7] transition"
        >
          Explorar Premium
        </a>
        <a
          href="https://www.spotify.com"
          className="flex items-center text-[#727272] font-bold text-xs sm:text-sm hover:text-white transition"
        >
          <Download />
          <span className="ml-1">Instalar Aplicación</span>
        </a>
        <Notification />
        <Jam />
      </div>
    </header>
  );
}
