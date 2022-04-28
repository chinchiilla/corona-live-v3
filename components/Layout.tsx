import React, { FC } from "react";
import styled, { css, ThemedStyledFunction, keyframes } from "styled-components";

import mixins, { BoxProps } from "@styles/mixins";
import { addIfProp, ifProp } from "@styles/tools";
import { media } from "@styles";
import { theme } from "@styles/themes";
import { useBrowserCheck } from "@hooks/useBrowserCheck";

const SBox = styled.div`
    ${mixins.BoxCss};
`;
export const Box: FC<BoxProps> = (props: any) => <SBox {...props}></SBox>;

interface FlexProps extends BoxProps {
    ai?: string;
    jc?: string;
    center?: boolean;
}
const SFlex = styled(Box)`
    display: flex;
    ${addIfProp("alignItems", "ai")};
    ${addIfProp("justifyContent", "jc")};
    ${ifProp("center", mixins.FlexCenter)}
`;
export const Flex: FC<FlexProps> = (props) => <SFlex {...props}></SFlex>;

const SRow = styled(Flex)`
    display: flex;
    flex-direction: row;
`;
export const Row: FC<FlexProps> = (props) => <SRow {...props}></SRow>;

const SCol = styled(Flex)`
    display: flex;
    flex-direction: column;
`;
export const Col: FC<FlexProps> = (props) => <SCol {...props}></SCol>;

interface AbsoluteProps extends BoxProps {
    center?: boolean;
    full?: boolean;
    verticalCenter?: boolean;
    horizontalCenter?: boolean;
}
const SAbsolute = styled(Flex)`
    position: absolute;
    ${ifProp("center", mixins.AbsoluteCenter)}
    ${ifProp("full", mixins.AbsoluteFull)}
  ${ifProp("verticalCenter", mixins.AbsoluteVerticalCenter)}
  ${ifProp("horizontalCenter", mixins.AbsoluteHorizontalCenter)}
`;
export const Absolute: FC<AbsoluteProps> = (props) => <SAbsolute {...props}></SAbsolute>;

const SPage = styled(Col)`
    box-sizing: border-box;
    margin: auto;
    width: auto;
    width: 500px;
    min-height: 100vh;
    ${media.phablet} {
        width: 100%;
    }
    ${media.phone} {
    }

    ${media.desktop} {
    }
`;

export const Page: FC<AbsoluteProps> = (props) => {
    return <SPage {...props}></SPage>;
};

interface PTd {
    end?: boolean;
    flex?: string;
}
export const Td = styled(Row)<PTd>`
    position: relative;
    align-items: center;
    flex: ${(props) => (props.flex ? props.flex : 1)};
    justify-content: ${(props) => (props["end"] ? "flex-end" : "flex-start")};
`;

export const Th = styled(Row)`
    margin: 0px 2px;
    font-size: 11px;
    color: ${theme("greyText")}CC;
    padding: 12px 0px;
    transform: translateX(2px);
    /* font-weight: bold; */
    cursor: pointer;
    &:first-of-type {
        background: ${theme("bg")};
        position: sticky;
        left: -1px;
        z-index: 2;
        /* justify-content: center; */
    }
`;

export const Highlight = styled(Row)`
    position: relative;
    :after {
        content: "";
        position: absolute;
        z-index: -1;
        background: ${theme("yellowBg")};
        width: 100%;
        height: 60%;
        left: 2px;
        bottom: -2px;
    }
`;

export const DesktopMode = css`
    background: ${theme("bg")};
    /* border: 1px solid ${theme("greyText")}20; */
    border: 1px solid ${theme("sectionBorder")};
    box-shadow: -1px 1px 1px #00000006;
    z-index: -1;
    padding: 12px 12px;
    border-radius: 12px;
    border-radius: 16px;
    margin-bottom: 20px;
    margin-bottom: 18px;
`;

const MobileMode = css`
    background: transparent;
    border: 0px solid transparent;
    border-radius: 0px;
    margin-bottom: 0px;
    border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};

    /* border: 1px solid ${theme("sectionBorder")}; */
    /* box-shadow: 0px -1px 0px ${theme("darkGreyText")}50; */
`;

export const Section = styled(Box)`
    ${DesktopMode};
    ${media.phablet} {
        ${MobileMode};
        padding: 8px 0px;
        border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};
    }

    /* border-bottom: 8px solid white; */
`;

export const TransparentSection = styled(Box)`
    ${DesktopMode};

    ${media.phablet} {
        ${MobileMode};
        padding: 8px 0px;
        box-shadow: none;
        /* border-bottom: 8px solid #f7f7f700; */
        margin: 0px;
        border: none;
    }

    /* border-bottom: 8px solid white; */
`;

export const Background = styled(Box)`
    ${DesktopMode};
    background: transparent;
    border: transparent;
    padding: 0px;
    box-shadow: none;
    ${media.phablet} {
        ${MobileMode};
        background: ${theme("sectionMobileBg")};

        padding-top: 2px;
        padding-bottom: 10px;
    }
`;

export const BackgroundLine = styled(Box)`
    ${DesktopMode};

    ${media.phablet} {
        ${MobileMode};
        border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};
    }
`;

export const ChartSection = styled(Box)`
    ${DesktopMode};

    ${media.phablet} {
        ${MobileMode};
        padding: 8px 0px;
        border: none;
        box-shadow: none;
        border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};
    }
`;

export const MobileNoBgSection = styled(Box)`
    ${DesktopMode};

    padding: 0px;

    ${media.phablet} {
        ${MobileMode};
        /* padding: 8px 0px; */
        padding: 0px;
        border: none;
        box-shadow: none;
        background: ${theme("sectionBg")};

        /* border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionBg")}; */
    }

    /* border-bottom: 8px solid white; */
`;

export const ChartButtonSection = styled(Box)`
    ${DesktopMode};

    ${media.phablet} {
        ${MobileMode};
        padding: 0px;
        border: none;
        box-shadow: none;
        background: ${theme("sectionMobileBg")};
        padding-bottom: 10px;
        padding-top: 4px;
    }
`;

export const MobileNoSection = styled(Box)`
    ${DesktopMode};

    padding: 0px;

    ${media.phablet} {
        ${MobileMode};
        padding: 0px;
        border: none;
        box-shadow: none;
    }
`;

export const Mobile = styled(Box)`
    flex: 1;
    display: none;
    z-index: -1;
    ${media.phablet} {
        display: flex;
    }
`;

export const Desktop = styled(Box)`
    flex: 1;
    display: flex;
    z-index: -1;
    ${media.phablet} {
        display: none;
    }
`;

export const NoPaddingMobileSection = styled(Box)`
    ${DesktopMode};

    ${media.phablet} {
        ${MobileMode};
        border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};
        padding: 0px;
        width: 100%;
        flex: 1;
        margin: 0px;
        position: relative;
    }
`;

export const DesktopSection = styled(Box)`
    ${DesktopMode};
    ${media.phablet} {
        display: none;
    }
`;
