export default function BlockStart({
  position = [0, 0, 0],
  geometry,
  material,
}) {
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
    </group>
  )
}
