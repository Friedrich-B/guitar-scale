// TODO: enum?
export const NOTES = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
];

enum Scales {
    Major = 'Dur', // auch: Ionisch
    NaturalMinor = 'Moll', // auch natürlich/Äolisch
    Dorian = 'Dorisch',
    Phrygian = 'Phrygisch',
    Lydian ='Lydisch',
    Mixolydian = 'Mixolydisch',
    Locrian = 'Lokrisch',
    HarmonicMinor = 'Harmonisch Moll',
    MelodicMinor = 'Melodisch Moll', // auch: aufwärts
    MajorPentatonic = 'Dur-Pentatonik',
    MinorPentatonic = 'Moll-Pentatonik',
    BluesMinor = 'Blues-Moll',
}

// maps scales to intervals in half-note-steps
const SCALE_INTERVALS: Record<Scales, number[]> = {
    [Scales.Major]: [0,2,4,5,7,9,11],
    [Scales.NaturalMinor]: [0,2,3,5,7,8,10],
    [Scales.Dorian]: [0,2,3,5,7,9,10],
    [Scales.Phrygian]: [0,1,3,5,7,8,10],
    [Scales.Lydian]: [0,2,4,6,7,9,11],
    [Scales.Mixolydian]: [0,2,4,5,7,9,10],
    [Scales.Locrian]: [0,1,3,5,6,8,10],
    [Scales.HarmonicMinor]: [0,2,3,5,7,8,11],
    [Scales.MelodicMinor]: [0,2,3,5,7,9,11],
    [Scales.MajorPentatonic]: [0,2,4,7,9],
    [Scales.MinorPentatonic]: [0,3,5,7,10],
    [Scales.BluesMinor]: [0,3,5,6,7,10],
};


const getNotesForPatternAndRoot = (
    rootNote: string,
    scale: Scales,
): string[] => {
    //todo

    return [];
}