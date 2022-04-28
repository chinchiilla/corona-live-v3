import { useEffect, useState } from "react";
import { T } from "@constsV2";
import { CHART_API, DATA_API } from "@api";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { fetcher } from "@helper";
import { DataState } from "@states/DataState";

const objLength = (obj) => Object.keys(obj || {}).length;

const useInitialFetch = (type, func = null) => {
    const CHART_API = type === "DOMESTIC" ? DATA_API.initialFetch : DATA_API.worldInitialFetch;

    useEffect(() => {
        (async () => {
            let response = await fetcher(CHART_API);
            if (func) func(response);
        })();
    }, [CHART_API]);
};

const VACCINE_TYPE = {
    [T.VACCINE]: 1,
    [T.AZ]: 1,
    [T.PFIZER]: 1,
};

const generateApi = (dataSet, mainOption, range, cityId = null) => {
    let api;

    let noCityId = cityId === null || isNaN(cityId);

    let extra = noCityId ? "" : `/${cityId}`;

    let prevData = noCityId ? dataSet[mainOption] : dataSet.cities[cityId][mainOption];
    if (range === "all") {
        if (mainOption === T.PCR_TESTS) {
            if (!prevData["2020-12-17"]) api = CHART_API[mainOption][range] + extra;
        } else if (VACCINE_TYPE[mainOption]) {
            if (prevData["2021-02-27"] == null) api = CHART_API[mainOption][range] + extra;
        } else {
            if (objLength(prevData) <= 90) {
                api = CHART_API[mainOption][range] + extra;
            }
        }
    } else {
        if (mainOption === T.PCR_TESTS) {
            if (!prevData["2020-12-17"] && objLength(prevData) < range) {
                range = range > 7 && range < 90 ? 90 : range;

                api = CHART_API[mainOption][range] + extra;
            }
        } else if (VACCINE_TYPE[mainOption]) {
            if (prevData["2021-02-27"] == null && objLength(prevData) < range) {
                range = range > 7 && range < 90 ? 90 : range;

                api = CHART_API[mainOption][range] + extra;
            }
        } else {
            if (objLength(prevData) < range) {
                range = range > 7 && range < 90 ? 90 : range;

                api = CHART_API[mainOption][range] + extra;
                if (!noCityId && range > 7) api = CHART_API[mainOption]["all"] + extra;
            }
        }
    }

    // if (!noCityId && range > 7) CHART_API = CHART_API[mainOption]["all"] + extra;

    return api ? { api, mainOption } : null;
};

const useChartData = (mainOption, chartOptions, { cityId = null, countryId = null, dataType = "DOMESTIC" }) => {
    const [dataSet, setDataSet] = useRecoilState(DataState);
    const [isLoading, setIsLoading] = useState(false);

    // const { mutate } = useSWR("stats-v2", fetcher, {
    //     onSuccess: (data) => {
    //         setDataSet((prev) => ({ ...prev, ...data }));
    //     },
    //     revalidateOnMount: false,
    //     revalidateOnFocus: false,
    // });
    // useSWR("last-updated", fetcher, {
    //     onSuccess: (data) => {
    //         if (data.datetime != dataSet.lastUpdated.datetime) {
    //             mutate();
    //         }
    //         setDataSet((prev) => ({ ...prev, lastUpdated: data }));
    //     },
    //     refreshInterval: 1000 * 12,
    //     revalidateOnMount: false,
    //     revalidateOnFocus: true,
    // });

    const isDomestic = dataType === "DOMESTIC";

    // useInitialFetch(dataType, (data) => {
    //     if (isDomestic) {
    //         setDataSet((prevDataSet) => ({ ...prevDataSet, ...data }));
    //     } else {
    //         setDataSet((prevDataSet) => ({ ...prevDataSet, world: data }));
    //     }
    //     setIsLoading(false);
    // });
    useEffect(() => {
        if (isLoading) return;
        let _cityId = chartOptions.area ? Number(chartOptions.area) : cityId;
        let noCityId = _cityId === null || isNaN(_cityId);
        let apiExt = isDomestic ? "" : "world/";

        let _dataSet = isDomestic ? dataSet : dataSet["world"];

        let apiSets = [];
        let { type, range } = chartOptions;
        let showDetailedCases =
            type == "daily" && mainOption == "cases" && range < 90 && noCityId && dataType == "DOMESTIC";

        if (showDetailedCases) {
            apiSets = [generateApi(_dataSet, T.CASESV2, range)];
        } else if (mainOption === T.RATES) {
            apiSets = [generateApi(_dataSet, T.RATES, range), generateApi(_dataSet, T.TESTS_DONE, range)];

            if (type == "accumulated") {
                apiSets = [generateApi(_dataSet, T.CASES, range), generateApi(_dataSet, T.TESTS_DONE, range)];
            }
        } else if (mainOption === T.TESTS) {
            apiSets = [generateApi(_dataSet, chartOptions.testType, range)];
        } else {
            apiSets = [generateApi(_dataSet, mainOption, range, _cityId)];
        }

        apiSets = apiSets.filter((a) => !!a);
        if (apiSets.length) {
            (async () => {
                setIsLoading(true);

                for (let apiSet of apiSets) {
                    let data = await fetcher(apiExt + apiSet.api);
                    if (noCityId) {
                        if (isDomestic) {
                            setDataSet((prevDataSet) => ({ ...prevDataSet, [apiSet.mainOption]: data }));
                        } else {
                            setDataSet((prevDataSet) => ({
                                ...prevDataSet,
                                world: { ...prevDataSet.world, [apiSet.mainOption]: data },
                            }));
                        }
                    } else {
                        setDataSet((prevDataSet) => ({
                            ...prevDataSet,
                            cities: {
                                ...prevDataSet.cities,
                                [_cityId]: {
                                    ...(prevDataSet.cities[_cityId] || {}),
                                    [apiSet.mainOption]: data,
                                },
                            },
                        }));
                    }
                }

                setIsLoading(false);
            })();
        }
    }, [mainOption, chartOptions, isLoading]);

    return [dataSet, isLoading];
};

export default useChartData;
