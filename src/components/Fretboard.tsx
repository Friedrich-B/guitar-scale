import type { ReactElement } from "react";
import { Fret } from "./Fret";
import s from './Fretboard.module.scss';
import { NOTES } from "../helpers/NotesHelper";
import { safeCopy } from "../helpers/OtherHelpers";


interface Props {
    tuning: string[],
    scale: string[],
}


const FRET_COUNT = 24;


const getNotesForFretboard = (tuning: string[]): string[][] => {
    return tuning.map(rootNote => {
        const notes = safeCopy(NOTES);
        const firstNoteAfterRoot = notes.indexOf(rootNote) + 1;

        const rotatedNotes = [
            ...notes.slice(firstNoteAfterRoot),
            ...notes.splice(0, firstNoteAfterRoot),
        ];

        return rotatedNotes;
    });
};

const createNoteLookupForFrets = (tuning: string[]): string[][] => {
    const calculatedNotes = getNotesForFretboard(tuning);
    const lookup = [];

    for (let noteIndex = 0; noteIndex < NOTES.length; noteIndex++) {
        const notesPerFret = [];

        for (let stringIndex = 0; stringIndex < tuning.length; stringIndex++) {
            notesPerFret.push(calculatedNotes[stringIndex][noteIndex])
        }

        lookup.push(notesPerFret);
    }

    // doubling the lookup has better readability than doing math with the fretIndex
    return [...lookup, ...lookup];
}

const getFretboard = (
    tuning: string[],
    scale: string[],
): ReactElement[] => {
    const frets: ReactElement[] = [];

    const noteLookUp = createNoteLookupForFrets(tuning);

    for (let fretIndex = 0; fretIndex < FRET_COUNT; fretIndex++) {
        frets.push(
            <Fret
                fretNumber={fretIndex + 1}
                notes={noteLookUp[fretIndex]}
                scale={scale}
                key={fretIndex}
            />
        );
    }

    return frets;
};


export function Fretboard(props: Props): ReactElement {
    const frets = getFretboard(props.tuning, props.scale);

    return <div className={s.Fretboard}>
        {...frets}
    </div>;
}
