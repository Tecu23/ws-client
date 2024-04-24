import { Chess } from "chess.js";
import type { ChessContextValue } from "../types";

import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

const ChessContext = createContext<ChessContextValue | undefined>(undefined);

const useChess = () => useContext(ChessContext);

type Props = {
    children?: ReactNode;
};

const ChessProvider = ({ children }: Props) => {
    const chess = useState(new Chess());

    return (
        <ChessContext.Provider
            value={{
                chess,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export { ChessProvider, useChess };
