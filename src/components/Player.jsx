import { useRapier, RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import * as THREE from "three"

export default function Player() {
  const ballRef = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useEffect(() => {
    // listen to changes to keys
    subscribeKeys(
      (state) => state.jump,
      (value) => {
        // if we are jumping make the ball jump
        if (value) ballRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
      }
    )
  }, [subscribeKeys])

  useFrame((state, delta) => {
    // get keys set in KeyboardControls from index.jsx
    const { moveForward, moveBackward, moveLeft, moveRight } = getKeys()

    // so we can move player on two axis or more at once
    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (moveForward) {
      impulse.z -= impulseStrength // forward is minus z
      torque.x -= torqueStrength // rotate on x
    }
    if (moveBackward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }
    if (moveLeft) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }
    if (moveRight) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    ballRef.current.applyImpulse(impulse)
    ballRef.current.applyTorqueImpulse(torque)
  }, [])

  return (
    <RigidBody
      colliders="ball"
      position={[0, 1, 0]}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      ref={ballRef}
      canSleep={false}
    >
      {/* Floor */}
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  )
}
