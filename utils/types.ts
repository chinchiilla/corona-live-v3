import { IconType } from "@components/Icon/Icon";

export type CasesType = [number, number];

export interface OverviewType {
    current: CasesType;
    confirmed: CasesType;
}

export interface TimerseriesType {
    today: { [time: number]: CasesType };
    yesterday: { [time: number]: CasesType };
}

export interface AnnouncementType {
    date?: number;
    content: string;
    title: string;
}

export interface CasesSummaryType {
    checking: number;
    totalCases: number;
    yesterdayCases: number;
    todayCases: number;
}

export interface RegionsTimeseriesType {
    today: { [cityId: number]: { [time: number]: CasesType } };
    yesterday: { [cityId: number]: { [time: number]: CasesType } };
}
interface CityGuType {
    [cityId: string]: {
        cases: CasesType;
        gu: { [guId: number]: CasesType };
    };
}

export interface CurrentType extends CityGuType {}
export interface OverallType extends CityGuType {}
export interface StatsType {
    overview: OverviewType;
    current: CurrentType;
    overall: OverallType;
    timeseries: TimerseriesType;
    regionsTimeseries: RegionsTimeseriesType;
    announcements: AnnouncementType[];
    casesSummary: CasesSummaryType;
}
export interface UpdateType {
    src: string;
    gu: string;
    city: string;
    cases: number;
    datetime: string;
}

export interface WorldStatsType {
    [id: string]: {
        deaths: number;
        cases: number;
        casesDelta: number;
        deathsDelta: number;
        gmtCasesDelta: number;
        gmtDeathsDelta: number;
        rates: number;
        tests: number;
    };
}

export interface WorldUpdatesType {}
export interface WorldOverviewType {
    stats: WorldStatsType;
    updates: WorldUpdatesType;
    timeseries: TimerseriesType;
    yesterdayTimeseries: TimerseriesType;
}

export interface ToggleOptionType {
    name: string;
    value: any;
    icon?: IconType;
    visible?: boolean;
}
