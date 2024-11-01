import { ChessProvider } from "../utils/context/ChessContext";
import MoveHistory from "./MoveHistory";
import Board from "./Board";
import GameScreen from "./GameScreen";

function Game() {
    return (
        <ChessProvider>
            <div className="container mx-auto max-w-7xl w-full h-screen lg:flex lg:flex-row-reverse lg:items-center lg:gap-24 p-8">
                <MoveHistory />
                <GameScreen />
            </div>
        </ChessProvider>
    );
}

export default Game;
