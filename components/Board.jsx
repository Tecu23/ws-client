import PropTypes from "prop-types";
import { Files, Ranks } from "../utils/constants/board";

function Board({ name }) {
	return (
		<div className="bg-blue-100 w-full h-full flex justify-center items-center border border-blue-100 rounded-lg">
			<div className="w-[360px] h-[360px] bg-blue-200 flex flex-col justify-start items-start">
				{Ranks.map((r, ri) => {
					return (
						<div key={r} className="flex flex-row justify-start items-start">
							{Files.map((f, fi) => {
								return (
									<div
										key={`${f}${r}`}
										className={`w-[45px] h-[45px] ${
											(ri + fi) % 2 == 0 ? "bg-black" : "bg-white"
										}`}
									></div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

Board.propTypes = {
	name: PropTypes.string,
};

export default Board;
