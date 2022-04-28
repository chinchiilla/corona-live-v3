import { atom, selector } from "recoil";
import WolrdType from "@types/WolrdType";

export const WorldState = atom<WolrdType | null>({
    key: "WorldState",
    default: null,
});

export const WorldSelector = selector({
    key: "WorldSelector",
    get: ({ get }) => {
        return get(WorldState);
    },
});
