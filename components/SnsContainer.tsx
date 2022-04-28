import React, { useRef } from "react";
import styled, { css } from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { useKakaoButton } from "@hooks/useKakaoButton";
import { theme } from "@styles/themes";
import { FACEBOOK_URL, BLOG_URL, TWITTER_URL, WEBSITE_URL, TWITTER_SNS_URL, INSTA_SNS_URL } from "@consts";

import { IconBox } from "./IconBox";
import { useTimeoutState } from "@hooks/useTimeoutState";
import { ifProp } from "@styles/tools";
const Wrapper = styled(Col)<{ reverse?: boolean; small?: boolean }>`
    align-items: center;

    & > div {
        align-items: center;
    }

    textarea {
        opacity: 0;
        position: absolute;
        left: -999px;
        top: -999px;
    }

    ${ifProp(
        "reverse",
        css`
            flex-direction: column-reverse;
        `
    )}

    ${ifProp(
        "small",
        css`
            transform: scale(0.9);
        `
    )}
`;

const LinkCopyMsg = styled(Row)`
    position: absolute;
    padding: 0px 10px;
    bottom: 64px;
    font-size: 11px;
    background: ${theme("greyText")}30;
    flex-shrink: 0;
    font-weight: bold;
`;

type Props = {
    reverse?: boolean;
    small?: boolean;
    finishedPopup?: boolean;
    style?: any;
};

const SnsContainer: React.FC<Props> = ({ reverse, small, finishedPopup, style }) => {
    if (!finishedPopup) useKakaoButton();

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
        <Wrapper small={small} reverse={reverse} style={style}>
            <textarea ref={textAreaRef} value={WEBSITE_URL} readOnly />

            {!finishedPopup && (
                <Col my='12px'>
                    <Row fontSize='12px' mb='10px' opacity={0.7}>
                        공유하기
                    </Row>
                    <Row jc='center' position='relative'>
                        <LinkCopyMsg fadeInUp={!!copySuccess} fadeInDown={!copySuccess}>
                            링크가 복사 되었습니다
                        </LinkCopyMsg>
                        <IconBox type='facebook' href={FACEBOOK_URL}>
                            <Icon name='Facebook' size={14}></Icon>
                        </IconBox>
                        <IconBox type='twitter' href={TWITTER_URL}>
                            <Icon name='Twitter' size={14}></Icon>
                        </IconBox>
                        <IconBox type='blog' href={BLOG_URL}>
                            <Icon name='Blog' size={14}></Icon>
                        </IconBox>

                        <IconBox type='kakao' id='kakaoShare'>
                            <Icon name='KakaoTalk' size={14}></Icon>
                        </IconBox>

                        <IconBox type='link' onClick={copyToClipboard}>
                            <Icon name='Link' size={14}></Icon>
                        </IconBox>
                    </Row>
                </Col>
            )}

            <Col my='9px'>
                {/* {!finishedPopup && ( */}
                <Row fontSize='12px' mb='10px' opacity={0.7}>
                    SNS로 보기
                </Row>
                {/* )} */}
                <Row jc='center' position='relative' flexShrink={0}>
                    <IconBox type='twitter' href={TWITTER_SNS_URL}>
                        <Icon name='Twitter' size={14}></Icon>
                    </IconBox>
                    <IconBox type='instagram' href={INSTA_SNS_URL}>
                        <Icon name='Instagram' size={14}></Icon>
                    </IconBox>
                </Row>
            </Col>
        </Wrapper>
    );
};

export default SnsContainer;
