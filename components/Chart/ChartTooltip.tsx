import Icon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { media } from "@styles/";
import { theme, ThemeType } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { DAY } from "@utils/consts";
import { T } from "@utils/constsV2";
import { getPrevDate, numberWithCommas } from "@utils/helper";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled(Col)<{ hideMobile?: boolean }>`
    top: 0px;
    position: relative;
    width: fit-content;
    background: ${theme("greyBg")};
    padding: 6px 12px;
    margin: 0px 12px;
    border-radius: 12px;
    margin-top: 6px;
    box-shadow: -1px 1px 12px -2px #0000001f;
    background: ${theme("shadow")};
    z-index: 2;
    ${ifProp(
        "hideMobile",
        css`
            display: flex; ;
        `
    )}

    ${media.phablet} {
        margin-top: 4px;

        /* ${ifProp(
            "hideMobile",
            css`
                display: none;
            `
        )} */
    }
`;

const DomesticImportedContainer = styled(Col)`
    margin-bottom: -2px;
    font-weight: bold;
    font-size: 24px;
    span {
        font-weight: 400;

        font-size: 14px;
        opacity: 0.7;
    }
`;
const LiveContainer = styled(Col)`
    display: flex;
    flex-direction: row;
    margin-bottom: -2px;
    display: flex;
    flex-direction: column;
    &:first-of-type {
        margin-right: 8px;
    }
    .label {
        font-size: 12px;
        margin-bottom: -4px;
        font-weight: 400;
        opacity: 0.7;
    }
    .stat {
        font-size: 22px;
        font-weight: bold;
        span {
            font-size: 14px;
            font-weight: 400;
            opacity: 0.7;
        }
    }
`;

const Label = styled.div`
    font-size: 12px;
    opacity: 0.7;
`;
const MainLabel = styled.div`
    font-size: 18px;
    opacity: 0.7;
    margin-right: 4px;
`;
const MainStat = styled(Row)`
    font-weight: bold;
    font-size: 20px;
    align-items: center;
`;
const SubContainer = styled(Row)``;
const SubLabel = styled.div<{ color?: ThemeType }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 4px;
    font-size: 14px;

    span {
        font-weight: 400;
        opacity: 0.7;
    }
    ${media.phablet} {
        font-size: 13px;
    }
    &:before {
        content: "";
    background: ${(props) => props.color};
        box-shadow: 0 0 0 4.5px ${(props) => props.color}50;

        /* background: ${(props) => theme(props.color)};
        box-shadow: 0 0 0 4px ${(props) => theme(props.color)}50; */
        display: none;
        width: 6px;
        border-radius: 6px;
        height: 6px;
        margin-left: 2px;
        margin-right: 8px;
        ${ifProp(
            "hideIcon",
            css`
                display: none;
            `
        )}
        ${ifProp(
            "color",
            css`
                display: flex;
            `
        )}
    }
    /* margin-bottom: -4px; */
`;
const SubStat = styled.div`
    font-size: 15px;
    font-weight: bold;
    span {
        font-weight: 400;
    }

    ${media.phablet} {
        font-size: 14px;
    }
`;
const MainDivider = styled.div`
    width: 1px;
    height: 24px;
    background: ${theme("darkGreyText")}70;
    margin: 0px 12px;
`;
const SubDivider = styled.div`
    width: 1px;
    height: 12px;
    /* background: ${theme("darkGreyText")}70; */
    margin: 0px 6px;
`;
const DateContainer = styled.div`
    font-size: 11px;
    font-weight: bold;
    opacity: 0.7;
    /* font-weight: bold; */
`;

type Props = {
    dataSet;
    activeHour;
    mainOption;
    chartOptions;
    dataType: "DOMESTIC" | "WORLD";
    xParser: any;
    hideMobileTooltip;
    sethideMobileTooltip;
};

const ChartTooltip: React.FC<Props> = ({ dataSet, activeHour, mainOption, chartOptions, dataType, xParser, hideMobileTooltip, sethideMobileTooltip }) => {
    const { type, range } = chartOptions;

    const isDomestic = dataType === "DOMESTIC";

    const isDomesticWmported = mainOption == T.CASES && chartOptions.type == T.DAILY && Number(range) < 90 && dataSet.length === 2;
    const isLive = type == T.LIVE;
    const isRates = type == T.RATES;
    const isAverageCumulated = type == T.WEEKLY || type == T.MONTHLY;

    if (isDomesticWmported) {
        const domestic = dataSet[0].data[activeHour];
        const imported = dataSet[1].data[activeHour];

        const newDate = getPrevDate(activeHour).toISOString().slice(0, 10);

        return (
            <Wrapper className='chart-tooltip' hideMobile={hideMobileTooltip}>
                <DomesticImportedContainer>
                    <DateContainer>{newDate}</DateContainer>
                    <Row ai='center' py='2px'>
                        {/* <MainStat>
                            {domestic + imported}
                            <span>명</span>
                        </MainStat> */}

                        <SubLabel>
                            <span>총</span>
                        </SubLabel>
                        <SubStat>
                            {numberWithCommas(domestic + imported)}
                            <span>명</span>
                        </SubStat>

                        <SubDivider></SubDivider>

                        <SubLabel color={dataSet[0].color}>
                            <span>국내</span>
                        </SubLabel>
                        <SubStat>
                            {numberWithCommas(domestic)}
                            <span>명</span>
                        </SubStat>

                        <SubDivider></SubDivider>

                        <SubLabel color={dataSet[1].color}>
                            <span>해외</span>
                        </SubLabel>
                        <SubStat>
                            {numberWithCommas(imported)}
                            <span>명</span>
                        </SubStat>
                    </Row>
                </DomesticImportedContainer>
            </Wrapper>
        );
    }

    // if (isLive) {
    //     const today = dataSet[0].data[activeHour];
    //     const todayLabel = dataSet[0].name;
    //     const other = dataSet[1].data[activeHour];
    //     const otherLabel = dataSet[1].name;

    //     const delta = other - today;

    //     return (
    //         <Wrapper className='chart-tooltip'>
    //             <LiveContainer>
    //                 <DateContainer>{activeHour}시 기준</DateContainer>
    //                 <Row ai='center' py='2px'>
    //                     <SubLabel>{todayLabel}</SubLabel>
    //                     <SubStat>
    //                         {numberWithCommas(today)}

    //                         <span>명</span>
    //                     </SubStat>

    //                     <SubDivider></SubDivider>

    //                     <SubLabel>{otherLabel}</SubLabel>
    //                     <SubStat>
    //                         {numberWithCommas(other)}

    //                         <span>명</span>
    //                     </SubStat>
    //                 </Row>

    //                 {/* <Row ai='center'>
    //                     <Col>
    //                         <SubLabel>{todayLabel}</SubLabel>
    //                         <MainStat>
    //                             {today}
    //                             <span>명</span>
    //                         </MainStat>
    //                     </Col>

    //                     <MainDivider></MainDivider>

    //                     <Col>
    //                         <SubLabel>{otherLabel}</SubLabel>
    //                         <MainStat>
    //                             {other}
    //                             <span>명</span>
    //                         </MainStat>
    //                     </Col>
    //                 </Row> */}
    //             </LiveContainer>
    //         </Wrapper>
    //     );
    // }

    let dateInfo = activeHour;

    if (isLive) {
        const timePeriod = Object.keys(dataSet[0].data);
        const lastTime = timePeriod[timePeriod.length - 1];
        dateInfo = `${activeHour}시 기준`;
        if (activeHour == lastTime) dateInfo = "현재";
    } else {
        dateInfo = getPrevDate(activeHour).toISOString().slice(0, 10);
    }

    if (chartOptions.type == T.MONTHLY) {
        let d = new Date(activeHour);
        // let d = getPrevDate(activeHour);
        let month = d.getMonth() + 1;
        d.setMonth(month);
        d.setDate(-1);
        if (d.getTime() > new Date().getTime()) {
            d = new Date();
            if (d.getDate() > 1) {
                d.setDate(d.getDate() - 1);
            }
        }
        let nextDay = d.getDate();
        dateInfo = `${month}월 1일 ~ ${month}월 ${nextDay}일`;
        // dateInfo = `${month}.1 ~ ${month}.${nextDay}`;
    } else if (chartOptions.type == T.WEEKLY) {
        // let d = new Date(activeHour);
        let d = getPrevDate(activeHour);
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let leftOverTime = new Date().getTime() - d.getTime();
        let leftOverDays = leftOverTime / DAY > 7 ? 0 : 7 - Math.floor(leftOverTime / DAY);
        // let week = Math.ceil((day - leftOver + 1) / 7);

        // d.setDate(d.getDate() + 7);
        d.setDate(d.getDate() + (7 - leftOverDays));
        // d.setDate(d.getDate() + leftOver);
        let nextMonth = d.getMonth() + 1;
        let nextDay = d.getDate() - 1;
        dateInfo = `${month}월 ${day}일 ~ ${nextMonth}월 ${nextDay}일`;
        // dateInfo = `${month}.${day} ~ ${nextMonth}.${nextDay}`;
    }

    // if (isAverageCumulated) {
    //     const today = dataSet[1].data[activeHour];
    //     const todayLabel = dataSet[1].name;
    //     const other = dataSet[0].data[activeHour];
    //     const otherLabel = dataSet[0].name;

    //     return (
    //         <Wrapper className='chart-tooltip'>
    //             <LiveContainer>
    //                 <DateContainer>{dateInfo}</DateContainer>
    //                 <Row ai='center' py='2px'>
    //                     <SubLabel>{todayLabel}</SubLabel>
    //                     <SubStat>
    //                         {numberWithCommas(today)}
    //                         <span>명</span>
    //                     </SubStat>

    //                     <SubDivider></SubDivider>

    //                     <SubLabel>{otherLabel}</SubLabel>
    //                     <SubStat>
    //                         {numberWithCommas(other)}
    //                         <span>명</span>
    //                     </SubStat>
    //                 </Row>
    //             </LiveContainer>
    //         </Wrapper>
    //     );
    // }
    return (
        <Wrapper className='chart-tooltip' hideMobile={hideMobileTooltip} fadeInUp>
            <LiveContainer>
                <DateContainer>{dateInfo}</DateContainer>
                <Row ai='center' py='2px'>
                    {/* <SubLabel>{dataSet[0].name}</SubLabel>
                    <SubStat>
                        {numberWithCommas(dataSet[0].data[activeHour])}
                        <span>명</span>
                    </SubStat> */}
                    {[...dataSet]
                        .sort((a, b) => a.tooltipIndex - b.tooltipIndex)
                        .map(({ name, data, unit, color, ...rest }, i) => {
                            return (
                                <>
                                    {i > 0 && <SubDivider></SubDivider>}
                                    <SubLabel color={color} key={`label-${i}`}>
                                        <span>{name}</span>
                                    </SubLabel>
                                    <SubStat key={`stat-${i}`}>
                                        {numberWithCommas(data[activeHour])}
                                        <span>{unit}</span>
                                    </SubStat>
                                </>
                            );
                        })}
                </Row>
            </LiveContainer>
        </Wrapper>
    );
};

export default ChartTooltip;
