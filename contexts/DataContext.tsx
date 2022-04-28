import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SECOND } from "@utils/consts";
import { fetcher } from "@utils/helper";
import useSWR from "swr";
import { DATA_API, fetchApi } from "@utils/api";
import { useRecoilState } from "recoil";
import { DomesticState } from "@states/DomesticState";
import { WorldState } from "@states/WorldState";
import { CityState } from "@states/CityState";
import { DataState } from "@states/DataState";
import { NotificationState } from "@states/NotificationState";
import { VaccineState } from "@states/VaccineState";
import { SocialDistancingState } from "@states/SocialDistancingState";
import { AnnouncementState } from "@states/AnnouncementState";

export interface DataContextType {}

const PATH = {
    DOMESTIC: "/",
    V1: "/v1/domestic",
    DOMESTIC_UPDATES: "/live",
    WORLD: "/world",
    WORLD_UPDATES: "/world/live",
    CITY: "/city/[cityId]",
    CITY_UPDATES: "/city/updates/[cityId]",
    GU_UPDATES: "/city/updates/[cityId]/[guId]",
    VACCINE: "/vaccine",
    SOCIAL_DISTANCING: "/social-distancing",
};

const T = {
    DOMESTIC_STAT: "DOMESTIC_STAT",
    DOMESTIC_LIVE: "DOMESTIC_LIVE",
    DOMESTIC_UPDATES: "DOMESTIC_UPDATES",
    WORLD_LIVE: "WORLD_LIVE",
};

type LAST_UPDATED_TYPE = "DOMESTIC_STAT" | "DOMESTIC_LIVE" | "WORLD_LIVE" | "ANNOUNCEMENT" | "REFRESH";

const API_ON_PATH = {
    [PATH.DOMESTIC]: DATA_API.DOMESTIC_INIT,
    [PATH.V1]: DATA_API.DOMESTIC_INIT,
    [PATH.DOMESTIC_UPDATES]: DATA_API.DOMESTIC_UPDATES,
    [PATH.WORLD]: DATA_API.WORLD_INIT,
    [PATH.WORLD_UPDATES]: DATA_API.WORLD_UPDATES,
    [PATH.CITY]: (cityId) => DATA_API.CITY_INIT(cityId),
    [PATH.CITY_UPDATES]: DATA_API.DOMESTIC_UPDATES,
    [PATH.GU_UPDATES]: DATA_API.DOMESTIC_UPDATES,

    [PATH.VACCINE]: DATA_API.VACCINE,
    [PATH.SOCIAL_DISTANCING]: DATA_API.SOCIAL_DISTANCING,
};

const API_ON_UPDATE = {
    [PATH.DOMESTIC]: {
        [T.DOMESTIC_STAT]: DATA_API.DOMESTIC_STAT,
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_LIVE,
    },
    [PATH.V1]: {
        [T.DOMESTIC_STAT]: DATA_API.DOMESTIC_STAT,
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_LIVE,
    },
    [PATH.DOMESTIC_UPDATES]: {
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_UPDATES,
    },
    [PATH.WORLD]: {
        [T.WORLD_LIVE]: DATA_API.WORLD_INIT,
        [T.DOMESTIC_LIVE]: DATA_API.NOTIFICATION,
    },
    [PATH.WORLD_UPDATES]: {
        [T.WORLD_LIVE]: DATA_API.WORLD_UPDATES,
    },
    [PATH.CITY]: {
        [T.DOMESTIC_STAT]: DATA_API.DOMESTIC_STAT,
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_LIVE,
    },
    [PATH.CITY_UPDATES]: {
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_UPDATES,
    },
    [PATH.GU_UPDATES]: {
        [T.DOMESTIC_LIVE]: DATA_API.DOMESTIC_UPDATES,
    },
};

export const DataContext = React.createContext<Partial<DataContextType>>({});

export const DataProvider: React.FC = ({ children }) => {
    const [, setDataSet] = useRecoilState(DataState);
    const [, setNotification] = useRecoilState(NotificationState);
    const [, setAnnouncement] = useRecoilState(AnnouncementState);

    const [, setDomesticData] = useRecoilState(DomesticState);
    const [, setWorldData] = useRecoilState(WorldState);
    const [, setCityData] = useRecoilState(CityState);

    const [, setVaccineData] = useRecoilState(VaccineState);
    const [, setSocialDistancingData] = useRecoilState(SocialDistancingState);

    const [lastUpdated, setLastUpdated] = useState();

    const history = useRouter();
    const {
        pathname,
        query: { cityId },
    } = history;

    const mutateNotification = async () => {
        const data = await fetchApi(DATA_API.NOTIFICATION);
        setNotification((prev) => ({ show: true, ...data }));
    };

    const mutateAnnouncement = async () => {
        const data = await fetchApi(DATA_API.ANNOUNCEMENT);
        setAnnouncement(data);
    };

    useEffect(() => {
        mutateAnnouncement();
    }, []);

    const mutateData = async (api) => {
        const data = await fetchApi(api);
        if (data) {
            let slug = api.split("-")[0];

            if (slug == "domestic") {
                setDomesticData((prev) => ({ ...prev, ...data }));
                setDataSet((prev) => ({ ...prev, live: data.timeseries }));
            } else if (slug == "world") {
                setWorldData((prev) => ({ ...prev, ...data }));
                setDataSet((prev) => ({
                    ...prev,
                    world: {
                        ...prev.world,
                        live: data.timeseries,
                    },
                }));
            } else if (slug == "city") {
                setCityData((prev) => ({
                    ...prev,
                    [data.cityId]: {
                        ...((prev || {})[data.cityId] || {}),
                        ...data.data,
                    },
                }));
            } else if (slug == "vaccine") {
                setVaccineData((prev) => ({ ...prev, ...data }));
            } else if (slug == "social") {
                setSocialDistancingData((prev) => ({ ...prev, ...data }));
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (pathname == PATH.CITY) {
                await mutateData(API_ON_PATH[PATH.CITY](cityId));
            } else {
                if (pathname.indexOf("v1") > -1) {
                    await mutateData(DATA_API.DOMESTIC_UPDATES);
                }
                await mutateData(API_ON_PATH[pathname]);
            }
        })();
    }, [history]);

    useSWR(DATA_API.lastUpdated, fetcher, {
        revalidateOnReconnect: true,
        revalidateOnFocus: true,
        revalidateOnMount: true,
        refreshInterval: SECOND * 6,
        onSuccess: async (data) => {
            if (lastUpdated && lastUpdated != data.datetime) {
                try {
                    if (data.type == "NOTIFICATION") {
                        mutateNotification();
                        mutateData(API_ON_UPDATE[pathname]["DOMESTIC_LIVE"]);
                        if (pathname.indexOf("v1") > -1) {
                            mutateData(DATA_API.DOMESTIC_UPDATES);
                        }
                    } else if (data.type == "ANNOUNCEMENT") {
                        mutateAnnouncement();
                    } else {
                        await mutateData(API_ON_UPDATE[pathname][data.type]);
                    }
                } catch (err) {}
            }
            setLastUpdated(data.datetime);
        },
    });

    return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
