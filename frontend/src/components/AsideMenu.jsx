import Library from "../assets/ico/Aside/Library";
import LibraryClose from "../assets/ico/Aside/LibaryClose";
import LibraryOpen from "../assets/ico/Aside/LibraryOpen";
import Plus from "../assets/ico/Aside/Plus";
import MenuItems from "./MenuItems";

export default function AsideMenu() {
    return (
        <nav className="flex flex-col flex-1 gap-2 p-2">
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
        </nav>
    );
}