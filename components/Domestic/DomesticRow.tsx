import ALink from "@components/ALink";
import DeltaTag from "@components/DeltaTag";
import MemoIcon from "@components/Icon";
import { Box, Col, Flex, Row, Td as RawTd } from "@components/Layout";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { DomesticRowType } from "@types/DomesticType";
import { CITY_TD_FLEX, UNAVALIABLE_REGIONS } from "@utils/consts";
import { ct, numberWithCommas } from "@utils/helper";
import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";

const Td = styled(RawTd)<{ even?: boolean; showShadow?: boolean }>`
    font-size: 12px;
    flex-shrink: 0;
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
            ${ifProp(
                "showShadow",
                css`
                    box-shadow: 4px 0 14px -4px #00000010;
                `
            )}
            border-radius: 8px;

            width: calc(120%);
            height: 100%;
            z-index: -2;
        }
        ::before {
            content: "";
            position: absolute;
            /* background: ${theme("red")}; */
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
    &:last-of-type {
        /* background: white;
        position: sticky;
        right: 0px;
        z-index: 2;
        justify-content: center;

        ::after {
            content: "";
            position: absolute;
            background: white;

            width: 100%;
            height: 100%;
            z-index: -2;
            right: 0;
        }
        ::before {
            content: "";
            position: absolute;
            background: ${theme("greyBg")};
            border-radius: 8px;

            width: 100%;
            height: 100%;
            z-index: -1;
        } */

        /* border-top-right-radius: 8px;
        border-bottom-right-radius: 8px; */
    }
    ${ifProp(
        "even",
        css`
            &:first-of-type,
            &:last-of-type {
                ::before {
                    background: ${theme("greyBg")};
                }
                /* background: ${theme("greyBg")}; */
                /* background: yellow; */
            }
        `
    )}
    padding-left:11px;
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
type Props = {
    data: DomesticRowType;
    even: boolean;
    cityId: number;
    showShadow: boolean;
};

const statColors = {
    cases: "red",
    recovered: "green",
    deaths: "red",
    casesLive: "red",
    vaccine: "green",
};

const Cases = styled(Box)`
    font-size: 13px;
    color: ${theme("darkGreyText")}DD;
    font-weight: 600;
`;
const Stat = ({ data, statKey }) => {
    if (!data)
        return (
            <Box fontSize='12px' opacity={0.8} ml='2px'>
                NA
            </Box>
        );
    const delta = data[1];
    const isNegative = delta < 0;

    return (
        // <Col alignItems='flex-end'>
        <>
            <Row ai='center'>
                <Cases>{numberWithCommas(data[0]) || 0}</Cases>
                <Box fontSize='10px' opacity={0.6} ml='2px'>
                    명
                </Box>

                {!!data[1] && (
                    <DeltaTag color={isNegative ? "blue" : statColors[statKey]} delta={delta} small showBg></DeltaTag>
                )}
            </Row>

            {/* </Col> */}
        </>
    );
};
const RowV2: React.FC<Props> = ({ data, even, cityId, showShadow }) => {
    const { push } = useRouter();
    const { cases, casesLive, deaths, distanceLevel, per100k, recovered, vaccine } = data;
    const region = ct(cityId);
    return (
        <Wrapper even={even} onClick={() => push(`/city/${cityId}`)}>
            <Td flex={CITY_TD_FLEX[0]} even={even} showShadow={showShadow}>
                <strong>{region}</strong>

                {/* <Divider></Divider> */}
            </Td>
            {!UNAVALIABLE_REGIONS[region] && <ALink href={`/city/${cityId}`}>{region}</ALink>}
            {/* <Td flex={CITY_TD_FLEX[1]} jc='center' ai='center'></Td> */}

            <Td flex={CITY_TD_FLEX[3]}>
                <Stat data={casesLive} statKey='casesLive' />
            </Td>
            <Td flex={CITY_TD_FLEX[2]}>
                <Stat data={cases} statKey='cases' />
            </Td>
            <Td flex={CITY_TD_FLEX[4]}>
                <Stat data={deaths} statKey='deaths' />
            </Td>

            {/* <Td flex={CITY_TD_FLEX[5]}>
                <Stat data={vaccine} statKey='vaccine' />
            </Td> */}
            <Td flex={CITY_TD_FLEX[5]}>
                <Stat data={recovered} statKey='recovered' />
            </Td>
            <Td flex={CITY_TD_FLEX[6]}>
                <Stat data={per100k} />
            </Td>
            <Td flex={CITY_TD_FLEX[7]} even={even}>
                <MemoIcon name='ChevronRight' size={20}></MemoIcon>
            </Td>
        </Wrapper>
    );
};

const Divider = styled(Col)`
    position: absolute;
    right: 0;
    justify-content: center;
    align-items: center;
    width: 1px;
    height: 12px;
    background: ${theme("darkGrey")}50;
`;

export default RowV2;
