import MemoIcon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { WorldSelector } from "@states/WorldState";
import media from "@styles/media";
import { theme } from "@styles/themes";
import { DomesticType } from "@types/DomesticType";
import { WorldType } from "@types/WolrdType";
import { numberWithCommas } from "@utils/helper";
import { dataState } from "@utils/states";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

const statKeys = ["cases", "deaths", "tests"];

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
};

const Wrapper = styled(Row)`
    margin: 0px 10px;
    padding: 6px 8px;
    border-radius: 12px;
    justify-content: space-around;
`;

const StatContainer = styled(Col)`
    justify-content: center;
    align-items: center;
    & > div {
        text-align: center;
    }
`;
const StatName = styled(Row)`
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 0px;
    ${media.phablet} {
        font-size: 12px;
    }
`;
const StatValue = styled(Row)<{ statColor: string }>`
    font-size: 18px;
    font-weight: bold;
    opacity: 1;
    margin-bottom: 4px;

    ${(props) => css`
        color: ${theme(props.statColor)};
    `}

    ${media.phablet} {
        font-size: 16px;
    }
`;
const StatDelta = styled(Row)<{ color: string }>`
    font-size: 12px;
    border-radius: 50px;
    opacity: 0.8;
    font-weight: 500;
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

    ${media.phablet} {
        font-size: 12px;
    }
`;

type Props = {
    domesticData: DomesticType;
};

const DomesticStats: React.FC<Props> = () => {
    const worldData = useRecoilValue<WorldType>(WorldSelector);
    if (!worldData?.stats) return <></>;
    const { stats, statsLive } = worldData;

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
                                {numberWithCommas(statKey == "cases" ? statsLive.today : delta)}
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
