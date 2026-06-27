'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type IntroPhase = 'loading' | 'opening' | 'done'

function LogoScene({ active }: { active: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.04, 5.2)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))
    mount.appendChild(renderer.domElement)

    const logo = new THREE.Group()
    scene.add(logo)

    const orange = new THREE.MeshStandardMaterial({
      color: 0xff6a00,
      metalness: 0.72,
      roughness: 0.26,
      emissive: 0x241006,
      emissiveIntensity: 0.32,
    })
    const ivory = new THREE.MeshStandardMaterial({
      color: 0xf3eee6,
      metalness: 0.62,
      roughness: 0.3,
      emissive: 0x15120f,
      emissiveIntensity: 0.18,
    })
    const chrome = new THREE.MeshStandardMaterial({
      color: 0x1b1b22,
      metalness: 0.82,
      roughness: 0.24,
    })

    const gRingGeometry = new THREE.TorusGeometry(0.66, 0.105, 26, 132, Math.PI * 1.74)
    const cRingGeometry = new THREE.TorusGeometry(0.66, 0.105, 26, 132, Math.PI * 1.55)
    const gTrimGeometry = new THREE.TorusGeometry(0.66, 0.028, 14, 132, Math.PI * 1.74)
    const cTrimGeometry = new THREE.TorusGeometry(0.66, 0.028, 14, 132, Math.PI * 1.55)
    const barGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.28)
    const shortBarGeometry = new THREE.BoxGeometry(0.18, 0.12, 0.28)
    const detailGeometry = new THREE.BoxGeometry(0.16, 0.035, 0.2)

    const gBack = new THREE.Mesh(gRingGeometry, chrome)
    gBack.position.set(-0.58, 0, -0.09)
    gBack.rotation.z = 0.42
    gBack.scale.setScalar(1.04)
    logo.add(gBack)

    const gRing = new THREE.Mesh(gRingGeometry, orange)
    gRing.position.x = -0.58
    gRing.rotation.z = 0.42
    logo.add(gRing)

    const gTrim = new THREE.Mesh(gTrimGeometry, ivory)
    gTrim.position.set(-0.58, 0, 0.125)
    gTrim.rotation.z = 0.42
    gTrim.scale.setScalar(0.98)
    logo.add(gTrim)

    const gBar = new THREE.Mesh(barGeometry, orange)
    gBar.position.set(-0.34, -0.09, 0.22)
    logo.add(gBar)

    const gNib = new THREE.Mesh(shortBarGeometry, ivory)
    gNib.position.set(-0.12, -0.2, 0.24)
    gNib.rotation.z = Math.PI / 2
    logo.add(gNib)

    const cBack = new THREE.Mesh(cRingGeometry, chrome)
    cBack.position.set(0.68, 0, -0.09)
    cBack.rotation.z = 0.72
    cBack.scale.setScalar(1.04)
    logo.add(cBack)

    const cRing = new THREE.Mesh(cRingGeometry, ivory)
    cRing.position.x = 0.68
    cRing.rotation.z = 0.72
    logo.add(cRing)

    const cTrim = new THREE.Mesh(cTrimGeometry, orange)
    cTrim.position.set(0.68, 0, 0.125)
    cTrim.rotation.z = 0.72
    cTrim.scale.setScalar(0.98)
    logo.add(cTrim)

    const bevelBlocks = [
      [-1.16, 0.42, -0.16],
      [-1.03, -0.48, -0.12],
      [0.16, 0.5, -0.16],
      [1.24, -0.43, -0.12],
    ]

    bevelBlocks.forEach(([x, y, z]) => {
      const detail = new THREE.Mesh(detailGeometry, orange)
      detail.position.set(x, y, z)
      detail.rotation.z = x < 0 ? -0.55 : 0.55
      logo.add(detail)
    })

    const sparkGeometry = new THREE.BufferGeometry()
    const sparkCount = 72
    const sparkPositions = new Float32Array(sparkCount * 3)
    for (let i = 0; i < sparkCount; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.05 + Math.random() * 1.45
      sparkPositions[i * 3] = Math.cos(angle) * radius
      sparkPositions[i * 3 + 1] = Math.sin(angle) * (0.55 + Math.random() * 0.48)
      sparkPositions[i * 3 + 2] = -0.55 + Math.random() * 0.8
    }
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))

    const sparkMaterial = new THREE.PointsMaterial({
      color: 0xff7a18,
      size: 0.026,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    })
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial)
    scene.add(sparks)

    const keyLight = new THREE.DirectionalLight(0xfff2df, 3.2)
    keyLight.position.set(3.2, 3.4, 4.4)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xff6a00, 2.1)
    rimLight.position.set(-3.4, -1.8, 3)
    scene.add(rimLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.62)
    scene.add(ambientLight)

    const resize = () => {
      const width = mount.clientWidth || window.innerWidth
      const height = mount.clientHeight || window.innerHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      logo.scale.setScalar(width < 640 ? 0.74 : 1)
    }

    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const render = (time = 0) => {
      if (active && !prefersReducedMotion) {
        const t = time * 0.001
        logo.rotation.x = Math.sin(t * 0.72) * 0.055
        logo.rotation.y = Math.sin(t * 0.9) * 0.16
        logo.rotation.z = Math.sin(t * 0.55) * 0.025
        logo.position.y = Math.sin(t * 1.2) * 0.055
        sparks.rotation.z = t * 0.08
        sparks.rotation.y = Math.sin(t * 0.5) * 0.08
      }

      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      mount.removeChild(renderer.domElement)
      gRingGeometry.dispose()
      cRingGeometry.dispose()
      gTrimGeometry.dispose()
      cTrimGeometry.dispose()
      barGeometry.dispose()
      shortBarGeometry.dispose()
      detailGeometry.dispose()
      sparkGeometry.dispose()
      orange.dispose()
      ivory.dispose()
      chrome.dispose()
      sparkMaterial.dispose()
      renderer.dispose()
    }
  }, [active])

  return <div ref={mountRef} className="intro-scene" aria-hidden="true" />
}

export default function IntroLoader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<IntroPhase>('loading')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: number[] = []
    let frame = 0
    let startedAt = 0

    root.classList.add('intro-scroll-lock')

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay)
      timers.push(timer)
    }

    const finish = () => {
      setProgress(100)
      schedule(() => setPhase('opening'), prefersReducedMotion ? 80 : 180)
      schedule(() => setPhase('done'), prefersReducedMotion ? 360 : 1250)
      schedule(() => {
        root.dataset.introComplete = 'true'
        window.dispatchEvent(new Event('gc:intro-complete'))
        setVisible(false)
      }, prefersReducedMotion ? 520 : 1640)
    }

    if (prefersReducedMotion) {
      schedule(finish, 120)
    } else {
      const duration = 2550
      const tick = (time: number) => {
        if (!startedAt) startedAt = time
        const raw = Math.min((time - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - raw, 3)
        setProgress(Math.min(100, Math.round(eased * 100)))

        if (raw < 1) {
          frame = window.requestAnimationFrame(tick)
        } else {
          finish()
        }
      }

      frame = window.requestAnimationFrame(tick)
    }

    return () => {
      root.classList.remove('intro-scroll-lock')
      window.cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove('intro-scroll-lock')
    }
  }, [visible])

  if (!visible) return null

  const loadingOffset = Math.min(progress * 0.28, 28)
  const panelOffset = phase === 'loading' ? loadingOffset : 104
  const className = `intro-loader intro-loader-${phase}`

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-label={`Carregando GC Studio ${progress}%`}
    >
      <LogoScene active={phase !== 'done'} />

      <div
        className="intro-panel intro-panel-left"
        style={{ transform: `translateX(-${panelOffset}%)` }}
      />
      <div
        className="intro-panel intro-panel-right"
        style={{ transform: `translateX(${panelOffset}%)` }}
      />

      <div className="intro-progress">
        <div className="intro-progress-meta">
          <span>GC Studio</span>
          <span>{progress}%</span>
        </div>
        <div className="intro-progress-track">
          <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
