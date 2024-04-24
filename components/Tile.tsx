type Props = {
    number: number;
    className?: string;
    image?: string;
};
function Tile({ number, image, className }: Props) {
    return (
        <button
            type="button"
            className={`${
                (number & 1) === 0 ? "bg-[#779556]" : "bg-[#ebecd0]"
            } ${className}  cursor-grabbing`}
        >
            {image && (
                <div
                    style={{
                        width: "100%",
                        maxWidth: 45,
                        height: "100%",
                        maxHeight: 45,

                        // background: "#ffffff00",
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    className={className}
                />
            )}
        </button>
    );
}

export default Tile;
