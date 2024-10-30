import { useDroppable } from "@dnd-kit/core";

type Props = {
    className?: string;
    sq: string;
    piece?: JSX.Element;
    isPossibleMove?: boolean;
};
function Tile({ className, sq, piece, isPossibleMove }: Props) {
    const { setNodeRef } = useDroppable({
        id: `droppable-${sq}`,
        data: {
            sq: sq,
        },
    });

    return (
        <button type="button" ref={setNodeRef} className={` ${className} cursor-grabbing flex justify-center items-center`}>
            {isPossibleMove && <div className="absolute w-4 h-4 rounded-full bg-active-light" />}
            {piece}
        </button>
    );
}

export default Tile;
