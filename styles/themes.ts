interface ThemeProps {
    bg: string;
    text: string;
    border: string;
    greyBg: string;
    darkGreyBg: string;
    darkGrey: string;

    greyText: string;
    semigreyText: string;
    semiDarkGreyText: string;
    darkGreyText: string;
    lightGreyText: string;
    blackText: string;

    blue: string;
    red: string;
    yellow: string;
    green: string;
    blueBg: string;
    redBg: string;
    yellowBg: string;
    greenBg: string;
    updateCard: string;

    kakao: string;
    kakaoBg: string;
    facebook: string;
    blog: string;
    twitter: string;
    link: string;
    instagram: string;

    notification: string;
    shadow: string;
    mapLabel: string;
    mapBorder: string;
    vaccineMapBorder: string;

    themeShadow: string;

    dark: string;
    light: string;

    navBarShadow: string;

    sectionBg: string;
    sectionMobileBg: string;
    sectionBorder: string;

    liveBoardBottom: string;
    loading: string;

    greyBar: string;
    greyCircle: string;

    sectionBorderWidth: string;
    cityLiveBoardShadow: string;
    BLUE: string;
    GREY: string;
}
export type ThemeType = keyof ThemeProps;

export const theme = (attr: ThemeType) => ({ theme }) => theme[attr];

const lightTheme: ThemeProps = {
    bg: "#ffffff",
    text: "#464d52",
    border: "#F5F5F5",
    greyBg: "#F5F5F5",
    darkGrey: "#888888",
    darkGreyBg: "#F1F1F1",

    blackText: "#222222",
    darkGreyText: "#464d52",

    semiDarkGreyText: "#5a5a5a",
    greyText: "#868686",
    semigreyText: "#c3c3c3",
    lightGreyText: "#c1c1c1",

    blue: "#5673EB",
    red: "#EB5374",
    yellow: "#f29c0e",
    green: "#178a17",
    // blueBg: "#e0e6fb",
    blueBg: "#eff2ff",
    yellowBg: "#fff7c3",
    greenBg: "#16ab1629",

    redBg: "#eb53741f",

    updateCard: "white",

    kakao: "#564a00",
    kakaoBg: "#efdb487a",
    facebook: "#3672E4",
    blog: "#57C04F",
    twitter: "#4A9AE5",
    link: "#999999",
    instagram: "#bf2e70",

    notification: "#000000d6",
    shadow: "#FFFFFF",
    mapLabel: "#FFFFFF",
    mapBorder: "#FFFFFF",
    vaccineMapBorder: "#FFFFFF",

    themeShadow: "#cccccc",

    light: "white",
    dark: "#191F2C",

    navBarShadow: "white",

    sectionBg: "#f6f6f680",
    // sectionBorder: "f6f6f6",
    sectionBorder: "#464d5215",
    liveBoardBottom: "#ffffff",
    loading: "#464d5280",
    greyBar: "#464d5220",
    greyCircle: "#464d5220",
    sectionMobileBg: "#f3f4f5",

    sectionBorderWidth: "8px",
    cityLiveBoardShadow: "#00000015",

    BLUE: "#5673ea",
    GREY: "#d8d8d8",
};

const darkTheme: ThemeProps = {
    bg: "#191F2C",
    // bg: "##101421",
    // bg:"#1d2433",
    text: "#b7c1cc",
    border: "#C8C9CD",
    greyBg: "#272b38",
    darkGrey: "#888888",
    darkGreyBg: "#F1F1F1",

    greyText: "#828284",
    semigreyText: "#7e8186",
    semiDarkGreyText: "#C8C9CD",
    darkGreyText: "#cfcfcf",
    // lightGreyText: "#3E3E3E",
    lightGreyText: "#525252",
    blackText: "#ffffff",

    blue: "#5673EB",
    yellow: "#f2d20e",
    red: "#EB5374",
    green: "#178a17",

    blueBg: "#5673EB15",
    yellowBg: "#fff8e6",
    redBg: "#EB537415",
    greenBg: "#16ab1615",

    // blueBg: "transparent",
    // yellowBg: "transparent",
    // redBg: "transparent",
    // greenBg: "transparent",

    updateCard: "#272b38",

    kakao: "#EFDB48",
    kakaoBg: "#EFDB4830",
    facebook: "#3672E4",
    blog: "#57C04F",
    twitter: "#4A9AE5",
    link: "#ffffff",
    instagram: "#bf2e70",

    notification: "#000000d6",
    shadow: "#272b38",
    mapLabel: "#272b38ed",
    mapBorder: "rgba(86, 115, 235,0.5)",
    vaccineMapBorder: "rgba(23, 138, 23,0.5)",

    themeShadow: "#000000a3",
    light: "white",
    dark: "#191F2C",

    navBarShadow: "#ffffff08",
    // sectionBg: "#272b38",
    sectionBg: "#101421",
    // sectionBorder: "#cfcfcf50",
    sectionBorder: "#cfcfcf40",
    sectionMobileBg: "#101421",
    liveBoardBottom: "#191F2C80",
    loading: "#cfcfcfCC",
    greyBar: "#cfcfcf60",
    greyCircle: "#aaaaaa",

    sectionBorderWidth: "10px",
    cityLiveBoardShadow: "#0b0c13",

    BLUE: "#5673ea",
    GREY: "#999999",
};

export default { light: lightTheme, dark: darkTheme };
