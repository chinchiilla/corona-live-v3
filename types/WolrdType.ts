import { StatType } from "./basic";

interface WorldUpdateType {
    src: number;
    country: number;
    datetime: string;
    cases: number;
}

export interface WorldStatType {
    stats: {
        cases: StatType;
        deaths: StatType;
        recovered: StatType;
    };
    countries: {
        [cityId: number]: {
            cases: StatType;
            deaths: StatType;
            recovered: StatType;
            per100k: StatType;
            distanceLevel: number;
        };
    };
    updatesPreview: WorldUpdateType[]; // only 5 previews
}

export interface WorldInitType extends WorldStatType {}

export interface WorldType extends WorldInitType {
    updates: WorldUpdateType[];
}
