import { IconType } from "@components/Icon/Icon";

export interface ToggleOptionType {
    name: string;
    value: any;
    icon?: IconType;
    visible?: boolean;
}

export interface UpdateType {
    src: string;
    gu: string;
    city: string;
    cases: number;
    datetime: string;
}
