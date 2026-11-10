export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 2 36 12v16L20 38 4 28V12L20 2Z" stroke="#c8963e" strokeWidth="1.6" fill="rgba(42,24,16,.8)" />
      <path d="M20 9v22M13 16l7 5 7-5" stroke="#f0c46a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="21" r="2.2" fill="#e0702a" />
    </svg>
  );
}
