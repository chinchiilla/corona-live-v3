import Header from "@components/Home/Header";
import { Box, Col, Row, TransparentSection } from "@components/Layout";
import Meta from "@components/Meta";
import SnsContainer from "@components/SnsContainer";
import { theme } from "@styles/themes";
import { EMAIL } from "@utils/consts";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    overflow-y: scroll;
    padding: 0px 20px;
    padding-top: 12px;
    a {
        color: ${theme("darkGreyText")};
    }
`;

export const Question = styled.div`
    font-weight: 700;
    opacity: 0.85;
    font-size: 12px;
    position: relative;
    padding-left: 20px;
    word-break: keep-all;
    &::before {
        content: "Q.";
        position: absolute;
        left: 1px;
        font-size: 12px;
        top: 0px;
    }
`;

export const Answer = styled.div`
    font-size: 12px;
    margin-top: 6px;
    opacity: 0.75;
    line-height: 20px;
    word-break: keep-all;
    margin-bottom: 26px;
    padding-left: 20px;
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
const FAQ = [
    { q: "공식 사이트 인가요?", a: ["민간이 운영하는 비공식 사이트입니다."] },
    {
        q: "자료의 출처는 어디인가요?",
        a: [
            `코로나 라이브는 '재난 문자를 비롯하여 각 지방자치단체 및 질병관리청'이 당일 제공하는
공개 자료를 기반으로 코로나 관련 현황을 실시간으로 제공하고 있습니다.`,
        ],
    },

    {
        q: "실시간 집계 기준이 무엇인가요?",
        a: [
            `실시간 집계 기준은 상기한 출처에서 제공하는 확진자 정보 중, '당일 확진 판정 받은
  환자'입니다. 이는 질병관리청의 집계 방식과 동일합니다.`,
            `예를 들어, A번 환자 관련 재난 문자가 16일 수신 되었더라도 15일 질병관리청 집계에 이미
  포함된 환자였다면 코로나 라이브 집계에 포함하지 않습니다.`,
            `단, 15일자 질병관리청 집계에 포함되지 않았던 환자임이 확인될 시 해당 환자를 코로나
  라이브 당일 집계에 포함합니다.`,
        ],
    },
    {
        q: "질병관리청의 수치 보다 적게 집계되는 이유가 무엇 인가요?",
        a: [
            `두 가지 이유가 있습니다.`,
            `첫째. 당일 확진자의 경우, 지자체에서 질병관리청에는 통보하나 재난 문자는 다음 날 보내는 경우가 존재하여 해당 건은 집계가 어렵기 때문입니다.`,
            `둘째. 검역의 경우, 상기 출처에서 당일 확진자 정보를 '다음 날' 제공하므로 실시간 집계가
  불가능하기 때문입니다. (지역사회 해외 유입은 지자체에서 제공할 경우 실시간 집계가
  가능합니다)`,
        ],
    },

    {
        q: "코로나 라이브의 자료를 이용하거나 공유해도 되나요?",
        a: [
            `가능합니다. 다만 아래와 같은 주의 사항이 있으니 반드시 참고하시기 바랍니다.`,
            `첫째. 민간이 취합한 집계이므로 공식적인 근거 자료로 활용하는 것은 부적절할 수 있습니다.`,
            `둘째. 본 사이트에서 제공하는 정보를 이용 또는 공유하여 문제가 발생할 시 해당 책임은
  전적으로 사용자에게 있음을 알려드립니다.`,
        ],
    },

    // {
    //     q: "추가 메세지",
    //     a: [
    //         `개인이 만들다 보니 사이트에 부족한 점이 많지만 계속 개선시키기 위해 노력하고
    //        있습니다. 기능 추가 요청이나 피드백은 아래에 있는 이메일로 보내주시면 최대한 반영해보도록 하겠습니다 :)`,
    //     ],
    // },
];

const Faq = () => {
    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | FAQ`,
                    canonical: `faq`,
                    description: `코로나 라이브 FAQ`,
                }}
            ></Meta>
            <TransparentSection>
                <Header title={"자주 묻는 질문"}></Header>
            </TransparentSection>

            <TransparentSection>
                <Wrapper fadeInUp delay={2}>
                    {FAQ.map((data) => {
                        return (
                            <>
                                <Question>{data.q}</Question>
                                <Answer>
                                    {data.a.map((answer, i) => {
                                        return (
                                            <>
                                                {i > 0 && <Box minHeight='4px'></Box>}
                                                {answer}
                                            </>
                                        );
                                    })}
                                </Answer>
                            </>
                        );
                    })}

                    <Row minHeight='8px'></Row>
                    <div>
                        <SnsContainer></SnsContainer>
                    </div>

                    <div>
                        <Col my='32px' jc='center' ai='center'>
                            <Row fontSize='12px' opacity='0.7' mb='4px'>
                                문의 / 개선사항
                            </Row>

                            <Row fontSize='12px'>
                                <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
                            </Row>
                        </Col>
                    </div>

                    <Row minHeight='26px'></Row>
                </Wrapper>
            </TransparentSection>
        </>
    );
};

export default Faq;
