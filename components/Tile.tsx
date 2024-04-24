import { useDroppable } from "@dnd-kit/core";

type Props = {
    number: number;
    className?: string;
    sq: string;
    piece?: JSX.Element;
};
function Tile({ number, className, sq, piece }: Props) {
    const { setNodeRef } = useDroppable({
        id: `droppable-${sq}`,
        data: {
            sq: sq,
        },
    });

    return (
        <button
            type="button"
            ref={setNodeRef}
            className={`${
                (number & 1) === 0 ? "bg-[#779556]" : "bg-[#ebecd0]"
            } ${className}  cursor-grabbing`}
        >
            {piece}
        </button>
    );
}

export default Tile;
