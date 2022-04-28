import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { fetcher, numberWithCommas, setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col, Row } from "@components/Layout";
import FixedTooltip from "./FixedTooltip";
import { CHART_API } from "@utils/api";
import { T } from "@utils/constsV2";
import ChartSkeleton from "./ChartSkeleton";

const ratesChartOptions = (theme, cases) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: true,
            anchor: "end",
            align: "end",
            offset: 0,
            color: (context) => {
                return context.dataset.borderColor;
            },
            font: {
                size: 10,
            },
            formatter: (value) => {
                if (cases.length > 7) return "";
                if (Number(value) < 100) return `${value}%`;
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
                    stepSize: 20000,
                    max: 80000,
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
                    max: 8,
                    stepSize: 2,
                    callback: (value) => {
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
    timeRange: any;
};

const BarChart: React.FC<Props> = ({ timeRange }) => {
    const [rawData, setRawData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [timePeriod, settimePeriod] = useState(null);

    const chartRef = useRef<Line | null>();
    const _theme = useTheme();

    useEffect(() => {
        (async () => {
            const ratesData = await fetcher(CHART_API[T.RATES][T.THREE_MONTHS]);
            const testsDoneData = await fetcher(CHART_API[T.TESTS_DONE][T.THREE_MONTHS]);

            setRawData({ rates: ratesData, testsDone: testsDoneData });
            const _timePeriod = Object.keys(ratesData);

            // setRawData(data);
        })();
    }, []);

    useEffect(() => {
        if (!rawData) return;

        let _timePeriod = Object.keys(rawData.rates);
        let T = _timePeriod.length;
        _timePeriod = _timePeriod.slice(T - timeRange, T);
        settimePeriod(_timePeriod);

        const rates = _timePeriod.map((date) => {
            return rawData.rates[date];
        });

        const testsDone = _timePeriod.map((date) => {
            return rawData.testsDone[date];
        });

        setCurrentData({ rates, testsDone });

        if (activeIndex != _timePeriod.length - 1) setActiveIndex(_timePeriod.length - 1);
    }, [rawData, timeRange]);

    if (!currentData) return <ChartSkeleton></ChartSkeleton>;
    const getData = (canvas) => {
        return {
            datasets: [
                {
                    label: "확진율",
                    data: currentData.rates,
                    type: "line",
                    yAxisID: "B",
                    backgroundColor: setGradient(canvas, _theme("blue")),
                    borderColor: `${CHART_PRIMARY_COLOR}`,
                    borderWidth: 3,
                    lineTension: 0,
                    pointBorderWidth: 0,
                    barThickness: 6,
                },
                {
                    label: "검사완료",
                    data: currentData.testsDone,
                    type: "bar",
                    yAxisID: "A",
                    barThickness: timeRange > 30 ? 2 : 6,
                    backgroundColor: `${CHART_SECONDARY_COLOR}70`,
                },
            ],
            labels: timePeriod.slice(timePeriod.length - timeRange),
        };
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
        {
            color: "greyText",
            value: currentData.testsDone[activeIndex],
            name: "검사수",
            unitName: "",
            hideIcon: true,
        },
        { color: "blue", value: currentData.rates[activeIndex], name: "*확진율", unitName: "%", hideIcon: true },
    ];

    return (
        <>
            <Wrapper>
                <Bar
                    data={getData as any}
                    ref={(el) => (chartRef.current = el)}
                    options={{
                        onClick: onPointClick,
                        ...(ratesChartOptions(_theme, currentData.rates) as any),
                    }}
                ></Bar>
            </Wrapper>
            <FixedTooltip
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
                <Row jc='space-evenly'>
                    <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center'>
                        <Row fontWeight={700} mr='4px'>
                            *확진율
                        </Row>{" "}
                        = 결과양성/검사완료수
                    </Row>
                    <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center'>
                        <Row fontWeight={700} mr='4px'>
                            검사완료수
                        </Row>{" "}
                        = 결과음성 + 결과양성
                    </Row>
                </Row>
                <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center' mt='10px'>
                    질병관리청에 따르면 임시선별진료소 검사 건수는 중복 검사자를 포함할 수 있고 변동될 수 있는 잠정
                    통계라고 나와 있으며 누적 검사수/검사완료수에서 제외됐으므로 반영하지 않았습니다.
                </Row>
                <Row fontSize='12px' opacity='0.6' textAlign='center' jc='center' mt='10px'>
                    일일 확진율은 참고용으로만 사용부탁드립니다
                </Row>
            </Col>
        </>
    );
};

export default BarChart;
