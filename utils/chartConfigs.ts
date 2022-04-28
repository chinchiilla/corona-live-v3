export const MAIN_TYPES_OPTIONS = [
    { value: "cases", name: "확진자" },
    { value: "deaths", name: "사망자" },
    { value: "tests", name: "검사자" },
    { value: "rates", name: "확진율" },
    { value: "recovered", name: "완치자" },
];

export const BASIC_TYPES = [
    { value: "daily", name: "일별" },
    { value: "weekly", name: "주별" },
    { value: "monthly", name: "월별" },
    { value: "accumulated", name: "누적" },
];

export const RANGES_OPTIONS = [
    { value: 7, name: "1주" },
    { value: 14, name: "2주" },
    { value: 30, name: "1달" },
    { value: 90, name: "3달" },
    { value: "all", name: "전체" },
];

export const RANGES_OPTIONS_FROM_MONTH = RANGES_OPTIONS.slice(2);

export const RANGES_CONDITIONAL = [
    {
        type: "equal",
        conditions: { type: "daily" },
        optionsLists: {
            range: RANGES_OPTIONS,
        },
    },
    {
        type: "equal",
        conditions: { type: "weekly" },
        optionsLists: {
            range: RANGES_OPTIONS_FROM_MONTH,
        },
    },
    {
        type: "equal",
        conditions: { type: "monthly" },
        optionsLists: {
            range: [{ value: "all", name: "전체" }],
        },
    },
    {
        type: "equal",
        conditions: { type: "accumulated" },
        optionsLists: {
            range: [{ value: "all", name: "전체" }],
        },
    },
];

export const AREAS_OPTIONS = [
    { value: "all", name: "전체" },
    // { value: "cities", name: "수도권" },
    // { value: "noncities", name: "비수도권" },
    { value: "0", name: "서울" },
    { value: "1", name: "부산" },
    { value: "2", name: "인천" },
    { value: "3", name: "대구" },
    { value: "4", name: "광주" },
    { value: "5", name: "대전" },
    { value: "6", name: "울산" },
    { value: "7", name: "세종" },
    { value: "8", name: "경기" },
    { value: "9", name: "강원" },
    { value: "10", name: "충북" },
    { value: "11", name: "충남" },
    { value: "12", name: "경북" },
    { value: "13", name: "경남" },
    { value: "14", name: "전북" },
    { value: "15", name: "전남" },
    { value: "16", name: "제주" },
    { value: "-1", name: "검역" },
];

export const TEST_TYPE_OPTIONS = [
    // { value: "all", name: "전체" },
    { value: "tests", name: "의심검사(명)" },
    // { value: "pcrTests", name: "익명검사(건)" },
];

export const CITY_AREAS = [
    { value: "all", name: "전체" },
    { value: "city-0", name: "서울" },
    { value: "city-1", name: "경기" },
    { value: "city-2", name: "인천" },
];

export const DOMESTIC_MAIN_OPTIONS = [
    { value: "cases", name: "확진자" },
    { value: "deaths", name: "사망자" },
    { value: "tests", name: "검사자" },
    { value: "rates", name: "확진율" },
    // { value: "recovered", name: "완치자" },
];

export const DOMESTIC_CHART_OPTIONS = {
    cases: {
        type: [{ value: "live", name: "실시간" }, ...BASIC_TYPES],
        conditional: [
            {
                type: "equal",
                conditions: { type: "live" },
                optionsLists: {
                    compare: [
                        { value: "yesterday", name: "어제" },
                        { value: "weekAgo", name: "1주전" },
                        { value: "twoWeeksAgo", name: "2주전" },
                        { value: "monthAgo", name: "1달전" },
                    ],
                },
            },
            ...RANGES_CONDITIONAL,
            {
                type: "notEqual",
                conditions: { type: "live" },
                optionsLists: {
                    area: AREAS_OPTIONS,
                },
            },
        ],
    },

    deaths: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
        area: AREAS_OPTIONS,
    },
    tests: {
        type: BASIC_TYPES,
        conditional: [
            // {
            //     type: "equal",
            //     conditions: { testType: "pcr" },
            //     optionsLists: {
            //         area: CITY_AREAS,
            //     },
            // },
            ...RANGES_CONDITIONAL,
        ],
        testType: TEST_TYPE_OPTIONS,
    },
    rates: {
        type: [
            { value: "daily", name: "일별" },
            { value: "weekly", name: "주별" },
            { value: "monthly", name: "월별" },
        ],
        conditional: [
            // {
            //     type: "equal",
            //     conditions: { testType: "pcr" },
            //     optionsLists: {
            //         area: CITY_AREAS,
            //     },
            // },
            ...RANGES_CONDITIONAL,
        ],
        testType: TEST_TYPE_OPTIONS,
    },
    recovered: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
        area: AREAS_OPTIONS,
    },
};

export const CITY_MAIN_OPTIONS = [
    { value: "cases", name: "확진자" },
    { value: "deaths", name: "사망자" },
    { value: "recovered", name: "완치자" },
];

export const CITY_CHART_OPTIONS = {
    cases: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
        // area: AREAS_OPTIONS,
    },
    deaths: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
        // area: AREAS_OPTIONS,
    },
    recovered: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
        // area: AREAS_OPTIONS,
    },
};

export const WORLD_MAIN_OPTIONS = [
    { value: "cases", name: "확진자" },
    { value: "deaths", name: "사망자" },
];

export const WORLD_CHART_OPTIONS = {
    cases: {
        type: [{ value: "live", name: "실시간" }, ...BASIC_TYPES],
        conditional: [
            {
                type: "equal",
                conditions: { type: "live" },
                optionsLists: {
                    compare: [
                        { value: "yesterday", name: "어제" },
                        { value: "weekAgo", name: "1주전" },
                        { value: "twoWeeksAgo", name: "2주전" },
                        { value: "monthAgo", name: "1달전" },
                    ],
                },
            },
            ...RANGES_CONDITIONAL,
        ],
    },
    deaths: {
        type: BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
    },
};

export const VACCINE_MAIN_OPTIONS = [
    { value: "vaccineTs", name: "백신 전체" },
    // { value: "pfizer", name: "화이자" },
    // { value: "az", name: "아스트라제네카" },
];

export const VACCINE_BASIC_TYPES = [
    { value: "daily", name: "일별" },
    { value: "weekly", name: "주별" },
    { value: "monthly", name: "월별" },
];

export const VACCINE_CHART_OPTIONS = {
    ["vaccineTs"]: {
        type: VACCINE_BASIC_TYPES,
        conditional: RANGES_CONDITIONAL,
    },
    // ["pfizer"]: {
    //     type: VACCINE_BASIC_TYPES,
    //     conditional: RANGES_CONDITIONAL,
    // },

    // ["az"]: {
    //     type: VACCINE_BASIC_TYPES,
    //     conditional: RANGES_CONDITIONAL,
    // },
};
