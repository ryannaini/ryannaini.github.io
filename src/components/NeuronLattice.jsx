import { useEffect, useRef } from 'react'

const LINK_DIST = 100
const MOUSE_RADIUS = 85
const REPEL = 1.1
const DAMPING = 0.985
const DRIFT = 0.0045
const DISBAND_HOLD = 1.0
const DISBAND_DECAY = 1 / (60 * DISBAND_HOLD)

function createNodes(width, height) {
  const count = width < 700 ? 324 : 540
  const nodes = []

  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.04 + Math.random() * 0.1
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.5 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      freq: 0.15 + Math.random() * 0.3,
      amp: 0.15 + Math.random() * 0.25,
      disband: 0,
    })
  }

  return nodes
}

function NeuronLattice() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const lingerRef = useRef({ x: -9999, y: -9999, strength: 0 })
  const nodesRef = useRef([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frameId = 0
    let width = 0
    let height = 0

    const resize = () => {
      const parent = canvas.parentElement
      width = parent?.clientWidth || window.innerWidth
      height = parent?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodesRef.current = createNodes(width, height)
    }

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mouseRef.current = { x, y, active: true }
      lingerRef.current = { x, y, strength: 1 }
    }

    const onLeave = () => {
      mouseRef.current.active = false
    }

    const draw = () => {
      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const linger = lingerRef.current
      timeRef.current += 0.016
      const t = timeRef.current

      if (!mouse.active) {
        linger.strength = Math.max(0, linger.strength - DISBAND_DECAY)
      }

      ctx.clearRect(0, 0, width, height)

      const fieldX = mouse.active ? mouse.x : linger.x
      const fieldY = mouse.active ? mouse.y : linger.y
      const fieldStrength = mouse.active ? 1 : linger.strength

      for (const node of nodes) {
        node.vx += Math.cos(t * node.freq + node.phase) * DRIFT * node.amp
        node.vy += Math.sin(t * node.freq * 0.85 + node.phase) * DRIFT * node.amp

        if (fieldStrength > 0.01) {
          const dx = node.x - fieldX
          const dy = node.y - fieldY
          const dist = Math.hypot(dx, dy) || 0.001

          if (dist < MOUSE_RADIUS) {
            const force =
              ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL * fieldStrength
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
            node.disband = 1
          }
        }

        if (node.disband > 0) {
          node.disband = Math.max(0, node.disband - DISBAND_DECAY)
        }

        const damp = node.disband > 0 ? 0.992 : DAMPING
        node.vx *= damp
        node.vy *= damp

        const speed = Math.hypot(node.vx, node.vy)
        if (speed > 1.2) {
          node.vx = (node.vx / speed) * 1.2
          node.vy = (node.vy / speed) * 1.2
        }

        node.x += node.vx
        node.y += node.vy

        const pad = 40
        if (node.x < -pad) node.x = width + pad
        if (node.x > width + pad) node.x = -pad
        if (node.y < -pad) node.y = height + pad
        if (node.y > height + pad) node.y = -pad
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue

          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DIST) continue

          const disband = Math.max(a.disband, b.disband)
          const alpha = (1 - dist / LINK_DIST) * 0.42 * (1 - disband * 0.55)
          if (alpha < 0.03) continue

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(114, 184, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      for (const node of nodes) {
        const speed = Math.hypot(node.vx, node.vy)
        const glow = Math.min(0.95, 0.5 + speed * 0.12 + node.disband * 0.2)

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235, 241, 255, ${glow})`
        ctx.fill()

        if (speed > 0.5 || node.disband > 0.2) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.r + 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(114, 184, 255, ${0.1 + node.disband * 0.15})`
          ctx.fill()
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

export default NeuronLattice
