import { useState, type ReactElement } from "react";
import { getNotesForScale, NOTES, Scales } from "../helpers/NotesHelper";
import s from './ScaleSelector.module.scss';
import { style } from "../helpers/OtherHelpers";


interface Props {
    scale: string[],
    setScale: (newScale: string[]) => void,
}


const DEFAULT_ROOT_NOTE = 'A';


// TODO: project needs some refactoring as 'scale' can refer to the Scale enum
// or to a string[] containing notes
// the uses of Scales enum should be named scaleName or somthing like that
export function ScaleSelector(props: Props): ReactElement {
    const [currentRootNote, setCurrentRootNote] = useState(DEFAULT_ROOT_NOTE);
    const [currentScale, setCurrentScale] = useState<Scales|null>(null);

    const calculateScaleFromRootNote = (rootNote: string): void => {
        if (currentScale == null) {
            return;
        }

        const newScale = getNotesForScale(
            rootNote,
            currentScale,
        );

        props.setScale(newScale);
    };

    // TODO: add option to unselect a scale?
    const renderScales = (): ReactElement[] => {
        return Object.values(Scales).map((scale, index) => {
            const isSelectedScale = scale == currentScale;

            const scaleClasses = style([
                s.Scale,
                isSelectedScale ? s.SelectedScale : '',
            ]);

            const clickHandler = (): void => {
                const newScale = getNotesForScale(
                    currentRootNote,
                    scale,
                );

                setCurrentScale(scale);
                props.setScale(newScale);
            };

            return <div
                className={scaleClasses}
                onClick={clickHandler}
                key={index}
            >
                {scale}
            </div>;
        });
    }

    const renderNotes = (): ReactElement[] => {
        return NOTES.map((note, index) => {
            const isSelectedNote = note == currentRootNote;

            const buttonClasses = style([
                s.Note,
                isSelectedNote ? s.SelectedNote : '',
            ]);

            const clickHandler = (): void => {
                if (isSelectedNote) {
                    return;
                }

                calculateScaleFromRootNote(note);
                setCurrentRootNote(note);
            };

            return <div
                className={buttonClasses}
                onClick={clickHandler}
                key={index}
            >
                {note}
            </div>;
        });
    };

    return <div>
        Wähle einen Grundton:
        <div className={s.NotesContainer}>
            {renderNotes()}
        </div>
        Wähle eine Tonleiter:
        <div className={s.ScalesContainer}>
            {renderScales()}
        </div>
    </div>;
}
