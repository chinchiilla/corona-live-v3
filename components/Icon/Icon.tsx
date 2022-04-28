// import { Flex } from "reflexbox/styled-components";
import styled, { css } from "styled-components";
import React, { FC } from "react";
import Chevrons from "./Chevrons";
import Arrows from "./Arrows";
import Check from "./Check";
import Plus from "./Plus";
import X from "./X";
import Refresh from "./Refresh";
import Notification from "./Notification";
import Logo from "./Logo";
import Search from "./Search";
import Dark from "./Dark";
import Light from "./Light";
import Category from "./Category";
import Facebook from "./Facebook";
import KakaoTalk from "./KakaoTalk";
import Twitter from "./Twitter";
import Blog from "./Blog";
import Link from "./Link";
import LogoIcon from "./LogoIcon";
import SendMessage from "./SendMessage";
import NotificationFilled from "./NotificationFilled";
import Info from "./Info";
import Instagram from "./Instagram";
import KakaoPay from "./KakaoPay";
import Map from "./Map";
import Table from "./Table";
import Domestic from "./Domestic";
import World from "./World";
import CurveArrow from "./CurveArrow";
import Menu from "./Menu";
import Idea from "./Idea";
import Person from "./Person";
import Night from "./Night";
import Question from "./Question";
import GoBackArrow from "./GoBackArrow";
import Flag from "./Flag";
import Vaccine from "./Vaccine";
import Add from "./Add";
import Donation from "./Donation";
import Share from "./Share";
import Graph from "./Graph";
import Remove from "./Remove";

import { Row } from "@components/Layout";
import { ifProp, prop, addIfProp } from "@styles/tools";
import { BoxProps } from "@styles/mixins";

const icons = {
    ...Arrows,
    ...Chevrons,
    Check,
    Donation,
    Graph,
    Share,
    Plus,
    Remove,
    X,
    Refresh,
    Notification,
    Logo,
    Search,
    Dark,
    Light,
    Category,
    Facebook,
    KakaoTalk,
    Twitter,
    Link,
    Blog,
    LogoIcon,
    SendMessage,
    NotificationFilled,
    Info,
    Instagram,
    KakaoPay,
    Table,
    Map,
    Domestic,
    World,
    CurveArrow,
    Menu,
    Idea,
    Person,
    Night,
    Question,
    GoBackArrow,
    Flag,
    Vaccine,
    Add,
};

export type IconType = keyof typeof icons;

interface IconProps extends BoxProps {
    name: IconType;
    stroke?: string;
    fill?: string;
    hoverFill?: string;
    hoverStroke?: string;
    strokeWidth?: string;
    size?: number;
    height?: string;
    width?: string;
}

const SIcon: any = styled(Row)<{ fill?: any; stroke?: any }>`
    position: relative;
    flex-shrink: 0;
    ${ifProp(
        "size",
        css`
            height: ${prop("size")}px;
            width: ${prop("size")}px;
        `
    )}

    ${addIfProp("width")}
  ${addIfProp("height")}

  svg {
        transition: all 0.2s ease-out;
        width: 100%;
        height: 100%;

        ${addIfProp("fill")};
        ${addIfProp("stroke")};
        ${addIfProp("strokeWidth")};

        :hover {
            ${addIfProp("fill", "hoverFill")};
            ${addIfProp("stroke", "hoverStroke")};
        }
    }
`;

const Icon: FC<IconProps> = ({ name, ...rest }) => <SIcon {...rest}>{React.createElement(icons[name])}</SIcon>;

Icon.defaultProps = {
    size: 16,
    alignItems: "center",
    justifyContent: "center",
};

const MemoIcon = React.memo(Icon, (prev, next) => {
    return prev.name === next.name && prev.size === next.size && prev.fill === next.fill && prev.stroke === next.stroke;
});

// export default MemoIcon;
export default Icon;
