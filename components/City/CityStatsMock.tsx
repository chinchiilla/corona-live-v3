import { Box, Col, Row } from "@components/Layout";
import Skeleton from "@components/Skeleton";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled(Row)`
    margin: 0px 10px;
    padding: 6px 8px;
    border-radius: 12px;
    justify-content: space-between;
    height: 62px;
`;

const StatContainer = styled(Col)`
    justify-content: center;
    align-items: center;
    & > div {
        text-align: center;
    }
`;

type Props = {};

const CityStatsMock: React.FC<Props> = () => {
    return (
        <Wrapper>
            {[0, 0, 0].map((statKey) => {
                return (
                    <StatContainer>
                        <Skeleton width={40} height={12} mb={8}></Skeleton>
                        <Skeleton width={70} height={24} mb={8}></Skeleton>
                        <Skeleton width={50} height={14}></Skeleton>
                    </StatContainer>
                );
            })}
        </Wrapper>
    );
};

export default CityStatsMock;
