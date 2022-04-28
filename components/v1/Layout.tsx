import React, { FC } from "react";
import styled, { css, ThemedStyledFunction, keyframes } from "styled-components";

import mixins, { BoxProps } from "@styles/mixins";
import { addIfProp, ifProp } from "@styles/tools";
import { media } from "@styles";
import { theme } from "@styles/themes";

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
    padding: 0px 20px;
    margin: auto;
    width: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    min-height: 100vh;
    ${media.phablet} {
        width: 100%;
        padding: 0px 16px;
    }
    ${media.phone} {
        width: 430px;
        padding: 0px 12px;
    }

    ${media.desktop} {
        /* padding: 12px; */
    }
`;

export const Page: FC<AbsoluteProps> = (props) => {
    // const browser = useBrowserCheck();
    // console.log(browser);
    // if (browser == 9)
    //     return (
    //         <SPage>
    //             <Row>
    //                 코로나 라이브에서 지원하지 않는 브라우저입니다. 번거로우시겠지만 다른 브라우저로 접속해주시면
    //                 감사하겠습니다.
    //             </Row>
    //         </SPage>
    //     );
    return <SPage {...props}></SPage>;
};

interface PTd {
    end?: boolean;
    flex?: string;
}
export const Td = styled(Row)<PTd>`
    align-items: center;
    flex: ${(props) => (props.flex ? props.flex : 1)};
    justify-content: ${(props) => (props["end"] ? "flex-end" : "flex-start")};
`;

export const Th = styled(Row)`
    font-size: 10px;
    transform: translateX(4px);
    color: ${theme("greyText")};
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
