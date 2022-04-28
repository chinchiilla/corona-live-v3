import styled, { css } from "styled-components";
import React, { useCallback, useState } from "react";

import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import Report from "@components/Home/ReportModal";
import Underline from "@components/Underline";
import Button from "@components/Button";

import { useTheme } from "@hooks/useTheme";
import { useRouter } from "next/router";
import { ifProp } from "@styles/tools";
import { useLocalStorage } from "@hooks/useLocalStorage";

const Wrapper = styled(Row)<{ isOldLayout?: boolean }>`
    align-items: center;
    justify-content: space-between;
    padding: 12px 4px;

    padding-bottom: 4px;
    ${ifProp(
        "isOldLayout",
        css`
            padding: 0px 12px;
            padding-top: 12px;
            width: 100%;
        `
    )}
`;

interface Props {
    theme?: string;
    setTheme?: any;
    title?: string;
    openMenu?: any;
    isOldLayout?: boolean;
    preferOld?: any;
    setPreferOld?: any;
    fuckYou?: any;
}

const Header: React.FC<Props> = ({
    theme: currentTheme,
    setTheme,
    title,
    openMenu,
    isOldLayout,
    preferOld,
    setPreferOld,
    fuckYou,
}) => {
    const history = useRouter();

    const theme = useTheme();
    const [showReport, setShowReport] = useState(false);

    const closeReportModal = () => setShowReport(false);
    const openReportModal = () => setShowReport(true);

    const goBack = useCallback(() => history.push({ pathname: "/" }), []);
    const toggleTheme = useCallback(() => setTheme(currentTheme == "light" ? "dark" : "light"), [currentTheme]);

    return (
        <>
            {showReport && <Report show={showReport} onClose={closeReportModal}></Report>}

            <Wrapper fadeInUp isOldLayout={isOldLayout}>
                {title ? (
                    <>
                        <Button transparent icon onClick={goBack}>
                            <Icon name='ChevronLeft' stroke={theme("darkGreyText")} size={28}></Icon>
                        </Button>
                        <Underline fontSize='18px ' fontWeight={900}>
                            {title}
                        </Underline>
                        <Button transparent icon onClick={openReportModal}>
                            <Icon name='SendMessage' size={20} fill={theme("darkGreyText")}></Icon>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button transparent icon onClick={() => setShowReport((a) => !a)}>
                            <Icon name='SendMessage' size={18} fill={theme("darkGreyText")}></Icon>
                        </Button>
                        {/* <Button transparent icon onClick={() => setPreferOld(preferOld == 1 ? 0 : 1)}>
                            <Icon name='Refresh' size={16} fill={theme("darkGreyText")}></Icon>
                        </Button> */}

                        <Icon
                            name='Logo'
                            style={{
                                fill: theme("blackText"),
                                height: "26px",
                                width: "110px",
                                transform: "translate(2px,-2px)",
                            }}
                            fill={theme("blackText")}
                        ></Icon>

                        <Button
                            transparent
                            icon
                            onClick={() => {
                                openMenu();
                            }}
                        >
                            <Icon name='Menu' size={20} fill={theme("darkGreyText")}></Icon>
                        </Button>
                    </>
                )}
            </Wrapper>
        </>
    );
};

// const MemoHeader = React.memo(Header, (prev, next) => prev.theme === next.theme);

// export default MemoHeader;
export default Header;
