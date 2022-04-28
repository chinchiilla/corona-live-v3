import React, { useState, useEffect, useMemo } from "react";
import "chartjs-plugin-datalabels";
import styled from "styled-components";

import { Row, Col } from "@components/Layout";
import TodayChart from "./TodayChart";
import DailyChart from "./DailyChart";
import RatesChart from "./RatesChart";
import { TimerseriesType } from "../types";
import ToggleButtons from "../ToggleButtons";
import { IE11ErrorBoundary } from "@components/ErrorBoundary";
import { useRecoilValue } from "recoil";
import { DomesticSelector } from "@states/DomesticState";

const Wrapper = styled(Col)`
    position: relative;
    color: white;
    margin-bottom: 8px;
    margin-top: 2px;
    canvas {
        height: 190px !important;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
`;

interface Props {
    timeseries: TimerseriesType;
    mutateTimeseries: any;
    stats: any;
    cityId?: string;
    path?: string;
}

const TOGGLE_OPTION_B = [
    { name: "누적", value: "total", visible: true },
    // { name: "시간대별", value: "delta", visible: true },
];

const TOGGLE_OPTION_C = [
    { name: "1주", value: 7, visible: true },
    { name: "2주", value: 14, visible: true },
    { name: "3달", value: 90, visible: true },
];

const ToggleButtonSection = ({ statType, setStatType, chartType, setChartType, timeRange, setTimeRange }) => {
    const TOGGLE_OPTION_A = useMemo(
        () => [
            { name: "오늘", value: "today", visible: true },
            { name: "일별", value: "daily", visible: true },
            { name: "확진율", value: "rates", visible: true },
            // { name: "검사수", value: "tests", visible: cityId == null },
        ],
        []
    );

    return (
        <Row jc='space-between' mb='10px' fadeInUp>
            <ToggleButtons
                noBg
                options={TOGGLE_OPTION_A}
                activeOption={statType}
                setOption={setStatType}
            ></ToggleButtons>
            <Row>
                {statType == "today" ? (
                    <ToggleButtons
                        noBg
                        options={TOGGLE_OPTION_B}
                        activeOption={chartType}
                        setOption={setChartType}
                    ></ToggleButtons>
                ) : (
                    <ToggleButtons
                        noBg
                        options={TOGGLE_OPTION_C}
                        activeOption={timeRange}
                        setOption={setTimeRange}
                    ></ToggleButtons>
                )}
            </Row>
        </Row>
    );
};

const MemoToggleButtonSection = React.memo(ToggleButtonSection);

const Chart: React.FC = () => {
    const [statType, setStatType]: [string, any] = useState("today");
    const [chartType, setChartType]: [string, any] = useState("total");
    const [timeRange, setTimeRange]: [number, any] = useState(7);
    const data = useRecoilValue(DomesticSelector);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 400) setIsDesktop(true);
    }, []);

    // useEffect(() => {
    //     if (path == "/rates") setStatType("rates");
    //     if (path == "/daily") setStatType("daily");
    // }, [path]);

    // useEffect(() => {
    //     if ((statType == "daily" || statType == "rates" || statType == "tests") && timeseries == null) {
    //         mutateTimeseries();
    //     }
    // }, [statType]);
    if (!data?.timeseries) return <></>;
    return (
        <Wrapper>
            <IE11ErrorBoundary>
                <MemoToggleButtonSection
                    {...{ statType, setStatType, chartType, setChartType, timeRange, setTimeRange }}
                ></MemoToggleButtonSection>
                {statType == "today" && <TodayChart></TodayChart>}
                {statType == "daily" && <DailyChart {...{ timeRange }}></DailyChart>}
                {statType == "rates" && <RatesChart {...{ timeRange }}></RatesChart>}
                {/* {statType == "tests" && cityId == null && (
                    <TestsChart {...{ timeseries, timeRange, cityId, isDesktop }}></TestsChart>
                )} */}
            </IE11ErrorBoundary>
        </Wrapper>
    );
};

// const MemoChart = React.memo(Chart, (prev, next) => {
//     return (
//         prev.stats.overview.current[0] === next.stats.overview.current[0] &&
//         prev.stats.overview.current[1] === next.stats.overview.current[1] &&
//         Object.keys(prev.timeseries || {}).length === Object.keys(next.timeseries || {}).length &&
//         Object.keys(prev.stats.timeseries.today).length === Object.keys(next.stats.timeseries.today).length
//     );
// });

// export default MemoChart;
export default Chart;
