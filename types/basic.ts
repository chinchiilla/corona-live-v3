export type StatType = [number, number];

interface TimeseriesType {
    [hour: number]: number;
}

export interface ChartLiveType {
    today: TimeseriesType;
    yesterday: TimeseriesType;
    weekAgo: TimeseriesType;
    twoWeeksAgo: TimeseriesType;
    monthAgo: TimeseriesType;
}

export interface StatsLiveType {
    today: number;
    yesterday: number;
    weekAgo: number;
    twoWeeksAgo: number;
    monthAgo: number;
}

export interface NotificationType {
    show: boolean;
    data: { [cityId: string]: number };
    cases: number;
}

export interface SocialDistancingType {
    date: string;
    cities: {
        [cityId: string]: {
            level: number;
            from: string;
            to: string;
        };
    };
}
export interface VaccineType {
    stats: {
        first: StatType;
        second: StatType;
    };
    cities: {
        first: {
            [cityId: string]: StatType;
        };
        second: {
            [cityId: string]: StatType;
        };
    };
    timeseries: {
        vaccine: {};
        az: {};
        pfizer: {};
    };
}
