import PropTypes from "prop-types";
import { pc2Text } from "../utils/config/globalConfig.js";
import { Ranks, Files } from "../utils/constants/board.js";
import Tile from "./Tile";
import { Chess } from "chess.js";

type Position = {
    square: string;
    type: string;
    color: string;
};

function Board({ name: string }) {
    const board: Array<JSX.Element> = [];

    const chess = new Chess();
    const b = chess.board();

    console.log(b);

    for (let r = 0; r < b.length; r++) {
        for (let f = 0; f < b[0].length; f++) {
            const sq: Position | null = b[r][f];

            if (sq == null) {
                console.log(Ranks[7 - r] + Files[f], Files[f].toLowerCase());
                board.push(
                    <Tile
                        key={Ranks[7 - r] + Files[f].toLowerCase()}
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

    return (
        <div className="bg-gray-500/60 w-full h-full flex justify-center items-center border rounded-lg">
            <div className="w-[360px] h-[360px] bg-gray-600 grid grid-cols-8 grid-rows-8">
                {board}
            </div>
        </div>
    );
}

Board.propTypes = {
    name: PropTypes.string,
};

export default Board;
