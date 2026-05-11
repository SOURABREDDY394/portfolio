/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import cardGLB from '../../assets/lanyard/card.glb'
import lanyard from '../../assets/lanyard/lanyard.png'
import './Lanyard.css'

extend({ MeshLineGeometry, MeshLineMaterial } as any)

type LanyardProps = {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.25 : 1.8]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI * 0.72} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.82}>
          <Lightformer intensity={2.4} color="#76f6ff" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="#1fd7e7" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={2.4} color="#e8ffff" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={8} color="#35efff" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<any>(null)
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 } as const
  const { nodes } = useGLTF(cardGLB) as any
  const texture = useTexture(lanyard)
  const logoTexture = useTexture('/images/logo.png')
  const lineGeometry = useMemo(() => new MeshLineGeometry(), [])
  const lineMaterial = useMemo(
    () =>
      new MeshLineMaterial({
        color: new THREE.Color('#25dcea'),
        depthTest: false,
        resolution: new THREE.Vector2(1000, isMobile ? 1600 : 1000),
        useMap: true,
        map: texture,
        repeat: new THREE.Vector2(-4, 1),
        lineWidth: 1,
      }),
    [isMobile, texture],
  )
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ])
  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ])
  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ])

  useEffect(() => {
    if (!hovered) return
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered, dragged])

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.colorSpace = THREE.SRGBColorSpace
    logoTexture.colorSpace = THREE.SRGBColorSpace
  }, [texture, logoTexture])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              ;(event.target as Element).releasePointerCapture(event.pointerId)
              drag(false)
            }}
            onPointerDown={(event) => {
              ;(event.target as Element).setPointerCapture(event.pointerId)
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color="#031625" clearcoat={isMobile ? 0.45 : 1} clearcoatRoughness={0.12} roughness={0.62} metalness={0.82} />
            </mesh>
            <mesh position={[0, 0.16, 0.031]}>
              <planeGeometry args={[1.16, 1.16]} />
              <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
            </mesh>
            <mesh position={[0, -0.86, 0.033]}>
              <planeGeometry args={[1.26, 0.18]} />
              <meshBasicMaterial color="#35efff" transparent opacity={0.18} />
            </mesh>
            <mesh geometry={nodes.clip.geometry}>
              <meshStandardMaterial color="#35efff" roughness={0.24} metalness={0.92} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshStandardMaterial color="#0ca6b7" roughness={0.3} metalness={0.86} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <primitive attach="geometry" object={lineGeometry} />
        <primitive attach="material" object={lineMaterial} />
      </mesh>
    </>
  )
}

useGLTF.preload(cardGLB)
