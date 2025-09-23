import { Link } from "react-router-dom";

/**
 * PlaylistRowCard
 * - layout = "horizontal" (row card) or "vertical" (square card)
 * - responsive + mobile-first
 */
export default function PlaylistRowCard({ title, image, id, layout = "vertical" }) {
  const isHorizontal = layout === "horizontal";

  const baseClass = isHorizontal
    ? "flex items-center gap-3 bg-[#282828] rounded-lg p-3 hover:bg-[#333] transition-colors cursor-pointer w-full max-w-md"
    : "flex flex-col bg-[#282828] rounded-lg p-3 hover:bg-[#333] transition-colors cursor-pointer w-full sm:w-[160px]";

  return (
    <Link to={`/playlist/${id}`} className={baseClass}>
      <img
        src={image || "/placeholder.png"}
        alt={title}
        className={
          isHorizontal
            ? "w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover flex-shrink-0"
            : "w-full aspect-square rounded-md object-cover"
        }
      />
      <div className={isHorizontal ? "ml-2 overflow-hidden" : "mt-2 text-center"}>
        <p className="text-white text-xs sm:text-sm md:text-base font-semibold truncate">
          {title}
        </p>
      </div>
    </Link>
  );
}
