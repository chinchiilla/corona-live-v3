import { ThemeContext, ThemeContextProps } from "@contexts/ThemeContext";
import { theme } from "@styles/themes";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import Report from "./Home/ReportModal";
import MemoIcon from "./Icon";
import { IconBox } from "./IconBox";
import { Col, Row } from "./Layout";
import Modal from "./Modal";
import SnsContainer from "./SnsContainer";
import Switch from "./Switch";

const Wrapper = styled(Col)``;
const MenuItem = styled(Row)`
    align-items: center;
    &:first-of-type {
        border-top: 1px solid ${theme("lightGreyText")}50;
    }
    border-bottom: 1px solid ${theme("lightGreyText")}50;
    padding: 18px 16px;
    font-size: 14px;
    svg {
        fill: ${theme("darkGreyText")}CC;
    }
    span {
        margin-left: 12px;
    }
`;

type Props = {
    onClose: any;
    preferOld;
    setPreferOld;
};

const Menu: React.FC<Props> = ({ onClose, preferOld, setPreferOld }) => {
    const history = useRouter();
    const [showReport, setShowReport] = useState(false);

    const closeReportModal = () => setShowReport(false);
    const openReportModal = () => setShowReport(true);
    const { setTheme, theme } = useContext<Partial<ThemeContextProps>>(ThemeContext);
    const toggleTheme = useCallback(() => setTheme(theme == "light" ? "dark" : "light"), [theme]);
    return (
        <>
            {showReport && <Report show={showReport} onClose={closeReportModal}></Report>}
            <Modal show={true} onClose={onClose} title={"메뉴"} full transparentButton>
                <Wrapper>
                    {/* <MenuItem fadeInUp>
                    <MemoIcon name='GoBackArrow'></MemoIcon>
                    <span>이전 버전으로 보기</span>
                </MenuItem> */}
                    <MenuItem fadeInUp>
                        <Row jc='space-between' ai='center' flex={1}>
                            <Row>
                                <MemoIcon name='Night'></MemoIcon>
                                <span>다크모드</span>
                            </Row>
                            <Switch onClick={toggleTheme} checked={theme == "dark"}></Switch>
                        </Row>
                    </MenuItem>
                    <MenuItem
                        fadeInUp
                        onClick={() => {
                            setPreferOld(preferOld == 1 ? 0 : 1);
                        }}
                    >
                        <MemoIcon name='Refresh'></MemoIcon>
                        <span>{preferOld ? "신버전으로 보기" : "구버전으로 보기"}</span>
                    </MenuItem>
                    <MenuItem
                        fadeInUp
                        onClick={() => {
                            onClose();
                            history.push("/faq");
                        }}
                    >
                        <MemoIcon name='Question'></MemoIcon>
                        <span>자주 묻는 질문</span>
                    </MenuItem>
                    <MenuItem
                        fadeInUp
                        onClick={() => {
                            openReportModal();
                        }}
                    >
                        <MemoIcon name='SendMessage' size={20}></MemoIcon>
                        <span>제보 / 피드백</span>
                    </MenuItem>
                    {/* <MenuItem fadeInUp onClick={() => history.push("/faq")}>
                    <MemoIcon name='Share'></MemoIcon>
                    <span>공유하기</span>
                </MenuItem> */}
                    {/* <MenuItem fadeInUp onClick={() => history.push("/faq")}>
                    <MemoIcon name='Donation' size={20}></MemoIcon>
                    <span>서버 후원하기</span>
                </MenuItem> */}
                    {/* <SnsContainer></SnsContainer> */}
                </Wrapper>
            </Modal>
        </>
    );
};

export default Menu;
