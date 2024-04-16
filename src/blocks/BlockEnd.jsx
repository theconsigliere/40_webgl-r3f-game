import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function BlockEnd({ position = [0, 0, 0], geometry, material }) {
  const hamburger = useGLTF("./hamburger.glb")

  // Add shadows to all meshes
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true
  })

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        geometry={geometry}
        scale={[4, 0.2, 4]}
        material={material}
      ></mesh>

      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[0, 0, 0]}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  )
}
