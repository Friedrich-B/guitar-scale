import type { ReactElement } from "react";
import { Fret } from "./Fret";
import s from './Fretboard.module.scss';


const FRET_COUNT = 24;

const getDefaultFretboard = (): ReactElement[] => {
    const frets = [] as Fret[];

    for (let i = 0; i < FRET_COUNT; i++) {
        frets.push(<Fret/>);
    }

    return frets;
};

export function Fretboard(): ReactElement {
    const frets = getDefaultFretboard();

    return <div className={s.Fretboard}>
        {...frets}
    </div>;
}
