import { useRapier, RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import * as THREE from "three"

import useGame from "../stores/useGame"

export default function Player() {
  const ballRef = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { rapier, world } = useRapier()

  // CAMERA POSITION
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

  // PHASES
  const start = useGame((state) => state.start)
  const end = useGame((state) => state.end)
  const blocksCount = useGame((state) => state.blocksCount)
  const restart = useGame((state) => state.restart)

  // TELL IF BALL IS JUMPING
  const jump = () => {
    const origin = ballRef.current.translation()
    origin.y -= 0.31
    const direction = { x: 0, y: -1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
    const hit = world.castRay(ray, 10, true)

    // if WE ARE ON THE FLOOR WE CAN JUMP, IF WE ARE NOT WE CAN'T
    if (hit.toi < 0.15) {
      ballRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    }
  }

  // RESET BALL
  const reset = () => {
    ballRef.current.setTranslation({ x: 0, y: 1, z: 0 })
    // RESET VELOCITY
    ballRef.current.setLinvel({ x: 0, y: 0, z: 0 })
    ballRef.current.setAngvel({ x: 0, y: 0, z: 0 })
  }

  // LISTEN TO KEYBOARD
  useEffect(() => {
    // WHEN PHASE CHANGES TO END WE RESET
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset()
      }
    )

    // listen to changes to keys
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump()
      }
    )

    return () => {
      // when function is destroyed unsubscribe
      unsubscribeJump()
      unsubscribeReset()
    }
  }, [subscribeKeys])

  // LISTEN TO GAME MECHANICS
  useEffect(() => {
    const unSubToKeys = subscribeKeys(() => {
      // when we hit a key we start the game
      start()
    })

    return () => {
      unSubToKeys()
    }
  }, [])

  useFrame((state, delta) => {
    // get keys set in KeyboardControls from index.jsx
    const { moveForward, moveBackward, moveLeft, moveRight } = getKeys()

    // so we can move player on two axis or more at once
    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.3 * delta
    const torqueStrength = 0.1 * delta

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

  // CAMERA
  // set camera to follow ball

  useFrame((state, delta) => {
    const ballPosition = ballRef.current.translation()

    // set camera position
    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(ballPosition)
    cameraPosition.z += 2.25
    cameraPosition.y += 0.65

    // set camera target above marble
    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(ballPosition)
    cameraTarget.y += 0.25

    // smooth camera movement
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

    // set camera up vector
    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)
  })

  // GAME MECHANICS TEST WHERE WE ARE IN THE GAME
  useFrame((state) => {
    const ballPosition = ballRef.current.translation()

    // change phase to end
    if (ballPosition.z < -(blocksCount * 4 + 2)) end()

    // if ball is falling we  restart
    if (ballPosition.y < -4) restart()
  })

  return (
    <>
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
    </>
  )
}
