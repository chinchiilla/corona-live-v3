import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { ifProp, prop } from "@styles/tools";
import React from "react";
import { useRouter } from "next/router";

import styled, { css } from "styled-components";
import { BLUE, GREEN } from "@utils/constsV2";

const Wrapper = styled(Row)`
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    padding-right: 12px;
    /* box-shadow: -1px 1px 20px #0000001e;
    background: ${theme("navBarShadow")}; */
    /* box-shadow: inset 0 0 8px 0px #00000017;
    */
    /* background: ${theme("greyBg")};
    margin: 0px 14px;
    padding: 3px; */

    /* background: ${theme("greyBg")}; */
`;

const NavbarItem = styled(Row)<{ selected?: boolean; hasTag?: boolean }>`
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 12px;
    border-radius: 6px;
    color: ${theme("greyText")};
    padding: 10px 0px;
    flex: 1;
    cursor: pointer;
    span {
        margin-left: 4px;
    }
    svg {
        fill: ${theme("greyText")};
    }
    position: relative;

    ${ifProp(
        "selected",
        css`
            color: ${theme("darkGreyText")};
            /* color: ${theme("blue")}; */
            font-weight: bold;
            &:before {
                content: "";
                width: 24px;
                /* width:100%; */
                height: 2px;
                background: ${theme("darkGreyText")};
                /* background: ${theme("blue")}; */
                position: absolute;
                bottom: 0px;
                left: calc(50% + 4px);
                transform: translateX(-50%);
                ${ifProp(
                    "hasTag",
                    css`
                        left: calc(50% - 6px);
                    `
                )}
            }

            svg {
                fill: ${theme("darkGreyText")};
                /* fill: ${theme("blue")}; */
            }
        `
    )}

    ${ifProp(
        "selected1",
        css`
            box-shadow: -1px 1px 16px #00000020;

            font-weight: bold;
            background: ${theme("blueBg")};
            background: ${theme("navBarShadow")};
            color: ${theme("blue")};
            color: ${theme("darkGreyText")};
            svg {
                fill: ${theme("blue")};
                fill: ${theme("darkGreyText")};
            }
        `
    )}

    /* padding: 4px 0px;
    padding: 6px 0px;
    padding-bottom: 10px; */
    padding-top: 2px;
    padding-bottom: 10px;
`;

type Props = {
    path: string;
};

const NavBarV2: React.FC<Props> = ({ path }) => {
    const history = useRouter();

    return (
        <Wrapper fadeInUp delay={2}>
            <Row jc='center' flex={1}>
                <NavbarItem onClick={() => history.push("/")} selected={path == "/"} mr='-2px'>
                    {/* <Icon name={"Domestic"} size={14}></Icon> */}
                    <span>국내 </span>
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem onClick={() => history.push("world")} selected={path == "/world"}>
                    {/* <Icon name={"World"} size={12}></Icon> */}
                    <span>세계 </span>
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem
                    onClick={() => history.push("vaccine")}
                    selected={path == "/vaccine"}
                    // hasTag
                >
                    {/* <Icon name={"Vaccine"} size={14}></Icon> */}
                    <span>백신 </span>
                    {/* <NewTag color={GREEN}>
                        <div>N</div>
                    </NewTag> */}
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem
                    // hasTag
                    onClick={() => history.push("social-distancing")}
                    selected={path == "/social-distancing"}
                >
                    {/* <Icon name={"Flag"} size={12}></Icon> */}
                    <span>거리두기</span>
                    {/* <NewTag color={BLUE}>
                        <div>N</div>
                    </NewTag> */}
                </NavbarItem>
            </Row>
        </Wrapper>
    );
};

const NewTag = styled.div<{ color: string }>`
    min-height: 16px;
    min-width: 16px;
    flex-shrink: 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${prop("color")}20;
    color: ${prop("color")};
    font-size: 8px;
    margin-left: 4px;
    font-weight: bold;
    div {
        flex: display;
        /* transform: translateX(-1px); */
    }
`;

export default NavBarV2;
