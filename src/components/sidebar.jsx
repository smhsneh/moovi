import { NavLink } from "react-router-dom";
import { Heart, Bookmark, Home } from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-4 px-6 py-4 rounded-xl
    transition
    ${
      isActive
        ? "bg-[#e07b5b]/20 text-[#e07b5b]"
        : "text-[#d6d6d6] hover:bg-white/5 hover:text-white"
    }
  `;

  return (
    <aside className="
      fixed left-0 top-0 h-screen w-64
      bg-black/40 backdrop-blur-xl
      border-r border-white/10
      px-4 pt-10
    ">
      <h2
        className="text-2xl tracking-[0.3em] mb-12 text-[#f5f5f5]"
        style={{ fontFamily: "Share Tech" }}
      >
        MOOVI
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={linkClass}>
          <Home size={20} /> Home
        </NavLink>

        <NavLink to="/watchlist" className={linkClass}>
          <Heart size={20} /> Watchlist
        </NavLink>

        <NavLink to="/wishlist" className={linkClass}>
          <Bookmark size={20} /> Wishlist
        </NavLink>
      </nav>
    </aside>
  );
}
