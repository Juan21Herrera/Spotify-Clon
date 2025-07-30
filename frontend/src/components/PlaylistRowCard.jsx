import { Link } from "react-router-dom";

export default function PlaylistRowCard({ title, image, id }) {
  return (
    <Link
      to={`/playlist/${id}`}
      className="flex items-center gap-4 bg-[#282828] rounded-md p-3 hover:bg-[#383838] transition-colors duration-200 cursor-pointer w-[250px] h-[80px]"
    >
      <img
        src={image}
        alt={title}
        className="w-[64px] h-[64px] rounded-sm object-cover flex-shrink-0"
      />
      <div className="flex flex-col justify-center overflow-hidden">
        <p className="text-white text-md font-bold truncate max-w-[150px]">{title}</p>
      </div>
    </Link>
  );
}
