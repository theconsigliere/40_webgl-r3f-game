import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function Bounds({ length = 1, geometry, material }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        {/* right wall */}
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={geometry}
          scale={[0.3, 1.5, 4 * length]}
          material={material}
          castShadow
        ></mesh>
        {/* left wall */}
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={geometry}
          scale={[0.3, 1.5, 4 * length]}
          material={material}
          receiveShadow
        ></mesh>

        {/* back wall */}
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={geometry}
          scale={[4, 1.5, 0.3]}
          material={material}
          receiveShadow
        ></mesh>
        {/* Floor collider */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  )
}
