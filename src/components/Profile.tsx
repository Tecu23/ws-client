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

    return (
        <div className="w-full h-24 flex justify-between items-center py-4">
            <div className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0 flex-grow-0 flex-auto w-16 h-16 ">
                    <img src={"pieces/rook_b.svg"} alt="computer_profile" />
                </div>
                <div className="flex flex-col items-start justify-start h-16 flex-auto flex-shrink flex-grow py-1">
                    <div className="flex items-center gap-2">
                        <p className="text-base font-semibold text-piece">{name}</p>
                        <p className="text-base font-semibold text-piece">({elo})</p>
                    </div>
                    <div className="flex justify-start items-center">
                        <div style={{ width: pawns.length * 12 }} className="relative bg-blue-100 h-full">
                            {pawns.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 h-8 flex bg-transparent" style={{ left: 10 * idx - 5, top: 0 }}>
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
                        <div style={{ width: knights.length * 14 }} className="relative">
                            {knights.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 h-8 flex" style={{ left: 12 * idx - 5 }}>
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
                        <div style={{ width: bishops.length * 14 }} className="relative">
                            {bishops.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 h-8 flex" style={{ left: 10 * idx - 5 }}>
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
                        <div style={{ width: rooks.length * 17 }} className="relative">
                            {rooks.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 h-8 flex" style={{ left: 10 * idx - 5 }}>
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
                        <div style={{ width: queens.length * 13 }} className="relative">
                            {queens.map((piece, idx) => {
                                return (
                                    <div key={piece + idx} className="absolute w-8 h-8 flex" style={{ left: 10 * idx - 5 }}>
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
