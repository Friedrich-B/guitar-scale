import type { ReactElement } from "react";
import s from './Fret.module.scss'
import { style } from "../helper";


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
    
    const notes = props.notes.map((note: string, index: number) => {
        const className = [
            s.Note,
            props.scale.indexOf(note) >= 0 ? s.Highlighted : '',
        ];

        return <div
            className={style(className)}
            key={`${index}-${note}`}
        >
            {note}
        </div>;
    }).reverse();

    // TODO the strings should be rendered in opposit order

    return <div className={s.Fret}>
        {inlay}
        <div className={s.Notes}>
            {notes}
        </div>
        <div className={s.Wire} />
    </div>;
}