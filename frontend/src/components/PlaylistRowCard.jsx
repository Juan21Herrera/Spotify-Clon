import { Link } from "react-router-dom";

export default function PlaylistRowCard({ title, image, id, layout = "vertical" }) {
  const isHorizontal = layout === "horizontal";
  return (
    <Link
      to={`/playlist/${id}`}
      className={`flex ${isHorizontal ? "flex-row items-center" : "flex-col"} bg-[#282828] rounded-md hover:bg-[#383838] transition-colors duration-200 cursor-pointer overflow-hidden`}
      style={{ width: isHorizontal ? "100%" : 160, height: isHorizontal ? 64 : 200 }}
    >
      <img
        src={image}
        alt={title}
        className={`${isHorizontal ? "w-16 h-16 mr-4" : "w-full h-32"} object-cover rounded-sm shrink-0`}
      />
      <div className={`text-white ${isHorizontal ? "text-sm font-semibold truncate" : "text-center mt-2 text-sm font-bold"}`}>
        {title}
      </div>
    </Link>
  );
}
