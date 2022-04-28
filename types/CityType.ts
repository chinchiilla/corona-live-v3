import { StatsLiveType, StatType } from "./basic";

interface CityUpdateType {
    total: number;
    gu: number;
    city: number;
    cases: number;
    datetime: string;
    src: number;
}

export interface CityStatType {
    stats: {
        cases: StatType;
        deaths: StatType;
        recovered: StatType;
        per100k: StatType;
    };
    gus: {
        [guId: number]: {
            cases: StatType;
            per100k: StatType;
        };
    };
}

export interface CityLiveType {
    statsLive: StatsLiveType;
    gusLive: {
        [guId: number]: StatType;
    };
    updatesPreview: CityUpdateType[]; // only 5 previews
}

export interface CityInitType extends CityStatType, CityLiveType {}

export interface CityUpdatesType {
    meta: {
        checking: number;
        total: number;
        yesterday: number;
    };
    data: CityUpdateType[];
}

export interface CityType extends CityInitType {
    updates: CityUpdatesType;
}
