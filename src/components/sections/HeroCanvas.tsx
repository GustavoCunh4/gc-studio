'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 90
const LINK_DISTANCE = 120
const ACCENT_COLOR = new THREE.Color('#ff6600')
const DIM_COLOR = new THREE.Color('#2a1a0a')

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 300

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities: { x: number; y: number }[] = []
    const W = mount.clientWidth
    const H = mount.clientHeight

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * W
      positions[i * 3 + 1] = (Math.random() - 0.5) * H
      positions[i * 3 + 2] = 0
      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
      })
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: ACCENT_COLOR,
      size: 2.5,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: false,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Lines
    const lineGeo = new THREE.BufferGeometry()
    const lineMat = new THREE.LineBasicMaterial({
      color: ACCENT_COLOR,
      transparent: true,
      opacity: 0.12,
      vertexColors: false,
    })
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lineSegments)

    // Mouse
    const mouse = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX - W / 2)
      mouse.y = -(e.clientY - H / 2)
    }
    window.addEventListener('mousemove', onMove)

    // Animate
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const pos = geo.attributes.position as THREE.BufferAttribute

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = pos.getX(i) + velocities[i].x
        let y = pos.getY(i) + velocities[i].y

        // Mouse repel
        const dx = x - mouse.x
        const dy = y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          x += (dx / dist) * force * 1.5
          y += (dy / dist) * force * 1.5
        }

        // Bounce walls
        if (x > W / 2 || x < -W / 2) velocities[i].x *= -1
        if (y > H / 2 || y < -H / 2) velocities[i].y *= -1

        pos.setXYZ(i, x, y, 0)
      }
      pos.needsUpdate = true

      // Update lines
      let lineIdx = 0
      const lp = lineGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const ax = pos.getX(i), ay = pos.getY(i)
          const bx = pos.getX(j), by = pos.getY(j)
          const d = Math.hypot(ax - bx, ay - by)

          if (d < LINK_DISTANCE && lineIdx < linePositions.length / 6) {
            lp.setXYZ(lineIdx * 2,     ax, ay, 0)
            lp.setXYZ(lineIdx * 2 + 1, bx, by, 0)
            lineIdx++
          }
        }
      }
      // Clear remaining line slots
      for (let k = lineIdx * 2; k < linePositions.length / 3; k++) {
        lp.setXYZ(k, 0, 0, 0)
      }
      lp.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx * 2)

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
