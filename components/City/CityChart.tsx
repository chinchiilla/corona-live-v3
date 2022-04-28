import { CITY_CHART_OPTIONS, CITY_MAIN_OPTIONS } from "@utils/chartConfigs";
import React from "react";
import Chart from "../Chart";

type Props = {
    cityId: string;
};

const DomesticChart: React.FC<Props> = ({ cityId }) => {
    return (
        <Chart
            CHART_OPTIONS={CITY_CHART_OPTIONS}
            MAIN_OPTIONS={CITY_MAIN_OPTIONS}
            initChartOptions={{
                type: "daily",
                range: 7,
            }}
            initMainOption={"cases"}
            dataType='DOMESTIC'
            chartId='1'
            cityId={cityId}
        ></Chart>
    );
};

export default DomesticChart;
