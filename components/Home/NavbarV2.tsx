import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import React from "react";
import { useRouter } from "next/router";

import styled, { css } from "styled-components";

const Wrapper = styled(Row)`
    justify-content: center;
    border-radius: 12px;
    border-radius: 8px;
    /* overflow: hidden; */
    padding-right: 12px;
    /* box-shadow: -1px 1px 20px #0000001e;
    background: ${theme("navBarShadow")}; */
    /* box-shadow: inset 0 0 8px 0px #00000017;
    */
    /*
    */

    background: ${theme("greyBg")};
    margin: 0px 12px;
    /* padding: 3px; */

    /* background: ${theme("greyBg")}; */
`;

const NavbarItem = styled(Row)<{ selected?: boolean }>`
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border-radius: 12px;
    border-radius: 6px;
    /* border-radius: 12px; */

    color: ${theme("greyText")};
    padding: 12px 0px;
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
        "selected2",
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
                left: calc(50% + 8px);
                transform: translateX(-50%);
            }
            /* background: ${theme("darkGreyTextBg")}; */
            svg {
                fill: ${theme("darkGreyText")};
                /* fill: ${theme("blue")}; */
            }
        `
    )}

    ${ifProp(
        "selected",
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

    padding: 4px 0px;
    padding: 6px 0px;
    /* padding-bottom: 10px; */
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
                    {path == "/" && <Icon name={"Domestic"} size={14}></Icon>}
                    <span>국내 </span>
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem onClick={() => history.push("world")} selected={path == "/world"}>
                    {path == "/world" && <Icon name={"World"} size={12}></Icon>}
                    <span>세계 </span>
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem onClick={() => history.push("vaccine")} selected={path == "/vaccine"}>
                    {path == "/vaccine" && <Icon name={"Vaccine"} size={14}></Icon>}
                    <span>백신 </span>
                </NavbarItem>
            </Row>
            <Row jc='center' flex={1}>
                <NavbarItem onClick={() => history.push("social-distancing")} selected={path == "/social-distancing"}>
                    {path == "/social-distancing" && <Icon name={"Flag"} size={12}></Icon>}
                    <span>거리두기</span>
                </NavbarItem>
            </Row>
        </Wrapper>
    );
};

export default NavBarV2;
