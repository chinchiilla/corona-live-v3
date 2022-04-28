import React, { FC } from "react";
import styled, { css } from "styled-components";
import * as ReactDOM from "react-dom";

import Icon, { IconType } from "@components/Icon/Icon";
import { Row, Col } from "@components/Layout";

import { theme } from "@styles/themes";
import { media } from "@styles";
import { useTheme } from "@hooks/useTheme";
import Overlay from "./Overlay";
import Button from "./Button";
import { ifProp, prop } from "@styles/tools";
import Underline from "./Underline";

const Children = styled.div`
    flex: 1;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
`;

const ModalContainer = styled(Col)<{ fixedHeight?: boolean; full?: boolean }>`
    position: fixed;
    left: 50%;
    box-sizing: border-box;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    max-height: 80%;
    ${ifProp(
        "fixedHeight",
        css`
            height: 80%;
        `
    )}
    padding: 16px 16px;
    background: ${theme("bg")};
    z-index: ${prop("zIndex")};
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 360px;
    ${media.phablet} {
        width: 88%;
        ${ifProp(
            "full",
            css`
                width: 100%;
                min-height: 100%;
                border-radius: 0px;
            `
        )}
    }
`;

const HeaderContainer = styled(Row)`
    display: flex;
    position: relative;
    margin-bottom: 12px;
    align-items: center;
    justify-content: space-between;
`;

const Header = ({
    closeButtonPos,
    onClose,
    title,
    actionIcon,
    hideActionIcon,
    onActionClick,
    transparentButton,
    noFadeInUp,
}) => {
    const _theme = useTheme();

    return (
        <HeaderContainer fadeInUp={!noFadeInUp}>
            {closeButtonPos != "bottom" ? (
                <Button icon square onClick={onClose} transparent={transparentButton}>
                    <Icon name='ChevronLeft' size={24} stroke={_theme("darkGreyText")}></Icon>
                </Button>
            ) : (
                <Row width='24px'></Row>
            )}
            {/* {transparentButton ? (
                <Underline>
                    <Row fontSize='14px' fontWeight={700}>
                        {title}
                    </Row>
                </Underline>
            ) : (
                <Row fontSize='14px' fontWeight={700}>
                    {title}
                </Row>
            )} */}

            <Row fontSize='14px' fontWeight={700}>
                {title}
            </Row>

            {actionIcon && !hideActionIcon ? (
                <Button icon square onClick={onActionClick} transparent={transparentButton}>
                    <Icon name={actionIcon?.name} size={actionIcon?.size} fill={_theme("darkGreyText")}></Icon>
                </Button>
            ) : (
                <Row width='24px'></Row>
            )}
        </HeaderContainer>
    );
};

const MemoHeader = React.memo(Header, (prev, next) => prev.actionIcon == next.actionIcon && prev.title == next.title);

interface Props {
    show: boolean;

    onClose?: any;
    noHeader?: boolean;
    title?: string;
    hideOverlay?: boolean;
    onActionClick?: any;
    style?: any;
    actionIcon?: { name: IconType; size: number } | null;
    hideActionIcon?: boolean;
    dynamic?: boolean;
    full?: boolean;
    portal?: boolean;
    zIndex?: number;
    transparentButton?: any;
    closeButtonPos?: "top" | "bottom";
    noFadeInUp?: boolean;
}

const Modal: FC<Props> = ({
    show,
    children,
    hideOverlay,
    onClose,
    title,
    onActionClick,
    actionIcon,
    hideActionIcon,
    noHeader,
    dynamic,
    zIndex,
    closeButtonPos,
    portal,
    transparentButton,
    noFadeInUp,
    ...props
}) => {
    if (!show) return <></>;
    const portalEl = document.getElementById("root-portal");
    const component = (
        <>
            {!hideOverlay && <Overlay zIndex={zIndex ? zIndex - 1 : 999} onClick={onClose}></Overlay>}
            <ModalContainer {...props} fixedHeight={!dynamic} zIndex={zIndex || 1000}>
                {!noHeader && (
                    <MemoHeader
                        {...{
                            closeButtonPos,
                            onClose,
                            title,
                            actionIcon,
                            hideActionIcon,
                            onActionClick,
                            transparentButton,
                            noFadeInUp,
                        }}
                    ></MemoHeader>
                )}

                <Children>{children}</Children>
                {closeButtonPos == "bottom" && (
                    <Button full onClick={onClose}>
                        닫기
                    </Button>
                )}
            </ModalContainer>
        </>
    );
    // if (portal) {
    //   return ReactDOM.createPortal(component, portalEl as Element);
    // } else {
    return portalEl ? ReactDOM.createPortal(component, portalEl) : null;
    return component;
    // }
};

export default Modal;
