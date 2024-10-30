import { ChessProvider } from "../utils/context/ChessContext";
import MoveHistory from "./MoveHistory";
import Board from "./Board";

// type Props = {
//
// }
//

function Game() {
    return (
        <div className="container max-w-4xl w-full ">
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
