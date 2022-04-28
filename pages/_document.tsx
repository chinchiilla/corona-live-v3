import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import stylisRTLPlugin from "stylis-plugin-rtl";
interface Props {
    styleTags: any;
}

class AppDocument extends Document<Props> {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();

        const page = renderPage((App) => (props) =>
            sheet.collectStyles(
                <StyleSheetManager>
                    <App {...props} />
                </StyleSheetManager>
            )
        );

        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <Html>
                {/* <html lang='kr'> */}
                <Head>
                    <meta charSet='utf-8' />
                    <link rel='icon' href='/favicon.ico' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />

                    <link rel='canonical' href='https://corona-live.com/' />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                    <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#' />

                    <meta name='title' content='코로나 라이브 | 실시간 확진자 현황' />
                    <meta name='description' content='국내/세계 코로나 확진자수를 실시간으로 집계하여 제공합니다' />
                    <meta
                        name='keywords'
                        content='코로나 라이브, 코로나 실시간 확진자, 코로나 실시간, 코로나라이브, 실시간 코로나, 코로나 실시간 상황판, 코로나 확진자'
                    />
                    <base href='/' />

                    <link rel='preconnect' href='https://api.corona-live.com/stats.json' as='fetch' />
                    <link rel='preconnect' href='https://api.corona-live.com/updates.json' as='fetch' />

                    <meta name='naver-site-verification' content='2cf27dacb5dd020a060dba54c8e30d388fc0ed43' />

                    <meta name='NaverBot' content='All' />

                    <meta name='NaverBot' content='index,follow' />

                    <meta name='Yeti' content='All' />

                    <meta name='Yeti' content='index,follow' />

                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http://schema.org",
                                "@type": "Organization",
                                name: "코로나 라이브",
                                url: "https://corona-live.com",
                                sameAs: [
                                    "https://www.instagram.com/corona_live_official",
                                    "https://twitter.com/kCm2v4r1PvpSE7A",
                                ],
                            }),
                        }}
                    />

                    <style jsx>
                        {`
                            @font-face {
                                font-family: "Noto Sans KR";
                                font-style: normal;
                                font-weight: 300;
                                font-display: swap;
                                src: url("/fonts/noto-sans-kr-v12-korean-300.eot");
                                src: local("Noto Sans KR Light"), local("NotoSansKR-Light"),
                                    url("/fonts/noto-sans-kr-v12-korean-300.eot?#iefix") format("embedded-opentype"),
                                    url("/fonts/noto-sans-kr-v12-korean-300.woff2") format("woff2"),
                                    url("/fonts/noto-sans-kr-v12-korean-300.woff") format("woff"),
                                    url("/fonts/noto-sans-kr-v12-korean-300.ttf") format("truetype");
                            }
                            @font-face {
                                font-family: "Noto Sans KR";
                                font-style: normal;
                                font-weight: 400;
                                font-display: swap;
                                src: url("/fonts/noto-sans-kr-v12-korean-regular.eot");
                                src: local("Noto Sans KR Regular"), local("NotoSansKR-Regular"),
                                    url("/fonts/noto-sans-kr-v12-korean-regular.eot?#iefix") format("embedded-opentype"),
                                    url("/fonts/noto-sans-kr-v12-korean-regular.woff2") format("woff2"),
                                    url("/fonts/noto-sans-kr-v12-korean-regular.woff") format("woff"),
                                    url("/fonts/noto-sans-kr-v12-korean-regular.ttf") format("truetype");
                            }
                            @font-face {
                                font-family: "Noto Sans KR";
                                font-style: normal;
                                font-weight: 500;
                                font-display: swap;
                                src: url("/fonts/noto-sans-kr-v12-korean-500.eot");
                                src: local("Noto Sans KR Medium"), local("NotoSansKR-Medium"),
                                    url("/fonts/noto-sans-kr-v12-korean-500.eot?#iefix") format("embedded-opentype"),
                                    url("/fonts/noto-sans-kr-v12-korean-500.woff2") format("woff2"),
                                    url("/fonts/noto-sans-kr-v12-korean-500.woff") format("woff"),
                                    url("/fonts/noto-sans-kr-v12-korean-500.ttf") format("truetype");
                            }
                            @font-face {
                                font-family: "Noto Sans KR";
                                font-style: normal;
                                font-weight: 700;
                                font-display: swap;
                                src: url("/fonts/noto-sans-kr-v12-korean-700.eot");
                                src: local("Noto Sans KR Bold"), local("NotoSansKR-Bold"),
                                    url("/fonts/noto-sans-kr-v12-korean-700.eot?#iefix") format("embedded-opentype"),
                                    url("/fonts/noto-sans-kr-v12-korean-700.woff2") format("woff2"),
                                    url("/fonts/noto-sans-kr-v12-korean-700.woff") format("woff"),
                                    url("/fonts/noto-sans-kr-v12-korean-700.ttf") format("truetype");
                            }
                        `}
                    </style>

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property='og:type' content='website' />
                    <meta property='og:url' content='https://corona-live.com' />
                    <meta property='og:title' content='코로나 라이브 | 실시간 코로나 현황' />
                    <meta
                        property='og:description'
                        content='국내/세계 코로나 확진자수를 실시간으로 집계하여 제공합니다'
                    />
                    <meta property='og:image' content='https://corona-live.com/thumbnail.png' />
                    <meta property='og:image:type' content='image/png' />
                    <meta property='og:image:width' content='512' />
                    <meta property='og:image:height' content='512' />

                    {/* <!-- Twitter --> */}
                    <meta property='twitter:card' content='summary_large_image' />
                    <meta property='twitter:url' content='https://corona-live.com' />
                    <meta property='twitter:title' content='코로나 라이브 | 실시간 코로나 현황' />
                    <meta
                        property='twitter:description'
                        content='국내/세계 코로나 확진자수를 실시간으로 집계하여 제공합니다'
                    />
                    <meta property='twitter:image' content='https://corona-live.com/thumbnail.png' />

                    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-176122432-1'></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() {
                              dataLayer.push(arguments);
                            }
                            gtag("js", new Date());
                        
                            gtag("config", "UA-176122432-1");
                                    `,
                        }}
                    ></script>

                    <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                    Kakao.init("077f1450c4c15adfae03a8b203ab1f55"); Kakao.isInitialized();
                    `,
                        }}
                    ></script>
                    {this.props.styleTags}
                </Head>
                <body
                    style={{
                        margin: 0,
                        overflowX: "hidden",
                    }}
                >
                    <div id='root-portal'></div>
                    <Main />
                    <NextScript />
                </body>
                {/* </html> */}
            </Html>
        );
    }
}

export default AppDocument;
