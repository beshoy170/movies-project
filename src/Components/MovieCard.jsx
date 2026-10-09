 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (fav) => fav.id === movie.id
  );

  function toggleFavorite() {
    if (isFavorite) {
      setFavorites((previous) =>
        previous.filter((fav) => fav.id !== movie.id)
      );
    } else {
      setFavorites((previous) => [...previous, movie]);
    }
  }
return (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-b from-slate-900 to-indigo-950/60 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-xl hover:shadow-purple-950/40">

    {/* Poster */}
    <div className="relative overflow-hidden bg-slate-800">
      {movie.image?.medium ? (
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400 sm:h-72">
          No image available
        </div>
      )}

      {/* Rating */}
      <div className="absolute right-3 top-3 rounded-full border border-amber-300/30 bg-slate-950/85 px-3 py-1 text-sm text-amber-300 backdrop-blur">
        ★ {movie.rating?.average ?? "N/A"}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col p-5">

      <h2 className="mb-2 line-clamp-1 text-xl font-bold text-amber-100 transition group-hover:text-amber-400">
        {movie.name}
      </h2>

      <p className="mb-2 text-sm text-slate-400">
        Year: {movie.premiered?.slice(0, 4) ?? "Unknown"}
      </p>

      <p className="mb-5 min-h-10 text-sm leading-5 text-slate-300">
        {movie.genres?.join(" • ") || "Unknown genre"}
      </p>

      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-3">

        <button
          onClick={toggleFavorite}
          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
            isFavorite
              ? "border-rose-400/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
              : "border-amber-400/30 bg-amber-400 text-slate-950 hover:bg-amber-300"
          }`}
        >
          {isFavorite
            ? "♥ Remove from Favorites"
            : "♡ Add to Favorites"}
        </button>

        <button
          onClick={() => navigate(`/movies/${movie.id}`)}
          className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200"
        >
          Explore Details →
        </button>

      </div>
    </div>
  </article>
);
}

export default MovieCard;