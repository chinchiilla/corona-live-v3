import styled from "styled-components";
import React, { FC, useRef, useState } from "react";

import UpdatesRow from "./UpdatesRow";
import { Col, Row } from "@components/Layout";

import { theme } from "@styles/themes";
import { getCurrentDateTime } from "@utils";

import { UpdateType } from "./types";
import ALink from "@components/ALink";

const Wrapper = styled(Col)`
    width: 100%;
    justify-content: stretch;
    margin-bottom: 4px;
`;

const Time = styled(Col)`
    justify-content: center;
    margin: 8px 0px;
    font-size: 11px;
    font-weight: 500;
    color: ${theme("darkGreyText")};
    opacity: 0.5;
    text-align: center;
`;

const LiveDisplay = ({ data, link, onClick }) => {
    return (
        <Row flex={1} position='relative'>
            {link && <ALink href={link.href}>{link.name}</ALink>}
            <UpdatesRow data={data[0]} onClick={onClick} animationData={data.slice(0, 5)}></UpdatesRow>
        </Row>
    );
};

const MemoLiveDisplay = React.memo(LiveDisplay, (prev, next) => prev.data.length == next.data.length);

interface Props {
    data: UpdateType[];
    link?: { href: string; name: string };
    onClick?: any;
}
const UpdatesLiveDisplay: FC<Props> = ({ data, link, onClick }) => {
    if (data.length == 0) return <div style={{ height: "30px" }}></div>;

    return (
        <Wrapper fadeInUp>
            <Time>{getCurrentDateTime()}</Time>
            {data.length > 0 && <MemoLiveDisplay {...{ data, link, onClick }}></MemoLiveDisplay>}
        </Wrapper>
    );
};

export default UpdatesLiveDisplay;
