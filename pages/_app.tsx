import React, { useEffect, useState, useRef } from "react";

import { Router } from "next/router";
import { GlobalStyle } from "@styles";
import { Provider } from "contexts";
import Link from "next/link";
import { RecoilRoot } from "recoil";
import MainLayout from "@components/Layout/MainLayout";
import { DataProvider } from "@contexts/DataContext";
import { ThemeProvider } from "@contexts/ThemeContext";

Router.events.on("routeChangeComplete", () => {
    window.scrollTo(0, 0);
});
function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <DataProvider>
                <ThemeProvider>
                    {/* <Provider> */}
                    <GlobalStyle></GlobalStyle>
                    <div className='gnb' style={{ position: "absolute", top: "-999px" }}>
                        <Link href='/live'>실시간</Link>
                        <Link href='/daily'>일별</Link>
                        <Link href='/rates'>확진율</Link>
                        <Link href='/world'>세계</Link>
                        <Link href='/city/0'>서울</Link>
                        <Link href='/city/8'>경기</Link>
                        <Link href='/city/1'>부산</Link>
                    </div>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </ThemeProvider>
                {/* </Provider> */}
            </DataProvider>
        </RecoilRoot>
    );
}

export default MyApp;
