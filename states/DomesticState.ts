import { atom, selector } from "recoil";
import DomesticType from "@types/DomesticType";

export const DomesticState = atom<DomesticType | null>({
    key: "DomesticState",
    default: null,
});

export const DomesticSelector = selector<DomesticType | null>({
    key: "DomesticSelector",
    get: ({ get }) => {
        return get(DomesticState);
    },
});
