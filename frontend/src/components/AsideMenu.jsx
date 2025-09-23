import { useState } from "react";
import Library from "../assets/ico/Aside/Library";
import LibraryClose from "../assets/ico/Aside/LibaryClose";
import LibraryOpen from "../assets/ico/Aside/LibraryOpen";
import Plus from "../assets/ico/Aside/Plus";
import MenuItems from "./MenuItems";
import useMenuPlaylists from "../hooks/useMenuPlaylists";
import { Link } from "react-router-dom";

export default function AsideMenu() {
  const { playlists, loading, error } = useMenuPlaylists();
  const [isOpen, setIsOpen] = useState(false); // movil
  const [collapsed, setCollapsed] = useState(false); //desktop

  return (
    <>
      {/* Botón hamburguesa (solo en móvil) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1e1e1e] p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LibraryClose /> : <LibraryOpen />}
      </button>

      {/* Aside */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#181818] text-white transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-60`}
      >
        <nav className="flex flex-col flex-1 p-4 text-sm h-full">
          {/* Header con toggle */}
          <ul className="flex items-center justify-between mb-2">
            <MenuItems href="/">
              <Library />
              {!collapsed && <span className="ml-2">Tu biblioteca</span>}
            </MenuItems>

            {/* Btn expandir/colapsar (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden mb:block text-gray-400 hover:text-white"
            >
              {collapsed ? <LibraryOpen /> : <LibraryClose />}
            </button>
          </ul>

          {/* Botón crear */}
          <div className="p-2">
            <button className="flex items-center bg-[#252424] px-2 py-1 rounded-full hover:bg-[#3d3c3c] transition-colors duration-300">
              <Plus />
              {!collapsed && <span className="ml-1 font-bold">Crear</span>}
            </button>
          </div>

          {/* Playlists */}
          <div className="overflow-y-auto max-h-[70vh] mt-4">
            {loading && <p className="text-sm text-gray-400">Loading...</p>}
            {error && <p className="text-sm text-red-500">Error: {error}</p>}
            {!loading &&
              playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded transition"
                  onClick={() => setIsOpen(false)} // cerrar al hacer clic en móvil
                >
                  <img
                    src={playlist.picture_small}
                    alt={playlist.title}
                    className="w-10 h-10 rounded"
                  />
                  {!collapsed && (
                  
                  <div className="truncate">
                    <h3 className="text-[16px] font-medium truncate">
                      {playlist.title}
                    </h3>
                    <p className="text-md text-gray-400 truncate">
                      Playlist • {playlist.user?.name || "Unknown User"}
                    </p>
                  </div>

                  )}
                </Link>
              ))}
          </div>
        </nav>
      </aside>

      {/* Overlay cuando el menú está abierto en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
