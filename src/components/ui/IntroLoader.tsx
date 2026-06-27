'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type IntroPhase = 'loading' | 'opening' | 'done'

const INTRO_STORAGE_KEY = 'gc-studio:intro-seen'

function hasSeenIntro() {
  try {
    return window.localStorage.getItem(INTRO_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, 'true')
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

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

    const disposableGeometries: THREE.BufferGeometry[] = []
    const disposableMaterials: THREE.Material[] = []
    const disposableTextures: THREE.Texture[] = []
    const rememberGeometry = (geometry: THREE.BufferGeometry) => {
      disposableGeometries.push(geometry)
      return geometry
    }
    const rememberMaterial = <T extends THREE.Material>(material: T) => {
      disposableMaterials.push(material)
      return material
    }

    const createTransparentLogoTexture = (source: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const size = 1024
      canvas.width = size
      canvas.height = size

      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) return null

      context.drawImage(source, 0, 0, size, size)
      const imageData = context.getImageData(0, 0, size, size)
      const pixels = imageData.data

      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const max = Math.max(red, green, blue)
        const min = Math.min(red, green, blue)
        const isWhiteBackground = red > 218 && green > 218 && blue > 218
        const isLightNeutralBackground = max > 190 && max - min < 18

        if (isWhiteBackground || isLightNeutralBackground) {
          pixels[index + 3] = 0
        }
      }

      context.putImageData(imageData, 0, 0)

      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      disposableTextures.push(texture)
      return texture
    }

    const logoPlane = rememberGeometry(new THREE.PlaneGeometry(3.72, 3.72))
    let logoImage: HTMLImageElement | null = new Image()
    let isDisposed = false

    logoImage.onload = () => {
      if (isDisposed || !logoImage) return

      const logoTexture = createTransparentLogoTexture(logoImage)
      if (!logoTexture) return

      const backGlow = new THREE.Mesh(
        logoPlane,
        rememberMaterial(new THREE.MeshBasicMaterial({
          map: logoTexture,
          color: 0xff6a00,
          transparent: true,
          opacity: 0.22,
          alphaTest: 0.04,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }))
      )
      backGlow.position.set(-0.035, -0.035, -0.34)
      backGlow.scale.setScalar(1.045)
      logo.add(backGlow)

      for (let layer = 22; layer >= 1; layer -= 1) {
        const depthLayer = new THREE.Mesh(
          logoPlane,
          rememberMaterial(new THREE.MeshStandardMaterial({
            map: logoTexture,
            color: layer > 10 ? 0x8f2600 : 0xb83200,
            transparent: true,
            alphaTest: 0.09,
            metalness: 0.34,
            roughness: 0.46,
            emissive: 0x150400,
            emissiveIntensity: 0.08,
          }))
        )
        depthLayer.position.set(-layer * 0.003, -layer * 0.003, -layer * 0.017)
        logo.add(depthLayer)
      }

      const frontFace = new THREE.Mesh(
        logoPlane,
        rememberMaterial(new THREE.MeshStandardMaterial({
          map: logoTexture,
          color: 0xffffff,
          transparent: true,
          alphaTest: 0.05,
          metalness: 0.52,
          roughness: 0.22,
          emissive: 0x431000,
          emissiveIntensity: 0.18,
        }))
      )
      frontFace.position.z = 0.06
      logo.add(frontFace)
    }
    logoImage.src = '/GC-Laranja.png'

    const createStars = (count: number, spreadX: number, spreadY: number, size: number, opacity: number) => {
      const geometry = rememberGeometry(new THREE.BufferGeometry())
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let index = 0; index < count; index += 1) {
        positions[index * 3] = (Math.random() - 0.5) * spreadX
        positions[index * 3 + 1] = (Math.random() - 0.5) * spreadY
        positions[index * 3 + 2] = -2.4 + Math.random() * 1.7

        const warm = 0.72 + Math.random() * 0.28
        colors[index * 3] = warm
        colors[index * 3 + 1] = 0.34 + Math.random() * 0.34
        colors[index * 3 + 2] = 0.08 + Math.random() * 0.16
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = rememberMaterial(new THREE.PointsMaterial({
        size,
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }))

      const stars = new THREE.Points(geometry, material)
      scene.add(stars)
      return stars
    }

    const farStars = createStars(760, 10.5, 6.3, 0.014, 0.68)
    const nearStars = createStars(180, 8.8, 5.3, 0.026, 0.82)

    const keyLight = new THREE.DirectionalLight(0xfff2df, 3.2)
    keyLight.position.set(3.2, 3.4, 4.4)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xff6a00, 2.1)
    rimLight.position.set(-3.4, -1.8, 3)
    scene.add(rimLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.62)
    scene.add(ambientLight)

    let logoBaseY = 0
    const resize = () => {
      const width = mount.clientWidth || window.innerWidth
      const height = mount.clientHeight || window.innerHeight
      renderer.setSize(width, height, false)
      camera.position.z = width < 640 ? 7.1 : 5.2
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      logo.scale.setScalar(width < 640 ? 0.68 : 1)
      logoBaseY = width < 640 ? 0.12 : 0
      logo.position.y = logoBaseY
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
        logo.position.y = logoBaseY + Math.sin(t * 1.2) * 0.055
        farStars.rotation.z = t * 0.012
        nearStars.rotation.z = -t * 0.022
        nearStars.rotation.y = Math.sin(t * 0.4) * 0.06
      }

      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      isDisposed = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      mount.removeChild(renderer.domElement)
      if (logoImage) {
        logoImage.onload = null
        logoImage = null
      }
      disposableGeometries.forEach((geometry) => geometry.dispose())
      disposableMaterials.forEach((material) => material.dispose())
      disposableTextures.forEach((texture) => texture.dispose())
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

    const markComplete = () => {
      root.dataset.introComplete = 'true'
      window.dispatchEvent(new Event('gc:intro-complete'))
    }

    if (hasSeenIntro()) {
      markComplete()
      frame = window.requestAnimationFrame(() => setVisible(false))
      return () => window.cancelAnimationFrame(frame)
    }

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
        saveIntroSeen()
        markComplete()
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

  const loadingOffset = Math.min(progress * 0.72, 72)
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
