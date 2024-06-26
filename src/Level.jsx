import * as THREE from "three"
import { useMemo } from "react"

// blocks
import BlockStart from "./blocks/BlockStart"
import BlockSpinner from "./blocks/BlockSpinner"
import BlockLimbo from "./blocks/BlockLimbo"
import BlockAxe from "./blocks/BlockAxe"
import BlockEnd from "./blocks/BlockEnd"

// components
import Bounds from "./components/Bounds"

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" })
  const floor2Material = new THREE.MeshStandardMaterial({
    color: "greenyellow",
  })
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: "orangered",
  })
  const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" })

  // loop through blocks and create them
  const blocks = useMemo(() => {
    const blocks = []

    for (let i = 0; i < count; i++) {
      // get random indexes
      const type = types[Math.floor(Math.random() * types.length)]
      blocks.push(type)
    }

    return blocks
  }, [count, types, seed])

  return (
    <>
      <BlockStart
        position={[0, 0, 0]}
        geometry={boxGeometry}
        material={floor1Material}
      />

      {blocks.map((Block, index) => {
        return (
          <Block
            key={index}
            position={[0, 0, -(index + 1) * 4]}
            geometry={boxGeometry}
            material={floor2Material}
            obstacleMaterial={obstacleMaterial}
          />
        )
      })}

      <BlockEnd
        position={[0, 0, -(count + 1) * 4]}
        geometry={boxGeometry}
        material={floor1Material}
      />
      <Bounds
        length={count + 2}
        geometry={boxGeometry}
        material={wallMaterial}
      />

      {/* 
      <BlockSpinner
        position={[0, 0, 12]}
        material={floor2Material}
        geometry={boxGeometry}
        obstacleMaterial={obstacleMaterial}
      />
      <BlockLimbo
        position={[0, 0, 8]}
        material={floor2Material}
        geometry={boxGeometry}
        obstacleMaterial={obstacleMaterial}
      />
      <BlockAxe
        position={[0, 0, 4]}
        material={floor2Material}
        geometry={boxGeometry}
        obstacleMaterial={obstacleMaterial}
      />
      */}
    </>
  )
}
