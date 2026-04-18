import { useState } from 'react';
import './App.css'
import { Fretboard } from './components/Fretboard';
import { TuningSelector } from './components/TuningSelector';


function App() {
  // todo tuning and scale need to be set by user

  const [tuning, setTuning] = useState(['E','A','D','G','B','E']);
  // const tuning = ['E','A','D','G','B','E'];
  const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return <>
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
