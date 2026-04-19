import { useState, type CSSProperties, type ReactElement } from "react";
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
    const [showModal, setShowModal] = useState(false);
    const [currentScale, setCurrentScale] = useState<Scales|null>(null);

    const modalStyle: CSSProperties = showModal ? {display: 'flex'} : {};

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
    const renderScaleButtons = (): ReactElement[] => {
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

    const openModal = (): void => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    // TODO: workflow for user would be easier if root note would not
    //  rely on a modal. instead simply render all options similar to
    //  how the scales are shown
    // TODO: maybe extract modal as single component since used twice
    const renderModalContent = (): ReactElement[] => {
        return NOTES.map((note, index) => {
            const isSelectedNote = note == currentRootNote;

            const buttonClasses = style([
                s.NoteButton,
                isSelectedNote ? s.SelectedNote : '',
            ]);

            const clickHandler = (): void => {
                if (isSelectedNote) {
                    closeModal();
                }

                calculateScaleFromRootNote(note);
                setCurrentRootNote(note);
                closeModal();
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
        <div onClick={openModal}>
            {currentRootNote}
        </div>
        <div className={s.ScalesContainer}>
            {renderScaleButtons()}
        </div>
        <div
            className={s.SelectorModal}
            style={modalStyle}
        >
            {renderModalContent()}
        </div>
    </div>;
}
