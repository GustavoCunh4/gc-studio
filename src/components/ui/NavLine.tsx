export default function NavLine() {
  return (
    <span
      className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
      style={{ background: 'var(--accent)' }}
      aria-hidden="true"
    />
  )
}
