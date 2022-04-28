import CITIES from "./cities.json";
import COUNTRIES from "./countries.json";

export const COUNTRY_NAMES = COUNTRIES;
export const COUNTRY_CODES = Object.keys(COUNTRIES);

export const ASSETS_URL = `https://assets.corona-live.com/`;
export const API_ROOT = `https://apiv2.corona-live.com/`;
// export const API_ROOT = `https://s3.ap-northeast-2.amazonaws.com/apiv2.corona-live.com/`;

export const API = {
    updates: `updates`,
    stats: `stats`,
    timeseries: `timeseries`,
    lastUpdated: `lastUpdated`,
    worldStats: `world-stats`,
    worldUpdates: `world-updates`,
    worldOverview: `world-overview`,
};

export const CITY_TD_FLEX = [
    "0 0 46px",
    "0 0 20px",
    "0 0 120px",
    "0 0 106px",
    "0 0 90px",
    "0 0 126px",
    "0 0 80px",
    "0 0 20px",
];

export const DISTRICT_TD_FLEX = [
    "0 0 70px",
    "0 0 20px",
    "0 0 120px",
    "0 0 100px",
    "0 0 30px",

    "0 0 60px",
    "0 0 80px",
    "0 0 60px",
    "0 0 20px",
];

// export const DISTRICT_TD_FLEX = ["0.7", "0.26", "1.3", "1", "0 1 82px"];

export const COUNTRY_TD_FLEX = ["0 0 110px", "0 0 86px", "0 0 74px", "0 0 86px", "0 0 66px", "0 0 100px"];

export const CITY_IDS = [...Array(17).keys()];

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const WEBSITE_URL = `https://corona-live.com`;
export const FACEBOOK_URL = `https://www.facebook.com/sharer/sharer.php?u=${WEBSITE_URL}%2F&amp;src=sdkpreparse`;
export const BLOG_URL = `http://blog.naver.com/openapi/share?url=${WEBSITE_URL}&title=[코로나 라이브] 코로나 현황 실시간으로 보기`;
export const TWITTER_URL = `http://twitter.com/share?url=${WEBSITE_URL}&text=코로나 현황 실시간으로 보기`;
export const KAKAOPAY_URL = `https://qr.kakaopay.com/281006011172839271003566`;
export const TWITTER_SNS_URL = `https://twitter.com/kCm2v4r1PvpSE7A`;
export const INSTA_SNS_URL = `https://www.instagram.com/corona_live_official/`;

export const EMAIL_API = `https://64t2pyuhje.execute-api.ap-northeast-2.amazonaws.com/corona-live-email`;
export const EMAIL = `corona.live.kr@gmail.com`;
export const URL_REGEX =
    /(https?:\/\/(www\.)?)?[a-z][-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?.\w+/gi;

// export const IMPORTANT_MESSAGE = `

// 코로나 라이브는 재난문자와 각 지자체및 질병관리청에서 금일 제공하는 자료를
// 기반으로 코로나 현황을 실시간으로 제공 하고있습니다 <br><br>
// 실시간 집계 기준은 재난 문자와 지자체 사이트에서 제공하는 당일 발생 확진자 중에서 당일 확진 판정받은 환자만
// 집계합니다 (질병관리청 집계방식과 동일). 재난문자상으로는 오늘 발생했다 하여도 전날 확진이면
// 집계 미포함하지만 만약 전날 질병관리청 집계에 미포함된게 확인되면 당일 집계에 포함합니다 <br><br>
// 다음날 제공되는 질병관리청 수치보다 적게 나오는 이유는 지자체에서 당일 확진자를 질병관리청에는 통보하지만 재난 문자는 다음날 보내는 경우때문입니다 (주로 늦은 시간 확진자가 발생하거나 역학조사가 완료되지 않았을 경우). <br><br> 검역은 당일발생 확진자 정보를 다음날 제공해서 집계를 할수없습니다 (지역사회 해외유입은
//   지자체에서 제공할경우 집계가능합니다) <br><br>   민간이 취합한 집계이므로 공식적인
// 근거 자료로 활용될수 없고, 본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은
// 전적으로 사용자에게 있습니다.
// <br><br>
// `;

export const IMPORTANT_MESSAGE = `
민간이 취합한 집계이므로 공식적인 근거 자료로 활용될수 없고, 본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은
전적으로 사용자에게 있습니다.
<br><br>
`;

export const CHART_PRIMARY_COLOR = `#5673EB`;
export const CHART_SECONDARY_COLOR = `#999999`;

export { default as CITIES } from "./cities.json";

export const CITY_GU_NAMES = Object.keys(CITIES).map((id) => {
    let [city, gu] = id.split("/");
    if (!gu) return CITIES[city];
    return `${CITIES[city]} ${CITIES[id]}`;
});

export const MAP_POINTS = {
    서울: [155, 160],
    부산: [250, 390],
    대구: [220, 285],
    인천: [55, 130],
    광주: [140, 390],
    대전: [165, 242],
    울산: [290, 350],
    세종: [110, 225],
    경기: [120, 90],
    강원: [240, 108],
    충북: [220, 180],
    충남: [60, 270],
    전북: [125, 310],
    전남: [70, 400],
    경북: [275, 230],
    경남: [195, 360],
    제주: [100, 540],
    검역: [284, 468],
};

export const UNAVALIABLE_REGIONS = { 검역: true };
