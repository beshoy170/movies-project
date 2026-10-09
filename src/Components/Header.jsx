 import { Link } from "react-router-dom";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

function Header({ title, userName }) {
  const { favorites } = useContext(FavoritesContext);

   
return (
  <header className="sticky top-0 z-50 border-b border-amber-400/20 bg-slate-950/95 shadow-lg shadow-black/20 backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold tracking-wide text-amber-400 sm:text-2xl">
          {title}
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Welcome, {userName}!
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap items-center gap-2">
        <Link
          to="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-amber-400/10 hover:text-amber-400 sm:px-4"
        >
          Home
        </Link>

        <Link
          to="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-amber-400/10 hover:text-amber-400 sm:px-4"
        >
          Movies
        </Link>

        <Link
          to="/favourites"
          className="rounded-lg border border-amber-400/20 px-3 py-2 text-sm font-medium text-amber-300 transition hover:border-amber-400/50 hover:bg-amber-400/10 sm:px-4"
        >
          Favourites ({favorites.length})
        </Link>
      </nav>

    </div>
  </header>
);
 

}

export default Header;