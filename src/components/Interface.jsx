import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "../stores/useGame"

export default function Interface() {
  // gets all set keys and if they are being pressed
  // const controls = useKeyboardControls((state) => state)

  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  // SET TIME
  const time = useRef()

  useEffect(() => {
    // RUNS AFTER USEFRAME SO WE CAN UPDATE TIME
    const unsubEffect = addEffect(() => {
      // get updated state
      const state = useGame.getState()

      let elapsedTime = 0

      // get the time to display
      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime

      // turn into in seconds
      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      // incase time ref returns null
      if (time.current) time.current.textContent = elapsedTime
    })

    return () => unsubEffect()
  }, [])

  // get just the keys we need
  const forward = useKeyboardControls((state) => state.moveForward)
  const backward = useKeyboardControls((state) => state.moveBackward)
  const left = useKeyboardControls((state) => state.moveLeft)
  const right = useKeyboardControls((state) => state.moveRight)
  const jump = useKeyboardControls((state) => state.jump)

  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

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
