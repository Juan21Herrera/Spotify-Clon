import { Link } from "react-router-dom";

/**
 * PlaylistRowCard
 * - layout = "horizontal" (small row card) or "vertical" (square card)
 */
export default function PlaylistRowCard({ title, image, id, layout = "vertical" }) {
  const isHorizontal = layout === "horizontal";

  const baseClass = isHorizontal
    ? "flex items-center gap-4 bg-[#282828] rounded-md p-3 hover:bg-[#333] transition-colors cursor-pointer w-[260px] h-20"
    : "flex flex-col bg-[#282828] rounded-md p-3 hover:bg-[#333] transition-colors cursor-pointer w-[160px]";

  return (
    <Link to={`/playlist/${id}`} className={baseClass}>
      <img
        src={image || "/placeholder.png"}
        alt={title}
        className={isHorizontal ? "w-14 h-14 rounded-sm object-cover flex-shrink-0" : "w-full h-32 rounded-sm object-cover"}
      />
      <div className={isHorizontal ? "ml-2 overflow-hidden" : "mt-2 text-center"}>
        <p className="text-white text-sm font-semibold truncate">{title}</p>
      </div>
    </Link>
  );
}
