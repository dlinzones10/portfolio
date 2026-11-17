import { useEffect, useRef } from 'react'
import { roleHex } from '../data/profile.js'

// Interactive hero background: a diamond lattice modelled on barong
// embroidery. Stitches light up in the three role colours as the pointer
// passes, then fade. A single wave crosses the lattice on load.
//
// Plain 2D canvas, no libraries. Honors prefers-reduced-motion by drawing
// the lattice once and attaching no listeners.

const COLORS = [roleHex.dev, roleHex.design, roleHex.teach]
const STEP = 46 // distance between stitches, in CSS px
const REACH = 190 // pointer influence radius

export default function HeroCanvas({ reducedMotion = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const base = document.createElement('canvas') // static lattice, drawn once
    const bctx = base.getContext('2d')

    let w = 0
    let h = 0
    let dpr = 1
    let points = []
    let raf = 0
    let running = false
    let waveStart = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const diamond = (c, x, y, r) => {
      c.beginPath()
      c.moveTo(x, y - r)
      c.lineTo(x + r, y)
      c.lineTo(x, y + r)
      c.lineTo(x - r, y)
      c.closePath()
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const c of [canvas, base]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      points = []
      const half = STEP / 2
      const rows = Math.ceil(h / half) + 2
      const cols = Math.ceil(w / STEP) + 2
      for (let j = -1; j < rows; j++) {
        for (let i = -1; i < cols; i++) {
          points.push({
            x: i * STEP + (j % 2 ? half : 0),
            y: j * half,
            // colours interleave like the weave of a plaid
            color: COLORS[(((i + j * 2) % 3) + 3) % 3],
            glow: 0,
          })
        }
      }

      // static layer: faint thread lines + resting stitches
      bctx.clearRect(0, 0, w, h)
      bctx.strokeStyle = 'rgba(157,176,181,0.055)'
      bctx.lineWidth = 1
      bctx.beginPath()
      for (let k = -h; k < w + h; k += STEP) {
        bctx.moveTo(k, 0)
        bctx.lineTo(k + h, h)
        bctx.moveTo(k + h, 0)
        bctx.lineTo(k, h)
      }
      bctx.stroke()
      bctx.fillStyle = 'rgba(157,176,181,0.16)'
      for (const p of points) {
        diamond(bctx, p.x, p.y, 1.6)
        bctx.fill()
      }
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(base, 0, 0, w, h)

      // one diagonal wave on load
      const waveAge = (now - waveStart) / 1000
      const diag = w + h
      const front = waveAge * diag * 0.55
      const waveLive = !reducedMotion && front < diag + 300

      let anyGlow = false
      for (const p of points) {
        let target = 0
        if (pointer.active) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y)
          if (d < REACH) target = (1 - d / REACH) ** 2
        }
        if (waveLive) {
          const d = Math.abs(p.x + p.y - front)
          if (d < 140) target = Math.max(target, (1 - d / 140) * 0.7)
        }
        // rise fast, fade slowly, so the pointer leaves a short trail
        p.glow += (target - p.glow) * (target > p.glow ? 0.28 : 0.045)
        if (p.glow < 0.01) continue
        anyGlow = true

        const r = 1.6 + p.glow * 4.2
        ctx.globalAlpha = Math.min(1, p.glow * 1.15)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 1.25
        // the four stitches that tie this point to its neighbours
        const len = (STEP / 2) * p.glow
        ctx.beginPath()
        ctx.moveTo(p.x - len, p.y - len)
        ctx.lineTo(p.x + len, p.y + len)
        ctx.moveTo(p.x + len, p.y - len)
        ctx.lineTo(p.x - len, p.y + len)
        ctx.stroke()
        ctx.fillStyle = p.color
        diamond(ctx, p.x, p.y, r)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (waveLive || pointer.active || anyGlow) {
        raf = requestAnimationFrame(draw)
      } else {
        running = false // nothing moving: stop the loop until the next input
      }
    }

    const start = () => {
      if (running || reducedMotion) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.y > -REACH && pointer.y < h + REACH && pointer.x > -REACH && pointer.x < w + REACH
      start()
    }
    const onLeave = () => {
      pointer.active = false
    }

    build()
    if (reducedMotion) {
      ctx.drawImage(base, 0, 0, w, h)
    } else {
      waveStart = performance.now() + 350
      start()
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
      window.addEventListener('pointerup', (e) => e.pointerType !== 'mouse' && onLeave(), {
        passive: true,
      })
    }

    const ro = new ResizeObserver(() => {
      build()
      if (reducedMotion) ctx.drawImage(base, 0, 0, w, h)
      else start()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
