import { Col, Row } from "@components/Layout";
import { useTheme } from "@hooks/useTheme";
import { theme, ThemeType } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { CasesSummaryType, UpdateType } from "@types";
import { getCasesSummary } from "@utils";
import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import Modal from "./Modal";

const Wrapper = styled(Row)`
    border-radius: 4px;
    padding: 0px 8px;
    padding-bottom: 10px;
    margin-bottom: 6px;
    align-items: center;
`;

const Stat = styled(Row)<{ color?: ThemeType }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    span {
        padding-right: 2px;
    }
`;

const Label = styled(Row)`
    font-weight: 400;
    font-size: 10px;
    margin-bottom: 2px;
    color: ${theme("greyText")};
    align-items: center;
    cursor: pointer;
    ${ifProp(
        "color",
        css`
            color: ${(props) => theme(props["color"])};
            svg {
                fill: ${(props) => theme(props["color"])};
            }
        `
    )}

    span {
        transform: translateY(-1px);
    }
`;

const Number = styled(Row)`
    font-size: 12px;
    font-weight: 700;
    :after {
        content: "명";
    }

    ${ifProp(
        "color",
        css`
            color: ${(props) => theme(props["color"])};
        `
    )}
`;

const SDivider = styled(Row)`
    width: 1px;
    height: 22px;
    background: ${theme("lightGreyText")};

    position: relative;
    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: ${theme("bg")};
        /* background: ${theme("lightGreyText")}; */
        /* color: ${theme("greyText")}; */
        color: ${theme("darkGreyText")};
        /* color: ${theme("bg")}; */
        /* border: 1px solid ${theme("greyText")}; */
        span {
            font-size: 11px;
            font-weight: bold;

            transform: translateY(-1px);
        }
    }
`;

const Divider = ({ label }) => (
    <SDivider>
        {/* {label && (
            <div>
                <span>{label}</span>
            </div>
        )} */}
    </SDivider>
);

interface Props {
    data: CasesSummaryType;
}

const CasesSummary: FC<Props> = ({ data }) => {
    const { todayCases, totalCases, yesterdayCases, checking } = data;
    const _theme = useTheme();

    const [showInfo, setShowInfo] = useState(false);
    return (
        <>
            {showInfo && (
                <Modal
                    title=''
                    dynamic
                    closeButtonPos='bottom'
                    onClose={() => setShowInfo(false)}
                    show={true}
                    zIndex={10000}
                >
                    <Col ai='center' jc='center'>
                        <Row fontWeight='bold' fontSize='12px'>
                            오늘 발표
                        </Row>
                        <Row fontSize='12px' mb='14px'>
                            오늘 재난 문자 및 지자체 사이트로 발표된 확진자 수
                        </Row>
                        <Row fontWeight='bold' fontSize='12px'>
                            확인중
                        </Row>
                        <Row fontSize='12px' mb='14px'>
                            어제 집계에 포함되었는지 확인중인 확진자수
                        </Row>
                        <Row fontWeight='bold' fontSize='12px'>
                            어제 집계
                        </Row>
                        <Row fontSize='12px' mb='14px' jc='center' textAlign='center'>
                            오늘 발표됐지만, 어제 집계에 이미 포함된 확진자 수 <br></br>(늦은 시간 확진 판정되어 어제
                            발표 못 한 경우)
                        </Row>
                        <Row fontWeight='bold' fontSize='12px'>
                            오늘 확진자
                        </Row>
                        <Row fontSize='12px' mb='24px' jc='center' textAlign='center'>
                            오늘 발표에서 어제 집계를 뺀 수치
                        </Row>
                    </Col>
                </Modal>
            )}
            <Wrapper fadeInUp onClick={() => setShowInfo(true)}>
                <Stat>
                    <Label color='greyText'>
                        <span>오늘 발표</span>
                        <Icon name='Info' size={10}></Icon>
                    </Label>
                    <Number color='greyText'>{totalCases}</Number>
                </Stat>
                {/* <Row opacity={0.8}>=</Row> */}
                <Divider label='='></Divider>

                <Stat>
                    <Label color='greyText'>
                        <span>확인중</span>
                        <Icon name='Info' size={10} stroke={"greyText"}></Icon>
                    </Label>
                    <Number color='greyText'>{checking}</Number>
                </Stat>
                <Divider label='+'></Divider>
                {/* <Row opacity={0.8}>+</Row> */}
                <Stat>
                    <Label color='greyText'>
                        <span>어제 집계</span>
                        <Icon name='Info' size={10} stroke={"greyText"}></Icon>
                    </Label>
                    <Number color='greyText'>{yesterdayCases}</Number>
                </Stat>
                <Divider label='+'></Divider>
                {/* <Row opacity={0.8}>+</Row> */}
                <Stat>
                    <Label color='blue'>
                        <span>오늘 확진자</span>
                        {/* <Icon name='Info' size={10} stroke={"greyText"}></Icon> */}
                    </Label>{" "}
                    <Number color='blue'>{todayCases}</Number>
                </Stat>
            </Wrapper>
        </>
    );
};

const MemoCasesSummary = React.memo(CasesSummary, (prev, next) => prev.data.todayCases === next.data.todayCases);

export default MemoCasesSummary;
