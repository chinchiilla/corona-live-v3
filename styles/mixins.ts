import { css } from "styled-components";
import { addIfProp, CssType, ifProp, prop } from "./tools";
import CSS from "csstype";
import { theme } from "./themes";

interface MarginProps {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  my?: string;
  mx?: string;
}
const Margin = css`
  ${addIfProp("margin", "m")};
  ${addIfProp("marginTop", "mt")};
  ${addIfProp("marginBottom", "mb")};
  ${addIfProp("marginRight", "mr")};
  ${addIfProp("marginLeft", "ml")};
  ${ifProp(
    "my",
    css`
      margin: ${prop("my")} 0px;
    `
  )}
  ${ifProp(
    "mx",
    css`
      margin: 0px ${prop("mx")};
    `
  )}
`;

interface PaddingProps {
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  py?: string;
  px?: string;
}
const Padding = css`
  ${addIfProp("padding", "p")};
  ${addIfProp("paddingTop", "pt")};
  ${addIfProp("paddingBottom", "pb")};
  ${addIfProp("paddingRight", "pr")};
  ${addIfProp("paddingLeft", "pl")};
  ${ifProp(
    "py",
    css`
      padding: ${prop("py")} 0px;
    `
  )}
  ${ifProp(
    "px",
    css`
      padding: 0px ${prop("px")};
    `
  )}
`;

const Css = css`
  ${(props) =>
    Object.keys(props)
      .map((key) => addIfProp(key as CssType)(props))
      .join("")}
`;

export interface BoxProps extends PaddingProps, MarginProps, CSS.Properties {
  onClick?: any;
  style?: any;
  className?: string;
  w?: string;
  h?: string;
  bg?: string;
  fadeInDown?: boolean;
  fadeInUp?: boolean;
  delay?: number;
  fontWeight?: 300 | 400 | 500 | 700;
}
const BoxCss = css`
  ${addIfProp("width", "w")};
  ${addIfProp("height", "h")};
  ${addIfProp("background", "bg")};
  ${ifProp(
    "fadeInUp",
    css`
      animation-duration: 0.4s;
      animation-fill-mode: both;
      animation-name: fadeInUp;
    `
  )}
  ${ifProp(
    "fadeInDown",
    css`
      animation-duration: 0.4s;
      animation-fill-mode: both;
      animation-name: fadeOutDown;
    `
  )}
    ${ifProp(
    "delay",
    css`
      animation-delay: ${(props) => props["delay"] * 100}ms;
    `
  )}
  ${Margin};
  ${Padding};
  ${Css};
`;

const AbsoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AbsoluteFull = css`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const AbsoluteVerticalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
const AbsoluteHorizontalCenter = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollBar = css`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme("semigreyText")}C0;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme("semigreyText")};
  }
`;
const mixins = {
  BoxCss,
  AbsoluteCenter,
  AbsoluteFull,
  FlexCenter,
  AbsoluteVerticalCenter,
  AbsoluteHorizontalCenter,
  ScrollBar,
};

export default mixins;
