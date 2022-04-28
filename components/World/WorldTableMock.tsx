import Loading from "@components/Loading";
import Skeleton from "@components/Skeleton";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    padding: 0px 12px;
    box-sizing: border-box;
    height: 500px;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    flex: 1;
`;

const WorldTableMock: React.FC = () => {
    return (
        <Wrapper>
            <Loading></Loading>
        </Wrapper>
    );
};

export default WorldTableMock;
