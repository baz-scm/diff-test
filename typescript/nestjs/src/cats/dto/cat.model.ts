export enum CatColor {
    BLACK = "black",
    WHITE = "white",
    GRAY = "gray",
}

export function isNeutralColor(color: CatColor): boolean {
    return color === CatColor.WHITE || color === CatColor.GRAY;
}

export function parseCatColor(value: string): CatColor {
    const match = Object.values(CatColor).find((color) => color === value);
    if (!match) {
        throw new Error(`Unknown cat color: ${value}`);
    }
    return match;
}
