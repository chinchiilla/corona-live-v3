import { T } from "./constsV2";

const API_URL = `https://apiv2.corona-live.com/`;

export const fetchApi = async (api) => {
    return fetch(`${API_URL}${api}.json?_=${new Date().getTime()}`).then((res) => res.json());
};

export const DATA_API = {
    CITY_INIT: (cityId: number) => `city-init/${cityId}`,
    CITY_LIVE: (cityId: number) => `city-live/${cityId}`,
    CITY_STAT: (cityId: number) => `city-stat/${cityId}`,

    DOMESTIC_INIT: "domestic-init",
    DOMESTIC_LIVE: "domestic-live",
    DOMESTIC_STAT: "domestic-stat",
    DOMESTIC_UPDATES: "domestic-updates",

    WORLD_INIT: "world-init",
    WOLRD_LIVE: "world-live",
    WORLD_STAT: "world-stat",
    WORLD_UPDATES: "world-updates-v2",

    NOTIFICATION: "notification",

    initialFetch: "initial-fetch",
    worldInitialFetch: "world-initial-fetch",
    overallGuStats: (cityId) => `overall-gu-stats/${cityId}`,
    currentGuStats: (cityId) => `current-gu-stats/${cityId}`,
    overallWorldStats: `overall-world-stats/`,
    ANNOUNCEMENT: `announcement`,

    lastUpdated: "last-updated",

    VACCINE: "vaccine",
    SOCIAL_DISTANCING: "social-distancing",
};

export const CHART_API = {
    [T.CASES]: {
        [T.WEEK]: `cases/week`,
        [T.THREE_MONTHS]: `cases/three-months`,
        [T.ALL_TIME]: `cases/all`,
        [T.LIVE]: "cases/live",
    },
    [T.CASESV2]: {
        [T.WEEK]: `cases-v2/week`,
        [T.THREE_MONTHS]: `cases-v2/three-months`,
    },
    [T.CITY_CASES]: {
        [T.WEEK]: (cityId) => `cases/live/${cityId}`,
        [T.THREE_MONTHS]: (cityId) => `cases/week/${cityId}`,
        [T.ALL_TIME]: (cityId) => `cases/all-time/${cityId}`,
        [T.LIVE]: "cases/live",
    },
    [T.DEATHS]: {
        [T.WEEK]: `deaths/week`,
        [T.THREE_MONTHS]: `deaths/three-months`,
        [T.ALL_TIME]: `deaths/all`,
    },
    [T.RECOVERED]: {
        [T.WEEK]: `recovered/week`,
        [T.THREE_MONTHS]: `recovered/three-months`,
        [T.ALL_TIME]: `recovered/all`,
    },
    [T.TESTS]: {
        [T.WEEK]: `tests/week`,
        [T.THREE_MONTHS]: `tests/three-months`,
        [T.ALL_TIME]: `tests/all`,
    },
    [T.PCR_TESTS]: {
        [T.WEEK]: `pcr-tests/week`,
        [T.THREE_MONTHS]: `pcr-tests/three-months`,
        [T.ALL_TIME]: `pcr-tests/all`,
    },
    [T.RATES]: {
        [T.WEEK]: `rates/week`,
        [T.THREE_MONTHS]: `rates/three-months`,
        [T.ALL_TIME]: `rates/all`,
    },

    [T.TESTS_DONE]: {
        [T.WEEK]: `tests-done/week`,
        [T.THREE_MONTHS]: `tests-done/three-months`,
        [T.ALL_TIME]: `tests-done/all`,
    },

    [T.VACCINE]: {
        [T.WEEK]: `vaccine-ts/week`,
        [T.THREE_MONTHS]: `vaccine-ts/three-months`,
        [T.ALL_TIME]: `vaccine-ts/all`,
    },

    [T.AZ]: {
        [T.WEEK]: `az/week`,
        [T.THREE_MONTHS]: `az/three-months`,
        [T.ALL_TIME]: `az/all`,
    },

    [T.PFIZER]: {
        [T.WEEK]: `pfizer/week`,
        [T.THREE_MONTHS]: `pfizer/three-months`,
        [T.ALL_TIME]: `pfizer/all`,
    },

    [T.WORLD]: {
        [T.CASES]: {
            [T.WEEK]: (country = null) => `world/cases/week${country != null ? "/" + country : ""}`,
            [T.THREE_MONTHS]: (country = null) => `world/cases/three-months${country != null ? "/" + country : ""}`,
            [T.ALL_TIME]: (country = null) => `world/cases/all${country != null ? "/" + country : ""}`,
            [T.LIVE]: "world/cases/live",
        },

        [T.DEATHS]: {
            [T.WEEK]: (country = null) => `world/deaths/week${country != null ? "/" + country : ""}`,
            [T.THREE_MONTHS]: (country = null) => `world/deaths/three-months${country != null ? "/" + country : ""}`,
            [T.ALL_TIME]: (country = null) => `world/deaths/all${country != null ? "/" + country : ""}`,
        },
    },
};
