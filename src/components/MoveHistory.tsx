import type { Move } from "chess.js";
import { useEffect, useState } from "react";
import { useChess } from "../utils/context/ChessContext";

const MoveHistory = () => {
    const { moveHistory } = useChess();

    const [moves, setMoves] = useState(moveHistory);

    useEffect(() => {
        setMoves(moveHistory);
    }, [moveHistory]);

    return (
        <div className="p-1 bg-piece text-gray-300 w-full flex items-center gap-1 overflow-auto no-scrollbar">
            {moves.map((move: Move, idx: number) => {
                return (
                    <span key={move.to + move.from + move.piece} className="inline-flex gap-1">
                        {(idx & 1) === 0 && <p className="text-xs font-medium">{Math.round((idx + 1) / 2)}.</p>}
                        <p className="text-xs font-medium">{move.san}</p>
                    </span>
                );
            })}
        </div>
    );
};

export default MoveHistory;
