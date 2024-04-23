type Props = {
    number: number;
    image?: string;
};
function Tile({ number, image }: Props) {
    return (
        <button
            type="button"
            className={`${
                (number & 1) === 0 ? "bg-[#779556]" : "bg-[#ebecd0]"
            }`}
        >
            {image && <img width={40} height={40} src={image} alt="piece" />}
        </button>
    );
}

export default Tile;
