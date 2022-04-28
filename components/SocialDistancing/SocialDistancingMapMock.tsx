import React, { useEffect, useMemo, useRef, useState, useContext } from "react";

import styled from "styled-components";
import { Box, Col, Section } from "@components/Layout";
import { SocialDistancingType } from "@types/basic";
import Loading from "@components/Loading";

const Wrapper = styled(Col)`
    height: 570px;
    justify-content: center;
    align-items: center;
`;

const SocialDistancingMapMock: React.FC = ({ data }) => {
    return (
        <>
            <Wrapper fadeInUp>
                <Loading></Loading>
            </Wrapper>
        </>
    );
};

export default SocialDistancingMapMock;
