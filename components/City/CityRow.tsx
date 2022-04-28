import ALink from "@components/ALink";
import DeltaTag from "@components/DeltaTag";
import MemoIcon from "@components/Icon";
import { Box, Td as RawTd } from "@components/Layout";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { DISTRICT_TD_FLEX } from "@utils/consts";
import { ct, numberWithCommas } from "@utils/helper";
import React from "react";
import styled, { css } from "styled-components";

const Td = styled(RawTd)<{ even?: boolean }>`
    font-size: 12px;
    flex-shrink: 0;
    display: flex;
    position: relative;
    border-radius: 8px;
    margin: 1px 2.5px;
    padding: 0px 8px;
    box-sizing: border-box;
    color: ${theme("darkGreyText")}DD;
    strong {
        font-weight: bold;
    }
    &:first-of-type {
        ::after {
            content: "";
            position: absolute;
            background: ${theme("bg")};

            right: 0;
            border-radius: 8px;

            width: calc(120%);
            height: 100%;
            z-index: -2;
        }
        ::before {
            content: "";
            position: absolute;
            border-radius: 8px;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        /* background: white; */
        position: sticky;
        left: 0px;
        z-index: 2;
        justify-content: center;
    }
    ${ifProp(
        "even",
        css`
            &:first-of-type,
            &:last-of-type {
                ::before {
                    background: ${theme("greyBg")};
                }
            }
        `
    )}
`;

const Wrapper = styled.div<{ even: boolean }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-shrink: 0;
    height: 48px;
    position: relative;
    margin-bottom: 2px;
    border-radius: 8px;

    justify-content: center;

    ${media.phablet} {
        justify-content: flex-start;
    }

    cursor: pointer;

    ${ifProp(
        "even",
        css`
            & > div {
                background: ${theme("greyBg")};
            }
        `
    )}
`;

const Cases = styled(Box)`
    font-size: 12px;
    color: ${theme("darkGreyText")};
    font-weight: 600;
`;
const Stat = ({ data }) => {
    if (!data)
        return (
            <Box fontSize='12px' opacity={0.8} ml='2px'>
                NA
            </Box>
        );

    const delta = data[1];
    const isNegative = delta < 0;
    return (
        <>
            <Cases>{numberWithCommas(data[0])}</Cases>
            <Box fontSize='10px' opacity={0.6} ml='2px'>
                명
            </Box>
            {!!data[1] && <DeltaTag color={isNegative ? "blue" : "red"} delta={data[1]} small showBg></DeltaTag>}
        </>
    );
};
const CityRow: React.FC<Props> = ({ data, even, cityId, guId }) => {
    const { cases, casesLive } = data;
    const region = ct(cityId, guId);
    return (
        <Wrapper even={even}>
            <Td flex={DISTRICT_TD_FLEX[0]} even={even}>
                <strong>{region}</strong>
            </Td>
            <Td flex={DISTRICT_TD_FLEX[2]}>
                <Stat data={cases} />
            </Td>
            <Td flex={DISTRICT_TD_FLEX[3]}>
                <Stat data={casesLive} />
            </Td>

            <Td flex={DISTRICT_TD_FLEX[4]} even={even}>
                <MemoIcon name='ChevronRight' size={20}></MemoIcon>
            </Td>
            {true && <ALink href={`/city/updates/${cityId}/${guId}`}>{region}</ALink>}
        </Wrapper>
    );
};

export default CityRow;
