import DeltaTag from "@components/DeltaTag";
import { Col, Row } from "@components/Layout";
import UpdatesLiveDisplay from "@components/Updates/UpdatesLiveDisplay";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import { getDomesticUpdates } from "@utils/helper";

import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
    flex: 1;
    background: ${theme("bg")};
    padding: 12px 0px;
    box-shadow: -1px 1px 20px #00000010;
    /* border-radius: 24px; */
    border-radius: 18px;

    justify-content: space-between;
    align-items: center;
    z-index: 2;

    ${media.phablet} {
        box-shadow: -1px 1px 20px #00000015;
    }
`;

const BoxShadow = styled.div`
    background: ${theme("liveBoardBottom")};
    border: 1px solid ${theme("sectionBorder")};

    /* border: 1px solid ${theme("greyText")}20; */
    box-shadow: -1px 1px 10px #00000012;

    /*
    */
    /* box-shadow: -1px 1px 8px #00000005; */

    border-radius: 18px;
    z-index: 1;

    ${media.phablet} {
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

type Props = {
    domesticData: any;
};

const dateName = {
    yesterday: "어제&nbsp;",
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
const UPDATES_LIVE_LINK = { href: "/updates", name: "실시간" };

const DomesticLiveBoard: React.FC<Props> = ({ domesticData }) => {
    const { statsLive, updatesPreview } = domesticData;
    if (!statsLive || !updatesPreview) return <></>;

    const parsedUpdatesPreview = getDomesticUpdates(updatesPreview);

    return (
        <BoxShadow>
            <Wrapper>
                <Col></Col>
                <Col jc='space-between' ai='center' mx='4px'>
                    <Label>오늘 확진자수</Label>
                    <Row ai='center'>
                        <Stat>
                            {statsLive.today}
                            <span>명</span>
                        </Stat>
                        <Delta></Delta>
                    </Row>
                </Col>
                {/* <Col w='1px'></Col> */}
                {/* <Divider></Divider> */}
                {statKeys.map((rows) => {
                    return (
                        <Col ai='center'>
                            {rows.map((statKey) => {
                                if (statKey == "today") return <></>;
                                const delta = statsLive["today"] - statsLive[statKey];
                                const deltaPositive = delta > 0;
                                const deltaColor = deltaPositive ? "red" : "blue";
                                return (
                                    <CompareContainer>
                                        <CompareLabel>
                                            <div dangerouslySetInnerHTML={{ __html: dateName[statKey] }}></div>
                                        </CompareLabel>
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
                <Col></Col>
            </Wrapper>
            <UpdatesLiveDisplay data={parsedUpdatesPreview} link={UPDATES_LIVE_LINK}></UpdatesLiveDisplay>
        </BoxShadow>
    );
};

export default DomesticLiveBoard;
