import AsideMenu from "../src/components/AsideMenu";
import AsideSong from "../src/components/AsideSong";
import Header from "../src/components/Header";
import { Outlet } from "react-router-dom";
import PlayerBar from "../src/components/PlayerBar";

// const [leftWidth, setLeftWidth] = useState(280);
// const [rightWidth, setRightWidth] = useState(360);

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-[#000] text-white pb-20"> {/* pb-20 para dejar espacio al PlayerBar */}
      <header className="h-16 sticky top-0 z-30 bg-transparent flex items-center px-4">
        <Header />
      </header>

      <div className="grid grid-cols-[280px_1fr_360px] gap-4 p-4" style={{ minHeight: "calc(100vh - 64px - 72px)" }}>
        <aside className="bg-[#121212] rounded-lg p-2 overflow-auto">
          <AsideMenu />
        </aside>

        <main className="bg-[#121212] rounded-lg p-4 overflow-auto">
          <Outlet />
        </main>

        <aside className="bg-[#121212] rounded-lg p-4 overflow-auto">
          {/* Aquí colocarás AsideSong (info de la canción actual) */}
          <AsideSong />
        </aside>
      </div>

      {/* PlayerBar (fijo) */}
      <PlayerBar />
    </div>
  );
}
