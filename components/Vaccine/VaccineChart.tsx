import styled from "styled-components";
import { transition } from "d3-transition";
import { max, bisector } from "d3-array";
import { scaleTime, scaleLinear, scaleBand } from "d3-scale";
import { select, mouse, event } from "d3-selection";
import { line, curveLinear, curveCardinal, stack } from "d3-shape";
import { useEffect, useMemo, useRef, useState } from "react";
import { axisBottom, axisLeft, axisRight } from "d3-axis";
import {
    BLUE,
    GREY,
    CHART_TYPE,
    TRANSITION_DURATION,
    T,
    DISTANCE_FLAGS,
    DISTANCE_FLAGS_CONFIG,
    GREEN,
} from "@constsV2";
import _ from "lodash";
import { numberWithCommas, addZero, generateToolTipHtml } from "@helper";
import { Col, Row } from "@components/Layout";
import useWindowSize from "@hooks/useWindowSize";
import { theme } from "@styles/themes";
import ToggleButtons from "@components/ToggleButtons";
import { ToggleOptionType } from "@utils/types";

const Wrapper = styled.div`
    padding-top: 16px;
    position: relative;

    z-index: 3;

    svg {
        .x-axis,
        .y-axis,
        .y-axis-left {
            .domain {
                opacity: 0;
            }
        }
        .x-axis line {
            opacity: 0;
        }

        .stop-left {
            stop-color: #3f51b5;
        }

        .stop-right {
            stop-color: #009688;
        }
        text {
            font-size: 12px;
            opacity: 0.6;
        }
        z-index: 2;
    }

    .label {
        fill: ${theme("darkGreyText")};
    }
`;

const yTicksGenerator = (maxY, yStepSize, tickLength = null) => {
    let maxSteps = Math.ceil(maxY / yStepSize);
    return [...Array(tickLength || maxSteps + 1)].map((_, i) => i * yStepSize);
};

const xCallback = (d) => {
    let year = d.getYear() - 2100;
    let month = d.getMonth() + 1;
    let day = d.getDate();

    return `${addZero(month)}/${addZero(day)}`;
};

const xTicksGenerator = (range, xParser) => {
    let ticksInterval = range.length < 20 ? Math.ceil(range.length / 7) : Math.floor(range.length / 7);
    let R = range.length;
    return range.reduce((arr, val, i) => {
        if ((R - i - 1) % ticksInterval == 0) arr.push(xParser(val));
        return arr;
    }, []);
};

const yStepSizeGenerator = (maxY) => {
    let stepSize = `${Math.ceil(maxY / 4)}`;
    let firstDigit = Number(stepSize[0]) + 1;
    let zeros = stepSize.length - 1;

    if (zeros == 0) return Number(stepSize);

    return firstDigit * 10 ** zeros;
};

const yAxisTicksGenerator = (data, tickLength = null) => {
    let maxY = max([...Object.values(data)]);
    let stepSize = yStepSizeGenerator(Number(maxY));

    let tickValues = yTicksGenerator(maxY, stepSize, tickLength);

    return { max: maxY, stepSize, tickValues };
};

type Props = {
    dataSet: any;
};
const margin = { left: 30, right: 30, top: 16, bottom: 20 };

const VaccineChart: React.FC<Props> = ({ dataSet }) => {
    const { width: windowWidth } = useWindowSize();
    const [vaccineType, setVaccineType] = useState("vaccine");
    const activeBarColor = GREEN + "AA";
    const width = windowWidth ? Math.min(500 - 12 * 2, windowWidth) : null;
    const height = width && (width * 4) / 10;
    const [reload, setReload] = useState(false);
    const ref = useRef();
    const containerRef = useRef();

    const data = useMemo(() => {
        const timePeriod = Object.keys(dataSet["vaccine"]);
        const T = timePeriod.length;
        return timePeriod.slice(T - 7, T).reduce((obj, date) => ((obj[date] = dataSet[vaccineType][date]), obj), {});
    }, [dataSet, vaccineType]);
    useEffect(() => {
        setReload((a) => !a);
    }, []);

    const [range] = useMemo(() => {
        const range = Object.keys(data);

        return [range];
    }, [data]);

    const { xScale, xParser, yScale } = useMemo(() => {
        const L = range.length;

        const xParser = (a) => new Date(a);

        let xScale = scaleTime()
            .clamp(true)
            .domain([xParser(range[0]), xParser(range[L - 1])])
            .range([margin.left, width - margin.right]);

        let { tickValues } = yAxisTicksGenerator(data);
        let yScale = scaleLinear()
            .domain([0, tickValues[tickValues.length - 1]])
            .range([height - margin.bottom, margin.top]);

        return { xScale, xParser, yScale };
    }, [data, width]);

    const L = range.length;

    const [barWidth] = useMemo(() => {
        let barWidth = 8;
        return [barWidth];
    }, [range, width]);

    useEffect(() => {
        if (!data) return;
        const svg = select(ref.current);

        const t = transition().duration(TRANSITION_DURATION);

        const updateAxis = () => {
            const updateAxisX = () => {
                const xAxis = (g) =>
                    g
                        .attr("class", "x-axis")
                        .call(
                            axisBottom().scale(xScale).tickValues(xTicksGenerator(range, xParser)).tickFormat(xCallback)
                        );

                svg.select(".x-axis")
                    .attr("transform", `translate(0, ${height - margin.bottom})`)
                    .call(xAxis);
            };
            updateAxisX();
        };
        updateAxis();

        const _yScale = yScale;

        const barHeight = (hour) => height - margin.bottom - _yScale(data[hour]);

        const barTop = (hour) => {
            return _yScale(data[hour]);
        };

        const drawBar = true;
        if (drawBar) {
            const barLeft = (hour) => xScale(xParser(hour)) - barWidth / 2;

            const updateBar = () => {
                svg.selectAll(".bar")
                    .data(range)
                    .join((enter) =>
                        enter
                            .append("rect")
                            .attr("class", "bar")

                            .attr("width", barWidth)
                            .attr("height", barHeight)
                            .attr("fill", (hour) => activeBarColor)
                            .attr("x", barLeft)
                            .attr("y", (hour) => _yScale(data[hour]) + 2 + barTop(hour))
                            .attr("rx", 20)
                    )
                    .transition(t)
                    .attr("width", barWidth)
                    .attr("height", (hour) => height - margin.bottom - _yScale(data[hour]))
                    .attr("fill", (hour) => activeBarColor)
                    .attr("x", barLeft)
                    .attr("y", (hour) => barTop(hour))
                    .attr("rx", 3)
                    .attr("ry", 3);
            };
            updateBar();
        }

        const drawLabel = true;
        if (drawLabel) {
            const labelTop = (hour) => {
                return _yScale(data[hour]) - 10;
            };

            const labelValue = (hour) => {
                return numberWithCommas(data[hour]);
            };

            const updateLabel = () => {
                svg.selectAll(".label")
                    .data(range)
                    .join((enter) =>
                        enter
                            .append("text")
                            .text(labelValue)
                            .attr("class", "label")
                            .attr("text-anchor", "middle")
                            .attr("x", (hour) => xScale(xParser(hour)))
                            .attr("y", labelTop)
                    )
                    .transition(t)
                    .text(labelValue)
                    .attr("x", (hour) => xScale(xParser(hour)))
                    .attr("y", labelTop);
            };
            updateLabel();
        } else {
            svg.selectAll(".label").remove();
        }
    }, [ref, data, range, width, containerRef, reload, height, windowWidth]);

    const mapToggleOptions = useMemo<ToggleOptionType[]>(
        () => [
            { name: "전체", value: "vaccine", visible: true },

            { name: "화이자", value: "pfizer", visible: true },
            { name: "아스트라제네카", value: "az", visible: true },
        ],
        []
    );

    if (!width || !height) return <></>;
    return (
        <>
            <Row p='0px 12px'>
                <ToggleButtons
                    full
                    shadow
                    noBg
                    small
                    divider
                    options={mapToggleOptions}
                    activeOption={vaccineType}
                    setOption={setVaccineType}
                ></ToggleButtons>
            </Row>

            <Wrapper>
                <svg
                    ref={ref}
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio='xMidYMid meet'
                    style={{ width: `${width}px`, height: `${height}px` }}
                >
                    <g className='x-axis'></g>
                </svg>
            </Wrapper>
        </>
    );
};

export default VaccineChart;
