import { createGlobalStyle } from "styled-components";
import { theme } from "./themes";
import mixins from "./mixins";

const GlobalStyle = createGlobalStyle`

  ${mixins.ScrollBar};
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ul, 
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    -webkit-tap-highlight-color: transparent;
    /* word-break: keep-all; */
  }
 
  body {
    background: ${theme("bg")};
    color: ${theme("text")};
    border-color: ${theme("border")};
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutDown {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }

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

`;

export default GlobalStyle;
