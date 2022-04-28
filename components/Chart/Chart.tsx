import { max } from "d3-array";
import { useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { BLUE, GREY, CHART_TYPE, T, LINE_TYPE, LIVE_VOCAB, GREY_OPACITY, BLUE_OPACITY, GREEN } from "@constsV2";
import { getPrevDate, koreanNumberFormat, numberWithCommas } from "@helper";
import ChartVisualizer from "./ChartVisualizer";
import styled from "styled-components";
import useChartData from "@hooks/useChartData";
import ChartCategories from "./ChartCategories";
import ChartSkeleton from "./ChartSkeleton";
import useWindowSize from "@hooks/useWindowSize";
import { Col, Row } from "@components/Layout";
import { constSelector } from "recoil";
import { useTheme } from "@hooks/useTheme";
import { ThemeContext } from "@contexts/ThemeContext";

const Wrapper = styled(Col)`
    margin-bottom: 6px;
    position: relative;
    /* padding-top: 50px; */
    /* margin: 8px 0px; */
`;
const VACCINE_TYPE = {
    [T.VACCINE]: 1,
    [T.AZ]: 1,
    [T.PFIZER]: 1,
};
const OPTIONS_KR = {
    [T.CASES]: "확진자",
    [T.DEATHS]: "사망자",
    [T.RECOVERED]: "완치자",
    [T.TESTS]: "검사자",
};

const parseTimeseries = (data: any, range, type, isAverage = false, mainOption = "") => {
    let timeseries, timeperiods, T;

    if (range === "all") {
        timeseries = data;
    } else {
        timeperiods = Object.keys(data);
        T = timeperiods.length;

        timeseries = timeperiods.slice(Math.max(T - range, 0), T).reduce((obj, date) => ((obj[date] = data[date]), obj), {});
    }

    timeperiods = Object.keys(timeseries);

    T = timeperiods.length;
    let leftOver = 1;

    if (type === "weekly") {
        let newTimeseries = {};
        let currentDate;
        timeperiods.forEach((date, i) => {
            let day = new Date(date).getDay();
            if (day == 0) {
                currentDate = date;
            }

            if (currentDate) {
                newTimeseries[currentDate] = (newTimeseries[currentDate] || 0) + timeseries[date];
            }

            if (i == timeperiods.length - 1) {
                leftOver = day + 1;
            }
        });
        timeseries = newTimeseries;
    } else if (type === "monthly") {
        let newTimeseries = {};
        timeperiods.forEach((date, i) => {
            let yearMonth = date.match(/\d{4}-\d{2}/)[0];
            if (yearMonth != "2020-01") {
                newTimeseries[`${yearMonth}-01`] = (newTimeseries[`${yearMonth}-01`] || 0) + timeseries[date];
            }

            if (i == timeperiods.length - 1) {
                leftOver = new Date(date).getDate();
            }
        });
        timeseries = newTimeseries;
    } else if (type === "accumulated") {
        let newTimeseries = {};
        timeperiods.forEach((date, i) => {
            let prevDate = timeperiods[i - 1];
            if (newTimeseries[prevDate]) {
                newTimeseries[date] = newTimeseries[prevDate] + timeseries[date];
            } else {
                newTimeseries[date] = timeseries[date];
            }
        });
        timeseries = newTimeseries;
    }

    if (isAverage && type != "daily") {
        timeperiods = Object.keys(timeseries);
        let divider = 7;
        if (type === "monthly") {
            divider = 30;
        } else if (type === "accumulated") {
            divider = leftOver = timeperiods.length;
        }
        timeseries = timeperiods.reduce((obj, date, i) => {
            let _divider = i === timeperiods.length - 1 ? leftOver : divider;
            obj[date] = Number((timeseries[date] / _divider).toFixed(2));
            return obj;
        }, {});
    }

    return timeseries;
};

const addZero = (number) => `${number < 10 ? "0" : ""}${number}`;

const yTicksGenerator = (maxY, yStepSize, tickLength = null) => {
    let maxSteps = Math.ceil(maxY / yStepSize) || 0;
    return [...Array(tickLength || maxSteps + 1)].map((_, i) => i * yStepSize);
};

const yStepSizeGenerator = (maxY) => {
    let stepSize = `${Math.ceil(maxY / 4)}`;
    let firstDigit = Number(stepSize[0]) + 1;
    let zeros = stepSize.length - 1;

    if (zeros == 0) return Number(stepSize);

    return firstDigit * 10 ** zeros;
};

const yAxisTicksGenerator = (data, tickLength = null) => {
    let maxY = max(data.reduce((arr, a) => [...arr, ...Object.values(a)], []));
    let stepSize = yStepSizeGenerator(Number(maxY));

    let tickValues = yTicksGenerator(maxY, stepSize, tickLength);

    return { max: maxY, stepSize, tickValues };
};

interface Props {
    CHART_OPTIONS: any;
    MAIN_OPTIONS: any;
    initChartOptions: any;
    initMainOption: any;
    dataType: any;
    chartId?: any;
    countryId?: any;
    cityId?: any;
    saveCharts?: any;
    deleteChart?: any;
    onAddNewChart?: any;
}

const Chart: React.FC<Props> = ({
    CHART_OPTIONS,
    MAIN_OPTIONS,
    initChartOptions,
    initMainOption,
    cityId,
    countryId,
    dataType,
    chartId,
    saveCharts,
    deleteChart,
    onAddNewChart,
}) => {
    const [mainOption, setMainOptions] = useState(initMainOption);
    const [chartOptions, setChartOptions] = useState(initChartOptions);
    const [activeHour, setActiveHour] = useState(null);
    const [reload, setReload] = useState(false);
    const [hideMobileTooltip, sethideMobileTooltip] = useState(true);
    const { theme: currentTheme } = useContext(ThemeContext);

    const [data, isLoading] = useChartData(mainOption, chartOptions, { cityId, countryId, dataType });
    const MAIN_COLOR = VACCINE_TYPE[mainOption] ? GREEN : BLUE;

    let _cityId = chartOptions.area ? Number(chartOptions.area) : cityId;

    const { width: windowWidth } = useWindowSize();
    const width = windowWidth ? Math.min(500 - 12 * 2, windowWidth) : null;
    const height = width && (width * 5) / 10;
    const _theme = useTheme();

    const [dataSet, chartConfig, isValid] = useMemo(() => {
        let _data = dataType == "DOMESTIC" ? data : data["world"];

        if (isLoading || !data) return [null, null];
        let { compare, range, type } = chartOptions;

        let xAxes = {
            callback: (a) => `${a}시`,
        };
        let yAxes = {};

        let requiresData = false;
        let showDetailedCases = type == "daily" && mainOption == "cases" && range < 90 && (_cityId === null || isNaN(_cityId)) && dataType == "DOMESTIC";

        let dataSet = [];

        if (mainOption === T.RATES) {
            xAxes.callback = (rawD) => {
                let d = getPrevDate(rawD);
                // let year = d.getYear() - 2100;
                let month = d.getMonth() + 1;
                let day = d.getDate();
                if (type == T.MONTHLY || (type == T.WEEKLY && range == "all")) {
                    return `${month}월`;
                }
                return `${addZero(month)}/${addZero(day)}`;
            };

            let testsDoneData = parseTimeseries(_data.testsDone, range, type);
            let casesData, ratesData;
            if (type == T.ACCUMULATED) {
                casesData = parseTimeseries(_data.cases, range, type);

                ratesData = Object.keys(testsDoneData).reduce((obj, date) => {
                    obj[date] = date.indexOf("2020-01") > -1 ? 0 : Number(((casesData[date] / testsDoneData[date]) * 10000).toFixed(1));
                    return obj;
                }, {});
            } else {
                ratesData = parseTimeseries(_data.rates, range, type, true, T.RATES);
            }
            if (!Object.keys(ratesData || {}).length) return [null, null, null];

            let showPoints = Object.keys(ratesData).length < 20;

            dataSet = [
                {
                    data: ratesData,
                    color: BLUE,
                    type: CHART_TYPE.LINE,
                    isAxisLeft: true,
                    showPoints: showPoints,
                    lineType: LINE_TYPE.CARDINAL,
                    zIndex: 2,
                    name: "확진율",
                    unit: "%",
                    yAxisId: "A",
                    lineColor: showPoints ? BLUE + "50" : BLUE,
                    lineWidth: 2.5,
                    pointColor: BLUE,
                    pointRadius: 5,
                    tooltipIndex: 1,
                },
                {
                    data: testsDoneData,
                    color: _theme("GREY"),
                    type: CHART_TYPE.BAR,
                    zIndex: 1,
                    name: "검사완료",
                    yAxisId: "B",
                    unit: "명",
                    barColor: `${GREY}BB`,
                    activeBarColor: _theme("GREY"),
                    tooltipIndex: 2,
                },
            ];

            let { tickValues: rightTickValues } = yAxisTicksGenerator([ratesData]);
            let { tickValues: leftTickValues } = yAxisTicksGenerator([testsDoneData]);

            let ticksLength = Math.max(rightTickValues.length, leftTickValues.length);

            yAxes = {
                A: {
                    yAxisId: "A",
                    position: "right",
                    unit: "명",
                    beginAtZero: true,
                    callback: (a) => `${a}%`,
                    tooltip: (a) => `${a}%`,
                    ...yAxisTicksGenerator([ratesData], ticksLength),
                },
                B: {
                    yAxisId: "B",
                    position: "left",
                    unit: "%",
                    beginAtZero: true,
                    callback: (a) => koreanNumberFormat(a),
                    tooltip: (a) => `${numberWithCommas(a)}명`,
                    ...yAxisTicksGenerator([testsDoneData], ticksLength),
                },
            };
        } else if (type === T.LIVE) {
            if (!_data?.live?.today) return [null, null, null];
            const timePeriod = Object.keys(_data.live.today);
            const lastTime = timePeriod[timePeriod.length - 1];
            xAxes.callback = (a) => (a == lastTime ? "현재" : `${a}시`);

            dataSet = [
                {
                    data: _data.live.today,
                    color: BLUE,
                    zIndex: 2,
                    type: CHART_TYPE.LINE,
                    showPoints: true,
                    name: "오늘",
                    yAxisId: "A",
                    unit: "명",
                    lineWidth: 2,
                    lineColor: BLUE + "90",
                    pointRadius: 5,
                    pointColor: BLUE,
                    tooltipIndex: 1,
                },
                {
                    data: _data.live[compare],
                    color: _theme("GREY"),
                    zIndex: 1,
                    type: CHART_TYPE.LINE,
                    showPoints: true,
                    name: LIVE_VOCAB[compare],
                    yAxisId: "A",
                    lineWidth: 2,
                    lineColor: _theme("GREY") + "90",
                    pointRadius: 5,
                    pointColor: _theme("GREY"),
                    tooltipIndex: 2,

                    unit: "명",

                    noShadow: true,
                },
            ];

            yAxes = {
                A: {
                    yAxisId: "A",
                    position: "right",
                    unit: "명",
                    beginAtZero: true,
                    callback: (a) => `${koreanNumberFormat(a)}`,
                    tooltip: (a) => `${numberWithCommas(a)}명`,
                    ...yAxisTicksGenerator([_data.live.today, _data.live[compare]]),
                },
            };
        } else if (showDetailedCases) {
            if (!_data?.casesV2) return [null, null, null];
            let timeperiod = Object.keys(_data.casesV2);
            let t = timeperiod.length;
            timeperiod = timeperiod.slice(t - range, t);
            let domesticsCases = timeperiod.reduce((obj, date) => ((obj[date] = _data.casesV2[date][0]), obj), {});
            let importedCases = timeperiod.reduce((obj, date) => ((obj[date] = _data.casesV2[date][1]), obj), {});

            if (!domesticsCases || !importedCases) return [null, null, null];

            xAxes.callback = (rawD) => {
                let d = getPrevDate(rawD);

                let month = d.getMonth() + 1;
                let day = d.getDate();
                if (type == T.MONTHLY || (type == T.WEEKLY && range == "all")) {
                    return `${month}월`;
                }
                return `${addZero(month)}/${addZero(day)}`;
            };

            yAxes = {
                ["A"]: {
                    yAxisId: "A",
                    position: "right",
                    unit: "명",
                    beginAtZero: true,
                    callback: (a) => `${koreanNumberFormat(a)}`,
                    tooltip: (a) => `${numberWithCommas(a)}명`,
                    isStacked: true,
                    ...yAxisTicksGenerator([domesticsCases, importedCases]),
                },
            };

            dataSet = [
                {
                    data: domesticsCases,
                    color: BLUE,
                    zIndex: 1,
                    type: CHART_TYPE.BAR,
                    name: "국내",
                    yAxisId: "A",
                    barColor: BLUE_OPACITY,
                    activeBarColor: BLUE,
                    unit: "명",

                    // stack: 0,
                    // noLabel: true,
                },
                {
                    data: importedCases,
                    color: _theme("GREY"),
                    zIndex: 2,
                    type: CHART_TYPE.BAR,
                    name: "해외",
                    yAxisId: "A",
                    barColor: GREY_OPACITY,
                    activeBarColor: _theme("GREY"),
                    noLabel: true,
                    stack: 0,
                    unit: "명",
                },
            ];
        } else {
            let dataOption = mainOption === T.TESTS ? chartOptions.testType : mainOption;
            let selectedData = _cityId === null || isNaN(_cityId) ? _data[dataOption] : _data.cities[_cityId][dataOption];
            // if (_.isEqual(data[dataOption], {}) || data[dataOption]["today"]) requiresData = true;
            if (!selectedData) return [null, null, null];
            if (_.isEqual(selectedData, {})) {
                requiresData = true;
                return [null, null, null];
            }
            let isLong = type == "weekly" || type == T.MONTHLY;
            let isBarType = Number(range) < 90 || isLong;
            let showAverageData = type !== T.DAILY && type !== T.ACCUMULATED;

            xAxes.callback = (rawD) => {
                let d;
                if (chartOptions.type == T.MONTHLY) {
                    d = rawD;
                } else {
                    d = getPrevDate(rawD);
                }
                let month = d.getMonth() + 1;
                let day = d.getDate();
                if (type == T.MONTHLY || (type == T.WEEKLY && range == "all")) {
                    return `${month}월`;
                }
                return `${addZero(month)}/${addZero(day)}`;
            };
            let parsedTimeseries = parseTimeseries(selectedData, range, type);

            dataSet = [
                {
                    data: parsedTimeseries,
                    color: showAverageData ? GREY : MAIN_COLOR,
                    zIndex: 1,
                    type: isBarType ? CHART_TYPE.BAR : CHART_TYPE.LINE,
                    name: OPTIONS_KR[mainOption],
                    yAxisId: showAverageData ? "B" : "A",
                    unit: "명",
                    barColor: showAverageData ? GREY_OPACITY : MAIN_COLOR + "80",
                    activeBarColor: showAverageData ? GREY : MAIN_COLOR,
                    lineColor: MAIN_COLOR,
                    lineWidth: 3,
                    pointRadius: 5,
                    pointColor: MAIN_COLOR,
                    tooltipIndex: 2,
                },
            ];

            let stacked = type === T.DAILY && mainOption === T.CASES && range < 90;

            yAxes = {
                [showAverageData ? "B" : "A"]: {
                    yAxisId: showAverageData ? "B" : "A",
                    position: showAverageData ? "left" : "right",
                    unit: "명",
                    beginAtZero: true,
                    callback: (a) => `${koreanNumberFormat(a)}`,
                    tooltip: (a) => `${numberWithCommas(a)}명`,
                    stacked,
                    ...yAxisTicksGenerator([parsedTimeseries]),
                },
            };

            if (showAverageData) {
                let parsedData = parseTimeseries(selectedData, range, type, true);
                dataSet[0].name = "누적";
                dataSet.push({
                    data: parsedData,
                    color: MAIN_COLOR,
                    zIndex: 2,
                    type: CHART_TYPE.LINE,
                    showPoints: Object.keys(parsedData).length < 14,
                    name: "평균",
                    yAxisId: "A",
                    lineColor: MAIN_COLOR + "90",
                    lineWidth: 3,
                    pointRadius: 5,
                    pointColor: MAIN_COLOR,
                    isAxisLeft: true,
                    tooltipIndex: 1,
                    unit: "명",
                });

                let { tickValues: rightTickValues } = yAxisTicksGenerator([parsedTimeseries]);
                let { tickValues: leftTickValues } = yAxisTicksGenerator([parsedData]);

                let ticksLength = Math.max(rightTickValues.length, leftTickValues.length);

                yAxes["A"] = {
                    yAxisId: "A",
                    position: "right",
                    unit: "명",
                    beginAtZero: true,
                    callback: (a) => `${koreanNumberFormat(a)}`,
                    tooltip: (a) => `${numberWithCommas(a)}명`,
                    ...yAxisTicksGenerator([parsedData], ticksLength),
                };
            }
        }

        const maxY = max(dataSet.map((a) => Object.values(a.data || {})).flat());
        const isValid = Number(maxY) && isLoading === false && !requiresData;

        const chartConfig = { width, height, xAxes, yAxes };

        const timeperiods = Object.keys(dataSet[0].data);
        const lastXvalue = timeperiods[timeperiods.length - 1];

        setActiveHour(lastXvalue);
        if (saveCharts) saveCharts({ mainOption, chartOptions });

        return [dataSet.sort((a, b) => a.zIndex - b.zIndex), chartConfig, isValid];
    }, [data, mainOption, chartOptions, isLoading, width, currentTheme]);

    if (!width) return <></>;

    return (
        <Wrapper>
            <ChartCategories
                // onChange={() => {
                //     saveCharts({ mainOption, chartOptions });
                // }}
                {...{
                    mainOption,
                    setMainOptions,
                    chartOptions,
                    setChartOptions,
                    CHART_OPTIONS,
                    MAIN_OPTIONS,
                    deleteChart,
                    onAddNewChart,
                    mainColor: MAIN_COLOR,
                }}
            ></ChartCategories>
            {/* <Row h='4px'></Row> */}
            {isValid ? (
                <ChartVisualizer
                    {...{
                        dataSet,
                        chartConfig,
                        chartOptions,
                        mainOption,
                        activeHour,
                        setActiveHour,
                        dataType,
                        chartId,
                        hideMobileTooltip,
                        sethideMobileTooltip,
                    }}
                ></ChartVisualizer>
            ) : (
                <ChartSkeleton></ChartSkeleton>
            )}
        </Wrapper>
    );
};

export default Chart;
