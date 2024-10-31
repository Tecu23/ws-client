import { useWindowSize } from "../utils/hooks/useWindowSize";

type Props = {
    capturedPieces: string[];
    color: "w" | "b";
    name: string;
    elo: string;
};
const Profile = ({ capturedPieces, color, name, elo }: Props) => {
    const pawns = capturedPieces.filter((p) => p.toLowerCase() === "p");
    const bishops = capturedPieces.filter((p) => p.toLowerCase() === "b");
    const rooks = capturedPieces.filter((p) => p.toLowerCase() === "r");
    const queens = capturedPieces.filter((p) => p.toLowerCase() === "q");
    const knights = capturedPieces.filter((p) => p.toLowerCase() === "q");

    const [width, _] = useWindowSize();

    return (
        <div className="w-full h-24 lg:h-32 flex justify-between items-center py-4">
            <div className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0 flex-grow-0 flex-auto w-16 h-16 lg:w-24 lg:h-24">
                    <img src={"pieces/rook_b.svg"} alt="computer_profile" className="w-full h-full" />
                </div>
                <div className="flex flex-col items-start justify-start gap-2 h-16 lg:h-24 py-1">
                    <div className="flex items-center gap-2">
                        <p className="text-base lg:text-2xl font-semibold text-piece">{name}</p>
                        <p className="text-base lg:text-2xl font-semibold text-piece">({elo})</p>
                    </div>
                    <div className="flex justify-start items-center relative">
                        <div style={{ minWidth: pawns.length > 0 ? (width < 1024 ? 30 : 50) : 0, width: pawns.length * (width < 1024 ? 16 : 24) }} className="relative h-full">
                            {pawns.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 lg:w-12 h-8 lg:h-12 flex" style={{ left: (width < 1024 ? 10 : 14) * idx - 5, top: 0 }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/pawn_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ minWidth: knights.length > 0 ? (width < 1024 ? 30 : 50) : 0, width: knights.length * (width < 1024 ? 14 : 26) }} className="relative">
                            {knights.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 lg:w-12 h-8 lg:h-12 flex" style={{ left: (width < 1024 ? 12 : 16) * idx - 5 }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/knight_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ minWidth: bishops.length > 0 ? (width < 1024 ? 30 : 50) : 0, width: bishops.length * (width < 1024 ? 14 : 26) }} className="relative">
                            {bishops.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 lg:w-12 h-8 lg:h-12 flex" style={{ left: (width < 1024 ? 10 : 16) * idx - 5 }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/bishop_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ minWidth: rooks.length > 0 ? (width < 1024 ? 30 : 50) : 0, width: rooks.length * (width < 1024 ? 17 : 26) }} className="relative">
                            {rooks.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 lg:w-12 h-8 lg:h-12 flex" style={{ left: (width < 1024 ? 10 : 16) * idx - 5 }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/rook_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative">
                            {queens.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 lg:w-12 h-8 lg:h-12 flex" style={{ left: (width < 1024 ? 10 : 18) * idx - 5 }}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",

                                                backgroundImage: `url(${`pieces/queen_${color}.svg`})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
