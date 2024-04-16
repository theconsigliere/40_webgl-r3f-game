import * as THREE from "three"
import { RigidBody } from "@react-three/rapier"
import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function BlockSpinner({
  position = [0, 0, 0],
  geometry,
  material,
  obstacleMaterial,
}) {
  const obstacle = useRef()

  // if re-rendered speed will stay the same time
  // multiply by -1 so sometimes it goes backwards
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // rotate spinner
    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current.setNextKinematicRotation(rotation)
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}
