import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience.jsx"
import { KeyboardControls } from "@react-three/drei"

import Interface from "./components/Interface"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <KeyboardControls
    map={[
      { keys: ["KeyW", "ArrowUp"], name: "moveForward" },
      { keys: ["KeyS", "ArrowDown"], name: "moveBackward" },
      { keys: ["KeyA", "ArrowLeft"], name: "moveLeft" },
      { keys: ["KeyD", "ArrowRight"], name: "moveRight" },
      { keys: ["Space"], name: "jump" },
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
)
