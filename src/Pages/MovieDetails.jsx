 import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }

        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading movie...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-amber-400 hover:text-amber-400"
        >
          ← Back to Movies
        </Link>

        {/* Movie Details */}
        <div className="overflow-hidden rounded-2xl border border-amber-400/20 bg-slate-900 shadow-2xl shadow-black/30">
          <div className="grid md:grid-cols-[300px_1fr]">
            {/* Poster */}
            <div className="bg-slate-800">
              {movie.image?.original && (
                <img
                  src={movie.image.original}
                  alt={movie.name}
                  className="h-full min-h-[450px] w-full object-cover"
                />
              )}
            </div>

            {/* Information */}
            <div className="p-8 md:p-10">
              <h1 className="mb-4 text-4xl font-bold text-amber-400 md:text-5xl">
                {movie.name}
              </h1>

              <div className="mb-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                  ⭐ {movie.rating?.average || "N/A"}
                </span>

                <span className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
                  {movie.premiered?.slice(0, 4) || "N/A"}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-slate-200">
                  Genres
                </h2>

                <p className="text-slate-400">
                  {movie.genres?.join(" • ") || "N/A"}
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold text-slate-100">
                  Summary
                </h2>

                <div
                  className="max-w-3xl leading-7 text-slate-400"
                  dangerouslySetInnerHTML={{
                    __html: movie.summary || "No summary available.",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;