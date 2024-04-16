import { OrbitControls } from "@react-three/drei"
import Lights from "./Lights"
import Level from "./Level"
import { Physics } from "@react-three/rapier"
import Player from "./components/Player"

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  )
}
