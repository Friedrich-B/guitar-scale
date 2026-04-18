import { useState } from 'react';
import './App.css'
import { Fretboard } from './components/Fretboard';
import { TuningSelector } from './components/TuningSelector';
import { ScaleSelector } from './components/ScaleSelector';


const DEFAULT_TUNING = ['E','A','D','G','B','E'];
const DEFAULT_SCALE: string[] = [];


function App() {
  // TODO: add scale selection, default: no scale selected

  const [tuning, setTuning] = useState(DEFAULT_TUNING);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  return <>
    <ScaleSelector
      scale={scale}
      setScale={setScale}
    />
    <TuningSelector
      tuning={tuning}
      setTuning={setTuning}
    />
    <Fretboard
      tuning={tuning}
      scale={scale}
    />
  </>;
}

export default App
