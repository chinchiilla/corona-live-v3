import React, { useCallback, useContext, FC, useState } from "react";

import { Col, Page, Row } from "@components/Layout";

import Header from "./Header";
import NavBar from "./Navbar";
import Domestic from "@components/Domestic";
import World from "@components/World";
import { ThemeContext, ThemeContextProps } from "@contexts/ThemeContext";
import { useRouter } from "next/router";

import FaqModal from "@components/FaqModal";
import styled from "styled-components";
import { theme } from "@styles/themes";

interface Props {
    type?: "DOMESTIC" | "WORLD" | "DAILY";
}

const Home: FC<Props> = ({ type }) => {
    const { setTheme, theme } = useContext<Partial<ThemeContextProps>>(ThemeContext);
    const [showMenu, setShowMenu] = useState(false);
    const history = useRouter();

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    const toggleTheme = useCallback(() => setTheme(theme == "light" ? "dark" : "light"), [theme]);

    let path = history.pathname;
    return (
        <Page>
            {showMenu && <FaqModal {...{ closeMenu, toggleTheme }}></FaqModal>}

            {/* <Wrapper> */}
            <Header {...{ theme, setTheme, openMenu }}></Header>
            <NavBar path={path}></NavBar>
            {/* </Wrapper> */}

            {type == "DOMESTIC" && <Domestic history={history} openMenu={openMenu}></Domestic>}
            {type == "WORLD" && <World></World>}
        </Page>
    );
};

const Wrapper = styled(Col)`
    box-shadow: -1px 1px 20px #0000001e;
    background: ${theme("navBarShadow")};
`;

export default Home;
