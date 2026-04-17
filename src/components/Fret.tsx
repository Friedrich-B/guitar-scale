import type { ReactElement } from "react";
import s from './Fret.module.scss'


export function Fret(): ReactElement {

    return <div className={s.Fret}>
        <div className={s.Wire} />
    </div>;
}