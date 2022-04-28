import { Row } from "@components/Layout";
import Skeleton from "@components/Skeleton";
import { theme } from "@styles/themes";
import React, { useMemo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 6px 20px;
`;
const Title = styled.div`
    font-size: 14px;
    margin-bottom: 2px;
    opacity: 0.7;
`;
const Dday = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${theme("blue")};
    background: ${theme("blueBg")};
    padding: 2px 8px;
    border-radius: 8px;
`;
const DateContainer = styled.div`
    font-size: 20px;
    margin-right: 8px;
    font-weight: bold;
`;

type Props = {};

const SocialDistancingBannerMock: React.FC<Props> = () => {
    return (
        <Wrapper>
            <Title>
                <Skeleton height={16} width={100} mb={8}></Skeleton>
            </Title>
            <Row ai='center'>
                <Skeleton height={24} width={240}></Skeleton>
            </Row>
        </Wrapper>
    );
};

export default SocialDistancingBannerMock;
