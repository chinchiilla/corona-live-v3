import { Row } from "@components/Layout";
import Loading from "@components/Loading";
import Skeleton from "@components/Skeleton";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 190px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

function ChartSkeleton() {
    return (
        <Wrapper>
            <Loading></Loading>
        </Wrapper>
    );
}

export default ChartSkeleton;
