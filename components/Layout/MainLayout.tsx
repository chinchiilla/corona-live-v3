import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import Header from "@components/Home/Header";
import Navbar from "@components/Home/Navbar";
import NavBarV2 from "@components/Home/NavbarV2";
import Report from "@components/Home/ReportModal";
import ThemePopup from "@components/Home/ThemePopup";
import Icon from "@components/Icon";
import { Col, Row, DesktopMode } from "@components/Layout";
import Menu from "@components/Menu";
import Modal from "@components/Modal";
import NoSSR from "@components/NoSSR";
import Notification from "@components/Notification";
import Switch from "@components/Switch";
import { ThemeContext, ThemeContextProps } from "@contexts/ThemeContext";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTheme } from "@hooks/useTheme";
import { AnnouncementState } from "@states/AnnouncementState";
import { NotificationSelector, NotificationState } from "@states/NotificationState";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ isOldLayout?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: ${theme("sectionBg")};
    padding: 40px 0px;
    ${ifProp(
        "isOldLayout",
        css`
            background: white;
            padding: 0px;
            margin: 0px;
        `
    )}

    ${media.desktop} {
        padding: 20px;
    }
    ${media.phablet} {
        padding: 0px;
        background: transparent;
    }
`;
const Main = styled.div<{ isOldLayout?: boolean }>`
    max-width: 510px;

    ${media.phablet} {
        width: 100%;
        max-width: 100%;
        /* background: yellow; */
    }
`;
const MenuContainer = styled(Col)<{ hide?: boolean; isOldLayout?: boolean }>`
    width: 240px;
    display: flex;
    position: sticky;
    top: 40px;
    margin-right: 80px;
    height: fit-content;

    ${media.desktop} {
        display: none;
        ${DesktopMode};
        padding: 0px;
        margin-right: 0px;
    }
    ${media.phablet} {
        display: none;
        margin-right: 0px;
    }

    ${ifProp(
        "hide",
        css`
            display: none;
        `
    )}
`;
const MenuSection = styled.div`
    background: ${theme("bg")};
    border: 1px solid ${theme("sectionBorder")};
    box-shadow: -1px 1px 6px #00000006;

    /* border: 1px solid ${theme("greyText")}20; */
    /* box-shadow: -1px 1px 6px #00000006; */
    border-radius: 12px;
    width: 100%;
    margin-bottom: 16px;
    overflow: hidden;
`;
const MenuRow = styled.div<{ selected?: boolean; isLogo?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 16px;
    cursor: pointer;
    border-left: 4px solid transparent;

    svg {
        fill: ${theme("darkGreyText")}CC;
    }
    span {
        margin-left: 10px;
        font-size: 14px;
    }

    ${ifProp(
        "selected",
        css`
            background: ${theme("blueBg")};
            color: ${theme("blue")};
            border-left: 3px solid ${theme("darkGreyText")};
            background: ${theme("greyBg")}90;
            color: ${theme("darkGreyText")};
            font-weight: bold;
            svg {
                fill: ${theme("blue")};
                fill: ${theme("darkGreyText")};
            }
        `
    )}
    ${ifProp(
        "isLogo",
        css`
            justify-content: center;
            svg {
                fill: ${theme("blackText")};
            }
        `
    )}
`;
const ShadowContainer = styled(Col)`
    display: none;
    ${media.desktop} {
        display: flex;
        ${DesktopMode};
        padding: 0px;
    }
    ${media.phablet} {
        border: none;
        border-radius: 0px;
        /* box-shadow: -1px 1px 20px #00000010; */

        border-bottom: ${theme("sectionBorderWidth")} solid ${theme("sectionMobileBg")};
        padding: 0px;
        margin: 0px;
        display: flex;
    }
`;

const HEADERS_PATH = {
    "/": true,
    "/world": true,
    "/social-distancing": true,
    "/vaccine": true,
};

const HIDE_MENU_PATH = {
    "/live": true,
    "/world/live": true,
};

type Props = {};

const MainLayout: React.FC<Props> = ({ children }) => {
    const history = useRouter();
    const { pathname } = history;
    const showHeader = HEADERS_PATH[pathname];
    const [showSamsungPopup, setShowSamsungPopup] = useState(false);
    const [notification, setNotification] = useRecoilState(NotificationState);
    const [announcement, setAnnouncement] = useRecoilState(AnnouncementState);
    const ref = useRef();
    const [showReport, setShowReport] = useState(false);

    const closeReportModal = () => setShowReport(false);
    const openReportModal = () => setShowReport(true);

    const { setTheme, theme } = useContext<Partial<ThemeContextProps>>(ThemeContext);
    const toggleTheme = useCallback(() => setTheme(theme == "light" ? "dark" : "light"), [theme]);

    const [samsungFirstVisitor, setSamsungFirstVisitor] = useLocalStorage("samsungFirstVisitor", true);

    const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);

    const [preferOld, setPreferOld] = useLocalStorage<number>("prefer-old", 0);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);
    const _theme = useTheme();

    const isOldLayout = pathname.indexOf("v1") > -1;

    useEffect(() => {
        if (preferOld && pathname.indexOf("v1") == -1) window.location.href = "/v1/domestic";
        if (!preferOld && pathname.indexOf("v1") > -1) window.location.href = "";
    }, [preferOld]);
    // const  useMemo(() => {
    //     if (navigator.userAgent.match(/samsung/i) && samsungFirstVisitor==true) {
    //     setShowSamsungPopup(true)
    //     }

    // }, [samsungFirstVisitor, navigator])

    useEffect(() => {
        if (navigator.userAgent.match(/samsung/i) && samsungFirstVisitor == true) {
            setShowSamsungPopup(true);
        }

        // if (navigator.userAgent.match(/samsung/i)) {
        //     alert(
        //         "삼성 핸드폰내 다크모드를 설정하시고 삼성 인터넷 브라우저를 사용하실시 화면이 이상하게 보일수 있는점 알려드립니다. 원활한 이용을 위해서는 가급적 다른 브라우저를 이용해주세요"
        //     );
        // }
    }, [samsungFirstVisitor]);

    let path = history.pathname;
    return (
        <NoSSR>
            {showReport && <Report show={showReport} onClose={closeReportModal}></Report>}
            <Modal
                title='안내'
                show={showSamsungPopup}
                dynamic={true}
                closeButtonPos='bottom'
                onClose={() => {
                    setSamsungFirstVisitor(false);
                    setShowSamsungPopup(false);
                }}
            >
                <Row fontSize={"13px"} opacity={0.85} mb='24px' mt='12px' textAlign='center' lineHeight={"22px"}>
                    핸드폰에 다크모드가 적용된 상태에서 삼성 인터넷 브라우저를 사용하실시 코로나 라이브 화면이 이상하게 보일수 있다는점 알려드립니다. 원활한
                    이용을 위해서는 다른 브라우저 이용부탁드립니다
                </Row>
            </Modal>

            {isFirstVisitor == 1 && <ThemePopup {...{ theme, setTheme }} onClose={() => setIsFirstVisitor(0)}></ThemePopup>}

            <Wrapper ref={ref} isOldLayout={isOldLayout}>
                <MenuContainer {...{ preferOld, setPreferOld }} isOldLayout={isOldLayout} hide={path.indexOf("live") > -1 || path.indexOf("v1") > -1}>
                    <MenuSection>
                        <Row jc='center' p='10px 0px'>
                            {/* <MenuRow isLogo> */}
                            <Icon
                                name='Logo'
                                style={{
                                    fill: _theme("blackText"),
                                    height: "26px",
                                    width: "120px",
                                    transform: "translate(2px,-2px)",
                                }}
                                fill={_theme("blackText")}
                            ></Icon>
                        </Row>

                        {/* </MenuRow> */}
                    </MenuSection>
                    <MenuSection>
                        <MenuRow onClick={() => history.push("/")} selected={path == "/" || path.indexOf("city") > -1} mr='-2px'>
                            <Icon name={"Domestic"} size={14}></Icon>
                            <span>국내 </span>
                        </MenuRow>
                        <MenuRow onClick={() => history.push("world")} selected={path == "/world"}>
                            <Icon name={"World"} size={14}></Icon>
                            <span>세계 </span>
                        </MenuRow>
                        <MenuRow onClick={() => history.push("vaccine")} selected={path == "/vaccine"}>
                            <Icon name={"Vaccine"} size={14}></Icon>
                            <span>백신 </span>
                        </MenuRow>
                        <MenuRow onClick={() => history.push("social-distancing")} selected={path == "/social-distancing"}>
                            <Icon name={"Flag"} size={14}></Icon>
                            <span>거리두기</span>
                        </MenuRow>
                        <MenuRow fadeInUp onClick={() => history.push("/faq")} selected={path == "/faq"}>
                            <Icon name='Question' size={14}></Icon>
                            <span>자주 묻는 질문</span>
                        </MenuRow>
                    </MenuSection>
                    <MenuSection>
                        <MenuRow fadeInUp>
                            <Row jc='space-between' ai='center' flex={1}>
                                <Row ai='center'>
                                    <Icon name='Night' size={14}></Icon>
                                    <span>다크모드</span>
                                </Row>
                                <Switch small onClick={toggleTheme} checked={theme == "dark"}></Switch>
                            </Row>
                        </MenuRow>{" "}
                        <MenuRow fadeInUp onClick={() => openReportModal()}>
                            <Icon name='SendMessage' size={14}></Icon>
                            <span>제보하기</span>
                        </MenuRow>
                        {/* <MenuRow fadeInUp onClick={() => history.push("/faq")}>
                            <Icon name='Share' size={14}></Icon>
                            <span>공유하기</span>
                        </MenuRow> */}
                    </MenuSection>
                </MenuContainer>
                <Main isOldLayout={isOldLayout}>
                    {notification.show && (
                        <Notification notification={notification} closeModal={() => setNotification((prev) => ({ ...prev, show: false }))}></Notification>
                    )}

                    {announcement && <AnnouncementPopup announcement={announcement}></AnnouncementPopup>}

                    {showMenu && <Menu onClose={closeMenu} {...{ preferOld, setPreferOld }}></Menu>}

                    {showHeader && (
                        <ShadowContainer>
                            <Header
                                isOldLayout={isOldLayout}
                                preferOld={preferOld}
                                setPreferOld={setPreferOld}
                                openMenu={openMenu}
                            ></Header>
                            <Navbar path={path}></Navbar>
                        </ShadowContainer>
                    )}

                    {pathname.indexOf("v1") > -1 && (
                        <>
                            <Header
                                isOldLayout={isOldLayout}
                                preferOld={preferOld}
                                setPreferOld={setPreferOld}
                                openMenu={openMenu}
                            ></Header>
                        </>
                    )}
                    {/* {showHeader && (
                        <>
                            <Header openMenu={openMenu}></Header>
                            <NavBarV2 path={path}></NavBarV2>
                            <Row h='12px'></Row>
                        </>
                    )} */}

                    {children}
                </Main>
            </Wrapper>
        </NoSSR>
    );
};

export default MainLayout;
