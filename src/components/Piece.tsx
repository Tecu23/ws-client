import { useDraggable } from "@dnd-kit/core";
import { useChess } from "../utils/context/ChessContext";

type Props = {
    sq: string;
    type: string;
    color: string;
    image: string;
};

const Piece = ({ type, color, sq, image }: Props) => {
    const { chess } = useChess();

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${sq}`,
        data: {
            sq: sq,
            type: type,
            color: color,
        },
    });

    const enableDrag = {
        pointerEvents: chess.turn() === color ? "auto" : "none",
        userSelect: "none",
    };

    // conditional styling
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.25)`,
              zIndex: 10,
              width: "100%",
              height: "100%",
              cursor: "grabbing",
              ...enableDrag,
          }
        : {
              cursor: "grab",
              width: "100%",
              height: "100%",
              zIndex: 5,
              ...enableDrag,
          };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {image && (
                <div
                    style={{
                        width: "100%",
                        maxWidth: 45,
                        height: "100%",
                        maxHeight: 45,

                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}
        </div>
    );
};

export default Piece;
