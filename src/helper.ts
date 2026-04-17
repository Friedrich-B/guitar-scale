export function style(classes: string[]): string {
    return classes.join(' ');
}

export function safeCopy<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value),
    );
}

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
