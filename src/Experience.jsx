import { OrbitControls } from "@react-three/drei"
import Lights from "./Lights"
import Level from "./Level"
import { Physics } from "@react-three/rapier"

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  )
}
