import Board from "./Board";
import Profile from "./Profile";
import { useChess } from "../utils/context/ChessContext";
const GameScreen = () => {
    const { capturedBlackPieces, capturedWhitePieces } = useChess();

    return (
        <div className="h-full flex flex-col gap-2 justify-center p-8">
            <Profile capturedPieces={capturedBlackPieces} color="b" name="ArGoX" elo="9999" />
            <Board />
            <Profile capturedPieces={capturedWhitePieces} color="w" name="Challenger" elo="200" />
        </div>
    );
};

export default GameScreen;
