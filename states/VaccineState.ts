import { VaccineType } from "@types/basic";
import { atom, selector } from "recoil";

export const VaccineState = atom<VaccineType | null>({
    key: "VaccineState",
    default: null,
});

export const VaccineSelector = selector({
    key: "VaccineSelector",
    get: ({ get }) => {
        return get(VaccineState);
    },
});
