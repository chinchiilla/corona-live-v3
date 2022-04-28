export type CasesType = [number, number];

export interface TimerseriesType {
    today: { [time: number]: CasesType };
    yesterday: { [time: number]: CasesType };
}
export interface ToggleOptionType {
    name: string;
    value: any;
    icon?: any;
    visible?: boolean;
}
