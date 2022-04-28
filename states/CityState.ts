import CityType from "@types/CityType";
import { atom, selector } from "recoil";

export const CityState = atom<CityType | null>({
    key: "CityState",
    default: null,
});

export const CitySelector = selector({
    key: "CitySelector",
    get: ({ get }) => {
        return get(CityState);
    },
});
