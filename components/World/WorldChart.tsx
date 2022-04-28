import AddChartButton from "@components/Chart/AddChartButton";
import Icon from "@components/Icon";
import { ChartSection, DesktopSection, Mobile, Row, Section } from "@components/Layout";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTheme } from "@hooks/useTheme";
import { WORLD_CHART_OPTIONS, WORLD_MAIN_OPTIONS } from "@utils/chartConfigs";
import React, { useState } from "react";
import Chart from "../Chart";

type Props = {};

const initChartList = [
    {
        chartOptions: {
            type: "daily",
            range: 7,
        },
        mainOption: "cases",
    },
];

const WorldChart: React.FC<Props> = ({}) => {
    const [chartList, setChartList] = useLocalStorage("world-chart", initChartList);
    const onAddNewChart = () => {
        const newChart = {
            chartOptions: {
                type: "daily",
                range: 7,
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
                <ChartSection>
                    <Chart
                        CHART_OPTIONS={WORLD_CHART_OPTIONS}
                        MAIN_OPTIONS={WORLD_MAIN_OPTIONS}
                        initChartOptions={chartOptions}
                        initMainOption={mainOption}
                        dataType='WORLD'
                        chartId={`world-${index}`}
                        saveCharts={(data) => saveCharts(index, data)}
                        deleteChart={index > 0 ? () => deleteChart(index) : null}
                    ></Chart>
                    {/* {chartList.length < 3 && index == chartList.length - 1 && (
                        <AddChartButton onClick={onAddNewChart}>
                            <strong>그래프 </strong>추가
                        </AddChartButton>
                    )} */}
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
            {/* <Row h='10px'></Row>
            {chartList.length < 3 && (
                <AddChartButton onClick={onAddNewChart}>
                    <strong>그래프</strong> 추가하기
                </AddChartButton>
            )} */}
        </>
    );
};

export default WorldChart;
