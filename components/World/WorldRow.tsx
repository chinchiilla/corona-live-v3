import ALink from "@components/ALink";
import DeltaTag from "@components/DeltaTag";
import Icon from "@components/Icon";
import { Col, Row, Td as RawTd } from "@components/Layout";
import LastUpdatedTime from "@components/Updates/LastUpdatedTime";
import { API, ASSETS_URL, COUNTRY_CODES, COUNTRY_NAMES, SECOND } from "@consts";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { fetcher, numberWithCommas, sortByDate } from "@utils";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const Td = styled(RawTd)<{ even?: boolean }>`
    font-size: 12px;
    flex-shrink: 0;
    position: relative;
    border-radius: 8px;
    justify-content: flex-end;
    margin: 1px 2.5px;
    padding: 0px 8px;
    box-sizing: border-box;
    color: ${theme("darkGreyText")}DD;
    strong {
        font-weight: bold;
    }
    height: 100%;
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

        background: white;
        position: sticky;
        left: 0px;
        z-index: 2;
        justify-content: center;
    }

    ${ifProp(
        "even",
        css`
            &:first-of-type {
                ::before {
                    background: ${theme("greyBg")};
                }
            }
        `
    )}
`;

const Wrapper = styled(Row)<{ even: boolean }>`
    align-items: center;
    border-radius: 6px;
    height: 52px;
    padding: 0px 4px;
    margin-bottom: 2px;
    position: relative;
    color: ${theme("semiDarkGreyText")};
    font-size: 12px;

    ${ifProp(
        "even",
        css`
            & > div {
                background: ${theme("greyBg")};
            }
        `
    )}

    img {
        width: 20px;
        border-radius: 2px;
    }
`;

const CountryRank = styled(Row)`
    font-weight: bold;
    flex-basis: 26px;
    margin-right: 2px;
    justify-content: center;
`;

const CountryName = styled(Row)`
    margin-left: 8px;
    font-weight: 500;
    flex-basis: 82px;
    margin-right: 6px;
    word-break: keep-all;
`;

const CountryCases = styled(Row)`
    font-weight: 600;
    span {
        font-weight: 400;
        opacity: 0.7;
        padding-left: 2px;
    }
`;

const ConfirmedRates = styled(Row)``;

const ConfirmedCases = styled(Row)`
    flex-basis: 100px;
    align-items: flex-start;
    span {
        opacity: 0.7;
        font-size: 11px;
    }
`;

const NextButton = styled(Row)`
    flex: 1;
    justify-content: flex-end;
`;

type Props = {
    data: any;
    code: string;
    index: number;
    lastUpdated: string;
    tdFlex: any;
    updates: any;
    showShadow?: boolean;
};

const WorldRow: React.FC<Props> = ({ data, code, index, lastUpdated, tdFlex, updates, showShadow }) => {
    const { cases, casesDelta, deaths, deathsDelta, recovered, casesPerMil, tests } = data;
    const [showUpdates, setShowUpdates] = useState(false);

    let imgName = code.toLowerCase();
    if (imgName == "xo") imgName = "je";
    if (imgName.length > 2) imgName = "xx";

    let countryName = COUNTRY_NAMES[code];

    if (!countryName) return <></>;
    let fontSize = countryName.length > 5 ? 11 : 12;
    return (
        <>
            {/* <WorldUpdatesModal
                data={updates}
                onClose={() => setShowUpdates(false)}
                show={showUpdates}
                countryCode={code}
            ></WorldUpdatesModal> */}
            <Wrapper even={index % 2 == 0} onClick={() => setShowUpdates(true)}>
                {/* <Td flex={tdFlex[0]}>
                    <CountryRank>{index + 1}</CountryRank>
                </Td> */}
                <Td flex={tdFlex[0]} even={index % 2 == 0} showShadow={showShadow}>
                    <img src={`${ASSETS_URL}flags/${imgName}.svg`} alt={code}></img>
                    <CountryName fontSize={fontSize + "px"}>{countryName}</CountryName>
                </Td>
                <Td flex={tdFlex[1]}>
                    <Col ai='flex-end'>
                        <Row jc='flex-end' mt='-2px' ai='flex-start'>
                            <CountryCases>{numberWithCommas(cases)}</CountryCases>
                            {/* <span>명</span> */}
                        </Row>
                        <DeltaTag delta={casesDelta} color={"red"} small></DeltaTag>
                    </Col>
                </Td>
                <Td flex={tdFlex[2]}>
                    <Col ai='flex-end'>
                        <Row jc='flex-end' mt='-2px' ai='flex-start'>
                            <CountryCases>{numberWithCommas(deaths)}</CountryCases>
                            {/* <span>명</span> */}
                        </Row>
                        <DeltaTag delta={deathsDelta} color={"red"} small></DeltaTag>
                    </Col>
                </Td>
                <Td flex={tdFlex[3]} ai='center' end={true}>
                    <Row jc='flex-end' mt='-2px' ai='flex-start'>
                        <CountryCases>{numberWithCommas(recovered)}</CountryCases>
                    </Row>
                </Td>
                <Td flex={tdFlex[4]} ai='center' end={true}>
                    <Row jc='flex-end' mt='-2px' ai='flex-start'>
                        <CountryCases>{numberWithCommas(casesPerMil)}</CountryCases>
                    </Row>
                </Td>
                {/* <Td flex={tdFlex[5]} ai='center' end={true}>
                    <Row jc='flex-end' mt='-2px' ai='flex-start'>
                        <CountryCases>{numberWithCommas(tests)}</CountryCases>
                    </Row>
                </Td> */}
                {/* {true && <ALink href={`/world/updates/${code}`}>{countryName}</ALink>} */}
            </Wrapper>
        </>
    );
};

export default WorldRow;
