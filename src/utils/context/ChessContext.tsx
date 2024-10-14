import type { Move, Square } from "chess.js";
import { Chess } from "chess.js";
import type { ChessContextValue } from "../types";

import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

const ChessContext = createContext<ChessContextValue | undefined>(undefined);

const useChess = () => {
    const context = useContext(ChessContext);

    if (!context) {
        throw Error("chess context not loaded");
    }

    return context;
};

type Props = {
    children?: ReactNode;
};

const ChessProvider = ({ children }: Props) => {
    const [chess] = useState(new Chess());
    const [possibleMoves, setPossibleMoves] = useState<Array<Move>>([]);

    const isAtTheTop = (sq: Square) => sq.includes("8");
    const isAtTheBottom = (sq: Square) => sq.includes("1");

    return (
        <ChessContext.Provider
            value={{
                chess,
                possibleMoves,
                setPossibleMoves,
                isAtTheTop,
                isAtTheBottom,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export { ChessProvider, useChess };
