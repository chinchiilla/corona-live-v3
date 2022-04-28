import * as React from "react";
import styled, { keyframes } from "styled-components";
import { theme, ThemeType } from "@styles/themes";
import { prop } from "@styles/tools";

const keyFrame = keyframes`
    from{
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const Wrapper = styled.div<{ size: number; color: ThemeType; bg: ThemeType }>`
  position: relative;
  width: ${prop("size")}px;
  height: ${prop("size")}px;
  box-shadow: inset 0 0 0 ${(props) => props.size / 10}px ${(props) => theme(props.color)};
  border-radius: 50%;
  transform: translateZ(0);

  &:before,
  &:after {
    content: "";
    position: absolute;
    background: ${(props) => theme(props.bg)};
    width: ${(props) => props.size / 2}px;
    height: ${prop("size")}px;
    top: 0em;
  }

  &:before {
    left: 0em;
    transform-origin: ${(props) => props.size / 2}px ${(props) => props.size / 2}px;
    animation: ${keyFrame} 2s infinite ease 0.5s;
  }

  &:after {
    left: ${(props) => props.size / 2}px;
    transform-origin: 0em ${(props) => props.size / 2}px;
    animation: ${keyFrame} 1.5s infinite ease;
  }
`;
type Props = {
  size: number;
  color?: ThemeType;
  bg?: ThemeType;
};

const Spinner: React.FC<Props> = ({ size, color, bg }) => {
  return <Wrapper size={size} color={color || "blackText"} bg={bg || "bg"}></Wrapper>;
};

export default Spinner;
