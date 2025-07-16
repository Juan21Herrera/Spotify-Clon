import SpotifyLogo from "../assets/ico/Header/SpotifyLogo"
import HomeLogo from "../assets/ico/Header/HomeLogo"
import Jam from "../assets/ico/Header/Comunity"
import Notification from "../assets/ico/Header/Notification"
import Download from "../assets/ico/Header/Download"
import Explore from "../assets/ico/Header/Explore"
import Search from "../assets/ico/Header/Search"

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full px-7 space-x-4">

        {/* Left Section | Logo */}
        <div className="flex items-center space-x-4">
            <SpotifyLogo className="w-8 h-8" />
        </div>

        {/* Center Section | Navigation & Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-[800px] fustify-center">
            <button className="bg-[#1f1f1f] p-2 rounded-full hover:bg-[#282828] transition-colors duration-300">
                <HomeLogo />
            </button>
            <Search />
            <Explore />
            <input 
                type="text" 
                placeholder="¿Qué quieres reproducir?" 
                className="bg-[#222121] px-4 py-2 rounded-full w-[300px]"
            />
        </div>

        {/* Rigth Section | Icons & URL's */}
        <div className="flex items-center space-x-4">
                <a 
                    href="https://www.spotify.com/premium" 
                    className="font-bold bg-[#ffffff] text-sm text-black px-4 py-1 rounded-full hover:bg-[#e7e7e7] hover:scale-103 transition-transform duration-300"
                >
                    Explorar Premium
                </a>
                <a 
                    href="https://www.spotify.com" 
                    className="flex text-[#727272] font-bold text-sm hover:text-white hover:scale-103 transition-transform duration-300"
                >
                    <Download />
                    Instalar Aplicación
                </a>
                
                <Notification />
                <Jam />
                

        </div>

        </header>
    )
}