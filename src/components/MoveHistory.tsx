import type { Move } from "chess.js";
import { useEffect, useState } from "react";
import { useChess } from "../utils/context/ChessContext";

const MoveHistory = () => {
    const { moveHistory, chess } = useChess();

    const [moves, setMoves] = useState(moveHistory);

    useEffect(() => {
        setMoves(moveHistory);
    }, [moveHistory]);

    const formatMoves = (moves: Move[]) => {
        const movePairs = [];
        for (let i = 0; i < moves.length; i += 2) {
            movePairs.push([moves[i], moves[i + 1] || ""]);
        }
        return movePairs;
    };

    console.log(formatMoves(moves));

    return (
        <>
            <div className="lg:hidden p-1 bg-piece text-gray-300 w-full flex items-center gap-1 overflow-auto no-scrollbar">
                {moves.map((move: Move, idx: number) => {
                    return (
                        <span key={move.to + move.from + move.piece} className="inline-flex gap-1">
                            {(idx & 1) === 0 && <p className="text-xs font-medium">{Math.round((idx + 1) / 2)}.</p>}
                            <p className="text-xs font-medium">{move.san}</p>
                        </span>
                    );
                })}
            </div>
            <div className="flex flex-col gap-12 w-full">
                <div className="rounded bg-piece text-white shadow-md flex flex-col w-full min-h-[200px] p-1">
                    <h2 className="w-full text-3xl font-semibold text-center p-4 border-b border-gray-600">Move History</h2>
                    <div className="h-[500px] flex flex-col overflow-auto no-scrollbar">
                        {formatMoves(moves).map((move: Move[], idx: number) => {
                            return (
                                <div key={move[0].san + move[1].san} className={`flex gap-2 ${idx % 2 == 1 ? "bg-gray-600" : ""} p-2`}>
                                    <p className="text-xs lg:text-base font-medium">{idx}.</p>
                                    <p className="text-xs lg:text-base font-medium">{move[0].san}</p>
                                    <p className="text-xs lg:text-base font-medium">{move[1].san}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-square-light p-2 ded-lg truncate line-clamp-1 relative shadow-md flex justify-center items-center rounded-md font-semibold text-lg">
                    FEN: <span className="ml-2 text-base font-medium bg-piece text-white p-2 rounded-lg">{chess.fen()}</span>
                </div>
            </div>
        </>
    );
};

export default MoveHistory;
