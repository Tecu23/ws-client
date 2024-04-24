import { useRef, useState } from "react";

import PropTypes from "prop-types";

import type { Square, PieceSymbol, Color, Piece } from "chess.js";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Tile from "./Tile";

import { pc2Text, chess } from "../utils/config/globalConfig";
import { Ranks, Files } from "../utils/constants/board";

function Board() {
    const boardRef = useRef<HTMLDivElement>(null);
    const [boardState, setBoardState] = useState<Array<JSX.Element>>(
        createBoard(chess.board()),
    );

    const [activePiece, setActivePiece] = useState<Piece | null>(null);
    const [fromSq, setFromSq] = useState<string | null>(null);

    // useEffect(() => {
    //     const b = chess.board();
    //     setBoardState(createBoard(b));
    // }, []);
    //

    function createBoard(
        b: Array<
            Array<{
                square: Square;
                type: PieceSymbol;
                color: Color;
            } | null>
        >,
    ): Array<JSX.Element> {
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
                            sq={Files[f].toLowerCase() + Ranks[7 - r]}
                            number={f + r}
                        />,
                    );
                } else {
                    board.push(
                        <Tile
                            image={`pieces/${pc2Text[sq.type]}_${sq.color}.png`}
                            sq={Files[f].toLowerCase() + Ranks[7 - r]}
                            piece={{ color: sq.color, type: sq.type }}
                            className={"chess-piece"}
                            key={sq.square}
                            number={f + r}
                        />,
                    );
                }
            }
        }
        return board;
    }

    function onDragStart(e: DragStartEvent) {
        setActivePiece({
            type: e.active.data.current?.type,
            color: e.active.data.current?.color,
        });
        setFromSq(e.active.data.current?.sq);
    }

    function onDragEnd(e: DragEndEvent) {
        const end = e.over?.data.current?.sq;
        chess.move(`${fromSq}${end}`);
        const b = chess.board();
        setBoardState(createBoard(b));
    }

    return (
        <div className="bg-gray-500/60 w-full h-full flex justify-center items-center border rounded-lg">
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div
                    ref={boardRef}
                    className="w-[360px] h-[360px] bg-gray-600 grid grid-cols-8 grid-rows-8"
                >
                    {boardState}
                </div>
            </DndContext>
        </div>
    );
}

Board.propTypes = {
    name: PropTypes.string,
};

export default Board;
