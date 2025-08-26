import { useParams, Navigate } from "react-router-dom";
export default function Playlist() {
  const { id } = useParams();
  // redirige a PlaylistDetail
  return <Navigate to={`/playlist/${id}`} replace />;
}
