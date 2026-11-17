import { motion, useReducedMotion } from 'framer-motion'
import HeroCanvas from './HeroCanvas.jsx'
import { profile, roles } from '../data/profile.js'

// Tailwind needs full class names in the source, so map them explicitly.
const dot = { dev: 'bg-dev', design: 'bg-design', teach: 'bg-teach' }

const EASE = [0.2, 0.7, 0.1, 1]

export default function Hero() {
  const reduced = useReducedMotion()

  // The one orchestrated moment on the page: headline lines rise out of
  // their own baseline, then the supporting copy fades in.
  const line = {
    hidden: { y: reduced ? 0 : '105%' },
    show: (i) => ({
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 },
    }),
  }
  const fade = {
    hidden: { opacity: reduced ? 1 : 0 },
    show: { opacity: 1, transition: { duration: 0.8, delay: 0.75 } },
  }

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroCanvas reducedMotion={!!reduced} />

      {/* Portrait. On phones it sits above the headline; on desktop it fills
          the right half. The mask melts the studio backdrop into the page. */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-0 mx-auto h-[50svh] w-full max-w-[34rem] lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:h-[92%] lg:w-[50%] lg:max-w-none"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/edlin-barong.jpg`}
          alt="Edlin Muzones wearing an embroidered barong with a red plaid sash"
          width="1000"
          height="1500"
          fetchPriority="high"
          className="portrait-mask h-full w-full object-cover object-[50%_10%]"
        />
      </motion.div>

      <div className="shell relative z-10 -mt-10 flex flex-col pb-14 lg:mt-0 lg:min-h-[100svh] lg:justify-center lg:pb-20 lg:pt-32">
        <h1 className="type-display text-[clamp(1.4rem,7.2vw,3.4rem)] text-cream lg:text-[clamp(3rem,4.7vw,4.5rem)]">
          {profile.headline.map((text, i) => (
            <span key={text} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={line}
                custom={i}
                initial="hidden"
                animate="show"
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div variants={fade} initial="hidden" animate="show" className="mt-7 lg:mt-9">
          <p className="max-w-[31rem] text-[1.15rem] leading-relaxed text-cream/85 lg:text-[1.3rem]">
            {profile.intro}
          </p>

          <div className="type-ui mt-8 flex flex-wrap gap-3 text-[1rem]">
            <a
              href="#work"
              className="bg-cream px-6 py-3.5 font-bold text-ink transition-colors hover:bg-white"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="border border-cream/45 px-6 py-3.5 font-bold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Book a workshop
            </a>
          </div>

          {/* Colour key for the whole site. Each role links to its filtered work. */}
          <ul className="type-ui mt-12 flex flex-col gap-x-8 gap-y-2 text-[0.95rem] text-cream/85 sm:flex-row lg:mt-16">
            {roles.map((r) => (
              <li key={r.id}>
                <a
                  href={`#work-${r.id}`}
                  className="group inline-flex items-center gap-3 py-1.5 hover:text-cream"
                >
                  <span aria-hidden="true" className={`size-2.5 rotate-45 ${dot[r.color]}`} />
                  <span className="underline-offset-8 group-hover:underline">{r.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
