import DeltaTag from "@components/DeltaTag";
import { Col, Row } from "@components/Layout";
import Skeleton from "@components/Skeleton";
import UpdatesLiveDisplay from "@components/Updates/UpdatesLiveDisplay";
import { media } from "@styles/media";
import { theme } from "@styles/themes";

import React from "react";
import styled from "styled-components";

const Wrapper = styled(Row)`
    flex: 1;
    background: ${theme("bg")};
    padding: 12px 0px;
    border: 1px solid ${theme("sectionBorder")};
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
    border: 1px solid ${theme("sectionBorder")};
    background: ${theme("liveBoardBottom")};
    box-shadow: -1px 1px 6px #00000010;
    box-shadow: -1px 1px 20px #00000005;

    border-radius: 18px;
    z-index: 1;

    ${media.phablet} {
        margin: 0px 12px;
    }
`;

const Delta = styled(Row)``;

const CompareContainer = styled(Row)`
    margin: 4px 0px;
    justify-content: space-between;
    align-items: center;
    /* flex-basis: 50%; */
`;

const statKeys = [
    ["yesterday", "weekAgo"],
    ["twoWeeksAgo", "monthAgo"],
];

type Props = {};

const CityLiveBoardMock: React.FC<Props> = () => {
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
            <LiveDisplayMock>
                <Skeleton width={50} height={18} mr={20}></Skeleton>
                <Skeleton width={200} height={18}></Skeleton>
            </LiveDisplayMock>
        </BoxShadow>
    );
};

const LiveDisplayMock = styled(Row)`
    width: 100%;
    justify-content: center;
    padding: 16px 6px;
    margin-bottom: 4px;
`;

export default CityLiveBoardMock;
