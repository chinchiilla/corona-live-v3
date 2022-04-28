import MemoIcon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { DomesticType } from "@types/DomesticType";
import { numberWithCommas } from "@utils/helper";
import { dataState } from "@utils/states";
import React from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";

const statKeys = ["cases", "deaths", "tests", "patientsWithSevereSymptons"];

const statColors = {
    cases: "red",
    recovered: "green",
    deaths: "grey",
    tests: "blue",
};

const statNames = {
    cases: "총 확진자",
    deaths: "총 사망자",
    recovered: "총 완치자",
    negatives: "음성",
    tests: "총 검사자",
    testing: "검사중",
    pcrTests: "익명검사",
    vaccine: "백신 접종자",
    patientsWithSevereSymptons: "위중증환자",
};

const Wrapper = styled(Row)`
    margin: 0px 10px;
    padding: 6px 8px;
    padding: 4px 8px;
    border-radius: 12px;
    justify-content: space-between;
    justify-content: space-around;
    & > div {
        /* flex: 1; */
    }
`;

const StatContainer = styled(Col)`
    justify-content: center;
    align-items: center;
    & > div {
        text-align: center;
    }
`;
const StatName = styled(Row)`
    font-size: 11px;
    opacity: 0.7;
    margin-bottom: 1px;
`;
const StatValue = styled(Row)<{ statColor: string }>`
    font-size: 15px;
    font-weight: bold;
    opacity: 1;
    margin-bottom: 2px;

    ${(props) => css`
        color: ${theme(props.statColor)};
    `}
`;
const StatDelta = styled(Row)<{ color: string }>`
    font-size: 12px;
    border-radius: 50px;
    opacity: 0.9;
    margin-top: 2px;
    align-items: center;
    padding: 0px 6px;
    padding-left: 8px;
    background: ${theme("darkGreyBg")};
    color: ${theme("darkGrey")};
    font-weight: 500;
    font-weight: bold;
    svg {
        stroke: ${theme("darkGrey")};
        stroke-width: 3px;
    }

    /* background: ${theme("redBg")};
    color: ${theme("red")};
    font-weight: bold;
    svg {
        stroke: ${theme("red")};
        stroke-width: 3px;
    } */

    ${(props) => css`
        color: ${theme(props.color)};
        background: ${theme(props.color + "Bg")};
        /* background: transparent; */
        svg {
            stroke: ${theme(props.color)};
        }
    `}
`;

type Props = {
    domesticData: DomesticType;
};

const DomesticStats: React.FC<Props> = ({ domesticData }) => {
    if (!domesticData?.stats) return <></>;
    const { stats } = domesticData;
    return (
        <Wrapper>
            {statKeys.map((statKey) => {
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

export default DomesticStats;
