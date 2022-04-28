import React, { FC } from "react";
import styled from "styled-components";

import { addIfProp } from "@styles/tools";
import { theme } from "@styles/themes";

const Wrapper = styled.div`
  ${addIfProp("fontSize")}
  ${addIfProp("fontWeight")}
  position:relative;
  &:after {
    content: "";
    position: absolute;
    left: 2px;
    bottom: 0px;
    width: calc(100% + 4px);
    height: 8px;
    z-index: -1;
    background: ${theme("greyBg")};
    ${addIfProp("height", "lineHeight")}
  }
`;

interface Props {
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: number;
}

const Underline: FC<Props> = ({ lineHeight, fontSize, fontWeight, children }) => {
  return <Wrapper {...{ lineHeight, fontSize, fontWeight }}>{children}</Wrapper>;
};

export default Underline;
