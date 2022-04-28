import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col, Box } from "@components/Layout";
import { HOUR, INSTA_SNS_URL, TWITTER_SNS_URL } from "@consts";
import { CasesSummaryType } from "@types";
import styled from "styled-components";
import Icon from "@components/Icon";
import { IconBox } from "@components/IconBox";
import SnsContainer from "@components/SnsContainer";
import { theme } from "@styles/themes";
import { media } from "@styles";
import { Answer, Question } from "@components/FaqModal";

const Information = styled.div`
    font-size: 12px;
    margin-top: 8px;
    /* text-align: center; */
    opacity: 0.75;
    line-height: 20px;
    word-break: keep-all;
    margin-bottom: 24px;
    padding-left: 14px;
    position: relative;
    &::before {
        content: "A.";
        position: absolute;
        left: 1px;
        font-size: 12px;
        top: 0px;
    }
    strong {
        font-weight: bold;
        margin: 0px 2px;
    }
    br {
    }
`;

const ShowButton = styled(Row)`
    font-size: 12px;
    margin-top: 4px;
    background: ${theme("greyBg")};
    color: ${theme("greyText")};
    font-weight: bold;
    padding: 2px 12px;
    cursor: pointer;
`;

const FAQButton = styled(Row)`
    ${media.desktop} {
    }
`;

type Props = {
    casesSummary: CasesSummaryType;
    openMenu: any;
};

const FinishedPopup: React.FC<Props> = ({ casesSummary, openMenu }) => {
    const [showInfo, setShowInfo] = useState(false);

    const date = new Date();
    const currentHours = date.getHours();
    const currentDate = new Date(date.getTime() - 10 * HOUR);
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const [showModal, setShowModal] = useState(true);
    const { today, imported, domestic } = casesSummary;

    const showDetails = imported + domestic == today;
    if (today < 20) return <></>;
    if (currentHours >= 23 || currentHours < 9)
        return (
            <Modal
                show={showModal}
                dynamic
                title={showInfo ? "자주 묻는 질문" : `${month}월 ${day}일`}
                onClose={() => setShowModal(false)}
                closeButtonPos='bottom'
                zIndex={9999}
            >
                <Col ai='center' maxHeight='400px'>
                    {showInfo ? (
                        <Col mt='0px' mb='18px' ai='flex-start' overflowY='scroll'>
                            <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q. 실시간 집계 기준이 무엇인가요?
                            </Box>
                            <Information>
                                실시간 집계 기준은 상기한 출처에서 제공하는 확진자 정보 중, '당일 확진 판정 받은
                                환자'입니다. 이는 질병관리청의 집계 방식과 동일합니다.
                                <Box minHeight='4px'></Box>
                                예를 들어, A번 환자 관련 재난 문자가 16일 수신 되었더라도 15일 질병관리청 집계에 이미
                                포함된 환자였다면 코로나 라이브 집계에 포함하지 않습니다.
                                <Box minHeight='4px'></Box>
                                단, 15일자 질병관리청 집계에 포함되지 않았던 환자임이 확인될 시 해당 환자를 코로나
                                라이브 당일 집계에 포함합니다.
                            </Information>
                            <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q.질병관리청의 수치 보다 적게 집계되는 이유가 무엇 인가요?
                            </Box>
                            <Information>
                                두 가지 이유가 있습니다.
                                <Box minHeight='4px'></Box>
                                첫째. 당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 다음 날 보내는
                                경우가 존재하여 해당 건은 집계가 어렵기 때문입니다.
                                <Box minHeight='4px'></Box>
                                둘째. 검역의 경우, 상기 출처에서 당일 확진자 정보를 '다음 날' 제공하므로 실시간 집계가
                                불가능하기 때문입니다. (지역사회 해외 유입은 지자체에서 제공할 경우 실시간 집계가
                                가능합니다)
                            </Information>
                            <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q. 자료의 출처는 어디인가요?
                            </Box>
                            <Information>
                                코로나 라이브는 '재난 문자를 비롯하여 각 지방자치단체 및 질병관리청'이 당일 제공하는
                                공개 자료를 기반으로 코로나 관련 현황을 실시간으로 제공하고 있습니다.
                            </Information>
                            <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q. 코로나 라이브의 자료를 이용하거나 공유해도 되나요?
                            </Box>
                            <Information>
                                가능합니다. 다만 아래와 같은 주의 사항이 있으니 반드시 참고하시기 바랍니다.
                                <Box minHeight='4px'></Box>
                                첫째. 민간이 취합한 집계이므로 공식적인 근거 자료로 활용하는 것은 부적절할 수 있습니다.
                                <Box minHeight='4px'></Box>
                                둘째. 본 사이트에서 제공하는 정보를 이용 또는 공유하여 문제가 발생할 시 해당 책임은
                                전적으로 사용자에게 있음을 알려드립니다.
                            </Information>
                            {/* <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q.질병관리청 수치 보다 적게 나오는 이유
                            </Box>
                            // <Box minHeight='4px'></Box>
                            <Information>
                                당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 역학조사 후 다음
                                날 보내는 경우가 존재하여 해당 건은 집계 불가 (주로 저녁에 확진판정 받는 경우). 검역의
                                경우, 당일 확진자 정보를 다음 날 제공하므로 집계 불가.
                            </Information> */}

                            {/* <Box fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q. 질병관리청의 집계 수치와 코로나 라이브의 집계 수치가 차이 나는 이유는 무엇인가요?
                            </Box>
                            // <Box minHeight='4px'></Box>
                            <Information>
                                두 가지 이유가 있습니다.
                                <br></br>
                                첫째. 당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 다음 날 보내는
                                경우가 존재하여 해당 건은 집계가 어렵기 때문입니다.
                                <br></br>
                                둘째. 검역의 경우, 상기 출처에서 당일 확진자 정보를 '다음 날' 제공하므로 실시간 집계가
                                불가능하기 때문입니다. (지역사회 해외 유입은 지자체에서 제공할 경우 실시간 집계가
                                가능합니다)
                            </Information> */}

                            {/* <Row fontSize='12px' fontWeight={500}>
                                집계방식
                            </Row>
                            <Information>
                                재난 문자와 지자체 사이트에서 제공하는 당일 발생 확진자 중, 당일 확진 판정 받은 환자만
                                집계 (질병관리청 집계 방식과 동일). 재난 문자 상으로는 금일 발생이지만 전날 확진
                                판정이라면 집계하지 않음 (단, 질병관리청 전날 집계에 해당 확진 사실이 포함되지 않은
                                경우에는 집계)
                            </Information>
                            <Row fontSize='12px' mt='20px' fontWeight={500}>
                                질병관리청 수치 보다 적게 나오는 이유
                            </Row>
                            <Information>
                                당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 다음 날 보내는 경우가
                                존재하여 해당 건은 집계 불가. 검역의 경우, 당일 확진자 정보를 다음 날 제공하므로 집계
                                불가 (지역사회 해외 유입은 지자체에서 제공할 경우 집계 가능).
                            </Information> */}
                        </Col>
                    ) : (
                        <>
                            <Row fontSize='12px' opacity='0.8' letterSpacing='1px'>
                                {/* <Row fontSize='11px' opacity='0.8'> */}
                                최소수치
                            </Row>
                            <Row fontSize='26px' jc='center'>
                                <Row fontWeight={700}>{today}</Row>
                                <Row fontWeight={300}>명</Row>
                            </Row>
                            {/* <Row
                            fontSize='11px'
                            opacity={0.8}
                            textDecoration='underline'
                            onClick={() => setShowInfo((prev) => !prev)}
                            cursor='pointer'
                        >
                            집계방식 보기 &rarr;
                        </Row> */}
                            {/* <ShowButton onClick={() => setShowInfo((prev) => !prev)}>집계방식 보기 &rarr;</ShowButton> */}
                            {/* <ShowButton onClick={() => setShowInfo((prev) => !prev)}> */}
                            <ShowButton
                                onClick={() => {
                                    openMenu();
                                    setShowModal(false);
                                }}
                            >
                                자주 묻는 질문 보기 &rarr;
                            </ShowButton>
                            {showDetails && (
                                <Row center mb='6px' mt='6px'>
                                    <Row justifyContent='space-between' ai='center'>
                                        <Row fontSize='13px' opacity='0.7' mr='4px'>
                                            국내
                                        </Row>
                                        <Row>
                                            <Row fontSize='13px' fontWeight={700}>
                                                {domestic}
                                            </Row>
                                        </Row>
                                    </Row>
                                    <Row w='10px'>
                                        <Row w='1px'></Row>
                                    </Row>
                                    <Row justifyContent='space-between' ai='center'>
                                        <Row fontSize='13px' opacity='0.7' mr='4px'>
                                            해외
                                        </Row>
                                        <Row>
                                            <Row fontSize='13px' fontWeight={700}>
                                                {imported}
                                            </Row>
                                        </Row>
                                    </Row>
                                </Row>
                            )}
                            {/* <Row h='26px'></Row> */}
                            {/* <Row fontWeight={700} opacity={0.8} fontSize='12px'>
                                Q.질병관리청 수치 보다 적게 나오는 이유
                            </Row>
                            <Row minHeight='4px'></Row>

                            <Information>
                                당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 역학조사 후 다음 날
                                보내는 경우가 존재하여 해당 건은 집계 불가 (주로 저녁에 확진판정 받는 경우). 검역의
                                경우, 당일 확진자 정보를 다음 날 제공하므로 집계 불가.
                            </Information> */}
                            {/* <Row jc='center' textAlign='center' fontSize='12px' opacity='0.7'>
                            최근에 확진자가 급증하면서 당일발생 확진자를 역학조사 후 다음날 발표하는 자자체들이 많아져서
                            실시간 집계 불가능한 확진자도 많아진 점 알려드립니다
                        </Row>
                        <ShowButton onClick={() => setShowInfo((prev) => !prev)}>집계방식 보기 &rarr;</ShowButton> */}
                            {/* <Question>질병관리청의 수치 보다 적게 집계되는 이유가 무엇 인가요?</Question>
                        <Answer>"질병관리청의 수치 보다 적게 집계되는 이유가 무엇 인가요?"</Answer> */}
                            {/* 코로나 라이브는 '재난 문자를 비롯하여 각 자자체 사이트 및 블로그'에서 당일 제공하는 공개
                            자료를 기반으로 집계하고있습니다. 따라서 지자체에서 당일 확진자를 질병관리청에는 통보하지만
                            재난문자 발송 및 사이트에 발표를 다음날 하는 경우에는 집계가 불가합니다. (주로 늦은 시간
                            확진자가 발생하는 경우) */}
                            {/* <Row fontSize='12px' mt='24px' fontWeight={500}>
                            Q.질병관리청의 수치 보다 적게 집계되는 이유
                        </Row>
                        <Row
                            fontSize='12px'
                            mt='12px'
                            fontWeight={400}
                            opacity={0.7}
                            textAlign='center'
                            mb='24px'
                            wordBreak='keep-all'
                        >
                            코로나 라이브는 지자체에서 발표하는 공개 자료를 기반으로 집계하여 제공하고 있습니다. 따라서
                            당일 발생한 확진자가 당일 발표되지 않고 다음날 발표되는 경우에는 실시간 집계가 불가능합니다.{" "}
                            <br></br>
                            <br></br>
                            *최근 들어 확진자가 급증하여, 당일 발생한 확진자를 역학 조사가 끝난 다음 날에 발표하는
                            지자체가 많아졌습니다. 이에 실시간으로 집계하기 어려운 확진자가 늘어났다는 점 알려드립니다.
                            이 점 양해 부탁드립니다.
                        </Row> */}
                            <Col my='10px'>
                                <SnsContainer finishedPopup reverse small></SnsContainer>
                            </Col>
                        </>
                    )}
                    <Row h='10px'></Row>
                </Col>

                <FAQButton> </FAQButton>
            </Modal>
        );
    return <></>;
};

export default FinishedPopup;

// "질병관리청의 수치 보다 적게 집계되는 이유"
// "코로나 라이브는 '재난 문자를 비롯하여 각 자자체 사이트 및 블로그에서 당일 제공하는 공개 자료를 기반으로 집계하고있습니다. 따라서 지자체에서 당일 확진자를 질병관리청에는 통보하지만 재난문자 발송 및 사이트에 발표는 다음날 하는 경우 집계가 불가합니다. (주로 늦은 시간 확진자가 발생하는 경우). 이 점 참고 부탁드리겠습니다."
