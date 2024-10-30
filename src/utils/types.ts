import type { Dispatch } from "react";

import type { Chess, Move, Square } from "chess.js";

export interface PieceType {
    type: string;
    color: string;
}

export interface ChessContextValue {
    chess: Chess;
    possibleMoves: Move[];
    moveHistory: Move[];
    addToHistory: (move: Move) => void;
    setPossibleMoves: Dispatch<React.SetStateAction<Array<Move>>>;
    isAtTheTop: (arg: Square) => boolean;
    isAtTheBottom: (arg: Square) => boolean;
}
