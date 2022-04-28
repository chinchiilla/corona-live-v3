import { API, SECOND } from "@utils/consts";
import { fetcher } from "@utils/helper";
import { WorldOverviewType, WorldStatsType } from "@utils/types";
import React, { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

export interface WorldContextProps {
    worldOverview: WorldOverviewType;
}

export const WorldContext = React.createContext<Partial<WorldContextProps>>({});

export const WorldProvider: React.FC = ({ children }) => {
    const history = useRouter();
    const { pathname } = history;
    const { data: worldOverview } = useSWR<WorldOverviewType>(
        pathname.indexOf("world") > -1 ? API.worldOverview : null,
        fetcher,
        {
            refreshInterval: SECOND * 60,
        }
    );

    return <WorldContext.Provider value={{ worldOverview }}>{children}</WorldContext.Provider>;
};
