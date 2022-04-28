import { theme, ThemeType } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { EMAIL, INSTA_SNS_URL } from "@utils/consts";
import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import { Col, Row } from "../Layout";
import Modal from "../Modal";

const Wrapper = styled(Col)`
    justify-content: center;
    flex: 1;
    a {
        color: ${theme("darkGreyText")};
    }
`;

const ThemeContainer = styled(Col)<{ selected: boolean }>`
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > span {
        font-size: 12px;
        margin-top: 10px;
        ${ifProp(
            "selected",
            css`
                font-weight: bold;
                color: #0495ff;
            `
        )}
    }
`;

const ThemeLogo = styled(Row)<{ themeName: ThemeType }>`
    background: ${(props) => theme(props.themeName)};
    width: 46px;
    height: 46px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px ${theme("themeShadow")};
`;

const CheckBox = styled(Row)<{ selected: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
    border: 1px solid ${theme("greyText")};

    div {
        height: 8px;
        width: 2px;
        border: 1px solid transparent;
        transform: translateY(-2px) rotate(45deg);
    }

    ${ifProp(
        "selected",
        css`
            background: #0495ff;
            border: 1px solid #0495ff;

            div {
                border-color: transparent white white transparent;
                display: block;
            }
        `
    )}
`;
// mb='30px' fontSize='12px' jc='center' opacity={0.8} fontWeight={500} bg={theme('gre')}
const Info = styled(Row)`
    font-size: 12px;
    justify-content: center;
    opacity: 0.8;
    /* font-weight: 500; */
    padding: 0px 2px;
`;

type Props = {
    onClose: any;
    theme: any;
    setTheme: any;
};

const ThemePopup: React.FC<Props> = ({ onClose, theme, setTheme }) => {
    return (
        <Modal zIndex={10000} closeButtonPos='bottom' show={true} title='' dynamic onClose={onClose}>
            <Wrapper>
                <Row jc='center' pt='16px' pb='28px'>
                    <ThemeContainer selected={theme == "light"} onClick={() => setTheme("light")}>
                        <ThemeLogo themeName={"light"}>
                            <Icon name='Light' size={26}></Icon>
                        </ThemeLogo>
                        <span>라이트 모드</span>
                        <CheckBox selected={theme == "light"}>
                            <div></div>
                        </CheckBox>
                    </ThemeContainer>

                    <Row w='30px'></Row>

                    <ThemeContainer selected={theme == "dark"} onClick={() => setTheme("dark")}>
                        <ThemeLogo themeName={"dark"}>
                            <Icon name='Light' fill={"white"} size={26}></Icon>
                        </ThemeLogo>
                        <span>다크 모드</span>
                        <CheckBox selected={theme == "dark"}>
                            <div></div>
                        </CheckBox>
                    </ThemeContainer>
                </Row>
                {/* <Row mb='2px' fontSize='12px' jc='center' textAlign='center' opacity={0.6}>
                    나중에 변경을 원하실 경우 오른쪽 상단에 있는 메뉴에 들어가셔서 변경 가능합니다
                </Row> */}
                <Col jc='center' ai='center' mb='24px'>
                    <Info>코로나 라이브는 민간이 운영하는 비공식 사이트입니다</Info>
                </Col>
            </Wrapper>
        </Modal>
    );
};

export default ThemePopup;
