import ArtistTracks from "../src/components/ArtistTracks";
import AsideMenu from "../src/components/AsideMenu";
import Header from "../src/components/Header";

export default function Layout({ children }) {
  return (
    <div className="relative h-screen text-white bg-principal">
      {/* Header sin padding lateral */}
      <header className="h-[64px] sticky top-0 z-10 bg-[#] flex items-center justify-between w-full">
        <Header />
      </header>

      {/* Contenedor principal en grid */}
      <div
        className="grid h-[calc(100%-64px-72px)]
                   grid-cols-[var(--sidebar)_1fr_var(--songpanel)]
                   grid-rows-[1fr]
                   [grid-template-areas:'sidebar_main_song']
                   gap-2 p-2"
      >
        <aside className="[grid-area:sidebar] flex-col flex overflow-y-auto bg-secondary rounded-lg">
          <AsideMenu />
        </aside>

        <main className="[grid-area:main] bg-secondary rounded-lg overflow-y-auto">
          <ArtistTracks />
        </main>

        <aside className="[grid-area:song] bg-secondary rounded-lg">ASIDE SONG</aside>
      </div>

      {/* Footer */}
      <footer className="h-[72px] bg-principal flex items-center justify-center w-full">
        PLAYER
      </footer>
    </div>
  );
}
