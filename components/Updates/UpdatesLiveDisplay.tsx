import styled from "styled-components";
import React, { FC, useMemo, useRef, useState } from "react";

import UpdatesRow from "@components/Updates/UpdatesRow";
import { Col, Row } from "@components/Layout";

import { theme } from "@styles/themes";
import { getCurrentDateTime, getDomesticUpdates } from "@utils";

import { UpdateType } from "@types";
import ALink from "@components/ALink";

const Wrapper = styled(Col)`
    width: 100%;
    justify-content: stretch;
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
            <UpdatesRow data={data[0]} onClick={onClick} animationData={data} newVersion></UpdatesRow>
        </Row>
    );
};

const MemoLiveDisplay = React.memo(LiveDisplay, (prev, next) => prev.data.length == next.data.length);

interface Props {
    data: UpdateType[];
    link?: { href: string; name: string };
    onClick?: any;
    newVersion?: boolean;
}
const UpdatesLiveDisplay: FC<Props> = ({ data, link, onClick, newVersion }) => {
    if (!data || data?.length == 0)
        return (
            <Row p='16px 0px' jc='center' fontSize='14px' opacity={0.8}>
                추가 확진자가 없습니다
            </Row>
        );
    return (
        <Wrapper fadeInUp>
            <MemoLiveDisplay {...{ data, link, onClick }}></MemoLiveDisplay>
        </Wrapper>
    );
};

export default UpdatesLiveDisplay;
