import { Col } from "@components/Layout";
import Domestic from "@components/v1/domestic/Domestic";
import { ThemeContext, ThemeContextProps } from "@contexts/ThemeContext";
import media from "@styles/media";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useState } from "react";
import styled from "styled-components";

const SPage = styled(Col)`
    /* box-sizing: border-box; */
    padding: 12px 20px;
    margin: auto;
    width: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 430px;

    /* min-height: 100vh; */
    ${media.phablet} {
        width: 100%;
        padding: 0px 16px;
    }
    ${media.phone} {
        /* width: 430px; */
        width: 100%;

        padding: 0px 12px;
    }

    ${media.desktop} {
        /* padding: 12px; */
    }
`;

const DomesticV1Page: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const history = useRouter();

    const openMenu = () => setShowMenu(true);

    return (
        <SPage>
            <Domestic history={history} openMenu={openMenu}></Domestic>
        </SPage>
    );
};

export default DomesticV1Page;
