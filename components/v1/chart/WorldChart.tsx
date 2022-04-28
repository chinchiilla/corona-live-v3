import React, { useState, useRef, useMemo } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
import { setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col, Row } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";
import { IE11ErrorBoundary } from "@components/ErrorBoundary";
import ToggleButtons from "@components/ToggleButtons";

const lineChartOptions = (theme, stepSize) => ({
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        enabled: false,
    },
    plugins: {
        datalabels: {
            display: false,
        },
    },
    legend: {
        position: "top",
        labels: {
            fontColor: "white",
            boxWidth: 20,
        },
        display: false,
    },
    layout: {
        padding: {
            top: 14,
        },
    },
    scales: {
        gridLines: {
            drawBorder: false,
            display: false,
        },
        yAxes: [
            {
                ticks: {
                    beginAtZero: false,
                    fontColor: `${theme("blackText")}B0`,
                    fontSize: 11,
                    stepSize: stepSize,
                    autoSkip: true,
                    suggestedMin: 0,

                    callback: (value) => {
                        return `${value / 10000}만`;
                    },
                },
                position: "right",
                gridLines: {
                    color: `${theme("blackText")}10`,
                    zeroLineColor: `${theme("blackText")}10`,
                },
            },
        ],
        xAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: `${theme("blackText")}B0`,
                    fontSize: 11,
                    autoSkip: true,
                    autoSkipPadding: 14,
                    maxRotation: 0,
                    callback: (value) => {
                        if (value !== 0) return `${value}${parseInt(value) ? "시" : ""}`;
                    },
                },
                gridLines: {
                    color: `${theme("blackText")}10`,
                    display: false,
                },
            },
        ],
    },
});

const todayChartData = {
    datasets: [
        {
            label: "오늘",
            fill: true,
            backgroundColor: CHART_PRIMARY_COLOR,
            borderColor: `${CHART_PRIMARY_COLOR}90`,
            pointRadius: 5,
            pointBackgroundColor: CHART_PRIMARY_COLOR,
            pointBorderColor: Array(24).fill(`${CHART_PRIMARY_COLOR}50`),
            pointBorderWidth: Array(24).fill(1),
            hoverBackgroundColor: CHART_PRIMARY_COLOR,
            hoverBorderWidth: 20,
            pointHoverBorderColor: `${CHART_PRIMARY_COLOR}50`,
            hoverRadius: 5,
            lineTension: 0,
            borderWidth: 2,
        },
        {
            label: "어제",
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: CHART_SECONDARY_COLOR,
            hoverBackgroundColor: CHART_SECONDARY_COLOR,
            pointBorderWidth: Array(24).fill(1),
            backgroundColor: "transparent",
            hoverRadius: 5,
            borderColor: `${CHART_SECONDARY_COLOR}50`,
            lineTension: 0,
            borderWidth: 2,
        },
    ],
};

const Wrapper = styled(Col)`
    position: relative;
    canvas {
        height: 190px !important;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
`;

type Props = {
    timeseries: TimerseriesType;
    yesterdayTimeseries: TimerseriesType;
    delta: any;
};

const getWorldStatistic = (timeseries, chartType) => {
    const index = chartType == "total" ? 0 : 1;
    return Object.keys(timeseries).map((time) => timeseries[time][index]);
};

const WorldChart: React.FC<Props> = ({ timeseries, yesterdayTimeseries, delta }) => {
    const chartRef = useRef<Line | null>();
    const _theme = useTheme();
    if (!timeseries) return <></>;

    const timePeriod: string[] = Object.keys(timeseries);
    const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);
    const [chartType, setChartType]: ["total" | "delta", any] = useState("total");

    const statistic = [getWorldStatistic(timeseries, chartType), getWorldStatistic(yesterdayTimeseries, chartType)];

    const getData = (canvas) => {
        let datasets = todayChartData.datasets!.map((set, i) => {
            let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";
            let pointBorderWidth = timePeriod.map((_, j) => (j == activeIndex && i == 0 ? 16 : 1));
            return { ...set, backgroundColor, data: statistic[i], pointBorderWidth };
        });
        return { datasets, labels: timePeriod };
    };

    const onPointClick = (_, activeElements: any) => {
        let index = activeElements[0] && activeElements[0]._index;

        if (index != null) {
            const chart: any = chartRef.current?.chartInstance;

            chart!.data!.datasets[0]!.pointBorderWidth = Array(20).fill(1);
            chart!.data!.datasets[0]!.pointBorderWidth[index] = 16;

            setActiveIndex((prevIndex) => index || prevIndex);
            chart.update();
            chart.draw();
        }
    };

    const toolTipData = [
        { color: "greyText", value: statistic[1][activeIndex], name: "어제" },
        { color: "blue", value: delta, name: "오늘" },
    ];

    const max = useMemo(() => {
        return Math.max(...statistic[0], ...statistic[1]);
    }, [statistic]);

    const stepSize = useMemo(() => {
        let stepSize = 50000;
        if (max > 500000) {
            stepSize = 200000;
        } else if (max > 200000) {
            stepSize = 100000;
        }
        return stepSize;
    }, [max]);

    return (
        <IE11ErrorBoundary>
            <Row jc='space-between' mb='12px'>
                <ToggleButtons
                    noBg
                    options={[{ name: "오늘", value: "today", visible: true }]}
                    activeOption={"today"}
                    setOption={() => {}}
                ></ToggleButtons>
                <ToggleButtons
                    noBg
                    options={[
                        { name: "누적", value: "total", visible: true },
                        { name: "시간대별", value: "delta", visible: true },
                    ]}
                    activeOption={chartType}
                    setOption={setChartType}
                ></ToggleButtons>
            </Row>

            <Wrapper>
                <Line
                    data={getData as any}
                    ref={(el) => (chartRef.current = el)}
                    options={
                        {
                            onClick: onPointClick,
                            ...lineChartOptions(_theme, stepSize),
                        } as any
                    }
                ></Line>
            </Wrapper>
            <FixedTooltip
                data={toolTipData}
                onOptionSelect={setActiveIndex}
                selectedOption={activeIndex}
                options={timePeriod}
                optionName={(val) => (parseInt(val) ? `${val}시` : val)}
            ></FixedTooltip>
        </IE11ErrorBoundary>
    );
};

export default WorldChart;
