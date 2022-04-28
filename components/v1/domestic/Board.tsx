import React, { FC, Fragment, useEffect, useRef } from "react";
import CountUp from "react-countup";

import { Row, Col, Box } from "@components/Layout";
import DeltaTag from "./DeltaTag";
import { useTheme } from "@hooks/useTheme";
import styled from "styled-components";
import { numberWithCommas } from "@utils";
import Icon from "@components/Icon";

const Info = styled(Row)`
    font-size: 10px;
    opacity: 0.5;
    margin-top: 4px;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;
interface StatsProps {
    title: string;
    data: any;
    fadeInUp?: boolean;
    delay?: number;
    info?: string;
    vertical: boolean;
    numbersOnly?: boolean;
}

const Cases = styled(Row)`
    font-size: 24px;
    @media (max-width: 400px) {
        font-size: 22px;
    }
`;

const Stat: FC<StatsProps> = ({ title, data, info, vertical, numbersOnly, ...props }) => {
    const [total, delta] = data;
    const prevTotal = useRef(0);
    const prevDelta = useRef(0);

    useEffect(() => {
        prevTotal.current = total;
        prevDelta.current = delta;
    }, [total]);

    const theme = useTheme();

    const deltaPositive = delta > 0;
    const color = "darkGreyText";
    const deltaColor = deltaPositive ? "red" : "blue";
    const _color = theme(color);

    return (
        <Col {...props} ai={vertical ? "center" : "flex-start"}>
            <Box fontSize='11px' mb='2px' color={_color} opacity={0.7}>
                {title}
            </Box>
            <Row ai='center' style={{ flexDirection: vertical ? "column" : "row" }}>
                <Cases>
                    <Box fontWeight={700} color={_color}>
                        {true ? (
                            numberWithCommas(total)
                        ) : (
                            <CountUp start={history.state.prev} end={total} separator={","} duration={3} />
                        )}
                    </Box>
                    {!numbersOnly && (
                        <Box fontWeight={300} color={_color}>
                            명
                        </Box>
                    )}
                </Cases>
                {!vertical && <Box w='6px'></Box>}
                <DeltaTag
                    color={deltaColor}
                    delta={delta}
                    countUp={false}
                    prevDelta={prevDelta.current}
                    showBg={true}
                ></DeltaTag>
            </Row>
            {info && !!delta && (
                <Info>
                    <span>{info}</span>
                    <Row w='4px'></Row>
                    <Icon name='CurveArrow' size={10} fill={theme("darkGreyText")}></Icon>
                </Info>
            )}
        </Col>
    );
};

interface BoardDataType {
    data: [number, number];
    title: string;
    info?: string;
    vertical?: string;
}

interface BoardProps {
    data: BoardDataType[];
    numbersOnly?: boolean;
}

const Board: FC<BoardProps> = ({ data, numbersOnly }) => {
    return (
        <Row jc='space-evenly' my='22px'>
            {data.map((stat, i) => {
                return (
                    <Fragment key={i}>
                        {i > 0 && <Row w='20px'></Row>}
                        <Stat {...(stat as any)} numbersOnly={numbersOnly} fadeInUp delay={2}></Stat>
                    </Fragment>
                );
            })}
        </Row>
    );
};

export default Board;
