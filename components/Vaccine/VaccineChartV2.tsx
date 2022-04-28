import { ChartSection } from "@components/Layout";
import { VACCINE_CHART_OPTIONS, VACCINE_MAIN_OPTIONS } from "@utils/chartConfigs";
import React, { useState } from "react";
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

const VaccineChartV2: React.FC<Props> = ({}) => {
    return (
        <ChartSection>
            <Chart
                CHART_OPTIONS={VACCINE_CHART_OPTIONS}
                MAIN_OPTIONS={VACCINE_MAIN_OPTIONS}
                initChartOptions={{
                    type: "daily",
                    range: 7,
                }}
                initMainOption={"vaccineTs"}
                dataType='DOMESTIC'
                chartId={`vaccine`}
            ></Chart>
        </ChartSection>
    );
};

export default VaccineChartV2;
