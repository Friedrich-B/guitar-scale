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
// TODO: FIX: somehow I broke the setTuning functionality as well as the highlighting
export function TuningSelector(props: Props): ReactElement {
    const [selectedString, setSelectedString] = useState<number|null>(null);
    const [selectedNote, setSelectedNote] = useState<string|null>(null);
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

    const renderNoteButtons = (onNoteClicked: (note: string) => void): ReactElement[] => {
        const noteButtons: ReactElement[] = [];

        NOTES.map((note, index) => {
            const isSelected = note == selectedNote;

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

    const changeTuning = (note: string): void => {
        setTuning(note, selectedString!);
        setSelectedString(null)
        setSelectedNote(null);
        closeModal();
    };

    const openModalToAddString = (): void => {
        const content = renderNoteButtons(addString);

        setModalContent(content);
    }

    const openModalToChangeTuning = (note: string, stringIndex: number): void => {
        // TODO: selected note not highlighted anymore
        // TODO: changin tuning not working anymore
        setSelectedNote(note);
        setSelectedString(stringIndex);

        const content = renderNoteButtons(changeTuning);

        setModalContent(content);
    };

    const tunigSelectors = props.tuning.map((rootNote, index) => {
        return <div
            className={s.DisplayedNote}
            key={index}
            onClick={() => openModalToChangeTuning(rootNote, index)}
        >
            {rootNote}
        </div>;
    }).reverse();

    const modalStyle: CSSProperties = modalContent != null
        ? {display: 'flex'}
        : {};

    // TODO: style this component properly
    // modal should shadow layer underneath. when shadow clicked close modal / cancel action
    return <div className={s.Container}>
        <div className={s.SelectorWrapper}>
            <div className={s.Selectors}>
                {...tunigSelectors}
            </div>
            <div className={s.Nut} />
            <div
                className={s.Modal}
                style={modalStyle}
            >
                {modalContent}
            </div>
        </div>
        <div
            className={s.AddStringButton}
            onClick={openModalToAddString}
        >
            +
        </div>
    </div>;
}
