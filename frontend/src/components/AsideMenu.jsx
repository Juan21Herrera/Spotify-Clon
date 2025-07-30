import Library from "../assets/ico/Aside/Library";
import LibraryClose from "../assets/ico/Aside/LibaryClose";
import LibraryOpen from "../assets/ico/Aside/LibraryOpen";
import Plus from "../assets/ico/Aside/Plus";
import MenuItems from "./MenuItems";
import useMenuPlaylists from "../hooks/useMenuPlaylists";
import { Link } from "react-router-dom"

export default function AsideMenu() {
    const { playlists, loading, error } = useMenuPlaylists();

    return (
        <nav className="flex flex-col flex-1 p-4 text-sm">
            {/* Header */}
            <ul>
                <MenuItems href="/">
                    <Library />
                    <span>Tu biblioteca</span>
                </MenuItems>
            </ul>

            <div className="p-2">
                <button className="flex text-bold bg-[#252424] px-2 py-1 rounded-full w-[90px] hover:bg-[#3d3c3c] transition-colors duration-300">
                    <Plus />
                    <span className="ml-1">Crear</span>
                </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh] mt-4">
                {loading && <p className="text-sm text-gray-400">Loading...</p>}
                {error && <p className="text-sm text-red-500">Error: {error}</p>}
                {!loading &&
                    playlists.map((playlist) => (
                        <Link 
                            key={playlist.id}
                            to={`/playlist/${playlist.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded transition"
                        >
                            <img 
                                src={playlist.picture_small} 
                                alt={playlist.title}
                                className="w-10 h-10 rounded"
                            />
                            <div>
                                <h3 className="text-[16px] font-medium truncate">{playlist.title}</h3>
                                <p className="text-md text-gray-400 truncate">
                                    Playlist • {playlist.user?.name || "Unkown User"}
                                </p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </nav>
    );
}