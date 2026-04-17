import './App.css'
import { Fretboard } from './components/Fretboard';

function App() {
  const tuning = ['E','A','D','G','B','E'];
  const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return <>
    <Fretboard
      tuning={tuning}
      scale={scale}
    />
  </>;
}

export default App
