import { useState } from 'react';
import { Fretboard } from './components/Fretboard';
import { TuningSelector } from './components/TuningSelector';
import { ScaleSelector } from './components/ScaleSelector';
import s from './App.module.scss';


const DEFAULT_TUNING = ['E','A','D','G','B','E'];

const DEFAULT_SCALE: string[] = [];


function App() {
  const [tuning, setTuning] = useState(DEFAULT_TUNING);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  return <>
    <h1>Guitar Scales</h1>
    <ScaleSelector
      scale={scale}
      setScale={setScale}
    />
    <div className={s.GuitarContainer}>
      <TuningSelector
        tuning={tuning}
        setTuning={setTuning}
      />
      <div className={s.FretBoard}>
        <Fretboard
          tuning={tuning}
          scale={scale}
        />
      </div>
    </div>
  </>;
}

export default App
