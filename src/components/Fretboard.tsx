import type { ReactElement } from "react";
import { Fret } from "./Fret";
import s from './Fretboard.module.scss';
import { NOTES } from "../helper";


interface Props {
    tuning: string[], // as usual goes from lowest to highest string
    scale: string[],
}


// const FRET_COUNT = 24;
const FRET_COUNT = 12; // only for testing, remove


const getNotesForFretboard = (tuning: string[]): string[][] => {
    return tuning.map(rootNote => {
        const notes = JSON.parse(JSON.stringify(NOTES));
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

/*
to be able to highlight the right frets I need the tuning and the scale
tuning e.g. ['E','A','D','G','B','E']
scale e.g. ['A', 'C#', 'G', ...]

the tuning information is needed to set the correct note pre string and fret
the scale will be used as lookup for highlighting
*/