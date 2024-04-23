import { useRef } from "react";

import PropTypes from "prop-types";

import type { Square, PieceSymbol, Color } from "chess.js";
import { Chess } from "chess.js";

import Tile from "./Tile";

import { pc2Text } from "../utils/config/globalConfig";
import { Ranks, Files } from "../utils/constants/board";

function Board() {
    const boardRef = useRef<HTMLDivElement>(null);

    const chess = new Chess();
    const b = chess.board();

    const grabPiece = (e: React.MouseEvent) => {
        // const elem = e.target as HTMLElement;
        // const board = boardRef.current;
        // if (elem.classList.contains("chess-piece") && board) {
        // }
        console.log(e);
    };

    const movePiece = (e: React.MouseEvent) => {
        console.log(e);
    };

    const dropPiece = (e: React.MouseEvent) => {
        console.log(e);
    };

    const createBoard = (
        b: Array<
            Array<{
                square: Square;
                type: PieceSymbol;
                color: Color;
            } | null>
        >,
    ): Array<JSX.Element> => {
        const board: Array<JSX.Element> = [];

        for (let r = 0; r < b.length; r++) {
            for (let f = 0; f < b[0].length; f++) {
                const sq: {
                    square: Square;
                    type: PieceSymbol;
                    color: Color;
                } | null = b[r][f];

                if (sq == null) {
                    board.push(
                        <Tile
                            key={Files[f].toLowerCase() + Ranks[7 - r]}
                            number={f + r}
                        />,
                    );
                } else {
                    board.push(
                        <Tile
                            image={`pieces/${pc2Text[sq.type]}_${sq.color}.png`}
                            key={sq.square}
                            number={f + r}
                        />,
                    );
                }
            }
        }
        return board;
    };

    const tiles = createBoard(b);

    return (
        <div className="bg-gray-500/60 w-full h-full flex justify-center items-center border rounded-lg">
            <div
                onMouseMove={dropPiece}
                onMouseDown={grabPiece}
                onMouseUp={movePiece}
                ref={boardRef}
                className="w-[360px] h-[360px] bg-gray-600 grid grid-cols-8 grid-rows-8"
            >
                {tiles}
            </div>
        </div>
    );
}

Board.propTypes = {
    name: PropTypes.string,
};

export default Board;
