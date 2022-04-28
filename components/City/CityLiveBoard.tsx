import DeltaTag from "@components/DeltaTag";
import { Col, Row } from "@components/Layout";
import UpdatesLiveDisplay from "@components/Updates/UpdatesLiveDisplay";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import { ct, getDomesticUpdates } from "@utils/helper";

import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
    flex: 1;
    background: ${theme("bg")};
    padding: 12px 0px;
    border: 1px solid ${theme("sectionBorder")};
    box-shadow: -1px 6px 12px #00000010;
    /* border-radius: 24px; */
    border-radius: 18px;

    justify-content: space-evenly;
    align-items: center;
    z-index: 2;

    ${media.phablet} {
        box-shadow: -1px 1px 20px #00000015;
    }
`;

const BoxShadow = styled.div`
    overflow: hidden;
    border: 1px solid ${theme("sectionBorder")};
    background: ${theme("liveBoardBottom")};
    /* box-shadow: -1px 1px 6px #00000015; */
    box-shadow: -1px 1px 20px #00000005;

    border-radius: 18px;
    z-index: 1;
    /* margin-bottom: 8px; */
    ${media.phablet} {
        box-shadow: -1px 1px 12px #00000015;
        margin: 0px 12px;
    }
`;

const Label = styled(Row)`
    font-size: 10px;
    opacity: 0.7;
`;
const Stat = styled(Row)`
    font-size: 28px;
    font-weight: bold;
    span {
        font-weight: 300;
    }
    @media (max-width: 400px) {
        font-size: 26px;
    }
    color: ${theme("darkGreyText")};
`;
const Delta = styled(Row)``;

const CompareContainer = styled(Row)`
    margin: 4px 0px;
    justify-content: space-between;
    align-items: center;
    /* flex-basis: 50%; */
`;
const CompareLabel = styled(Row)`
    font-size: 12px;
    opacity: 0.8;
    transform: translate(0, -2px);
    :before {
        content: "vs";
        margin-right: 4px;
        opacity: 0.7;
    }
`;
const CompareValue = styled(Row)`
    padding-bottom: 2px;
`;
const statKeys = [
    ["yesterday", "weekAgo"],
    ["twoWeeksAgo", "monthAgo"],
];

const dateName = {
    yesterday: "어제",
    weekAgo: "1주전",
    twoWeeksAgo: "2주전",
    monthAgo: "1달전",
};

const Divider = styled(Row)`
    width: 1px;
    height: 32px;
    background: ${theme("greyText")};
    opacity: 0.3;
    margin-right: 8px;
`;

type Props = {
    cityData: any;
    cityId: string;
};

const CityLiveBoard: React.FC<Props> = ({ cityData, cityId }) => {
    const { statsLive, updatesPreview } = cityData;
    if (!statsLive || !updatesPreview) return <></>;

    return (
        <BoxShadow>
            <Wrapper>
                <Col jc='space-between' ai='center'>
                    <Label>현재 확진자수</Label>
                    <Row ai='center'>
                        <Stat>
                            {statsLive.today}
                            <span>명</span>
                        </Stat>
                        <Delta></Delta>
                    </Row>
                </Col>
                <Divider></Divider>
                {statKeys.map((rows) => {
                    return (
                        <Col>
                            {rows.map((statKey) => {
                                if (statKey == "today") return <></>;
                                const delta = statsLive["today"] - statsLive[statKey];
                                const deltaPositive = delta > 0;
                                const deltaColor = deltaPositive ? "red" : "blue";
                                return (
                                    <CompareContainer>
                                        <CompareLabel>{dateName[statKey]}</CompareLabel>
                                        <CompareValue>
                                            <DeltaTag
                                                small
                                                color={deltaColor}
                                                delta={delta}
                                                countUp={false}
                                                prevDelta={0}
                                                showBg={true}
                                                showZero={true}
                                            ></DeltaTag>
                                        </CompareValue>
                                    </CompareContainer>
                                );
                            })}
                        </Col>
                    );
                })}
            </Wrapper>
            <UpdatesLiveDisplay
                data={getDomesticUpdates(updatesPreview, cityId)}
                link={{ href: `/city/updates/${cityId}`, name: `${ct(cityId)} 실시간` }}
            ></UpdatesLiveDisplay>
        </BoxShadow>
    );
};

export default CityLiveBoard;
