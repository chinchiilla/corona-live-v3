import React, { useState, useRef, useEffect, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { fetcher, setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col, Row } from "@components/Layout";
import FixedTooltip from "./FixedTooltip";
import { theme } from "@styles/themes";
import { CHART_API } from "@utils/api";
import { T } from "@utils/constsV2";
import ChartSkeleton from "./ChartSkeleton";

const dailyChartOptions = (theme, stepSize, cases, isDesktop, timeRange) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: true,
            anchor: "end",
            align: "end",
            offset: 0,
            color: `${theme("darkGreyText")}c0`,
            font: {
                size: isDesktop ? (timeRange < 8 ? 11.5 : 10.5) : 10,
            },
            formatter: (_, context) => {
                if (cases.length > 14) return "";
                if (context.dataset.label == "국내") return "";
                return cases[context.dataIndex];
            },
        },
    },
    layout: {
        padding: {
            top: 14,
        },
    },
    tooltips: {
        enabled: false,
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
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    fontColor: `${theme("blackText")}B0`,
                    fontSize: 11,
                    stepSize: stepSize || 30,
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
                stacked: true,
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

const InfoContainer = styled(Row)`
    align-items: center;
    padding: 6px 16px;
    /* background: ${theme("yellowBg")}; */
    color: ${theme("darkGreyText")};
    /* box-shadow: -1px 1px 16px -2px #0000001f; */
    border-radius: 4px;
    justify-content: space-between;
`;

const Info = styled(Row)`
    font-size: 12px;
    opacity: 0.8;
    margin-right: 4px;
    div {
        margin-right: 2px;
    }
    span {
        font-weight: bold;
        :after {
            content: "명";
            padding-left: 2px;
        }
    }
`;

type Props = {
    timeseries: any;
    timeRange: any;
    cityId?: string;
    isDesktop?: boolean;
};

const getAverage = (total) => {
    let num: any = (total / 7).toFixed(1);
    if (num % 1 == 0) return Math.floor(num);
    return num;
};

const BarChart: React.FC<Props> = ({ timeRange }) => {
    const [rawData, setRawData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [timePeriod, settimePeriod] = useState(null);
    const [combinedData, setCombinedData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await fetcher(CHART_API[T.CASESV2][T.THREE_MONTHS]);
            setRawData(data);
        })();
    }, []);

    useEffect(() => {
        if (!rawData) return;
        let _timePeriod = Object.keys(rawData);

        let T = _timePeriod.length;
        _timePeriod = _timePeriod.slice(T - timeRange, T);
        settimePeriod(_timePeriod);

        const combined = _timePeriod.map((date) => {
            return rawData[date][0] + rawData[date][1];
        }, {});
        setCombinedData(combined);

        const domestic = _timePeriod.map((date) => {
            return rawData[date][0];
        }, {});
        const imported = _timePeriod.map((date) => {
            return rawData[date][1];
        }, {});
        setCurrentData({ domestic, imported });

        if (activeIndex != _timePeriod.length - 1) setActiveIndex(_timePeriod.length - 1);
    }, [rawData, timeRange]);

    const stepSize = useMemo(() => {
        if (!combinedData) return 0;
        const max = Math.max(...combinedData);

        let stepSize = 20;
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
    }, [combinedData]);

    const chartRef = useRef<Line | null>();
    const _theme = useTheme();

    if (!currentData) return <ChartSkeleton></ChartSkeleton>;

    const getData = (canvas) => {
        if (timeRange > 14) {
            return {
                datasets: [
                    {
                        label: "확진자",
                        data: combinedData,
                        type: timePeriod.length > 14 ? "line" : "bar",
                        backgroundColor: setGradient(canvas, CHART_PRIMARY_COLOR),
                        borderColor: `${CHART_PRIMARY_COLOR}`,
                        pointRadius: 0,
                        borderWidth: 3,
                        lineTension: 0,
                        pointBorderWidth: 0,
                        barThickness: 6,
                    },
                ],
                labels: timePeriod.slice(timePeriod.length - timeRange, timePeriod.length),
            };
        } else {
            return {
                datasets: [
                    {
                        label: "국내",
                        data: currentData.domestic,
                        backgroundColor: setGradient(canvas, CHART_PRIMARY_COLOR),
                        borderColor: `${CHART_PRIMARY_COLOR}`,
                        borderWidth: 3,
                        lineTension: 0,
                        pointBorderWidth: 0,
                        barThickness: 6,
                    },
                    {
                        label: "해외",
                        data: currentData.imported,
                        barThickness: 6,
                        backgroundColor: CHART_SECONDARY_COLOR,
                    },
                ],
                labels: timePeriod.slice(timePeriod.length - timeRange, timePeriod.length),
            };
        }
    };

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

    const toolTipData = [
        { color: "greyText", value: currentData.imported[activeIndex], name: "해외" },
        { color: "blue", value: currentData.domestic[activeIndex], name: "국내" },
    ];
    return (
        <>
            <Wrapper>
                <Bar
                    data={getData}
                    ref={(el) => (chartRef.current = el)}
                    options={{
                        onClick: onPointClick,
                        ...(dailyChartOptions(_theme, stepSize, combinedData, false, timeRange) as any),
                    }}
                ></Bar>
            </Wrapper>
            <FixedTooltip
                data={toolTipData}
                onOptionSelect={setActiveIndex}
                selectedOption={activeIndex}
                options={timePeriod}
                optionName={(value) => {
                    const newDate = new Date(new Date(value).getTime() - 1000 * 60 * 60 * 24);
                    const month = newDate.getMonth() + 1;
                    const day = newDate.getDate();
                    return `${month}/${day}`;
                }}
            ></FixedTooltip>
        </>
    );
};

export default BarChart;
