export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search movies, series..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full max-w-xl
        px-5 py-4
        rounded-xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        text-white placeholder-[#77615a]
        outline-none
        focus:border-[#e07b5b]
        transition
      "
    />
  );
}