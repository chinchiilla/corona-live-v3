import React, { useState, useRef, useMemo } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col } from "@components/Layout";
import FixedTooltip from "./FixedTooltip";
import { useRecoilValue } from "recoil";
import { DomesticSelector } from "@states/DomesticState";
import ChartSkeleton from "./ChartSkeleton";

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
                        return value;
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
`;

interface Props {
    cityId?: string;
}
const LineChart: React.FC<Props> = ({ cityId }) => {
    const data = useRecoilValue(DomesticSelector);

    const chartRef = useRef<Line | null>();
    const _theme = useTheme();
    // return <></>;

    // const todayData = cityId == null ? timeseries.today : regionsTimeseries.today[cityId];

    const timePeriod: string[] = [...Object.keys(data.timeseries.today)];
    const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);
    if (!data?.timeseries) return <ChartSkeleton></ChartSkeleton>;

    const statistic = [
        Object.values(data.timeseries.today),
        Object.values(data.timeseries.yesterday),
        // getStatistic(stats, "today", chartType, cityId),
        // getStatistic(stats, "yesterday", chartType, cityId),
    ];

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

    const stepSize = useMemo(() => {
        const max = Math.max(...statistic.reduce((acc, val) => acc.concat(val), []));

        let stepSize = cityId == null ? 10 : 20;

        if (max >= 900) {
            stepSize = 300;
        } else if (max >= 500) {
            stepSize = 200;
        } else if (max >= 250) {
            stepSize = 100;
        } else if (max >= 50) {
            stepSize = 50;
        }
        return stepSize;
    }, [statistic]);

    const toolTipData = useMemo(
        () => [
            { color: "greyText", value: statistic[1][activeIndex], name: "어제" },
            { color: "blue", value: statistic[0][activeIndex], name: "오늘" },
        ],
        [statistic]
    );

    return (
        <>
            <Wrapper>
                <Line
                    data={getData as any}
                    ref={(el) => (chartRef.current = el)}
                    options={
                        {
                            onClick: onPointClick,
                            ...lineChartOptions(_theme, Math.ceil(stepSize)),
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
        </>
    );
};

export default LineChart;
