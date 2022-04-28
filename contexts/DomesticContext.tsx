import React from "react";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { API, API_ROOT, SECOND } from "@utils/consts";
import { fetcher, getCasesSummary, jsonCompare } from "@utils/helper";
import {
    StatsType,
    UpdateType,
    NotificationType,
    WorldUpdatesType,
    WorldStatsType,
    CasesSummaryType,
    TimerseriesType,
} from "@utils/types";
import { useObjectState } from "@hooks/useObjectState";
import { useRouter } from "next/router";

interface StatsState {
    data: StatsType | null;
    loading: boolean;
}
interface UpdatesState {
    data: UpdateType[] | null;
    loading: boolean;
}

interface TimeseriesState {
    data: any;
    loading: boolean;
}

export interface DomesticContextProps {
    casesSummary?: CasesSummaryType;
    updatesData: UpdateType[];
    statsData: StatsType;
    timeseriesData: TimerseriesType;
    mutateData: () => void;
    isLoading: boolean;
    notification: NotificationType;
    removeNotification: () => void;
    lastUpdatedDate: string;
    lastUpdated: any;
    mutateTimeseries: any;
}

export const DomesticContext = React.createContext<Partial<DomesticContextProps>>({});

export const DomesticProvider: React.FC = ({ children }) => {
    const history = useRouter();
    const { pathname } = history;

    const [notification, setNotification] = useObjectState<NotificationType | null>(null);
    const [stats, setStats] = useObjectState<StatsState>({ data: null, loading: false });
    const [updates, setUpdates] = useObjectState<UpdatesState>({ data: null, loading: false });
    const [lastUpdated, setLastUpdated] = useState(0);
    const [timeseries, setTimeseries] = useObjectState<TimeseriesState>({
        data: null,
        loading: false,
    });

    const removeNotification = () => setNotification(null, true);

    const isInitialised = stats.data != null && updates.data != null;

    const onUpdatesFetched = (newUpdates: UpdateType[]) => {
        if (!jsonCompare(updates.data, newUpdates)) setUpdates({ data: newUpdates });

        const newCases = newUpdates.filter(
            (newUpdate) =>
                !updates.data?.find((oldUpdate) => {
                    return newUpdate.datetime == oldUpdate.datetime;
                })
        );

        const prevCasesCount = updates.data
            ? updates.data.reduce((count, { cases }) => (count += Number(cases)), 0)
            : 0;
        const newCasesCount = newUpdates.reduce((count, { cases }) => (count += Number(cases)), 0);

        if (newCasesCount > prevCasesCount && isInitialised) {
            let addedCases = 0;

            const casesCountByCity = newCases.reduce((obj, { city, cases }) => {
                obj[city] = obj[city] ? obj[city] + Number(cases) : Number(cases);
                addedCases += Number(cases);
                return obj;
            }, {});

            if (addedCases > 0 && newCases.length < 6) setNotification({ casesCountByCity, addedCases });
            setUpdates({ data: newUpdates });
        }
        // setNotification({ casesCountByCity: { 0: 1 }, addedCases: 1 });
    };

    const onStatsFetched = (newStats: StatsType) => {
        if (!jsonCompare(stats.data, newStats)) setStats({ data: newStats });

        const [prevCases, prevDelta] = stats.data?.overview?.current || [0, 0];
        const [newCases, newDelta] = newStats?.overview?.current || [0, 0];

        const isChanged =
            prevCases != newCases ||
            prevDelta != newDelta ||
            newStats.announcements.length != stats.data?.announcements.length;

        if (isChanged && isInitialised) {
            setStats({ data: newStats });
        }
    };

    const onTimeseriesFetched = (newTimeseries) => {
        setTimeseries({ data: newTimeseries });
    };

    // const { mutate: mutateUpdates, isValidating: updatesLoading } = useSWR(API.updates, fetcher, {
    //     // refreshInterval: SECOND * 100,
    //     revalidateOnReconnect: false,
    //     revalidateOnFocus: false,
    //     revalidateOnMount: false,
    //     onSuccess: onUpdatesFetched,
    // });

    // const { mutate: mutateStats, isValidating: statsLoading } = useSWR(API.stats, fetcher, {
    //     // refreshInterval: SECOND * 100,
    //     revalidateOnReconnect: false,
    //     revalidateOnFocus: false,
    //     revalidateOnMount: false,
    //     onSuccess: onStatsFetched,
    // });

    // const { mutate: mutateTimeseries, isValidating: timeseriesLoading } = useSWR(API.timeseries, fetcher, {
    //     revalidateOnReconnect: false,
    //     revalidateOnFocus: false,
    //     revalidateOnMount: false,
    //     refreshInterval: 0,
    //     onSuccess: onTimeseriesFetched,
    // });

    const mutateData = async () => {
        setStats({ loading: true });
        setUpdates({ loading: true });

        // mutateUpdates();
        // mutateStats();

        let currentHours = new Date().getHours();
        let currentMinutes = new Date().getMinutes();
        // if (currentHours == 9 && currentMinutes > 30) {
        //     mutateTimeseries();
        // }
    };

    useSWR(
        pathname.indexOf("world") == -1 ? API.lastUpdated : null,

        fetcher,
        {
            revalidateOnReconnect: true,
            revalidateOnFocus: true,
            revalidateOnMount: true,
            refreshInterval: SECOND * 16,
            onSuccess: (newLastUpdated) => {
                if (lastUpdated && lastUpdated != newLastUpdated) {
                    mutateData();
                }
                setLastUpdated(newLastUpdated);
            },
        }
    );

    // useEffect(() => {
    //     if (updatesLoading == true) {
    //         setUpdates({ loading: !!notification ? false : true });
    //     } else {
    //         setTimeout(() => {
    //             setUpdates({ loading: updatesLoading });
    //         }, 2000);
    //     }
    // }, [updatesLoading]);

    // useEffect(() => {
    //     // if (!timeseries.data && !timeseriesLoading) mutateTimeseries();
    //     if (!updates.data && !updatesLoading) mutateUpdates();
    //     if (!stats.data && !statsLoading) mutateStats();
    // }, [timeseries, updates, stats]);

    const isLoading = updates.loading;
    const casesSummary = updates.data ? getCasesSummary(updates.data) : null;

    const lastUpdatedDate = timeseries.data ? Object.keys(timeseries.data).slice(-1)[0].slice(5) : null;

    return (
        <DomesticContext.Provider
            value={{
                casesSummary,
                updatesData: updates.data,
                statsData: stats.data,
                timeseriesData: timeseries.data,
                mutateData,
                isLoading,
                notification,
                removeNotification,
                lastUpdatedDate,
                lastUpdated,
                // mutateTimeseries,
            }}
        >
            {children}
        </DomesticContext.Provider>
    );
};
