import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Watchlist from "./pages/watchlist";
import Wishlist from "./pages/wishlist";
import Sidebar from "./components/sidebar";

export default function App() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 pl-72">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}