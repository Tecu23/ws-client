import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Piece } from "chess.js";

type Props = {
    number: number;
    className?: string;
    image?: string;
    sq: string;
    piece?: Piece;
};
function Tile({ number, image, className, sq, piece }: Props) {
    const { setNodeRef: buttonRef } = useDroppable({
        id: `droppable-${sq}`,
        data: {
            sq: sq,
        },
    });

    const {
        attributes,
        listeners,
        setNodeRef: imageRef,
        transform,
    } = useDraggable({
        id: `draggable-${piece?.type}-${piece?.color}-${sq}`,
        data: {
            sq: sq,
            type: piece?.type,
            color: piece?.color,
        },
    });

    return (
        <button
            type="button"
            ref={buttonRef}
            className={`${
                (number & 1) === 0 ? "bg-[#779556]" : "bg-[#ebecd0]"
            } ${className}  cursor-grabbing`}
        >
            {image && (
                <div
                    ref={imageRef}
                    {...attributes}
                    {...listeners}
                    style={{
                        transform: CSS.Translate.toString(transform),
                        width: "100%",
                        maxWidth: 45,
                        height: "100%",
                        maxHeight: 45,

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
