import { NotificationType } from "@types/basic";
import { atom, selector } from "recoil";

export const NotificationState = atom<NotificationType | null>({
    key: "NotificationState",
    default: { show: false, cases: 0, data: {} },
});

export const NotificationSelector = selector({
    key: "NotificationSelector",
    get: ({ get }) => {
        return get(NotificationState);
    },
});
