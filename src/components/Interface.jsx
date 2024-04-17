import { useKeyboardControls } from "@react-three/drei"

export default function Interface() {
  // gets all set keys and if they are being pressed
  const controls = useKeyboardControls((state) => state)
  // get just the keys we need
  const forward = useKeyboardControls((state) => state.moveForward)
  const backward = useKeyboardControls((state) => state.moveBackward)
  const left = useKeyboardControls((state) => state.moveLeft)
  const right = useKeyboardControls((state) => state.moveRight)
  const jump = useKeyboardControls((state) => state.jump)

  return (
    <div className="interface">
      <div className="time">0.00</div>
      {/* Restart */}
      <div className="restart">Restart</div>

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${left ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${right ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  )
}
