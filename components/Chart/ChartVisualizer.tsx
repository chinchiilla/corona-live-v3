import { useContext, useEffect, useMemo, useRef, useState } from "react";

import styled from "styled-components";
import { transition } from "d3-transition";
import { max, bisector } from "d3-array";
import { select, mouse, event } from "d3-selection";
import { scaleTime, scaleLinear, scaleBand } from "d3-scale";
import { line, curveLinear, curveCardinal, stack } from "d3-shape";
import { axisBottom, axisLeft, axisRight } from "d3-axis";
import { BLUE, GREY, CHART_TYPE, TRANSITION_DURATION, T, DISTANCE_FLAGS, DISTANCE_FLAGS_CONFIG } from "@constsV2";
import _ from "lodash";
import { numberWithCommas, addZero, generateToolTipHtml } from "@helper";
import { Col } from "@components/Layout";
import { theme } from "@styles/themes";
import ChartTooltip from "./ChartTooltip";
import { useTheme } from "@hooks/useTheme";
import { media } from "@styles/media";
import { ThemeContext } from "@contexts/ThemeContext";
const Wrapper = styled.div`
    padding-top: 50px;
    position: relative;
    * {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
    }
    visibility: visible;

    /* ${media.phablet} {
        .hide {
            visibility: hidden;
        }
        rect.grey {
            fill: ${theme("greyBar")};
        }
        circle.grey {
            fill: ${theme("greyCircle")};
        }
    } */

    /* .chart-tooltip {
        top: 0px;
        position: relative;
        width: fit-content;
        background: ${theme("greyBg")};
        padding: 4px 8px;
        margin: 0px 12px;
        border-radius: 12px;
        .chart-tooltip-info {
            font-size: 11px;
            margin-bottom: -6px;
            opacity: 0.7;
        }
        .chart-tooltip-stats {
            display: flex;
            flex-direction: row;
            margin-bottom: -2px;

            .domestic-daily-container {
                font-weight: bold;
                font-size: 24px;
                span {
                    font-weight: 400;

                    font-size: 14px;
                    opacity: 0.7;
                }
            }
            .live-container {
                display: flex;
                flex-direction: column;
                &:first-of-type {
                    margin-right: 8px;
                }
                .label {
                    font-size: 12px;
                    margin-bottom: -4px;
                    font-weight: 400;
                    opacity: 0.7;
                }
                .stat {
                    font-size: 22px;
                    font-weight: bold;
                    span {
                        font-size: 16px;
                        font-weight: 400;
                        opacity: 0.7;
                    }
                }
            }
        }
        .chart-tooltip-date {
            font-size: 11px;
            opacity: 0.7;
        }
    } */
    z-index: 3;

    svg {
        z-index: 2;
        g {
            z-index: 2;
        }
        rect,
        path {
            z-index: 10000;
            z-index: 2;
        }
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

    .tooltip-info {
        display: none;
        position: absolute;
        box-shadow: -1px 1px 20px #0000001e;
        background: ${theme("bg")};
        border-radius: 10px;
        z-index: 1;

        .tooltip-container {
            display: flex;
            align-items: stretch;
            justify-content: stretch;
            .date {
                font-size: 12px;
                display: flex;
                flex-direction: column;
                padding: 2px 10px;
                align-items: center;
                justify-content: center;
                color: #555;
                border-right: 1px solid #eee;
                font-weight: bold;
                background: rgba(0, 0, 0, 0.03);
                .small {
                    font-size: 11px;
                    font-weight: 400;
                    display: flex;
                    opacity: 0.7;
                }
            }
            .infos {
                font-size: 13px;
                display: flex;
                flex-direction: column-reverse;
                padding: 3px 4px;
                padding-right: 8px;
                .info {
                    margin: 2px 0px;
                    margin-right: 4px;
                    display: flex;
                    align-items: center;
                    &::before {
                        content: "";
                        width: 6px;
                        height: 6px;
                        border-radius: 10px;
                        margin: 0px 8px;
                    }
                }

                .grey {
                    color: #999;
                    &::before {
                        background: #999;
                        box-shadow: 0px 0px 0px 4px #99999930;
                    }
                }
                .blue {
                    color: ${BLUE};
                    &::before {
                        background: ${BLUE};
                        box-shadow: 0px 0px 0px 4px ${BLUE}30;
                    }
                }
                div {
                    margin-left: 4px;
                    display: flex;
                    &:first-child {
                        margin-right: 0px;
                    }
                    .label {
                        font-weight: 400;
                        opacity: 0.8;
                    }
                    .value {
                        font-weight: 700;
                    }
                }
            }
        }
    }

    .tooltip-date {
        position: absolute;
        /* box-shadow: 1px 1px 20px 0px #ccc; */
        background: ${theme("shadow")};
        box-shadow: 1px 1px 20px 0px ${theme("semiDarkGreyText")}40;
        box-shadow: 1px 1px 20px 0px ${theme("cityLiveBoardShadow")}40;

        color: #555;
        color: ${theme("darkGreyText")}EE;
        border-radius: 10px;
        border: 1px solid ${theme("sectionBorder")};

        padding: 1px 10px;
        font-size: 11px;
        /* color: ${BLUE}; */
        font-weight: bold;
        opacity: 0;
        z-index: 2;
    }

    .label {
        fill: ${theme("darkGreyText")};
    }
    .tooltip-line {
        /* display: none; */

        position: absolute;
        width: 0px;
        border-left: 2px dotted ${theme("darkGreyText")}30;
        /* border-left: 4px solid ${GREY}30; */
        /* background: ${GREY}90; */
        z-index: -1 !important;
    }

    .flags {
        position: absolute;
        width: 2px;
        /* border-left-color: red; */

        /* &::before {
            content: "";
            position: absolute;
            top: 0px;
            width: 0px;
            height: 0px;
            border: 16px solid transparent;
            border-left-width: 28px;
            border-color: inherit;
        } */
        .number {
            width: 24px;
            height: 20px;
            background: red;
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0px;
            left: 0px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            color: white;
            font-size: 12px;
        }
    }
`;

const xTicksGenerator = (range, xParser) => {
    let ticksInterval = range.length < 20 ? Math.ceil(range.length / 7) : Math.floor(range.length / 7);
    let R = range.length;
    return range.reduce((arr, val, i) => {
        if ((R - i - 1) % ticksInterval == 0) arr.push(xParser(val));
        return arr;
    }, []);
};

const margin = { left: 30, right: 30, top: 16, bottom: 20 };

function AxisChart({ dataSet, chartConfig, chartOptions, mainOption, activeHour, setActiveHour, dataType, chartId, hideMobileTooltip, sethideMobileTooltip }) {
    const _theme = useTheme();
    const [reload, setReload] = useState(false);
    const { width, height, xAxes, yAxes } = chartConfig;

    useEffect(() => {
        setReload((a) => !a);
    }, []);

    const prevChartTypes = useRef([]);
    const isShortChart = chartOptions.range === 7 && mainOption !== T.RATES;

    const [range, hasLeftAxis] = useMemo(() => {
        const range = Object.keys(dataSet[0].data);

        const hasLeftAxis = Object.keys(yAxes).some((id) => yAxes[id].position === "left");

        return [range, hasLeftAxis];
    }, [dataSet]);

    if (hasLeftAxis) {
        margin.left = 50;
        margin.right = 50;
    } else {
        margin.left = 30;
        margin.right = 50;
        if (isShortChart) {
            margin.right = 30;
        }
    }

    const { xScale, xParser, yScales } = useMemo(() => {
        if (mainOption == "cases" && chartOptions.type == "daily" && Number(range.length) < 90 && dataSet.length == 2) {
            margin.top = 36;
        } else {
            margin.top = 24;
        }

        const L = range.length;

        const isLive = chartOptions.type == "live";
        const xParser = (a) => (isLive ? a : new Date(a));

        let xScale = (isLive ? scaleLinear() : scaleTime().clamp(true))
            .domain([xParser(range[0]), xParser(range[L - 1])])
            .range([margin.left, width - margin.right]);

        let stack = {};

        let yScales = Object.keys(yAxes).reduce((obj, yAxisId) => {
            let { tickValues, stacked } = yAxes[yAxisId];
            obj[yAxisId] = scaleLinear()
                .domain([0, tickValues[tickValues.length - 1]])
                .range([height - margin.bottom, margin.top]);

            if (stacked) {
                stack[yAxisId] = {};
            }

            return obj;
        }, {});

        return { xScale, xParser, yScales };
    }, [chartOptions, dataSet]);

    const L = range.length;

    const [barWidth, barDeltaX] = useMemo(() => {
        // if (isShortChart) {
        //     margin.right = 30;
        // } else {
        //     margin.right = 50;
        // }

        let barWidth = Number(Math.min(8, (width / L) * 0.5).toFixed(2));

        let barChartLength = dataSet.filter(({ type, stack }) => type === CHART_TYPE.BAR && stack == null).length;

        let i = Object.keys(yAxes).reduce((obj, yAxisId) => ((obj[yAxisId] = -1), obj), {});
        const barDeltaX = dataSet.map(({ type, stack, yAxisId }) => {
            if (type == CHART_TYPE.BAR) {
                let startX = (barWidth / 2) * (barChartLength - 1) * -1;
                if (!yAxes[yAxisId].isStacked) i[yAxisId]++;
                return startX + barWidth * Math.max(i[yAxisId], 0);
            } else {
                return 0;
            }
        });

        let barAccY = Object.keys(yAxes).reduce((obj, yAxisId) => ((obj[yAxisId] = 0), obj), {});
        const barDeltaY = dataSet.map(({ type, stack, yAxisId }) => {
            if (type == CHART_TYPE.BAR) {
                if (yAxes[yAxisId].isStacked) {
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        });

        return [barWidth, barDeltaX];
    }, [range]);

    const ref = useRef();
    const containerRef = useRef();

    useEffect(() => {
        const onClick = (e) => {
            let clickedOnChart = Array.from(e.target.classList).includes(`chart-${chartId}`);
            sethideMobileTooltip(!clickedOnChart);
        };
        document.addEventListener("touchstart", onClick);
    }, []);

    useEffect(() => {
        const svg = select(ref.current);
        const container = select(containerRef.current);
        try {
            svg.transition();
        } catch (err) {
            return;
        }
        // const t = svg.transition().duration(TRANSITION_DURATION);
        const t = transition().duration(TRANSITION_DURATION);

        const chartTypes = dataSet.map((a) => a.type);
        const resetSvg = _.isEqual(prevChartTypes.current, chartTypes) === false;
        if (resetSvg) {
            console.log({ resetSvg });

            prevChartTypes.current.map((_, i) => {
                let group = svg.select(`.group-${i}`).remove();
                group.selectAll(`.area-${i}`).remove();
                group.selectAll(".bar").remove();
                group.selectAll(`.points-${i}`).remove();
            });
        }
        prevChartTypes.current = chartTypes;

        const updateAxis = () => {
            let hasLeft = false;
            Object.keys(yScales).forEach((yAxisId) => {
                let { tickValues, position, callback, isStacked } = yAxes[yAxisId];

                let yScale = yScales[yAxisId];
                let isLeft = position === "left";
                if (isLeft) hasLeft = true;

                if (isShortChart) {
                    margin.right = 30;
                } else {
                    margin.right = 50;
                }

                let x = isLeft ? -36 : 40;
                let translateX = isLeft ? margin.left : width - margin.right;

                const yAxisGenerator = (isLeft ? axisRight(yScale) : axisLeft(yScale))
                    .tickSize(width - margin.left - margin.right)
                    .tickValues(tickValues)
                    .tickFormat((a) => (a > 0 ? callback(a) : ""));

                const yAxis = (g) =>
                    g
                        .call(yAxisGenerator)
                        .call((g) => g.selectAll(".tick:first-of-type line").attr("stroke-opacity", isLeft ? 0 : 0.08))
                        .call((g) => g.selectAll(".tick:not(:first-of-type) line").attr("stroke-opacity", isLeft ? 0 : 0.08))
                        .call((g) => g.selectAll(".tick text").attr("x", x).attr("dy", 4));

                svg.select(isLeft ? ".y-axis-left" : ".y-axis")
                    .attr("transform", `translate(${translateX}, 0)`)
                    .attr("opacity", 1)
                    .call(yAxis);
            });
            if (!hasLeft) svg.select(".y-axis-left").attr("opacity", 0);
            if (isShortChart) {
                svg.select(".y-axis").attr("opacity", 0);
                // margin.right = 30;
            } else {
                // margin.right = 50;
            }

            const updateAxisX = () => {
                const xAxis = (g) =>
                    g.attr("class", "x-axis").call(axisBottom().scale(xScale).tickValues(xTicksGenerator(range, xParser)).tickFormat(xAxes.callback));

                svg.select(".x-axis")
                    .attr("transform", `translate(0, ${height - margin.bottom})`)
                    .call(xAxis);
            };
            updateAxisX();
        };
        updateAxis();

        dataSet.forEach(
            (
                {
                    data,
                    color,
                    zIndex,
                    type,
                    showPoints,
                    yAxisId,

                    lineWidth,
                    lineColor,
                    pointRadius,
                    pointColor,
                    noShadow,
                    barColor,
                    activeBarColor,

                    noLabel,
                    stack,
                },
                i
            ) => {
                const _yScale = yScales[yAxisId];

                const { isStacked } = yAxes[yAxisId];

                let group = svg.select(`.group-${i}`);
                const initRequired = group._groups[0][0] == undefined;
                if (initRequired) {
                    svg.append("g").attr("class", `group-${i}`);
                    group = svg.select(`.group-${i}`);
                }

                const drawPoints = !!showPoints;
                if (drawPoints) {
                    const updatePoint = () => {
                        group
                            .selectAll(`.points-${i}`)
                            .data(range)
                            .attr("zIndex", zIndex)
                            .join(
                                (enter) =>
                                    enter
                                        .append("circle")
                                        .attr("class", `points-${i} ${pointColor == GREY ? "grey" : ""}`)
                                        .attr("fill", pointColor)
                                        .attr("zIndex", zIndex)
                                        .attr("r", pointRadius)
                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour]))
                                        .style("opacity", 0)
                                        .call((enter) =>
                                            enter
                                                .transition(t)
                                                .style("opacity", 1)
                                                .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                                .attr("cy", (hour) => _yScale(data[hour]))
                                        ),
                                (update) =>
                                    update
                                        .transition(t)
                                        .style("opacity", 1)
                                        .attr("fill", color)
                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour]))
                            );
                    };
                    updatePoint();
                } else {
                    group.selectAll(`.points-${i}`).remove();
                }

                const drawBar = type === CHART_TYPE.BAR;
                if (drawBar) {
                    console.log("draw barrrr");

                    const barHeight = (hour) => height - margin.bottom - _yScale(data[hour]);

                    const barTop = (hour) => {
                        if (stack != null) {
                            return _yScale(dataSet[stack].data[hour]) - barHeight(hour);
                        } else {
                            return _yScale(data[hour]);
                        }
                    };

                    const barLeft = (hour) => xScale(xParser(hour)) + barDeltaX[i] - barWidth / 2;

                    const updateBar = () => {
                        group
                            .selectAll(".bar")
                            .data(range)
                            .join((enter) =>
                                enter
                                    .append("rect")
                                    .attr("class", `bar ${color == GREY ? "grey" : ""}`)
                                    // .attr("class", color == GREY ? "grey" : "")

                                    .attr("width", barWidth)
                                    .attr("height", barHeight)
                                    .attr("fill", (hour) => (isShortChart || activeHour == hour ? activeBarColor : barColor))
                                    .attr("x", barLeft)
                                    .attr("y", (hour) => _yScale(data[hour]) + 2 + barTop(hour))
                                    .attr("rx", 20)
                            )
                            .transition(t)
                            .attr("width", barWidth)
                            .attr("height", (hour) => height - margin.bottom - _yScale(data[hour]))
                            .attr("fill", (hour) => (isShortChart || activeHour == hour ? activeBarColor : barColor))
                            .attr("x", barLeft)
                            .attr("y", (hour) => barTop(hour))
                            .attr("rx", 3)
                            .attr("ry", 3);

                        // group
                        //     .selectAll(".bar")
                        //     .data(range)
                        //     .join((enter) =>
                        //         enter
                        //             .append("line")
                        //             .attr("class", "bar")
                        //             .attr("stroke-width", barWidth)
                        //             .attr("stroke", isShortChart ? activeBarColor : barColor)
                        //             .attr("x1", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                        //             .attr("x2", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                        //             .attr("y1", 0)
                        //             .attr("y2", 0)
                        //     )
                        //     .transition(t)
                        //     .attr("stroke-width", barWidth)
                        //     .attr("stroke", isShortChart ? activeBarColor : barColor)
                        //     .attr("x1", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                        //     .attr("x2", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                        //     .attr("y1", _yScale(0))
                        //     .attr("y2", (hour) => _yScale(data[hour]));
                    };
                    updateBar();
                }

                const drawLine = type === CHART_TYPE.LINE;
                if (drawLine) {
                    const updateArea = () => {
                        const linePath = line()
                            .curve(curveLinear)
                            .x((hour) => xScale(xParser(hour)))
                            .y((hour) => _yScale(data[hour]));

                        const mainGradient = group
                            .selectAll(`defs-${i}`)
                            .data([0])
                            .enter()
                            .append("defs")
                            .attr("id", `defs-${i}`)
                            .append("linearGradient")
                            .attr("id", `mainGradient-${i}`)
                            .attr("x2", "0%")
                            .attr("y2", "100%");

                        mainGradient.append("stop").attr("style", `stop-color:${color}50`).attr("offset", "0");
                        mainGradient.append("stop").attr("style", `stop-color:${color}00`).attr("offset", "0.3");
                        mainGradient.append("stop").attr("style", `stop-color:${color}00`).attr("offset", "1");

                        const extraX = width * 3;
                        const extraY = height * 3;

                        let leftM, rightM;
                        if (hasLeftAxis) {
                            leftM = 50;
                            rightM = 50;
                        } else {
                            leftM = 30;
                            rightM = 50;
                        }

                        // group
                        //     .append("defs")
                        //     .append("clipPath")
                        //     .attr("id", `maskClipPath-${i}`)
                        //     .append("rect")
                        //     .attr("width", width - leftM - rightM)
                        //     .attr("height", height - margin.top - margin.bottom + 2)
                        //     .attr("x", leftM)
                        //     .attr("y", margin.top);

                        //     <defs>
                        //     <clipPath id={`maskClipPath-${chartId}`}>
                        //         <rect
                        //             height={height - margin.top - margin.bottom + 2}
                        //             width={width - margin.left - margin.right}
                        //             x={margin.left}
                        //             y={margin.top}
                        //         ></rect>
                        //     </clipPath>
                        // </defs>

                        group
                            .selectAll(`.area-${i}`)
                            .data([range])
                            .join(
                                (enter) =>
                                    enter
                                        .append("path")
                                        .attr("class", `area-${i}`)
                                        .attr("stroke", lineColor)
                                        .attr("stroke-width", lineWidth)
                                        .attr("clip-path", `url(#maskClipPath-${chartId})`)
                                        .attr("d", (a) => {
                                            return linePath(a) + `L ${extraX} 0 L ${extraX} ${extraY} L -${extraY} ${extraY}`;
                                        })
                                        .attr("fill", noShadow ? "none" : `url(#mainGradient-${i})`),
                                (update) =>
                                    update
                                        .transition(t)
                                        .attr("stroke", lineColor)
                                        .attr("d", (a) => {
                                            return linePath(a) + `L ${extraX} 0 L ${extraX} ${extraY} L -${extraY} ${extraY}`;
                                        })
                                        .attr("fill", noShadow ? "none" : `url(#mainGradient-${i})`)
                            );
                    };
                    updateArea();
                }

                const drawLabel = isShortChart && !noLabel;
                if (drawLabel) {
                    const labelTop = (hour) => {
                        if (isStacked) {
                            return _yScale(dataSet.filter((a) => a.yAxisId == yAxisId).reduce((total, a) => total + a.data[hour], 0)) - 10;
                        } else {
                            return _yScale(data[hour]) - 10;
                        }
                    };

                    const labelValue = (hour) => {
                        if (isStacked) {
                            return numberWithCommas(dataSet.filter((a) => a.yAxisId == yAxisId).reduce((total, a) => total + a.data[hour], 0));
                        } else {
                            return numberWithCommas(data[hour]);
                        }
                    };

                    const updateLabel = () => {
                        group
                            .selectAll(".label")
                            .data(range)
                            .join((enter) =>
                                enter
                                    .append("text")
                                    .text(labelValue)
                                    .attr("class", "label")
                                    .attr("text-anchor", "middle")
                                    .attr("x", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                    .attr("y", labelTop)
                            )
                            .transition(t)
                            .text(labelValue)
                            .attr("x", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                            .attr("y", labelTop);
                    };
                    updateLabel();
                } else {
                    group.selectAll(".label").remove();
                }
            }
        );

        const drawFlags = false;

        // const drawFlags =
        //     chartOptions.type == "daily" &&
        //     chartOptions.range == "all" &&
        //     dataType == "DOMESTIC" &&
        //     chartOptions.testType != T.PCR_TESTS;

        if (drawFlags) {
            const getFlagHeight = (a) => (height - margin.bottom - margin.top) * ((DISTANCE_FLAGS[a].level * 3 + 2.5) / 10);
            const getFlagTop = (a) => (height - margin.bottom - margin.top) * (1 - (DISTANCE_FLAGS[a].level * 3 + 2.5) / 10);
            const range = Object.keys(DISTANCE_FLAGS);
            container
                .selectAll(".flags")
                .data(range)
                .join(
                    (enter) =>
                        enter
                            .append("div")
                            .attr("class", (a) => `flags distance-${DISTANCE_FLAGS[a].level}`)
                            .style("background", (a) => DISTANCE_FLAGS_CONFIG[DISTANCE_FLAGS[a].level])
                            // .style("border-color", (a) => DISTANCE_FLAGS_CONFIG[DISTANCE_FLAGS[a].level])
                            .style("z-index", (a) => Math.floor(100 - DISTANCE_FLAGS[a].level * 10))
                            // .attr('style',(a)`left:${}`)
                            .style("left", (a) => xScale(xParser(a)) - Number(barWidth) / 2 + "px")
                            .style("top", (a) => margin.top + getFlagTop(a) + "px")
                            // .style("width", barWidth + "px")
                            .style("height", (a) => getFlagHeight(a) + "px")
                            .append("div")
                            .attr("class", "number")
                            .style("background", (a) => DISTANCE_FLAGS_CONFIG[DISTANCE_FLAGS[a].level])

                            .html((a) => DISTANCE_FLAGS[a].level)

                    // .attr("width", barWidth)
                    // .attr("height", getFlagHeight)
                    // .attr("fill", (a) => DISTANCE_FLAGS_CONFIG[DISTANCE_FLAGS[a].level])
                    // .attr("x", (a) => xScale(xParser(a)) - barWidth / 2)
                    // .attr("y", (a) => margin.top + getFlagTop(a))
                );
            // .transition(t)
            // .style("left", (a) => xScale(xParser(a)) - barWidth / 2)
            // .style("top", (a) => margin.top + getFlagTop(a));
            // .attr("width", barWidth)
            // .attr("height", height - margin.bottom - margin.top)
            // .attr("fill", "orange")

            // .attr("x", (hour) => xScale(xParser(hour)) - barWidth / 2);
            // .attr("y", margin.top);
        } else {
            container.selectAll(".flags").remove();
        }

        const initEventListener = () => {
            function mousemove(e) {
                // e.preventDefault();
                // e.preventDefault();
                const xm = mouse(this)[0];
                const hour = xScale.invert(xm);

                if (!isNaN(hour)) {
                    const bisectDate = bisector((hour) => xParser(hour)).left;
                    const index = bisectDate(range, hour, 1);
                    const hourLeft = range[index - 1];
                    const hourRight = range[index];
                    const selectedHour = hour - xParser(hourLeft) < xParser(hourRight) - hour ? hourLeft : hourRight;
                    setActiveHour((prev) => selectedHour || prev);
                }
            }
            function mouseout() {
                setActiveHour(null);
            }

            // svg.selectAll("*").attr("pointer-events", "none");
            // svg.on("mousemove", mousemove).on("touchmove", mousemove).on("mouseout", mouseout).on("touchend", mouseout);
            container.selectAll("*").attr("pointer-events", "none");
            container.on("mousemove", mousemove).on("touchmove", mousemove);
            container.on("click", () => {});
            // .on("mouseout", mouseout)
            // .on("touchend", mouseout);
        };
        initEventListener();
    }, [ref, dataSet, range, reload]);

    useEffect(() => {
        const svg = select(ref.current);
        try {
            svg.transition();
        } catch (err) {
            return;
        }
        const container = select(containerRef.current);
        if (!isShortChart || true) {
            const t = svg.transition().duration(TRANSITION_DURATION);

            const updateTooltip = () => {
                const updateNewTooltip = () => {
                    const chartTooltip = container.select(".chart-tooltip");
                    // .html(generateToolTipHtml({ dataSet, activeHour, mainOption, chartOptions }));
                    const node = chartTooltip.node();
                    if (node) {
                        const { width: w } = chartTooltip.node().getBoundingClientRect();

                        let translateX = xScale(xParser(activeHour)) - w / 2;
                        if (translateX < 0) {
                            translateX = 0;
                        } else if (translateX + w > width - margin.right) {
                            translateX = width - margin.right - w;
                        }

                        chartTooltip.style("opacity", activeHour ? 1 : 1).style("left", `${translateX}px`);
                    }

                    // .style("top", `${2}px`);
                };
                updateNewTooltip();
                const updateTooltipLine = () => {
                    const tooltipLine = container.select(".tooltip-line");
                    tooltipLine
                        .style("opacity", activeHour ? 1 : 0)
                        .style("left", `${xScale(xParser(activeHour)) - 1}px`)
                        .style("top", `${50 + 10}px`)
                        .style("height", `${height + 50 - 10}px`);
                };
                updateTooltipLine();

                const updateTooltipBox = () => {
                    // const tooltipHtml = `
                    const dateText = () => {
                        if (activeHour) {
                            if (chartOptions.type == T.MONTHLY) {
                                let d = xParser(activeHour);
                                let month = d.getMonth() + 1;
                                d.setMonth(month);
                                d.setDate(-1);
                                if (d.getTime() > new Date().getTime()) {
                                    d = new Date();
                                    if (d.getDate() > 1) {
                                        d.setDate(d.getDate() - 1);
                                    }
                                }
                                let nextDay = d.getDate();
                                return `<div>${month}월</div><div class="small">${month}.1 ~ ${month}.${nextDay}</div>`;

                                // return `${month}월`;
                                // return `${month}/${1} - ${month}/${nextDay}`;
                                // return `${addZero(month)}/0${1} - ${addZero(month)}/${addZero(nextDay)}`;
                                // return `${month}월 ${1}일 - ${month}월 ${nextDay}일`;
                            } else if (chartOptions.type == T.WEEKLY) {
                                let d = xParser(activeHour);
                                let month = d.getMonth() + 1;
                                let day = d.getDate();
                                let leftOver = day % 7;
                                let week = Math.ceil((day - leftOver + 1) / 7);

                                d.setDate(d.getDate() + 7);
                                let nextMonth = d.getMonth() + 1;
                                let nextDay = d.getDate() - 1;
                                return `<div>${month}월 ${week}주</div><div class="small">${month}.${day} ~ ${nextMonth}.${nextDay}</div>`;
                            }
                            return xAxes.callback(xParser(activeHour));
                        } else {
                            return "";
                        }
                    };
                    const tooltipHtml = `<div class="tooltip-container"><div class="date">${dateText()}</div>
                    <div class="infos">${dataSet
                        .map(
                            (data) => `
                                    <div class="info ${data.color == BLUE ? "blue" : "grey"}"><div class="label">${
                                data.name
                            }</div>  <div class="value"> ${yAxes[data.yAxisId].tooltip(data.data[activeHour])}</div></div>
                                   `
                        )
                        .join("")}</div>
                `;
                    const tooltipBox = container.select(".tooltip-info").html(tooltipHtml);
                    const { width: w } = tooltipBox.node().getBoundingClientRect();

                    let translateX = xScale(xParser(activeHour)) - w / 2;
                    if (translateX < margin.left) {
                        translateX = margin.left;
                    } else if (translateX + w > width - margin.right) {
                        translateX = width - margin.right - w;
                    }

                    tooltipBox
                        // .style("opacity", activeHour ? 1 : 0)
                        .style("opacity", activeHour ? 1 : 1)
                        .style("left", `${translateX}px`)
                        .style("top", `${2}px`);
                };
                updateTooltipBox();

                const updateTooltipDate = () => {
                    const tooltipDate = container.select(".tooltip-date").html(xAxes.callback(xParser(activeHour)));
                    const { width: w } = tooltipDate.node().getBoundingClientRect();
                    tooltipDate
                        .style("opacity", activeHour ? 1 : 0)
                        .style("left", `${xScale(xParser(activeHour)) - w / 2}px`)
                        .style("top", `${height - margin.bottom + 100 + 11}px`);
                };
                updateTooltipDate();
            };
            updateTooltip();

            dataSet.forEach(({ data, color, type, showPoints, yAxisId, pointRadius, pointColor, activeBarColor, barColor }, i) => {
                const _yScale = yScales[yAxisId];

                let group = svg.select(`.group-${i}`);

                if (showPoints) {
                    const updatePoint = () => {
                        group
                            .selectAll(`.points-${i}-box-shadow`)
                            .data(range)
                            .join(
                                (enter) =>
                                    enter
                                        .append("circle")
                                        .attr("class", `points-${i}-box-shadow`)
                                        .attr("fill", pointColor)
                                        .attr("r", pointRadius * 3)
                                        .attr("opacity", (hour) => (hour == activeHour ? 0.5 : 0))
                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour])),
                                (update) =>
                                    update
                                        .transition(t)
                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour]))
                                        .attr("opacity", (hour) => (hour == activeHour ? 0.3 : 0))
                            );
                    };
                    updatePoint();
                } else if (type == CHART_TYPE.LINE) {
                    const updatePoint = () => {
                        group
                            .selectAll(`.points-${i}-box-shadow`)
                            .data(range)
                            .join(
                                (enter) =>
                                    enter
                                        .append("circle")
                                        .attr("class", `points-${i}-box-shadow`)
                                        .attr("fill", pointColor)
                                        .attr("r", pointRadius)
                                        .attr("stroke", `${pointColor}20`)
                                        .attr("stroke-width", pointRadius * 3)
                                        // .attr("opacity", (hour) => (hour == activeHour ? 0.5 : 0))
                                        .attr("opacity", (hour) => (hour == activeHour ? 1 : 0))

                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour])),
                                (update) =>
                                    update
                                        .attr("cx", (hour) => xScale(xParser(hour)) + barDeltaX[i])
                                        .attr("cy", (hour) => _yScale(data[hour]))
                                        .attr("opacity", (hour) => (hour == activeHour ? 1 : 0))
                            );
                    };
                    updatePoint();
                }
                if (type == CHART_TYPE.BAR) {
                    group
                        .selectAll(".bar")
                        .data(range)
                        .attr("fill", (hour) => (activeHour == hour ? activeBarColor : barColor));
                }
            });
        } else {
            container.select(".tooltip-date").style("opacity", 0);
            container.select(".tooltip-info").style("opacity", 0);
            container.select(".tooltip-line").style("opacity", 0);
        }
    }, [activeHour, dataSet, hideMobileTooltip]);

    return (
        <div ref={containerRef}>
            <Wrapper className={`chart-${chartId}`}>
                <div className={`tooltip-date  ${hideMobileTooltip ? "hide" : ""}`}></div>
                <div className={`tooltip-info ${hideMobileTooltip ? "hide" : ""}`}></div>
                <div className={`tooltip-line ${hideMobileTooltip ? "hide" : ""}`}></div>

                {/* <div className='chart-tooltip'> */}
                {/* <div className='chart-tooltip-info'>일평균 확진자</div> */}
                {/* <div className='chart-tooltip-stats'>
                    302<span>명</span>
                    <span> (국내 305명, 해외 85명)</span>
                </div>
                <div className='chart-tooltip-date'>2월 1일 ~ 3월 1일</div> */}
                {/* </div> */}
                <ChartTooltip
                    {...{
                        dataSet,
                        activeHour,
                        mainOption,
                        chartOptions,
                        dataType,
                        hideMobileTooltip,
                    }}
                ></ChartTooltip>
                <svg ref={ref} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio='xMidYMid meet' style={{ width: `${width}px`, height: `${height}px` }}>
                    <g className='x-axis'></g>
                    <g className='y-axis'></g>
                    <g className='y-axis-left'></g>
                    <defs>
                        <clipPath id={`maskClipPath-${chartId}`}>
                            <rect
                                height={height - margin.top - margin.bottom + 2}
                                width={width - margin.left - margin.right}
                                x={margin.left}
                                y={margin.top}
                            ></rect>
                        </clipPath>
                    </defs>
                </svg>
            </Wrapper>
        </div>
    );
}

export default AxisChart;
