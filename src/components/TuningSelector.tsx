import type { ReactElement } from "react";
// import { NOTES, safeCopy } from "../helper";
import s from './TuningSelector.module.scss';
import { safeCopy } from "../helper";


interface Props {
    tuning: string[],
    setTuning: (tuning: string[]) => void,
}


export function TuningSelector(props: Props): ReactElement {
    const openSelectorModal = () => void {
        // TODO: the selector should be a custom modal
        // modal needs index to change the correct value
        // modal gets setter passed
    };

    // TODO now it would be nice to have NOTES as some kind of type
    const setTuning = (newNote: string, stringIndex: number): void => {
        const newTuning = safeCopy(props.tuning);
        newTuning[stringIndex] = newNote;

        props.setTuning(newTuning);
    };

    const tunigSelectors = props.tuning.map((rootNote, index) => {
        return <div
            className={s.DisplayedNote}
            key={index}
        >
            {rootNote}
        </div>;
    });

    return <div className={s.SelectorWrapper}>
        <div className={s.Selectors}>
            {...tunigSelectors}
        </div>
        <div className={s.Nut} />
    </div>;
}
