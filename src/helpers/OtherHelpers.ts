export function style(classes: string[]): string {
    return classes.join(' ');
}

export function safeCopy<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value),
    );
}
