import { profile } from '../data/profile.js'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <a
        href="#main"
        className="type-ui sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="shell flex items-center justify-between py-5">
        <a href="#top" className="type-ui text-[1.05rem] font-bold text-cream">
          {profile.name}
        </a>
        <ul className="type-ui flex gap-5 text-[0.95rem] sm:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="py-2 text-cream/80 underline-offset-8 transition-colors hover:text-cream hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
