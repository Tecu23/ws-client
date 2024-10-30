import { useRef, useState, useCallback } from "react";

import type { Square, PieceSymbol, Color, Move } from "chess.js";
import Piece from "./Piece";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import Tile from "./Tile";
import Profile from "./Profile";

import { pc2Text } from "../utils/config/globalConfig";
import { Ranks, Files } from "../utils/constants/board";
import { useChess } from "../utils/context/ChessContext";

function Board() {
    const { chess, isAtTheTop, isAtTheBottom, addToHistory } = useChess();

    const [fromSq, setFromSq] = useState<string | undefined>(undefined);
    const [lastMoveFromSq, setLastMoveFromSq] = useState<string | undefined>(undefined);
    const [lastMoveToSq, setLastMoveToSq] = useState<string | undefined>(undefined);

    const [promotionPopup, setPromotionPopup] = useState<{ visible: boolean; position: { x: number; y: number }; square: string | null; color: "w" | "b" }>({
        visible: false,
        position: { x: 0, y: 0 },
        square: null,
        color: "w",
    });

    const [capturedWhitePieces, setCapturedWhitePieces] = useState<PieceSymbol[]>([]);
    const [capturedBlackPieces, setCapturedBlackPieces] = useState<PieceSymbol[]>([]);

    const boardRef = useRef<HTMLDivElement>(null);

    const createBoard = useCallback(
        (
            b: Array<
                Array<{
                    square: Square;
                    type: PieceSymbol;
                    color: Color;
                } | null>
            >,
            possibleMoves: Array<Move>,
            fromSq?: string,
            toSq?: string,
        ): Array<JSX.Element> => {
            const board: Array<JSX.Element> = [];

            for (let r = 0; r < b.length; r++) {
                for (let f = 0; f < b[0].length; f++) {
                    const squareValue = Files[f].toLowerCase() + Ranks[7 - r];
                    const isPossibleMove = possibleMoves.some((m: Move) => m.to === squareValue);
                    const sq = b[r][f];

                    const getClassName = () => {
                        if (fromSq && squareValue === fromSq) return "bg-active-light";
                        if (toSq && squareValue === toSq) return "bg-active-dark";
                        return ((f + r) & 1) === 0 ? "bg-square-dark" : "bg-square-light";
                    };

                    board.push(
                        <Tile
                            isPossibleMove={isPossibleMove}
                            className={getClassName()}
                            key={squareValue}
                            sq={squareValue}
                            piece={sq ? <Piece color={sq.color} type={sq.type} sq={squareValue} image={`pieces/${pc2Text[sq.type]}_${sq.color}.svg`} /> : undefined}
                        />,
                    );
                }
            }
            return board;
        },
        [],
    );

    const [boardState, setBoardState] = useState<Array<JSX.Element>>(createBoard(chess.board(), []));

    function onDragStart(e: DragStartEvent) {
        const startSquare = e.active.data.current?.sq;
        if (startSquare) {
            setFromSq(startSquare);
            const possibleMoves = chess.moves({ square: startSquare, verbose: true });
            setBoardState(createBoard(chess.board(), possibleMoves, lastMoveFromSq, lastMoveToSq));
        }
    }

    function onDragEnd(e: DragEndEvent) {
        const endSquare = e.over?.data.current?.sq;

        if (!endSquare || !fromSq) {
            setBoardState(createBoard(chess.board(), [], lastMoveFromSq, lastMoveToSq));
            return;
        }

        const isPromotion = chess.get(fromSq as Square)?.type === "p" && (chess.turn() === "w" ? isAtTheTop(endSquare) : isAtTheBottom(endSquare));

        if (isPromotion) {
            // Get the board position to display the popup near the promotion square
            const rect = boardRef.current?.getBoundingClientRect();
            if (rect) {
                const x = (endSquare.charCodeAt(0) - "a".charCodeAt(0) - 1) * (rect.width / 8) + rect.left + 10;
                const y = chess.turn() === "w" ? 2 : rect.height;

                setPromotionPopup({ visible: true, position: { x, y }, square: endSquare, color: chess.turn() });
            }
            return;
        }

        try {
            const move = chess.move({ from: fromSq, to: endSquare });
            addToHistory(move);

            if (move?.captured) {
                if (move.color === "w") {
                    setCapturedBlackPieces((prev) => [...prev, move.captured as PieceSymbol]);
                } else {
                    setCapturedWhitePieces((prev) => [...prev, move.captured as PieceSymbol]);
                }
            }

            setLastMoveFromSq(fromSq);
            setLastMoveToSq(endSquare);

            setBoardState(createBoard(chess.board(), [], fromSq, endSquare));
        } catch (error) {
            console.error("Invalid move", error);
        }
    }

    function handlePromotionChoice(piece: PieceSymbol) {
        if (promotionPopup.square && fromSq) {
            const move = chess.move({ from: fromSq, to: promotionPopup.square, promotion: piece.at(0) });
            addToHistory(move);
            if (move?.captured) {
                if (move.color === "w") {
                    setCapturedBlackPieces((prev) => [...prev, move.captured as PieceSymbol]);
                } else {
                    setCapturedWhitePieces((prev) => [...prev, move.captured as PieceSymbol]);
                }
            }

            setLastMoveFromSq(fromSq);
            setLastMoveToSq(promotionPopup.square);
            setBoardState(createBoard(chess.board(), [], fromSq, promotionPopup.square));
            setPromotionPopup({ visible: false, position: { x: 0, y: 0 }, square: null, color: "w" });
        }
    }

    return (
        <div className="relative w-[406px] h-[406px]">
            <Profile capturedPieces={capturedBlackPieces} color="b" name="ArGoX" elo="9999" />
            <div className="bg-white w-full h-full flex justify-center items-center border rounded-lg pt-2 pr-2 pb-6 lg:pb-10 pl-6 lg:pl-10 relative">
                <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div ref={boardRef} className="w-[360px] lg:w-[360px] h-[360px] lg:h-[600px] grid grid-cols-8 grid-rows-8">
                        {boardState}
                    </div>
                </DndContext>
                {promotionPopup.visible && (
                    <div
                        style={{ position: "absolute", left: promotionPopup.position.x, top: promotionPopup.position.y, zIndex: 20 }}
                        className="rounded h-[188px] w-[51px] shadow-md flex flex-col justify-center items-center p-1 bg-white"
                    >
                        {["queen", "rook", "bishop", "knight"].map((piece) => {
                            console.log(`pieces/${piece}_${promotionPopup.color}.svg`);

                            return (
                                <button
                                    type="button"
                                    key={piece}
                                    onClick={() => handlePromotionChoice(piece as PieceSymbol)}
                                    className="bg-white flex justify-center items-center w-[45px] h-[45px]"
                                >
                                    <div
                                        style={{
                                            width: "80%",
                                            maxWidth: 45,
                                            height: "80%",
                                            maxHeight: 45,

                                            backgroundImage: `url(${`pieces/${piece}_${"w"}.svg`})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
                {/* Ranks and Files Markers */}
                <div className="absolute w-6 lg:w-10 h-full bg-transparent top-0 left-0 flex flex-col justify-start items-center pt-2">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                        <p key={num} className="text-sm font-medium w-2 h-[45px] flex justify-center items-center">
                            {num}
                        </p>
                    ))}
                </div>
                <div className="absolute w-full h-6 lg:h-10 bg-transparent bottom-0 left-0 flex flex-row justify-end items-center pr-2">
                    {["a", "b", "c", "d", "e", "f", "g", "h"].map((num) => (
                        <p key={num} className="text-sm font-medium uppercase w-[45px] h-2 flex justify-center items-center">
                            {num}
                        </p>
                    ))}
                </div>
            </div>
            <Profile capturedPieces={capturedWhitePieces} color="w" name="Challenger" elo="200" />
        </div>
    );
}

export default Board;