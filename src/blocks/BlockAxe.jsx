import * as THREE from "three"
import { RigidBody } from "@react-three/rapier"
import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function BlockAxe({
  position = [0, 0, 0],
  geometry,
  material,
  obstacleMaterial,
}) {
  const obstacle = useRef()

  // if re-rendered timeOffset will stay the same time
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // move obstacle up and down
    const x = Math.sin(time + timeOffset) * 1.25 // mutiply by 1.25 so it moves to edges
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    }) // use position so if we move the block obstacle will follow
  })

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        receiveShadow
        position={[0, -0.1, 0]}
        geometry={geometry}
        scale={[4, 0.2, 4]}
        material={material}
      ></mesh>

      {/* Spinner Obstacle */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={geometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}
