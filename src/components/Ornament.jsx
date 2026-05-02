export default function Ornament() {
  return (
    <div className="flex justify-center my-2" aria-hidden="true">
      <svg width="120" height="20" viewBox="0 0 120 20">
        <g stroke="#B8860B" strokeWidth="0.7" fill="none" opacity="0.55">
          <line x1="0"  y1="10" x2="40"  y2="10" />
          <line x1="80" y1="10" x2="120" y2="10" />
          <circle cx="60" cy="10" r="4" />
          <circle cx="60" cy="10" r="1.5" fill="#B8860B" />
          <path d="M 48 10 L 56 10 M 64 10 L 72 10" />
        </g>
      </svg>
    </div>
  );
}
