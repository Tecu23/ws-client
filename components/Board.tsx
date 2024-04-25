import { useRef, useState } from "react";

import PropTypes from "prop-types";

import type { Square, PieceSymbol, Color, Move } from "chess.js";
import Piece from "./Piece";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Tile from "./Tile";

import { pc2Text } from "../utils/config/globalConfig";
import { Ranks, Files } from "../utils/constants/board";
import { useChess } from "../utils/context/ChessContext";

function Board() {
    const { chess, isAtTheTop } = useChess();
    const boardRef = useRef<HTMLDivElement>(null);
    const [boardState, setBoardState] = useState<Array<JSX.Element>>(createBoard(chess.board(), []));

    const [fromSq, setFromSq] = useState<string | null>(null);

    function createBoard(
        b: Array<
            Array<{
                square: Square;
                type: PieceSymbol;
                color: Color;
            } | null>
        >,
        possibleMoves: Array<Move>,
    ): Array<JSX.Element> {
        const board: Array<JSX.Element> = [];

        for (let r = 0; r < b.length; r++) {
            for (let f = 0; f < b[0].length; f++) {
                const squareValue = Files[f].toLowerCase() + Ranks[7 - r];
                const isPossibleMove = possibleMoves.filter((m: Move) => m.to === squareValue)[0];
                const sq: {
                    square: Square;
                    type: PieceSymbol;
                    color: Color;
                } | null = b[r][f];

                let className = "";

                if (isPossibleMove) {
                    className += "bg-red-100";
                }
                if (sq == null) {
                    board.push(<Tile className={className} key={Files[f].toLowerCase() + Ranks[7 - r]} sq={Files[f].toLowerCase() + Ranks[7 - r]} number={f + r} />);
                } else {
                    board.push(
                        <Tile
                            sq={Files[f].toLowerCase() + Ranks[7 - r]}
                            key={sq.square}
                            number={f + r}
                            piece={<Piece color={sq.color} type={sq.type} sq={Files[f].toLowerCase() + Ranks[7 - r]} image={`pieces/${pc2Text[sq.type]}_${sq.color}.png`} />}
                        />,
                    );
                }
            }
        }
        return board;
    }

    function onDragStart(e: DragStartEvent) {
        setBoardState(createBoard(chess.board(), chess.moves({ square: e.active?.data.current?.sq, verbose: true })));
        setFromSq(e.active.data.current?.sq);
    }

    function onDragEnd(e: DragEndEvent) {
        if (!e.over) {
            setBoardState(createBoard(chess.board(), []));
            return;
        }
        const end = e.over?.data.current?.sq;

        try {
            if (chess.turn() === "w" && isAtTheTop(end)) {
                chess.move(`${fromSq}${end}q`);
            } else {
                chess.move(`${fromSq}${end}`);
            }
            setBoardState(createBoard(chess.board(), []));
        } catch (e) {
        } finally {
            setBoardState(createBoard(chess.board(), []));
        }
    }

    return (
        <div className="bg-gray-500/60 w-full h-full flex justify-center items-center border rounded-lg">
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div ref={boardRef} className="w-[360px] h-[360px] bg-gray-600 grid grid-cols-8 grid-rows-8">
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
