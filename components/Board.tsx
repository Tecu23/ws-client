import { useRef, useState } from "react";

import PropTypes from "prop-types";

import type { Square, PieceSymbol, Color } from "chess.js";
import { Chess } from "chess.js";

import Tile from "./Tile";

import { pc2Text } from "../utils/config/globalConfig";
import { Ranks, Files } from "../utils/constants/board";

function Board() {
    const boardRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

    const chess = new Chess();
    const b = chess.board();

    console.log("re-render");

    const grabPiece = (e: React.MouseEvent) => {
        const elem = e.target as HTMLElement;
        const board = boardRef.current;

        if (elem.classList.contains("chess-piece") && board) {
            const grabFileIdx = Math.floor((e.clientX - board.offsetLeft) / 45);
            const grabRankIdx = Math.floor((e.clientY - board.offsetTop) / 45);

            const x = e.clientX - 45 / 2;
            const y = e.clientY - 45 / 2;

            elem.style.position = "absolute";
            elem.style.left = `${x}px`;
            elem.style.top = `${y}px`;

            setActivePiece(elem);
        }
    };

    const movePiece = (e: React.MouseEvent) => {
        const board = boardRef.current;
        if (activePiece && board) {
            const minX = board.offsetLeft - 25;
            const minY = board.offsetTop - 25;
            const maxX = board.offsetLeft + board.clientWidth - 75;
            const maxY = board.offsetTop + board.clientHeight - 75;
            const x = e.clientX - 22.5;
            const y = e.clientY - 22.5;
            activePiece.style.position = "absolute";

            //If x is smaller than minimum amount
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            //If x is bigger than maximum amount
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            //If x is in the constraints
            else {
                activePiece.style.left = `${x}px`;
            }

            //If y is smaller than minimum amount
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
            //If y is bigger than maximum amount
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
            //If y is in the constraints
            else {
                activePiece.style.top = `${y}px`;
            }
        }
    };

    const dropPiece = (e: React.MouseEvent) => {
        // console.log(e);
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
                            className={"chess-piece"}
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
                ref={boardRef}
                onMouseMove={dropPiece}
                onMouseDown={grabPiece}
                onMouseUp={movePiece}
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
