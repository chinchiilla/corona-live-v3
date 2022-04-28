import ALink from "@components/ALink";
import { Col, Desktop, Mobile, Row, NoPaddingMobileSection } from "@components/Layout";
import Skeleton from "@components/Skeleton";
import { media } from "@styles/media";
import { theme } from "@styles/themes";

import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
    flex: 1;
    background: ${theme("bg")};
    padding: 12px 0px;
    box-shadow: -1px 1px 20px #00000010;
    border: 1px solid ${theme("sectionBorder")};
    border-radius: 18px;
    justify-content: space-between;
    align-items: center;
    z-index: 2;

    ${media.phablet} {
        box-shadow: -1px 1px 20px #00000015;
        box-shadow: none;
        border: none;
        padding: 0px;
        margin: 0px;
    }
`;

const LiveDisplayContaienr = styled(Row)`
    padding-top: 4px;
`;

const BoxShadow = styled.div`
    width: 100%;
    overflow: hidden;
    background: ${theme("liveBoardBottom")};
    border: 1px solid ${theme("sectionBorder")};

    box-shadow: -1px 1px 6px #00000010;
    box-shadow: -1px 1px 20px #00000005;

    border-radius: 18px;
    z-index: 1;
    ${media.phablet} {
        box-shadow: -1px 1px 16px #00000018;
        border-radius: 0px;
        box-shadow: -1px 1px 20px ${theme("cityLiveBoardShadow")}CC;

        border: none;
        width: 100%;
        flex: 1;

        padding-top: 12px;
        padding-bottom: 12px;
    }
`;

const Delta = styled(Row)``;

const CompareContainer = styled(Row)`
    margin: 5px 0px;
    justify-content: space-between;
    align-items: center;
`;

const statKeys = [
    ["yesterday", "weekAgo"],
    // ["twoWeeksAgo", "monthAgo"],
];

type Props = {
    domesticData: any;
};

const UPDATES_LIVE_LINK = { href: "/updates", name: "실시간" };

const DomesticLiveBoardMobile: React.FC<Props> = () => {
    const render = () => {
        return (
            <BoxShadow>
                <Wrapper>
                    <Col></Col>
                    <Col jc='space-between' ai='center' mx='4px'>
                        <Skeleton width={50} height={12} mb={10}></Skeleton>
                        <Row ai='center'>
                            <Skeleton width={50} height={28} mb={10}></Skeleton>
                            <Delta></Delta>
                        </Row>
                    </Col>
                    {statKeys.map((rows) => {
                        return (
                            <Col ai='center' jc='space-evenly'>
                                {rows.map(() => {
                                    return (
                                        <CompareContainer>
                                            <Skeleton width={30} height={14} mr={4}></Skeleton>
                                            <Skeleton width={40} height={14}></Skeleton>
                                        </CompareContainer>
                                    );
                                })}
                            </Col>
                        );
                    })}
                    <Col></Col>
                </Wrapper>

                <Desktop>
                    <LiveDisplayMock>
                        <Skeleton width={50} height={18} mr={20}></Skeleton>
                        <Skeleton width={200} height={18}></Skeleton>
                    </LiveDisplayMock>
                </Desktop>
            </BoxShadow>
        );
    };

    return (
        <>
            <Desktop>{render()}</Desktop>

            <Mobile>
                <NoPaddingMobileSection>
                    <ALink href={UPDATES_LIVE_LINK.href}>{UPDATES_LIVE_LINK.name}</ALink>

                    {render()}
                    <LiveDisplayContaienr style={{ zIndex: 100 }}>
                        <LiveDisplayMock>
                            <Skeleton width={50} height={18} mr={20}></Skeleton>
                            <Skeleton width={200} height={18}></Skeleton>
                        </LiveDisplayMock>
                    </LiveDisplayContaienr>
                </NoPaddingMobileSection>
            </Mobile>
        </>
    );
};

const LiveDisplayMock = styled(Row)`
    width: 100%;
    justify-content: center;
    padding: 16px 6px;
    margin-bottom: 4px;
`;

export default DomesticLiveBoardMobile;
