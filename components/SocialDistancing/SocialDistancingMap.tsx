import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import useSWR from "swr";
import { json } from "d3-fetch";
import * as topojson from "topojson";
import styled from "styled-components";
import { theme, ThemeType } from "@styles/themes";
import { Box, Col, Section } from "@components/Layout";
import { MAP_POINTS } from "@consts";
import { SocialDistancingType } from "@types/basic";

const [width, height] = [432, 488];
const D3_TRANSITION_DURATION = 3000;
interface Props {
    data: SocialDistancingType;
}

const Wrapper = styled(Col)`
    margin: auto;
    margin-bottom: -50px;
    margin-top: -10px;
    display: block;
    overflow: hidden;
    position: relative;
    width: 360px;

    svg {
        margin: auto;
        align-self: center;
        height: 100%;
        width: 100%;
        z-index: 10;
        text {
            font-size: 10px;
            font-weight: 600;
            text-align: right;
            text-anchor: middle;
        }
    }
`;

const Dokdo = styled.div`
    position: absolute;
    width: 22px;
    height: 22px;
    z-index: 100;
    right: 24px;
    top: 180px;
    svg {
        width: 100%;
        height: 100%;
    }
`;

const SLabel = styled.div<{ color: ThemeType }>`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme("mapLabel")};
    border-radius: 8px;
    padding: 4px 10px;
    box-shadow: 0 0 6px #00000025;
    line-height: 18px;
    transform: translate(-50%, -50%);
    z-index: 2;
    cursor: pointer;
    .name {
        font-size: 12px;
        margin-bottom: 1px;
        opacity: 0.8;
    }
    .cases {
        font-size: 16px;
        font-weight: bold;
    }
    .delta {
        font-size: 11px;
        flex-direction: row;
        display: flex;
        align-items: center;
        color: ${(props) => theme(props.color)};
        background: ${(props) => theme(props.color)}15;
        border-radius: 4px;
        padding-left: 4px;
        padding-right: 4px;
        svg {
            stroke: ${(props) => theme(props.color)};
            height: 12px;
        }
    }
`;

const InfoPanel = styled(Col)`
    border-radius: 12px;
    padding: 16px;
    margin: 0px 16px;
    span {
        font-size: 12px;
        margin-bottom: 4px;
    }
    div {
        font-size: 20px;
        font-weight: bold;
    }
`;

const SOCIAL_DISTANCE_COLORS = {
    1: 0.1,
    2: 0.3,
    3: 0.5,
    4: 1,
};

const Label = ({ pos, name, data, cityId }) => {
    const [left, top] = pos;
    const { level, from, to } = data;

    return (
        <SLabel fadeInUp style={{ left, top }}>
            <div className='name'>{name}</div>
            <div className='cases'>{level}</div>
        </SLabel>
    );
};

const SocialDistancingMap: React.FC<Props> = ({ data }) => {
    const currentTheme = useContext(ThemeContext);
    const svgRef = useRef(null);
    const [statType, setStatType] = useState("current");

    const { data: geoData } = useSWR(
        "/maps/korea2.json",
        async (file) => {
            return await json(file);
        },
        { suspense: false, revalidateOnFocus: false }
    );

    const path = useMemo(() => {
        if (!geoData) return null;
        const projection = geoMercator().fitSize([width, height], topojson.feature(geoData, geoData.objects.regions));

        return geoPath().projection(projection);
    }, [geoData]);

    const features = useMemo(() => {
        if (!geoData) return null;
        return topojson.feature(geoData, geoData.objects.regions).features;
    }, [geoData]);

    useEffect(() => {
        if (!geoData || !path || !features || !data) return;

        const svg = select(svgRef.current);
        const T = transition().duration(D3_TRANSITION_DURATION);

        svg.select(".regions")
            .selectAll("path")
            .data(features)
            .join(
                (enter) =>
                    enter
                        .append("path")
                        .attr("d", path)
                        .attr("stroke-width", 1)
                        .attr("stroke-opacity", 1)
                        .attr("fill", (d) => {
                            return `rgb(86, 115, 235,${SOCIAL_DISTANCE_COLORS[data.cities[d.properties.code].level]})`;
                        })
                        .attr("stroke", currentTheme["mapBorder"])
                        .style("cursor", "pointer"),
                (update) =>
                    update
                        .attr("stroke", currentTheme["mapBorder"])
                        .style("cursor", "pointer")
                        .attr("fill", (d) => {
                            return `rgb(86, 115, 235,${SOCIAL_DISTANCE_COLORS[data.cities[d.properties.code].level]})`;
                        })
            );

        select(".container")
            .selectAll("div")
            .data(features)
            .enter()
            .append("div")
            .attr("class", "label")
            .html((d) => {
                return `<div >${d.properties.name}</div>`;
            });
    }, [geoData, features, path, currentTheme, statType, svgRef, data]);

    if (!data) return <></>;

    return (
        <>
            <Wrapper fadeInUp className='container'>
                {features &&
                    features.map((f, i) => {
                        let { name, code } = f.properties;
                        let pos = MAP_POINTS[name].map((a) => a + "px");
                        return <Label key={code} pos={pos} name={name} cityId={code} data={data.cities[code]}></Label>;
                    })}

                <Dokdo>
                    <svg width='748.555' height='437.018' viewBox='0 0 748.555 437.018' fill='rgb(86, 115, 235, 0.15)'>
                        <g id='Group_67' data-name='Group 67' transform='translate(-1120.207 -2549.625)'>
                            <path
                                d='M6688.883,1711.255c-8.228,50.384,1.3,88.118,40.151,120.585s123.4,84.733,165.436,74.049,109.233-31.348,114.775-47.211,53.966-132.664,47.167-182.976-28.313-87.428-93.842-95.715-164.993,25.6-200.626,50.32S6697.11,1660.872,6688.883,1711.255Z'
                                transform='translate(-5563 974)'
                                strokeWidth='40'
                                stroke={currentTheme["mapBorder"]}
                            />
                            <path
                                d='M7293.052,1852.887c-13.152,22.2-32.658,117.672-2.672,148.827s131.109-40.509,131.109-40.509,16.327-68.508,0-87.713S7306.2,1830.687,7293.052,1852.887Z'
                                transform='translate(-5563 974)'
                                strokeWidth='40'
                                stroke={currentTheme["mapBorder"]}
                            />
                        </g>
                    </svg>
                </Dokdo>

                <Box fadeInUp>
                    <svg viewBox={`50 0 ${width - 150} ${height}`} preserveAspectRatio='xMidYMid meet' ref={svgRef}>
                        <div className='html'></div>
                        <g className='regions' />
                        <g className='labels' />
                        <g className='state-borders' />
                        <g className='district-borders' />
                    </svg>
                </Box>
            </Wrapper>
        </>
    );
};

export default SocialDistancingMap;
