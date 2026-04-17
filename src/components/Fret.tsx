import type { ReactElement } from "react";
import s from './Fret.module.scss'


interface Props {
    fretNumber: number,
    notes: string[],
    scale: string[],
}


const FRETS_WITH_INLAY = [
    3,
    5,
    7,
    9,
    12,
    15,
    17,
    19,
    21,
    24,
];


export function Fret(props: Props): ReactElement {
    const hasInlay = FRETS_WITH_INLAY.indexOf(props.fretNumber) >= 0;
    const inlay = hasInlay ? <div className={s.Inlay} /> : null;

    return <div className={s.Fret}>
        {inlay}
        <div className={s.Wire} />
    </div>;
}