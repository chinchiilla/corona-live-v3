import { atom, selector } from "recoil";

export const AnnouncementState = atom<any>({
    key: "AnnouncementState",
    default: null,
});

export const AnnouncementSelector = selector({
    key: "AnnouncementSelector",
    get: ({ get }) => {
        return get(AnnouncementState);
    },
});
