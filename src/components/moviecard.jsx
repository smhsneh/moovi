import { useRef } from "react";

export default function MovieCard({ movie }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;

    card.style.boxShadow = `
      ${-rotateY}px ${rotateX}px 40px rgba(224,123,91,0.35)
    `;
  }

  function handleMouseLeave() {
    const card = cardRef.current;

    card.style.transform = `
      perspective(700px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    card.style.boxShadow = `
      0 0 40px rgba(224,123,91,0.25)
    `;
  }

  return (
    <div className="group">
      <div
  ref={cardRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{ transformStyle: "preserve-3d" }}
  className="
    relative overflow-hidden rounded-2xl
    bg-white/5 backdrop-blur-md
    border border-white/10
    transition-transform duration-200
    will-change-transform
  "
>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
          className="w-full aspect-[2/3] object-cover"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-[#f5f5f5] text-base md:text-lg font-medium">
          {movie.Title}
        </h3>
        <p className="text-[#d6d6d6] text-sm">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}