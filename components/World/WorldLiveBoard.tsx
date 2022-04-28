import ALink from "@components/ALink";
import DeltaTag from "@components/DeltaTag";
import { Col, Desktop, Mobile, Row, Section, NoPaddingMobileSection } from "@components/Layout";
import UpdatesLiveDisplay from "@components/Updates/UpdatesLiveDisplay";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import { getDomesticUpdates, numberWithCommas } from "@utils/helper";
import { useRouter } from "next/router";

import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
    flex: 1;
    background: ${theme("bg")};
    padding: 12px 0px;
    box-shadow: -1px 1px 20px #00000010;
    border: 1px solid ${theme("sectionBorder")};

    /* border-radius: 24px; */

    border-radius: 18px;
    border-radius: 12px;

    justify-content: space-between;
    align-items: center;
    z-index: 2;

    ${media.phablet} {
        box-shadow: -1px 1px 20px #00000015;
        box-shadow: none;
        border: none;
        padding: 0px;
        margin: 0px;
        /* padding-bottom: 8px; */
    }
`;

const LiveDisplayContaienr = styled(Row)`
    /* box-shadow: -1px 1px 20px #00000010;
    box-shadow: -1px 1px 16px #00000015;
    border: 1px solid ${theme("sectionBorder")};
    flex: 1;
    background: ${theme("navBarShadow")};

    border: none;
    margin: 0px 12px;

    margin-bottom: 22px; */

    /* border-radius: 8px; */
    /* margin-bottom: 12px; */
    padding-top: 4px;
`;

const BoxShadow = styled.div`
    overflow: hidden;
    width: 100%;
    background: ${theme("liveBoardBottom")};
    /* border: 1px solid ${theme("sectionBorder")}; */
    border: 1px solid ${theme("sectionBorder")};

    /* box-shadow: -1px 1px 6px #00000010; */
    /* box-shadow: -1px 1px 20px #00000005; */

    border-radius: 18px;
    z-index: 1;
    border: none;
    box-shadow: none;
    ${media.phablet} {
        /* margin: 0px 12px; */
        /* box-shadow: none; */
        box-shadow: -1px 1px 16px #00000018;
        border-radius: 0px;
        box-shadow: -1px 1px 20px ${theme("cityLiveBoardShadow")}CC;

        border: none;
        width: 100%;
        /* width: calc(100% - 24px); */
        /* margin: auto; */
        flex: 1;

        padding-top: 12px;
        padding-bottom: 12px;
        /* padding-bottom: 4px; */

        /* border: none; */
    }
`;

const Label = styled(Row)`
    font-size: 11px;
    opacity: 0.7;
`;
const Stat = styled(Row)`
    font-size: 32px;
    font-weight: bold;
    span {
        font-weight: 300;
    }
    @media (max-width: 400px) {
        font-size: 28px;
    }
    color: ${theme("darkGreyText")};
`;
const Delta = styled(Row)``;

const CompareContainer = styled(Row)`
    margin: 5px 0px;
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
    // ["twoWeeksAgo", "monthAgo"],
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

const UPDATES_LIVE_LINK = { href: "/world/live", name: "세계 실시간" };

const DomesticLiveBoardMobile: React.FC<Props> = ({ worldData }) => {
    const { statsLive, updatesPreview } = worldData;
    const { push } = useRouter();
    if (!statsLive || !updatesPreview) return <></>;

    const parsedUpdatesPreview = getDomesticUpdates(updatesPreview);

    const render = () => {
        return (
            <BoxShadow>
                {/* <Mobile>
                    <LiveDisplayContaienr>
                        <UpdatesLiveDisplay data={parsedUpdatesPreview} link={UPDATES_LIVE_LINK}></UpdatesLiveDisplay>
                    </LiveDisplayContaienr>
                </Mobile> */}

                <Wrapper>
                    <Col></Col>
                    <Col jc='space-between' ai='center' mx='4px'>
                        <Label>오늘 확진자수</Label>
                        <Row ai='center'>
                            <Stat>
                                {numberWithCommas(statsLive.today)}
                                <span>명</span>
                            </Stat>
                            <Delta></Delta>
                        </Row>
                    </Col>
                    {/* <Col w='1px'></Col> */}
                    {/* <Divider></Divider> */}
                    {statKeys.map((rows) => {
                        return (
                            <Col ai='space-between'>
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
                                                    medium
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

                <Desktop>
                    <UpdatesLiveDisplay data={parsedUpdatesPreview} link={UPDATES_LIVE_LINK}></UpdatesLiveDisplay>
                </Desktop>
            </BoxShadow>
        );
    };

    return (
        <>
            <Desktop>{render()}</Desktop>

            <Mobile onClick={() => push("/world/live")}>
                <NoPaddingMobileSection>
                    <ALink href={UPDATES_LIVE_LINK.href}>{UPDATES_LIVE_LINK.name}</ALink>

                    {render()}
                    <LiveDisplayContaienr style={{ zIndex: 100 }}>
                        <UpdatesLiveDisplay data={parsedUpdatesPreview} link={UPDATES_LIVE_LINK}></UpdatesLiveDisplay>
                    </LiveDisplayContaienr>
                </NoPaddingMobileSection>
            </Mobile>

            {/* 
            <Mobile>
                <NoPaddingMobileSection>{render()}</NoPaddingMobileSection>
            </Mobile>
            <Mobile>
                <NoPaddingMobileSection>
                    <LiveDisplayContaienr>
                        <UpdatesLiveDisplay data={parsedUpdatesPreview} link={UPDATES_LIVE_LINK}></UpdatesLiveDisplay>
                    </LiveDisplayContaienr>
                </NoPaddingMobileSection>
            </Mobile> */}
        </>
    );
};

export default DomesticLiveBoardMobile;
