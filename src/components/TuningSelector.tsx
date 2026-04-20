import { useState, type CSSProperties, type ReactElement } from "react";
import s from './TuningSelector.module.scss';
import { safeCopy, style } from "../helpers/OtherHelpers";
import { NOTES } from "../helpers/NotesHelper";


interface Props {
    tuning: string[],
    setTuning: (tuning: string[]) => void,
}


// TODO: tuner highlighted when part of scale
// TODO: style needs to adapt to string count (same for fret component)
export function TuningSelector(props: Props): ReactElement {
    const [modalContent, setModalContent] = useState<ReactElement[]|null>(null);

    const closeModal = (): void => {
        setModalContent(null);
    };

    const setTuning = (
        newNote: string,
        stringIndex: number,
    ): void => {
        const newTuning = safeCopy(props.tuning);
        newTuning[stringIndex] = newNote;

        props.setTuning(newTuning);
    };

    const renderNoteButtons = (
        onNoteClicked: (note: string) => void,
        noteToHighlight: string|null,
    ): ReactElement[] => {
        const noteButtons: ReactElement[] = [];

        NOTES.map((note, index) => {
            const isSelected = noteToHighlight === note;

            const buttonClasses = [
                s.NoteButton,
                isSelected ? s.SelectedNote : '',
            ];

            const clickHandler = () => {
                if (isSelected) {
                    closeModal();
                }

                onNoteClicked(note);
            }

            noteButtons.push(
                <div
                    className={style(buttonClasses)}
                    key={index}
                    onClick={clickHandler}
                >
                    {note}
                </div>
            );
        });

        return noteButtons;
    };

    const addString = (note: string): void => {
        props.setTuning([
            note,
            ...props.tuning,
        ]);

        closeModal();
    };

    const openModalToAddString = (): void => {
        const content = renderNoteButtons(addString, null);

        setModalContent(content);
    }

    const openModalToChangeTuning = (note: string, stringIndex: number): void => {
        const handler = (note: string): void => {
            setTuning(
                note,
                stringIndex,
            );

            closeModal();
        };

        const content = renderNoteButtons(handler, note);

        setModalContent(content);
    };

    const tunigSelectors = props.tuning.map((rootNote, index) => {
        return <div
            className={s.SelectorRow}
            key={index}
        >
            <div
                className={s.DisplayedNote}
                onClick={() => openModalToChangeTuning(rootNote, index)}
            >
                {rootNote}
            </div>
            <div className={s.Nut} />
        </div>;
    }).reverse();

    const modalStyle: CSSProperties = modalContent != null
        ? {display: 'flex'}
        : {};

    // TODO: style this component properly
    // modal should have shadow layer underneath. when shadow clicked close modal / cancel action
    return <div className={s.Container}>
        <div className={s.Label}>
            Stimmung
        </div>
        <div className={s.SelectorWrapper}>
            <div className={s.Selectors}>
                {...tunigSelectors}
            </div>
            <div className={s.Nut} />
        </div>
        <div
            className={s.AddStringButton}
            onClick={openModalToAddString}
        >
            +
        </div>
        <div
                className={s.Modal}
                style={modalStyle}
            >
                {modalContent}
            </div>
    </div>;
}
