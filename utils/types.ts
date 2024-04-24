import type { Dispatch } from "react";

import type { Chess } from "chess.js";

export interface ChessContextValue {
    chess: [Chess, Dispatch<React.SetStateAction<Chess>>];
}
