export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="search movies..."
      className="w-full p-3 border rounded"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}