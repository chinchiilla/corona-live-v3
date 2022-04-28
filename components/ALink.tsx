import * as React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { Box, Row } from "./Layout";

const Wrapper = styled(Box)`
    display: flex;
    flex: 1;
    color: unset;
    text-decoration: none;
    position: absolute;
    left: 0;

    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    color: transparent;
    background: transparent !important;
    a {
        flex: 1;
        opacity: 0;
    }
`;

const ALink = (props) => {
    return (
        <Wrapper>
            <Link {...props}></Link>
        </Wrapper>
    );
};
export default ALink;
