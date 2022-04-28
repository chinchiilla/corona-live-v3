import React, { useState, FC, useRef, useEffect, useMemo, useCallback } from "react";
import styled, { css } from "styled-components";

import { Col, Row, Absolute } from "@components/Layout";
import Icon from "@components/Icon";
import LastUpdatedTime from "./LastUpdatedTime";
import Report from "@components/Home/ReportModal";

import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { mixins } from "@styles";
import { addHyperLink } from "@utils";

const Container = styled(Row)<{ shadow?: boolean }>`
    justify-content: flex-end;
    align-items: center;
    position: relative;
    min-height: 50px;
    padding-left: 4px;
    padding-right: 10px;
    position: relative;
    border-top: 1px solid ${theme("greyText")}15;
    width: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    flex-shrink: 0;
    cursor: pointer;

    ${ifProp(
        "shadow",
        css`
            padding: 0px 20px;
            border-top: none;
            border-radius: 6px;
            background: ${theme("greyBg")};

            background: ${theme("shadow")};
            box-shadow: -1px 1px 20px #0000001e;
        `
    )}
`;

const Message = styled(Row)<{ isInvalid?: boolean; longString?: boolean }>`
    font-size: 12px;
    text-align: center;
    align-items: center;
    ${ifProp(
        "isInvalid",
        css`
            opacity: 0.6;
        `
    )}
    ${ifProp(
        "longString",
        css`
            * {
                font-size: 11px;
            }
        `
    )}
`;

const Details = styled(Col)`
    padding: 14px 20px;
    border-radius: 12px;
    background: ${theme("greyBg")};
    margin-bottom: 14px;
    flex-shrink: 0;
    p {
        font-weight: 300;
        font-size: 13px;
        color: ${theme("darkGreyText")};
        overflow-x: auto;
        a {
            color: ${theme("darkGreyText")}!important;
        }
    }
`;

const ReportButton = styled(Row)`
    margin-top: 12px;
    font-size: 10px;

    font-weight: 500;
    text-decoration: underline;
    color: ${theme("darkGreyText")};
    justify-content: flex-end;
    cursor: pointer;
`;

const AnimationContainer = styled(Absolute)`
    ${mixins.AbsoluteFull};
    align-items: center;
    padding: 0px 14px;
    box-sizing: border-box;
`;

interface ContentProps {
    datetime: string;
    area: string;
    title: string;
    showDetails: boolean;
    isInvalid: boolean;
    fullWidth?: boolean;
    hideSrc?: boolean;
}

const Content: FC<ContentProps> = ({ datetime, area, title, showDetails, isInvalid, fullWidth, hideSrc }) => {
    return (
        <Row flex='1' flexWrap='wrap'>
            <Row flex='1' flexWrap='wrap'>
                <LastUpdatedTime date={datetime} flex={`0 1 90px`}></LastUpdatedTime>
                <Message isInvalid={isInvalid} longString={area?.length > 5 && hideSrc}>
                    {!fullWidth ? (
                        <Absolute center>
                            <Row fontWeight={700} mr='4px'>
                                {area}
                            </Row>
                            <Row>{title}</Row>
                        </Absolute>
                    ) : (
                        <Row>
                            <Row fontWeight={700} mr='4px'>
                                {area}
                            </Row>
                            <Row>{title}</Row>
                        </Row>
                    )}
                </Message>
            </Row>

            {!hideSrc && (
                <>
                    {!showDetails ? (
                        <Icon name='ChevronDown' size={24}></Icon>
                    ) : (
                        <Icon name='ChevronUp' size={24}></Icon>
                    )}
                </>
            )}
        </Row>
    );
};

const AdditionalInfo = styled(Row)`
    justify-content: center;
    margin-bottom: 12px;
    margin-top: 4px;
    font-size: 12px;
    font-weight: 700;
    position: relative;
`;
interface Props {
    onClick?: any;
    data?: any;
    animationData?: any;
    fadeInUp?: boolean;
    delay?: number;
    fullWidth?: boolean;
    hideSrc?: boolean;
}
export const UpdatesRow: FC<Props> = ({ onClick, data, animationData, fadeInUp, delay, fullWidth, hideSrc }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [currentContent, setCurrentContent] = useState(data);
    const contentIndex = useRef(0);

    const { datetime, area, title, cases, total } = currentContent;
    const isInvalid = total == total - cases && !animationData;

    const message = `[${datetime.split(" ")[1]}] ${area} ${title} 관련`;

    useEffect(() => {
        if (animationData) setCurrentContent(animationData[contentIndex.current]);
    }, [animationData]);

    useEffect(() => {
        let interval;
        if (animationData) {
            interval = setInterval(() => {
                setCurrentContent(animationData[contentIndex.current]);
                contentIndex.current++;
                if (contentIndex.current >= animationData?.length) contentIndex.current = 0;
            }, 3000);
        }
        return () => clearInterval(interval);
    }, []);

    const additionalInfo = useMemo(() => {
        if (cases == null) {
            return `*${total}명 어제 집계 여부 확인중`;
        } else if (total == total - cases) {
            return `*${total}명 ${total > 1 ? `모두 ` : ""}어제 집계에 이미 포함`;
        } else {
            return `*${total}명중 ${total - cases}명은 어제 집계에 이미 포함`;
        }
    }, [cases, total]);

    const onContainerClick = useCallback(() => {
        if (onClick) {
            onClick();
        } else {
            setShowDetails((a) => !a);
        }
    }, [onClick]);

    const closeReportModal = useCallback(() => setShowReport(false), [setShowReport]);
    const openReportModal = useCallback(() => setShowReport(true), [setShowReport]);

    const detailsHtml = useMemo(
        () => ({
            __html: addHyperLink(currentContent.src),
        }),
        [currentContent.src]
    );

    return (
        <>
            {showReport && (
                <Report hideOverlay={true} show={showReport} onClose={closeReportModal} errorReport={message}></Report>
            )}
            <Container shadow={!!animationData} onClick={onContainerClick} {...{ fadeInUp, delay }}>
                {animationData ? (
                    animationData.map(
                        ({ datetime, area, title }, i) =>
                            contentIndex.current == i && (
                                <AnimationContainer fadeInUp key={`${datetime}/${i}`}>
                                    <Content {...{ datetime, area, title, showDetails, isInvalid, hideSrc }}></Content>
                                </AnimationContainer>
                            )
                    )
                ) : (
                    <Content {...{ datetime, area, title, showDetails, isInvalid, fullWidth, hideSrc }}></Content>
                )}
            </Container>

            {showDetails && !hideSrc && (
                <Details fadeInUp>
                    {!!total && <AdditionalInfo>{additionalInfo}</AdditionalInfo>}
                    <p dangerouslySetInnerHTML={detailsHtml}></p>
                    <ReportButton onClick={openReportModal}>오류제보</ReportButton>
                </Details>
            )}
        </>
    );
};

const MemoUpdatesRow = React.memo(UpdatesRow, (prev, next) => {
    let p = prev.data;
    let n = next.data;
    return p.datetime === n.datetime && p.cases === n.cases && p.total === n.total;
});

export default MemoUpdatesRow;
