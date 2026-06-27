'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ACCENT_COLOR = new THREE.Color('#ff6600')
const WARM_COLOR = new THREE.Color('#ff9a3d')

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mount = mountRef.current
    if (!mount) return

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const particleCount = coarsePointer ? 56 : 128
    const linkDistance = coarsePointer ? 96 : 140
    const repelDistance = coarsePointer ? 0 : 96
    const bounds = { width: mount.clientWidth, height: mount.clientHeight }
    const mouse = { x: 0, y: 0, active: false }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, bounds.width / bounds.height, 0.1, 1000)
    camera.position.z = 320

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.5 : 2))
    renderer.setSize(bounds.width, bounds.height)
    renderer.domElement.style.opacity = coarsePointer ? '0.45' : '0.72'
    renderer.domElement.style.filter = 'drop-shadow(0 0 18px rgba(255, 102, 0, 0.18))'
    mount.appendChild(renderer.domElement)

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities: { x: number; y: number; phase: number; drift: number }[] = []

    const seedParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * bounds.width
        positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.height
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80

        const mix = Math.random() * 0.45
        const color = ACCENT_COLOR.clone().lerp(WARM_COLOR, mix)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b

        velocities.push({
          x: (Math.random() - 0.5) * (coarsePointer ? 0.22 : 0.34),
          y: (Math.random() - 0.5) * (coarsePointer ? 0.22 : 0.34),
          phase: Math.random() * Math.PI * 2,
          drift: 0.18 + Math.random() * 0.32,
        })
      }
    }

    seedParticles()

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      color: ACCENT_COLOR,
      size: coarsePointer ? 2.2 : 2.8,
      transparent: true,
      opacity: coarsePointer ? 0.78 : 0.9,
      vertexColors: true,
      sizeAttenuation: false,
    })

    const points = new THREE.Points(particleGeo, particleMat)
    scene.add(points)

    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * particleCount * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: ACCENT_COLOR,
      transparent: true,
      opacity: coarsePointer ? 0.14 : 0.2,
    })

    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    const onMove = (event: MouseEvent) => {
      mouse.active = true
      mouse.x = event.clientX - bounds.width / 2
      mouse.y = -(event.clientY - bounds.height / 2)
    }

    const onLeave = () => {
      mouse.active = false
    }

    const onResize = () => {
      bounds.width = mount.clientWidth
      bounds.height = mount.clientHeight
      camera.aspect = bounds.width / bounds.height
      camera.updateProjectionMatrix()
      renderer.setSize(bounds.width, bounds.height)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    let animationId = 0
    const startedAt = performance.now()

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate)
      const elapsed = (now - startedAt) * 0.001
      const pos = particleGeo.attributes.position as THREE.BufferAttribute

      for (let i = 0; i < particleCount; i++) {
        const velocity = velocities[i]
        let x = pos.getX(i) + velocity.x + Math.sin(elapsed * velocity.drift + velocity.phase) * 0.08
        let y = pos.getY(i) + velocity.y + Math.cos(elapsed * velocity.drift + velocity.phase) * 0.08
        const z = Math.sin(elapsed * 0.55 + velocity.phase) * 42

        if (mouse.active && repelDistance > 0) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const distance = Math.hypot(dx, dy)

          if (distance > 0 && distance < repelDistance) {
            const force = (repelDistance - distance) / repelDistance
            x += (dx / distance) * force * 2.2
            y += (dy / distance) * force * 2.2
          }
        }

        if (x > bounds.width / 2) {
          x = bounds.width / 2
          velocity.x *= -1
        } else if (x < -bounds.width / 2) {
          x = -bounds.width / 2
          velocity.x *= -1
        }

        if (y > bounds.height / 2) {
          y = bounds.height / 2
          velocity.y *= -1
        } else if (y < -bounds.height / 2) {
          y = -bounds.height / 2
          velocity.y *= -1
        }

        pos.setXYZ(i, x, y, z)
      }
      pos.needsUpdate = true

      let lineIndex = 0
      const linePos = lineGeo.attributes.position as THREE.BufferAttribute

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const ax = pos.getX(i)
          const ay = pos.getY(i)
          const az = pos.getZ(i)
          const bx = pos.getX(j)
          const by = pos.getY(j)
          const bz = pos.getZ(j)
          const distance = Math.hypot(ax - bx, ay - by)

          if (distance < linkDistance && lineIndex < linePositions.length / 6) {
            linePos.setXYZ(lineIndex * 2, ax, ay, az)
            linePos.setXYZ(lineIndex * 2 + 1, bx, by, bz)
            lineIndex++
          }
        }
      }

      lineGeo.setDrawRange(0, lineIndex * 2)
      linePos.needsUpdate = true
      points.rotation.z = Math.sin(elapsed * 0.12) * 0.015
      lines.rotation.z = points.rotation.z

      renderer.render(scene, camera)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
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
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
