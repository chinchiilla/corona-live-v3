import React, { useRef, useState } from "react";
import styled from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { theme } from "@styles/themes";
import { IMPORTANT_MESSAGE, KAKAOPAY_URL, EMAIL } from "@consts";

import { IconBox } from "./IconBox";
import SnsContainer from "./SnsContainer";
import Modal from "./Modal";
import { useTimeoutState } from "@hooks/useTimeoutState";

const Wrapper = styled(Col)`
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    /* margin-top: 50px; */
    textarea {
        opacity: 0;
        position: absolute;
        left: -999px;
        top: -999px;
    }

    flex-direction: column;
    p {
        font-size: 11px;

        margin-top: 50px;
        text-align: center;
        word-break: keep-all;
        opacity: 0.7;
    }
    a {
        color: ${theme("darkGreyText")};
    }
`;

const Footer = () => {
    const [showDonationPopup, setShowDonationPopup] = useState(false);
    const onClose = () => setShowDonationPopup(false);
    const onOpen = () => setShowDonationPopup(true);

    const [copySuccess, setCopySuccess] = useTimeoutState(false, 2000);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function copyToClipboard(e) {
        textAreaRef.current!.select();
        document.execCommand("copy");
        textAreaRef.current!.blur();
        e.target.blur();
        setCopySuccess(true);
    }

    return (
        <>
            <Modal
                show={showDonationPopup}
                onClose={onClose}
                title={"서버비용 후원"}
                closeButtonPos={"bottom"}
                dynamic
                noFadeInUp
            >
                <Col ai='center' position='relative'>
                    <Row fontSize='12px' mb='10px' mt='12px' opacity={0.8}>
                        카카오페이
                    </Row>
                    <IconBox type='kakao' href={KAKAOPAY_URL} kakaoPay>
                        <Icon name='KakaoPay' height='12px' width='100px'></Icon>
                    </IconBox>
                    <Row h='16px'></Row>
                    <Row fontSize='12px' mb='10px' mt='12px' opacity={0.8}>
                        카카오뱅크
                    </Row>

                    <Row fontSize='14px' jc='center' ai='center' textAlign='center' opacity={0.9}>
                        {/* <Row fontWeight={700}>카카오페이</Row>
                        <Row w='12px'></Row> */}

                        <DonationButton onClick={copyToClipboard}>
                            <Row ml='-4px'>홍준서</Row>

                            <Row ml='4px' fontSize='15px'>
                                3333-18-8178788
                            </Row>
                            <CopyButton> 복사</CopyButton>
                        </DonationButton>
                    </Row>

                    {copySuccess && (
                        <LinkCopyMsg fadeInUp={!!copySuccess} fadeInDown={!copySuccess}>
                            링크가 복사 되었습니다
                        </LinkCopyMsg>
                    )}

                    <Row h='36px'></Row>
                </Col>
            </Modal>
            <Wrapper fadeInUp delay={6}>
                <textarea ref={textAreaRef} value={"3333188178788"} readOnly />

                <Row h='24px'></Row>
                <Row fontSize='12px' mb='10px' mt='12px' opacity={0.8}>
                    서버비용 후원하기
                </Row>
                <Row fontSize='12px' jc='center' opacity='0.65' textAlign='center'>
                    이용하시는데 불편함이 없도록 광고 없이 운영을 하고 있습니다.<br></br>
                    서버비용 충당 후 후원금이 남을시 코로나19 관련 단체에 기부하겠습니다. <br></br> (SNS 통해 공개)
                </Row>
                <Row h='18px'></Row>

                <Row jc='center' position='relative'>
                    <DonationButton onClick={onOpen}>
                        <Icon name='Donation' height='8px' width='8px'></Icon>
                        <strong>후원</strong>하기
                    </DonationButton>
                </Row>

                {/* <Row jc='center' position='relative'>
                <IconBox type='kakao' href={KAKAOPAY_URL} kakaoPay>
                    <Icon name='KakaoPay' height='12px' width='100px'></Icon>
                </IconBox>
            </Row> */}
                <Row h='42px'></Row>
                <SnsContainer></SnsContainer>

                <Col px='6px' mt='-6px' fontSize='12px'>
                    <p style={{ fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
                </Col>

                <Row ai='center' my='12px'>
                    <Row fontSize='11px' opacity={0.7}>
                        개발자
                    </Row>
                    <Row ml='4px' fontSize='11px' fontWeight={500} textAlign='center'>
                        <a>홍준서</a>
                    </Row>
                </Row>

                <Row mt='18px' jc='center' ai='center' mb='20px'>
                    {/* <Row fontSize='12px' opacity='0.8' mb='4px'>
                    문의 / 개선사항
                </Row> */}

                    <Row fontSize='12px'>
                        <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
                    </Row>
                </Row>
            </Wrapper>
        </>
    );
};

const DonationButton = styled(Row)`
    width: auto !important;
    background: transparent;
    background: ${theme("shadow")};
    /* box-shadow: -1px 1px 20px #0000001e;
    box-shadow: -1px 1px 8px #00000017; */
    box-shadow: -1px 1px 6px #00000006;
    border: 1px solid ${theme("darkGreyText")}20;
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;

    div:first-child {
        margin-right: 6px;
    }
    svg {
        fill: ${theme("darkGreyText")};
    }
`;
const LinkCopyMsg = styled(Row)`
    opacity: 0;
    position: absolute;
    padding: 0px 10px;
    bottom: 12px;
    font-size: 11px;
    background: ${theme("greyBg")};
    color: ${theme("darkGrey")};
    flex-shrink: 0;
    font-weight: bold;
`;
const CopyButton = styled(Row)`
    margin-left: 8px;
    font-size: 13px;
    background: ${theme("greyBg")};
    padding: 2px 12px;
    border-radius: 6px;
    margin-right: -8px;
    cursor: pointer;
`;
const MemoFooter = React.memo(Footer);

export default MemoFooter;
