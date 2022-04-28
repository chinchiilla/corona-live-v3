import AddChartButton from "@components/Chart/AddChartButton";
import Icon from "@components/Icon";
import {
    Background,
    Box,
    ChartSection,
    ChartButtonSection,
    Row,
    Section,
    MobileNoBgSection,
    DesktopMode,
    Desktop,
    Mobile,
    DesktopSection,
} from "@components/Layout";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTheme } from "@hooks/useTheme";
import { DOMESTIC_CHART_OPTIONS, DOMESTIC_MAIN_OPTIONS } from "@utils/chartConfigs";
import React, { useState } from "react";
import styled from "styled-components";
import Chart from "../Chart";

type Props = {};

const initChartList = [
    {
        chartOptions: {
            type: "live",
            compare: "yesterday",
        },
        mainOption: "cases",
    },
];

const DomesticChart: React.FC<Props> = ({}) => {
    // const [chartList, setChartList] = useState(initChartList);
    const [chartList, setChartList] = useLocalStorage("domestic-chart", initChartList);
    const onAddNewChart = () => {
        const newChart = {
            chartOptions: {
                type: "live",
                compare: "yesterday",
            },
            mainOption: "cases",
        };
        if (chartList.length < 3) setChartList((prev) => [...prev, newChart]);
    };

    const saveCharts = (index, { mainOption, chartOptions }) => {
        setChartList((prev) =>
            prev.map((data, i) => {
                if (i == index) {
                    return { mainOption, chartOptions };
                } else {
                    return data;
                }
            })
        );
    };

    const deleteChart = (index) => {
        setChartList((prev) => prev.filter((data, i) => i != index));
    };

    const _theme = useTheme();

    return (
        <>
            {chartList.slice(0, 3).map(({ chartOptions, mainOption }, index) => (
                <ChartSection key={index}>
                    <Chart
                        CHART_OPTIONS={DOMESTIC_CHART_OPTIONS}
                        MAIN_OPTIONS={DOMESTIC_MAIN_OPTIONS}
                        initChartOptions={chartOptions}
                        initMainOption={mainOption}
                        dataType='DOMESTIC'
                        chartId={`domestic-${index}`}
                        saveCharts={(data) => saveCharts(index, data)}
                        deleteChart={index > 0 ? () => deleteChart(index) : null}
                        // onAddNewChart={index == 0 ? onAddNewChart : null}
                    ></Chart>
                    <Mobile>
                        {index == chartList.length - 1 && index < 2 && (
                            <AddChartButton onClick={onAddNewChart}>
                                <Icon fill={_theme("darkGreyText")} name='Add' size={12}></Icon>
                                <Row w='10px'></Row>
                                <strong>그래프 </strong>추가
                            </AddChartButton>
                        )}
                    </Mobile>
                </ChartSection>
            ))}

            {chartList.length < 3 && (
                <DesktopSection>
                    <AddChartButton onClick={onAddNewChart}>
                        <Icon fill={_theme("darkGreyText")} name='Add' size={12}></Icon>
                        <Row w='10px'></Row>
                        <strong>그래프 </strong>추가
                    </AddChartButton>
                </DesktopSection>
            )}

            {/* <Row h='10px'></Row> */}
            {/* {chartList.length < 3 && (
                <AddChartButton onClick={onAddNewChart}>
                    <strong>그래프 추가</strong>
                </AddChartButton>
            )} */}
        </>
    );
};

export default DomesticChart;
