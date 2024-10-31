import { ChessProvider } from "../utils/context/ChessContext";
import MoveHistory from "./MoveHistory";
import Board from "./Board";

// type Props = {
//
// }
//

function Game() {
    return (
        <div className="container mx-auto max-w-7xl w-full h-full lg:flex lg:flex-row-reverse lg:items-center lg:gap-24">
            <ChessProvider>
                <MoveHistory />
                <div className="w-full h-full flex items-center justify-center">
                    <Board />
                </div>
            </ChessProvider>
        </div>
    );
}

export default Game;
