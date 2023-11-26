export interface User {
    userId: number;
    name: string;
    startedSeries: SeriesInUserView[];
    pendingSeries: SeriesInUserView[];
    finishedSeries: SeriesInUserView[];
}

export interface SeriesInUserView {
    name: string;
}

export interface Series {
    seriesId: number;
    name: string;
    synopsis: string;
    creators: Set<string>;
    actors: Set<string>;
    categorie: string;
}

export interface Bill {
    lines: BillLine[];
    cost: number;
    status: string;
    whichMonth: number;
    whichYear: number;
}

export interface BillLine {
    visualizationDate: string;
    seriesName: string;
    seasonNumber: number;
    chapterNumber: number;
    charge: number;
}
