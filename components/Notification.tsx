import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Col, Row, Box } from "./Layout";
import Overlay from "./Overlay";
import Icon from "./Icon";
import Button from "./Button";

import { mixins } from "@styles";
import { theme } from "@styles/themes";
import { NotificationType } from "@types";
import { ct } from "@utils";

const Wrapper = styled(Col)`
    ${mixins.AbsoluteCenter};
    position: fixed;
    z-index: 100001;
    width: fit-content;
`;
const Container = styled(Col)`
    width: 220px;
    box-sizing: border-box;
    justify-content: stretch;
    display: flex;
    padding: 24px 20px;
    border-radius: 10px;
    background: ${theme("bg")};
    align-items: center;
    svg {
        stroke: ${theme("darkGreyText")};
        fill: ${theme("darkGreyText")};
        stroke-width: 0.5px;
    }
`;

const Detail = styled(Row)`
    font-size: 12px;
    color: ${theme("greyText")};
    margin-bottom: 4px;
`;

const Message = styled(Row)`
    font-size: 14px;
    font-weight: 700;
    margin-top: 14px;
    flex-shrink: 0;
`;

const Shake = keyframes`
  0% { transform: rotate(-40deg); }
  15% { transform: rotate(30deg); }
  30% { transform: rotate(-20deg); }
  45% { transform: rotate(20deg); }
  60% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  85% { transform: rotate(-3deg); }
  92% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
`;

const NotificationIcon = styled(Row)`
    width: 40px;
    height: 40px;
    margin-top: 4px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background: ${theme("greyBg")};
    animation: ${Shake} 1s ease-in-out;
`;

type Props = {
    notification: NotificationType;
    closeModal: () => void;
    openUpdates?: () => void;
};

const Notification: React.FC<Props> = ({ notification, closeModal, openUpdates }) => {
    const { cases, data } = notification;
    const [fadeModal, setFadeModal] = useState(false);

    useEffect(() => {
        setTimeout(
            () => {
                setFadeModal(true);
            },
            openUpdates ? 3500 : 1500
        );
    }, []);

    useEffect(() => {
        let t;
        if (fadeModal) {
            t = setTimeout(() => {
                closeModal();
            }, 500);
        }
        return () => clearTimeout(t);
    }, [fadeModal]);

    const showLiveUpdates = useCallback(() => {
        closeModal();
        if (openUpdates) openUpdates();
    }, []);

    return (
        <>
            <Overlay fadeInUp={!fadeModal} fadeInDown={fadeModal} zIndex={100000}></Overlay>
            <Wrapper>
                <Container fadeInUp={!fadeModal} fadeInDown={fadeModal}>
                    <NotificationIcon fadeInUp>
                        <Icon name='NotificationFilled' size={22}></Icon>
                    </NotificationIcon>
                    <Message>확진자 {cases}명 추가</Message>
                    <Col py='12px'>
                        {Object.keys(data || {}).map((cityId) => {
                            if (data[cityId] < 1) return <></>;
                            return (
                                <Detail key={cityId}>
                                    {ct(cityId)}
                                    <Box w='6px'></Box>+{data[cityId]}
                                </Detail>
                            );
                        })}
                    </Col>

                    <Row w='100%' mt='10px'>
                        {/* {openUpdates && (
                            <Row flex={1}>
                                <Button full blue small onClick={showLiveUpdates}>
                                    보기
                                </Button>
                            </Row>
                        )}
                        <Row w='8px'></Row> */}
                        <Row flex={1}>
                            <Button full small onClick={closeModal}>
                                닫기
                            </Button>
                        </Row>
                    </Row>
                </Container>
            </Wrapper>
        </>
    );
};

const MemoNotification = React.memo(
    Notification,
    (prev, next) => prev.notification.addedCases === next.notification.addedCases
);

export default MemoNotification;
