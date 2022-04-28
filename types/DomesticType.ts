import { StatsLiveType, StatType } from "./basic";

interface DomesticUpdateType {
    total: number;
    gu: number;
    city: number;
    cases: number;
    datetime: string;
    src: number;
}

export interface DomesticStatType {
    stats: {
        cases: StatType;
        deaths: StatType;
        recovered: StatType;
        testing: StatType;
    };
    cities: {
        [cityId: number]: {
            cases: StatType;
            deaths: StatType;
            recovered: StatType;
            per100k: StatType;
            distanceLevel: number;
        };
    };
}
export interface DomesticLiveType {
    statsLive: StatsLiveType;
    citiesLive: {
        [cityId: number]: StatType;
    };
    updatesPreview: DomesticUpdateType[]; // only 5 previews
}

export interface DomesticInitType extends DomesticStatType, DomesticLiveType {}

export interface DomesticUpdatesType {
    meta: {
        checking: number;
        total: number;
        yesterday: number;
    };
    data: DomesticUpdateType[];
}

export interface DomesticType extends DomesticInitType {
    updates: DomesticUpdatesType;
}

export interface DomesticRowType {
    cases: StatType;
    casesLive: StatType;
    deaths: StatType;
    recovered: StatType;
    per100k: StatType;
    distanceLevel: StatType;
}
