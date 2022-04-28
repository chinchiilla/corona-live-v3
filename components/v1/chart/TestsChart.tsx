import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { numberWithCommas, setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col, Row } from "@components/Layout";
import FixedTooltip from "./FixedTooltip";

const ratesChartOptions = (theme, cases, isDesktop) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: true,
            anchor: "end",
            align: "end",
            offset: 2,
            color: (context) => {
                return context.dataset.borderColor;
            },
            font: {
                size: isDesktop ? 11 : 10,
            },
            formatter: (value) => {
                if (cases.length > 7) return "";
                return numberWithCommas(value);
            },
        },
    },
    tooltips: {
        enabled: false,
    },
    layout: {
        padding: {
            top: 18,
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
    scales: {
        gridLines: {
            drawBorder: false,
            display: false,
        },
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: `${theme("blackText")}B0`,
                    fontSize: 11,
                    stepSize: 50000,
                    // max: 80000,
                    callback: (value) => {
                        let unitValue = value >= 10000 ? 10000 : 1000;
                        let unit = unitValue == 10000 ? "만" : "천";

                        return value !== 0 ? `${parseFloat(Number(value / unitValue).toFixed(1))}${unit}` : "";
                    },
                },
                id: "A",

                position: "left",
                gridLines: {
                    color: `${theme("blackText")}10`,
                    zeroLineColor: `${theme("blackText")}10`,
                },
            },
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: `${theme("blackText")}B0`,
                    fontSize: 11,
                    max: (Math.floor(Math.max(...cases) / 1000) + 2) * 1000,
                    stepSize: 1000,
                    callback: (value) => {
                        return value;
                        return value !== 0 ? `${value}%` : "";
                    },
                },
                id: "B",
                position: "right",
                gridLines: {
                    color: `${theme("blackText")}10`,
                    zeroLineColor: `${theme("blackText")}10`,
                },
            },
            // {
            //     ticks: {
            //         beginAtZero: true,
            //         fontColor: `${theme("blackText")}B0`,
            //         fontSize: 11,
            //         // max: 8,
            //         // stepSize: 2,
            //         callback: (value) => {
            //             return value !== 0 ? `${value}%` : "";
            //         },
            //     },
            //     id: "B",
            //     position: "right",
            //     gridLines: {
            //         color: `${theme("blackText")}10`,
            //         zeroLineColor: `${theme("blackText")}10`,
            //     },
            // },
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
                        const newDate = new Date(new Date(value).getTime() - 1000 * 60 * 60 * 24);
                        const month = newDate.getMonth() + 1;
                        const day = newDate.getDate();
                        // let [_, month, day] = value.split("-");
                        return `${Number(month)}/${Number(day)}`;
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

const Wrapper = styled(Col)`
    position: relative;
`;

type Props = {
    timeseries: any;
    timeRange: any;
    cityId?: string;
    isDesktop: boolean;
};

const TestsChart: React.FC<Props> = ({ timeseries, timeRange, cityId, isDesktop }) => {
    if (!timeseries) return <></>;
    const [timePeriod, cases, tests, rates] = useMemo(() => {
        let timePeriod = Object.keys(timeseries)
            .filter((a) => timeseries[a].negative)
            .slice(-timeRange);
        let cases = timePeriod.map((a) => timeseries[a][cityId || "confirmed"]);
        let tests = timePeriod.map((a) => timeseries[a]["tests"] + (timeseries[a]["pcr"] || 0));
        let rates = timePeriod.map((a) => timeseries[a]["confirmed"]);
        return [timePeriod, cases, tests, rates];
    }, [timeseries, timeRange]);

    const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);

    const chartRef = useRef<Line | null>();
    const _theme = useTheme();

    useEffect(() => {
        if (activeIndex != timePeriod.length - 1) setActiveIndex(timePeriod.length - 1);
    }, [timeRange]);

    const getData = useCallback(
        (canvas) => {
            return {
                datasets: [
                    {
                        label: "확진자",
                        data: rates,
                        type: "line",
                        yAxisID: "B",
                        backgroundColor: setGradient(canvas, _theme("blue")),
                        borderColor: `${CHART_PRIMARY_COLOR}`,
                        borderWidth: 2,
                        lineTension: 0,
                        pointRadius: 0,

                        pointBorderWidth: 0,
                        barThickness: 6,
                    },
                    {
                        label: "검사수",
                        data: tests,
                        type: "bar",
                        yAxisID: "A",
                        barThickness: timeRange > 30 ? 2 : 6,
                        backgroundColor: `${CHART_SECONDARY_COLOR}70`,
                    },
                ],
                labels: timePeriod.slice(timePeriod.length - timeRange),
            };
        },
        [timePeriod]
    );

    const onPointClick = (_, activeElements: any) => {
        let index = activeElements[0] && activeElements[0]._index;

        if (index != null) {
            const chart: any = chartRef.current?.chartInstance;

            chart!.data!.datasets[0]!.pointBorderWidth = Array(20).fill(1);
            chart!.data!.datasets[0]!.pointBorderWidth[index] = 20;

            setActiveIndex((prevIndex) => index || prevIndex);
            chart.update();
            chart.draw();
        }
    };

    const toolTipData = useMemo(
        () => [
            {
                color: "greyText",
                value: tests[activeIndex],
                name: "검사수",
                unitName: "건",
                hideIcon: true,
            },
            { color: "blue", value: rates[activeIndex], name: "확진자", unitName: "명", hideIcon: true },
        ],
        [tests, rates, activeIndex]
    );

    return (
        <>
            <Wrapper>
                <Bar
                    data={getData as any}
                    ref={(el) => (chartRef.current = el)}
                    options={{
                        onClick: onPointClick,
                        ...(ratesChartOptions(_theme, cases, isDesktop) as any),
                    }}
                ></Bar>
            </Wrapper>
            <FixedTooltip
                showSpacer
                flex={null}
                data={toolTipData}
                onOptionSelect={setActiveIndex}
                selectedOption={activeIndex}
                options={timePeriod}
                optionName={(value) => {
                    const newDate = new Date(new Date(value).getTime() - 1000 * 60 * 60 * 24);
                    const month = newDate.getMonth() + 1;
                    const day = newDate.getDate();
                    return `${month}/${day}`;
                    // return val.slice(5);
                }}
            ></FixedTooltip>
            <Col color={_theme("text")} mt='6px'>
                {/* <Row jc='space-evenly'>
                    <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center'>
                        <Row fontWeight={700} mr='4px'>
                            *검사완료
                        </Row>
                        = 검사수 - 검사중
                    </Row>
                    <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center'>
                        <Row fontWeight={700} mr='4px'>
                            *확진율
                        </Row>{" "}
                        = 확진/검사완료
                    </Row>
                </Row> */}
                {/* <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center' mt='4px'>
                    공식적인 계산법이 아니기 때문에 참고용으로만 사용부탁드립니다
                </Row> */}
                <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center' mt='4px'>
                    *임시선별 검사소 검사 건수를 포함한 수치입니다
                </Row>
                <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center' mt='4px'>
                    *검사일과 확진일 사이에 시간차가 있기 때문에 일일 확진율은 제공 안하고 있습니다
                </Row>
            </Col>
        </>
    );
};

export default TestsChart;
