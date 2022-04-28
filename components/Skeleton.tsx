import { ifProp } from "@styles/tools";
import React from "react";
import styled, { css, keyframes } from "styled-components";

const LinearAnim = keyframes`
 0% {
      transform: translateX(-50%);
  }
  100% {
      transform: translateX(100%);
  }`;

const Wrapper = styled.div<{ width?: number; height?: number; mb: number; number; mr: number }>`
    overflow: hidden;
    position: relative;
    ${(props) => css`
        width: ${props.width}px;
        height: ${props.height}px;
        margin-bottom: ${props.mb || 0}px;
        margin-right: ${props.mr || 0}px;
    `}
    border-radius: 8px;
    background-color: rgba(170, 170, 170, 0.1);
    position: relative;
    &:after {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        position: absolute;
        animation: ${LinearAnim} 1s linear infinite;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(170, 170, 170, 0.06), transparent);
    }
`;

type Props = {
    width: number;
    height: number;
    mb?: number;
    mr?: number;
};

const Skeleton: React.FC<Props> = ({ width, height, mb, mr }) => {
    return <Wrapper {...{ width, height, mb, mr }}></Wrapper>;
};

export default Skeleton;
