import type { ReactElement } from "react";
import { getNotesForScale, Scales } from "../helpers/NotesHelper";


interface Props {
    scale: string[],
    setScale: (newScale: string[]) => void,
}


const DEBUG_ROOT_NOTE = 'A'; // TODO: make selectable


export function ScaleSelector(props: Props): ReactElement {
    const renderScaleButtons = (): ReactElement[] => {
        return Object.values(Scales).map((scale, index) => {
            const clickHandler = (): void => {
                const newScale = getNotesForScale(
                    DEBUG_ROOT_NOTE,
                    scale,
                );

                props.setScale(newScale);
            };

            return <div
                className=""
                onClick={clickHandler}
                key={index}
            >
                {scale}
            </div>;
        });
    }

    return <div>
        {renderScaleButtons()}
    </div>;
}
