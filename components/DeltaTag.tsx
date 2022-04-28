import React, { FC } from "react";
import styled, { css } from "styled-components";
import CountUp from "react-countup";

import { Box, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { useTheme } from "@hooks/useTheme";
import { prop, ifProp } from "@styles/tools";
import { ThemeType } from "@styles/themes";
import { numberWithCommas } from "@utils";

const Wrapper = styled(Row)<{ color?: string; small?: boolean; showBg?: boolean; medium?: boolean }>`
    color: ${prop("color")};
    font-weight: 500;
    opacity: 0.9;
    border-radius: 6px;
    border-radius: 50px;
    padding: 4px 8px;
    align-items: center;

    svg {
        stroke: ${prop("color")};
        stroke-width: 2.5px;
    }

    ${ifProp(
        "small",
        css`
            font-size: 11px;
            /* padding: 0px 2px; */
            font-weight: bold !important;
            stroke-width: 4px;
        `
    )};

    ${ifProp(
        "showBg",
        css`
            padding-left: 4px;
            margin-left: 4px;
            ${ifProp(
                "small",
                css`
                    padding: 0px 6px 0px 8px;
                `
            )};
        `
    )}

    ${ifProp(
        "medium",
        css`
            font-size: 11px;
            padding: 0px 0px;
            padding-left: 8px;
            padding-right: 6px;
            font-weight: bold !important;
            stroke-width: 4px;
        `
    )};
`;

interface Props {
    color: ThemeType;
    delta: number;
    small?: boolean;
    countUp?: boolean;
    showBg?: boolean;
    prevDelta?: number;
    showZero?: boolean;
    medium?: boolean;
}

const DeltaTag: FC<Props> = ({ color, delta, small, countUp, showBg, prevDelta, showZero, medium }) => {
    const theme = useTheme();
    const isZero = Math.abs(delta) == 0;
    const _color = isZero ? theme("greyText") : theme(color);
    const _bg = theme((color + "Bg") as ThemeType);
    if (isZero && !showZero) return <></>;
    return (
        <Wrapper {...{ small, showBg, medium }} color={_color} bg={showBg ? _bg : ""}>
            {!showBg && !isZero && (
                <>
                    {delta > 0 ? (
                        <Icon name='ArrowUp' size={small ? 12 : 16}></Icon>
                    ) : (
                        <Icon name='ArrowDown' size={small ? 12 : 16}></Icon>
                    )}
                    <Box w='1px'></Box>
                </>
            )}

            {!isZero ? (
                <>
                    {countUp ? (
                        <CountUp start={prevDelta} end={Math.abs(delta)} separator={","} duration={3}></CountUp>
                    ) : (
                        numberWithCommas(Math.abs(delta))
                    )}
                </>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: `-&nbsp;` }}></div>
            )}

            {showBg && !isZero && (
                <>
                    <Box w='1px'></Box>
                    {delta > 0 ? (
                        <Icon name='ArrowUp' size={small ? 12 : 16}></Icon>
                    ) : (
                        <Icon name='ArrowDown' size={small ? 12 : 16}></Icon>
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default DeltaTag;
