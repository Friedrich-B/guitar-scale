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
    // could be optimized for the case multiple strings are tuned to the same note

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

const getFretboard = (
    tuning: string[],
    scale: string[],
): ReactElement[] => {
    const frets: ReactElement[] = [];

    const notesByString = getNotesForFretboard(tuning);
    console.log(notesByString);
    // todo now make lookup for single fret

    for (let i = 1; i <= FRET_COUNT; i++) {
        frets.push(
            <Fret
                fretNumber={i}
                notes={[]} // todo
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