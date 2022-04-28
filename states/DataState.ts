import { atom } from "recoil";

export const DataState = atom({
    key: "dataState",
    default: {
        world: {
            live: {},
            cases: {},
            deaths: {},
        },
        live: {},
        cases: {},
        deaths: {},
        tests: {},
        pcrTests: {},
        rates: {},
        recovered: {},
        testsDone: {},
        vaccineTs: {},
        cities: [...Array(17).keys(), -1].reduce(
            (obj, a) => ((obj[a] = { cases: {}, deaths: {}, recovered: {} }), obj),
            {}
        ),
        overall: {},
        current: {},
        regionLive: {},
        casesSummary: {},
        overview: {},
        lastUpdated: null,
        vaccine: {},
        socialDistancing: {},
        az: {},
        pfizer: {},
    },
});
