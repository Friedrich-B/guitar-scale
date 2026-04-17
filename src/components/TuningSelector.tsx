import { useState, type CSSProperties, type ReactElement } from "react";
import s from './TuningSelector.module.scss';
import { safeCopy } from "../helper";


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

    const openSelectorModal = (
        note: string,
        stringIndex: number,
    ): void => {
        setSelectedString(stringIndex);
        setSelectedNote(note);
        // the modal should have a custom selector
        // all notes displayed as square buttons, selected highlighted
        // click on new note selects it and closes modal
    };

    // TODO now it would be nice to have NOTES as some kind of type
    const setTuning = (
        newNote: string,
        stringIndex: number,
    ): void => {
        const newTuning = safeCopy(props.tuning);
        newTuning[stringIndex] = newNote;

        setSelectedNote(null);
        setSelectedString(null);
        props.setTuning(newTuning);
    };

    const tunigSelectors = props.tuning.map((rootNote, index) => {
        return <div
            className={s.DisplayedNote}
            key={index}
            onClick={() => openSelectorModal(rootNote, index)}
        >
            {rootNote}
        </div>;
    }).reverse();

    return <div className={s.SelectorWrapper}>
        <div className={s.Selectors}>
            {...tunigSelectors}
        </div>
        <div className={s.Nut} />
        <div
            className={s.SelectorModal}
            style={modalStyle}
        >
            {/* render note buttons */}
            note: {selectedNote} string: {selectedString}
        </div>
    </div>;
}
