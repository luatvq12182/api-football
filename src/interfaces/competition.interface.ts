export interface Competition {
    area: Area;
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
    currentSeason: CurrentSeason;
    seasons: Season[];
    lastUpdated: string;
}

interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface CurrentSeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: any;
    stages: string[];
}

export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday?: number;
    winner?: Winner;
    stages: string[];
}

export interface Winner {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: string;
}
