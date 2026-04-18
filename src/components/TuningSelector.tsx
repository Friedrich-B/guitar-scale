import { useState, type CSSProperties, type ReactElement } from "react";
import s from './TuningSelector.module.scss';
import { safeCopy, style } from "../helpers/OtherHelpers";
import { NOTES } from "../helpers/NotesHelper";


interface Props {
    tuning: string[],
    setTuning: (tuning: string[]) => void,
}


export function TuningSelector(props: Props): ReactElement {
    const [selectedString, setSelectedString] = useState<number|null>(null);
    const [selectedNote, setSelectedNote] = useState<string|null>(null);
    
    const modalStyle: CSSProperties = selectedNote
        ? {display: 'flex'}
        : {};

    const openModal = (
        note: string,
        stringIndex: number,
    ): void => {
        setSelectedString(stringIndex);
        setSelectedNote(note);
        // the modal should have a custom selector
        // all notes displayed as square buttons, selected highlighted
        // click on new note selects it and closes modal
        // maybe at some point add tuning patterns like drop, open and standard
    };

    const closeModal = (): void => {
        setSelectedNote(null);
        setSelectedString(null);
    };

    const setTuning = (
        newNote: string,
        stringIndex: number,
    ): void => {
        const newTuning = safeCopy(props.tuning);
        newTuning[stringIndex] = newNote;

        closeModal();
        props.setTuning(newTuning);
    };

    const tunigSelectors = props.tuning.map((rootNote, index) => {
        return <div
            className={s.DisplayedNote}
            key={index}
            onClick={() => openModal(rootNote, index)}
        >
            {rootNote}
        </div>;
    }).reverse();

    const renderModalNotes = (): ReactElement[] => {
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

                setTuning(note, selectedString!);
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

    return <div className={s.SelectorWrapper}>
        <div className={s.Selectors}>
            {...tunigSelectors}
        </div>
        <div className={s.Nut} />
        <div
            className={s.SelectorModal}
            style={modalStyle}
        >
            {renderModalNotes()}
        </div>
    </div>;
}
