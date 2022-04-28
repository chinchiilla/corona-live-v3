import React from "react";
import styled from "styled-components";
import { Row } from "@components/Layout";
import Loading from "@components/Loading";

const Wrapper = styled(Row)`
    height: 570px;
    justify-content: center;
    align-items: center;
`;

const VaccineMapMock: React.FC = () => {
    return (
        <>
            <Wrapper fadeInUp>
                <Loading></Loading>
            </Wrapper>
        </>
    );
};

export default VaccineMapMock;
