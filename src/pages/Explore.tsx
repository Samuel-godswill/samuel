import Game from "../components/Game/Game"
import Game2048 from "../components/Game2048/Game2048"
import GameMemory from "../components/Gamememory/Gamememory"
import GamePiano from "../components/Gamepiano/Gamepiano"

const Explore = () => {
  return (
    <div>
      <Game />
      <Game2048 />
      <GameMemory />
      <GamePiano />
    </div>
  )
}

export default Explore
