import Game from "../components/Game/Game"
import Game2048 from "../components/Game2048/Game2048"
import GameMemory from "../components/Gamememory/Gamememory"
import GamePiano from "../components/Gamepiano/Gamepiano"

const Explore = () => {
  return (
    <>
      <style>{`
        .explore-mobile { display: none; }

        @media (max-width: 768px) {
          .explore-desktop { display: none; }
          .explore-mobile {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            padding: 2rem 1.25rem;
          }
          .explore-mobile__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            max-width: 280px;
          }
          .explore-mobile__icon { font-size: 48px; }
          .explore-mobile__title {
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            margin: 0;
          }
          .explore-mobile__body {
            font-size: 14px;
            font-weight: 300;
            color: rgb(161, 161, 170);
            line-height: 1.6;
            margin: 0;
          }
        }
      `}</style>

      <div className="explore-desktop">
        <Game />
        <Game2048 />
        <GameMemory />
        <GamePiano />
      </div>

      <div className="explore-mobile">
        <div className="explore-mobile__inner">
          <span className="explore-mobile__icon">🖥️</span>
          <h2 className="explore-mobile__title">Desktop Only</h2>
          <p className="explore-mobile__body">
            These games require a keyboard and a larger screen. <br />
            Visit on a desktop for the full experience.
          </p>
        </div>
      </div>
    </>
  )
}

export default Explore