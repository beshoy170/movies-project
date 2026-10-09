import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoritesContext from "../context/FavoritesContext";

function Favourites() {
  const { favorites, setFavorites } = useContext(FavoritesContext);

 
    return (
  <main className="min-h-screen bg-slate-950 text-slate-100">
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Header */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-400 md:text-4xl">
            Favourite Movies
          </h1>

          <p className="mt-2 text-slate-400">
            {favorites.length} movies in your favourites
          </p>
        </div>

        <button
          onClick={() => setFavorites([])}
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/20"
        >
          Clear All Favorites
        </button>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-200">
            No favourite movies yet
          </h2>

          <p className="mt-2 text-slate-400">
            Go back to the movies and add some favourites.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-amber-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Browse Movies
          </Link>
        </div>
      )}

      {/* Favourite Movies */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-2xl border border-amber-400/20 bg-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/50"
          >
            {movie.image?.medium && (
              <img
                src={movie.image.medium}
                alt={movie.name}
                className="h-72 w-full object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="mb-2 text-xl font-bold text-slate-100">
                {movie.name}
              </h2>

              <p className="mb-5 text-sm text-slate-400">
                Year: {movie.premiered?.slice(0, 4) || "N/A"}
              </p>

              <Link
                to={`/movies/${movie.id}`}
                className="inline-block rounded-lg border border-amber-400/30 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-slate-950"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  </main>
  );
}

export default Favourites;