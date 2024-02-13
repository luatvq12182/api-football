export interface Match {
    area: Area;
    competition: Competition;
    season: Season;
    id: number;
    utcDate: string;
    status: Status;
    minute: number;
    injuryTime: number;
    attendance: number;
    venue: string;
    matchday: number;
    stage: Stage;
    group: Group;
    lastUpdated: string;
    homeTeam: HomeTeam;
    awayTeam: AwayTeam;
    score: Score;
    goals: Goal[];
    penalties: Penalty[];
    bookings: Booking[];
    substitutions: Substitution[];
    odds: Odds;
    referees: Referee[];
}

export enum Status {
    SCHEDULED = 'SCHEDULED',
    TIMED = 'TIMED',
    IN_PLAY = 'IN_PLAY',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED',
    SUSPENDED = 'SUSPENDED',
    POSTPONED = 'POSTPONED',
    CANCELLED = 'CANCELLED',
    AWARDED = 'AWARDED',
}

export enum Stage {
    FINAL = 'FINAL',
    THIRD_PLACE = 'THIRD_PLACE',
    SEMI_FINALS = 'SEMI_FINALS',
    QUARTER_FINALS = 'QUARTER_FINALS',
    LAST_16 = 'LAST_16',
    LAST_32 = 'LAST_32',
    LAST_64 = 'LAST_64',
    ROUND_4 = 'ROUND_4',
    ROUND_3 = 'ROUND_3',
    ROUND_2 = 'ROUND_2',
    ROUND_1 = 'ROUND_1',
    GROUP_STAGE = 'GROUP_STAGE',
    PRELIMINARY_ROUND = 'PRELIMINARY_ROUND',
    QUALIFICATION = 'QUALIFICATION',
    QUALIFICATION_ROUND_1 = 'QUALIFICATION_ROUND_1',
    QUALIFICATION_ROUND_2 = 'QUALIFICATION_ROUND_2',
    QUALIFICATION_ROUND_3 = 'QUALIFICATION_ROUND_3',
    PLAYOFF_ROUND_1 = 'PLAYOFF_ROUND_1',
    PLAYOFF_ROUND_2 = 'PLAYOFF_ROUND_2',
    PLAYOFFS = 'PLAYOFFS',
    REGULAR_SEASON = 'REGULAR_SEASON',
    CLAUSURA = 'CLAUSURA',
    APERTURA = 'APERTURA',
    CHAMPIONSHIP_ROUND = 'CHAMPIONSHIP_ROUND',
    RELEGATION_ROUND = 'RELEGATION_ROUND',
}

export enum Group {
    GROUP_A = 'GROUP_A',
    GROUP_B = 'GROUP_B',
    GROUP_C = 'GROUP_C',
    GROUP_D = 'GROUP_D',
    GROUP_E = 'GROUP_E',
    GROUP_F = 'GROUP_F',
    GROUP_G = 'GROUP_G',
    GROUP_H = 'GROUP_H',
    GROUP_I = 'GROUP_I',
    GROUP_J = 'GROUP_J',
    GROUP_K = 'GROUP_K',
    GROUP_L = 'GROUP_L',
}

interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: any;
    stages: string[];
}

export interface HomeTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: Coach;
    leagueRank: any;
    formation: string;
    lineup: Lineup[];
    bench: Bench[];
    statistics: Statistics;
}

export interface Coach {
    id: number;
    name: string;
    nationality: string;
}

export interface Lineup {
    id: number;
    name: string;
    position: string;
    shirtNumber: number;
}

export interface Bench {
    id: number;
    name: string;
    position: string;
    shirtNumber: number;
}

export interface Statistics {
    corner_kicks: number;
    free_kicks: number;
    goal_kicks: number;
    offsides: number;
    fouls: number;
    ball_possession: number;
    saves: number;
    throw_ins: number;
    shots: number;
    shots_on_goal: number;
    shots_off_goal: number;
    yellow_cards: number;
    yellow_red_cards: number;
    red_cards: number;
}

export interface AwayTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: Coach2;
    leagueRank: any;
    formation: string;
    lineup: Lineup2[];
    bench: Bench2[];
    statistics: Statistics2;
}

export interface Coach2 {
    id: number;
    name: string;
    nationality: string;
}

export interface Lineup2 {
    id: number;
    name: string;
    position?: string;
    shirtNumber: number;
}

export interface Bench2 {
    id: number;
    name: string;
    position?: string;
    shirtNumber: number;
}

export interface Statistics2 {
    corner_kicks: number;
    free_kicks: number;
    goal_kicks: number;
    offsides: number;
    fouls: number;
    ball_possession: number;
    saves: number;
    throw_ins: number;
    shots: number;
    shots_on_goal: number;
    shots_off_goal: number;
    yellow_cards: number;
    yellow_red_cards: number;
    red_cards: number;
}

export interface Score {
    winner: string;
    duration: string;
    fullTime: FullTime;
    halfTime: HalfTime;
}

export interface FullTime {
    home: number;
    away: number;
}

export interface HalfTime {
    home: number;
    away: number;
}

export interface Goal {
    minute: number;
    injuryTime: any;
    type: string;
    team: Team;
    scorer: Scorer;
    assist?: Assist;
    score: Score2;
}

export interface Team {
    id: number;
    name: string;
}

export interface Scorer {
    id: number;
    name: string;
}

export interface Assist {
    id: number;
    name: string;
}

export interface Score2 {
    home: number;
    away: number;
}

export interface Penalty {
    player: Player;
    team: Team2;
    scored: boolean;
}

export interface Player {
    id: number;
    name: string;
}

export interface Team2 {
    id: any;
    name: any;
}

export interface Booking {
    minute: number;
    team: Team3;
    player: Player2;
    card: string;
}

export interface Team3 {
    id: number;
    name: string;
}

export interface Player2 {
    id: number;
    name: string;
}

export interface Substitution {
    minute: number;
    team: Team4;
    playerOut: PlayerOut;
    playerIn: PlayerIn;
}

export interface Team4 {
    id: number;
    name: string;
}

export interface PlayerOut {
    id: number;
    name: string;
}

export interface PlayerIn {
    id: number;
    name: string;
}

export interface Odds {
    homeWin: number;
    draw: number;
    awayWin: number;
}

export interface Referee {
    id: number;
    name: string;
    type: string;
    nationality?: string;
}
