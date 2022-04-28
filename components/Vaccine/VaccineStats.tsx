import MemoIcon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { useTheme } from "@hooks/useTheme";
import { theme } from "@styles/themes";
import { StatType } from "@types/basic";
import { numberWithCommas } from "@utils/helper";
import React from "react";
import styled, { css } from "styled-components";

const statKeys = ["partiallyVaccinated", "fullyVaccinated"];

const statColors = {
    partiallyVaccinated: "green",
    fullyVaccinated: "blue",
};

const statNames = {
    partiallyVaccinated: "1차 접종",
    fullyVaccinated: "접종 완료",
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
`;
const StatValue = styled(Col)<{ statColor: string }>`
    font-size: 18px;
    font-weight: bold;
    opacity: 1;
    ${(props) => css`
        color: ${theme(props.statColor)};
    `}
    span {
        font-size: 12px;
        font-weight: 400;
    }
`;
const StatDelta = styled(Row)<{ color: string }>`
    font-size: 11px;
    margin-top: 6px;
    border-radius: 50px;
    opacity: 0.7;
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

    ${(props) => css`
        color: ${theme(props.color)};
        background: ${theme(props.color + "Bg")};
        svg {
            stroke: ${theme(props.color)};
        }
    `}
`;

type Props = {
    stats: StatType;
};

const VaccineStats: React.FC<Props> = ({ stats }) => {
    const _theme = useTheme();
    console.log(stats);
    if (!stats) return <></>;

    return (
        <Wrapper>
            {statKeys.map((statKey, i) => {
                if (!stats[statKey]) return <></>;
                let { total, delta, percentage } = stats[statKey];
                return (
                    <StatContainer>
                        <StatName>{statNames[statKey]}</StatName>
                        <StatValue statColor={statColors[statKey]}>{numberWithCommas(total)}</StatValue>
                        <StatValue statColor={statColors[statKey]}>
                            <span>({percentage}%)</span>
                        </StatValue>
                        {!!delta ? (
                            <StatDelta color={statColors[statKey]}>
                                {numberWithCommas(delta)}
                                <Row w='2px'></Row>
                                <MemoIcon name='ArrowUp' size={12}></MemoIcon>
                            </StatDelta>
                        ) : (
                            <StatDelta color={statColors[statKey]} style={{ padding: "4px 12px" }}>
                                <MemoIcon fill={_theme("blue")} name='Remove' size={8}></MemoIcon>

                                <Row w='2px'></Row>
                            </StatDelta>
                        )}
                    </StatContainer>
                );
            })}
        </Wrapper>
    );
};

export default VaccineStats;
