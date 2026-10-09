 import { useEffect, useState } from "react";

import Header from "../Components/Header";
import MovieCard from "../Components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function addFavourite(movie) {
    const alreadyExists = favourite.find(
      (item) => item.id === movie.id
    );

    if (alreadyExists) return;

    setFavourite((previous) => [...previous, movie]);
  }

  function removeFavourite(movieId) {
    setFavourite((previous) =>
      previous.filter((movie) => movie.id !== movieId)
    );
  }

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Fantasy Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />

      {/* Purple Magical Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/30 via-slate-950/60 to-slate-950/95" />

      <div className="relative z-10">
        <Header
          title="Movie Explorer"
          userName="Beshoy"
          favourite={favourite.length}
        />

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          
          {/* Hero / Search */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-amber-400 sm:text-5xl">
              Movies
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Discover your next favorite movie
            </p>

            <div className="mx-auto mt-6 max-w-2xl">
              <input
                type="text"
                placeholder="Search for a movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-amber-400/20 bg-slate-950/70 px-5 py-3.5 text-sm text-white shadow-lg shadow-black/20 outline-none backdrop-blur-md transition placeholder:text-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 sm:text-base"
              />
            </div>
          </div>

          {/* Movies Header */}
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
              All Movies
            </h2>

            <p className="text-sm text-slate-300">
              {filteredMovies.length} shows found
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <p className="text-amber-400">
                Loading movies...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-950/60 p-5 text-center text-red-300 backdrop-blur-md">
              {error}
            </p>
          )}

          {/* Empty */}
          {!loading && !error && filteredMovies.length === 0 && (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-950/70 p-10 text-center backdrop-blur-md">
              <p className="text-slate-300">
                No movies found. Try another title.
              </p>
            </div>
          )}

          {/* Movies Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddFavourite={addFavourite}
                  onRemoveFavourite={removeFavourite}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;