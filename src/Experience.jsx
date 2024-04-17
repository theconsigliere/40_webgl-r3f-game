import { OrbitControls } from "@react-three/drei"
import Lights from "./Lights"
import Level from "./Level"
import { Physics } from "@react-three/rapier"
import Player from "./components/Player"
import useGame from "./stores/useGame"

export default function Experience() {
  // get blocks count from store
  const blocksCount = useGame((state) => state.blocksCount)

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        <Lights />
        <Level count={blocksCount} />
        <Player />
      </Physics>
    </>
  )
}
