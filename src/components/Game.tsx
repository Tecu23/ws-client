import { ChessProvider } from "../utils/context/ChessContext";
import Board from "./Board";

// type Props = {
//
// }
//

function Game() {
    return (
        <ChessProvider>
            <Board />
        </ChessProvider>
    );
}

export default Game;
