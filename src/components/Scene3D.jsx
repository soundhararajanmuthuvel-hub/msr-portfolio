import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, OrbitControls, Sphere, MeshDistortMaterial, Torus, Box, Octahedron } from '@react-three/drei'

function FloatingOrb({ position, color, size = 1, speed = 1, distort = 0.4 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.8}
          envMapIntensity={2}
        />
      </Sphere>
    </Float>
  )
}

function GlowTorus({ position, color, rotation }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
      <Torus ref={ref} args={[1, 0.25, 32, 100]} position={position} rotation={rotation}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={3}
        />
      </Torus>
    </Float>
  )
}

function CrystalOcta({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.6
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Octahedron ref={ref} args={[0.9, 0]} position={position}>
        <meshStandardMaterial
          color="#a855f7"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          roughness={0}
          metalness={1}
          envMapIntensity={4}
          transparent
          opacity={0.85}
        />
      </Octahedron>
    </Float>
  )
}

function GlowBox({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = state.clock.elapsedTime * 0.25
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <Box ref={ref} args={[1.1, 1.1, 1.1]} position={position}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={0.9}
          envMapIntensity={3}
          transparent
          opacity={0.8}
        />
      </Box>
    </Float>
  )
}

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#a855f7" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#c084fc" distance={10} />
      <pointLight position={[3, 3, 0]} intensity={1} color="#818cf8" distance={8} />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Main central orb */}
      <FloatingOrb
        position={[0, 0, 0]}
        color="#7c3aed"
        size={1.6}
        speed={0.8}
        distort={0.35}
      />

      {/* Secondary shapes */}
      <CrystalOcta position={[-2.8, 1.8, -1]} />
      <GlowBox position={[2.6, -1.4, -0.5]} />
      <GlowTorus position={[2.2, 2, -2]} color="#a855f7" rotation={[0.5, 0, 0.3]} />

      {/* Small accent orbs */}
      <FloatingOrb position={[-2.5, -1.8, 0.5]} color="#4f46e5" size={0.6} speed={1.5} distort={0.6} />
      <FloatingOrb position={[2.8, 1.5, 0.5]} color="#7c3aed" size={0.45} speed={2} distort={0.7} />
      <FloatingOrb position={[-1.5, 2.5, -1]} color="#6366f1" size={0.35} speed={1.8} distort={0.8} />

      {/* OrbitControls - no zoom, auto rotate */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function SceneFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'rgba(168,85,247,0.6)',
      fontSize: '14px',
    }}>
      Loading 3D scene...
    </div>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      className="scene-canvas"
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
