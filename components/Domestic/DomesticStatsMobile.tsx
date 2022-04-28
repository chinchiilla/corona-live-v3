import MemoIcon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { DomesticType } from "@types/DomesticType";
import { numberWithCommas } from "@utils/helper";
import { dataState } from "@utils/states";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";

const statColors = {
    cases: "red",
    recovered: "green",
    deaths: "grey",
    tests: "blue",
};

const statNames = {
    cases: "확진자",
    deaths: "사망자",
    recovered: "완치자",
    negatives: "음성",
    tests: "검사자",
    testing: "검사중",
    pcrTests: "익명검사",
    vaccine: "백신 접종자",
};

const Wrapper = styled(Row)`
    margin: 0px 10px;
    padding: 0px 12px;
    padding: 6px 12px;
    padding-bottom: 14px;
    justify-content: space-around;

    /* border-radius: 12px;

    display: grid;
    grid-template-columns: auto auto;
    grid-row: auto auto;
    grid-column-gap: 6px;
    grid-row-gap: 12px; */
    & > div {
        /* flex: 1; */
    }
`;

const StatContainer = styled(Row)`
    /* justify-content: center; */
    align-items: center;
    & > div {
        text-align: center;
    }
`;
const StatName = styled(Row)`
    font-size: 12px;
    opacity: 0.7;
    margin-right: 6px;
    /* margin-bottom: 0px; */
`;
const StatValue = styled(Row)<{ statColor: string }>`
    font-size: 12px;
    font-weight: bold;
    opacity: 1;
    margin-right: 6px;

    /* margin-bottom: 4px; */
`;
const StatDelta = styled(Row)<{ color: string }>`
    font-size: 11px;
    border-radius: 50px;
    opacity: 0.8;
    align-items: center;
    padding: 0px 6px;
    padding-left: 8px;
    background: ${theme("darkGreyBg")};
    color: ${theme("darkGrey")};
    font-weight: bold;
    svg {
        stroke: ${theme("darkGrey")};
        stroke-width: 3px;
    }

    background: ${theme("redBg")};
    color: ${theme("red")};
    font-weight: bold;
    svg {
        stroke: ${theme("red")};
        stroke-width: 3px;
    }
`;

type Props = {
    domesticData: DomesticType;
};

const statKeys = ["cases", "deaths", "tests", "patientsWithSevereSymptons"];

const DomesticStatsMobile: React.FC<Props> = ({ domesticData }) => {
    const [currentStatKeys, setCurrentStatKeys] = useState(["cases", "deaths"]);
    if (!domesticData?.stats) return <></>;
    const { stats } = domesticData;
    return (
        <Wrapper>
            {currentStatKeys.map((statKey) => {
                if (!stats[statKey]) return <></>;
                let [total, delta] = stats[statKey];
                return (
                    <StatContainer>
                        <StatName>{statNames[statKey]}</StatName>
                        <StatValue statColor={statColors[statKey]}>{numberWithCommas(total)}</StatValue>
                        {!!delta && (
                            <StatDelta color={statColors[statKey]}>
                                {numberWithCommas(delta)}
                                <Row w='2px'></Row>
                                <MemoIcon name='ArrowUp' size={12}></MemoIcon>
                            </StatDelta>
                        )}
                    </StatContainer>
                );
            })}
        </Wrapper>
    );
};

export default DomesticStatsMobile;
