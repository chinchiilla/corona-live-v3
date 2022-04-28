import { SocialDistancingType } from "@types/basic";
import { atom, selector } from "recoil";

export const SocialDistancingState = atom<SocialDistancingType | null>({
    key: "SocialDistancingState",
    default: null,
});

export const SocialDistancingSelector = selector({
    key: "SocialDistancingSelector",
    get: ({ get }) => {
        return get(SocialDistancingState);
    },
});
