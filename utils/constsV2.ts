export const CHART_TYPE = {
    LINE: "LINE",
    BAR: "BAR",
    HORIZONTAL_BAR: "HORIZONTAL_BAR",
    PIE: "PIE",
    DONUT: "DONUT",
    CIRCULAR_BAR: "CIRCULAR_BAR",
};

export const LINE_TYPE = {
    LINEAR: "LINEAR",
    CARDINAL: "CARDINAL",
};

export const AXIS_TYPE = {
    DATE: "DATE",
    LINEAR: "LINEAR",
};

export const BLUE = "#5673ea";
export const GREY = "#d8d8d8";

export const BLUE_OPACITY = "#5673ea90";
// export const GREY = "#ababab";
// export const GREY = "#cecdcd";
export const GREY_OPACITY = "#dadada90";
export const GREEN = "#2fb32f";

export const TRANSITION_DURATION = 400;

export const T = {
    CASES: "cases",
    CITY_CASES: "citycases",
    DEATHS: "deaths",
    RECOVERED: "recovered",
    TESTS: "tests",
    PCR_TESTS: "pcrTests",
    RATES: "rates",
    TESTS_DONE: "testsDone",
    WEEK: 7,
    THREE_MONTHS: 90,
    ALL_TIME: "all",
    LIVE: "live",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    ACCUMULATED: "accumulated",
    DAILY: "daily",
    CASESV2: "casesV2",
    WORLD: "world",
    VACCINE: "vaccineTs",
    AZ: "az",
    PFIZER: "pfizer",
};

export const LIVE_VOCAB = {
    yesterday: "어제",
    weekAgo: "1주전",
    twoWeeksAgo: "2주전",
    monthAgo: "1달전",
};

export const GRAND = 10000;
export const MILLION = 1000000;
export const THOUSAND = 1000;

export const DISTANCE_FLAGS_CONFIG = {
    1: "blue",
    1.5: "green",
    2: "orange",
    2.5: "red",
};

export const DISTANCE_FLAGS = {
    "2020-08-16": { finish: "2020-08-29", level: 2 },
    "2020-08-30": { finish: "2020-09-13", level: 2.5 },
    "2020-09-14": { finish: "2020-10-10", level: 2 },
    "2020-10-11": { finish: "2020-11-16", level: 1 },
    "2020-11-17": { finish: "2020-11-23", level: 1.5 },
    "2020-11-24": { finish: "2020-12-07", level: 2 },
    "2020-12-08": { finish: "2021-01-31", level: 2.5 },
};
