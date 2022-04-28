import { URL_REGEX, MINUTE, HOUR, DAY, SECOND, CITIES, COUNTRY_NAMES } from "@consts";
import { MILLION, GRAND, THOUSAND } from "@constsV2";

import { CasesSummaryType } from "./types";

export const ct = (cityId, guId: any = undefined) => {
    if (cityId == undefined) return "";
    let cityName = CITIES[`c${cityId}`] || "";
    let guName = CITIES[`c${cityId}/${guId}`] || "";
    guName = guName == cityName || guId == "-1" ? "전체" : guName;
    if ((cityId == 0 || cityId == 1) && guName == "전체") guName = "기타";
    return guId != undefined ? guName : cityName;
};

export const sortByDate = (arr, key = "datetime") => {
    const array = [...arr];
    array.sort((a, b) => {
        let dateA = key ? a[key] : a;
        let dateB = key ? b[key] : b;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    return array;
};

export const addZero = (num) => {
    return num > 9 ? num : `0${num}`;
};

export const getDateDistance = (_past) => {
    const now = new Date();
    const past = new Date(_past);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    if (diffTime < MINUTE) {
        return `${Math.floor(diffTime / SECOND)}초 전`;
    } else if (diffTime < HOUR) {
        return `${Math.floor(diffTime / MINUTE)}분 전`;
    } else if (diffTime < DAY) {
        return `${Math.floor(diffTime / HOUR)}시간 전`;
    } else {
        return `${Math.floor(diffTime / DAY)}일 전`;
    }
};

export const getCurrentDateTime = () => {
    let date = new Date();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    let ampm = "AM";
    if (hours >= 12) {
        hours -= 12;
        ampm = "PM";
    }

    return `${month}월 ${day}일 ${hours}:${minutes}${ampm}`;
};

export const getCurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
};

export const onEnter = (func) => (e) => {
    if (e.key == "Enter") func(e);
};

export const jsonCompare = (a, b) => {
    return JSON.stringify(a) == JSON.stringify(b);
};

export const sleep = (timeout) => {
    return new Promise((res) => setTimeout(res, timeout));
};

export const addHyperLink = (text) => {
    if (!text) return "";
    return text.replace(URL_REGEX, (url) => `<a href="http://${url.replace(/https?:\/\//, "")}" target="_blank" rel="noopener noreferrer">${url}</a>`);
};

export const setGradient = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 170);

    gradient.addColorStop(0, `${color}80`);
    gradient.addColorStop(1, `${color}00`);

    return gradient;
};

export const getStatistic = (stats, dataType: "today" | "yesterday", chartType, cityId) => {
    let { timeseries, regionsTimeseries } = stats;
    let chartIndex = chartType == "total" ? 0 : 1;
    let data = cityId != null ? regionsTimeseries[dataType][cityId] : timeseries[dataType];
    return Object.keys(data).map((time) => data[time][chartIndex]);
};

export const getSuggestedMax = (max, stepSize) => {
    let levels = Math.ceil(max / stepSize);
    let leftover = stepSize - (max % stepSize || stepSize);
    let suggestedMax = leftover < stepSize * 0.2 ? (levels + 1) * stepSize : levels * stepSize;
    return suggestedMax;
};

export const getCasesSummary = (updates): CasesSummaryType => {
    const totalCases = updates.reduce((t, { cases, total }) => (t += Number(total) || Number(cases)), 0);
    const todayCases = updates.reduce((t, { cases }) => (t += Number(cases)), 0);
    const checking = updates.reduce((t, { cases, total }) => (t += cases == null ? Number(total) : 0), 0);
    const yesterdayCases = totalCases - todayCases - checking;
    return { todayCases, totalCases, yesterdayCases, checking };
};

export const getDomesticUpdates = (updates, cityId: string | undefined = undefined, guId: string | undefined = undefined) => {
    if (!updates) return null;
    const transform = updates.map((update) => {
        const { cases, total, city, gu } = update;
        const area = `${ct(city)} ${ct(city, gu)}`;
        const title = cases == null ? `${total}명 확인중` : total == total - cases ? `${total}명 어제 집계` : `${numberWithCommas(cases)}명 추가 확진`;
        if (!!cityId && cityId != city) return;
        if (!!guId && guId != gu) return;
        return { ...update, area, title };
    });

    const filter = transform.filter((a) => !!a);

    const sort = sortByDate(filter);

    return sort;
};

export const getWorldUpdates = (updates, countryCode: string | undefined = undefined) => {
    const transform = updates.map((update) => {
        const { cases, country } = update;
        const title = `${numberWithCommas(cases)}명 추가 확진`;
        if (!!countryCode && countryCode != country) return;
        if (cases == 17633) return;

        return { ...update, area: COUNTRY_NAMES[country], title };
    });

    const filter = transform.filter((a) => !!a);

    const sort = sortByDate(filter);

    return sort.slice(0, 200);
};

const API_ROOT = `https://apiv2.corona-live.com/`;

export const fetcher = async (url) => {
    try {
        // console.time(`[Fetch] /${url}`);
        const response = await fetch(`${API_ROOT}${url}.json?timestamp=${new Date().getTime()}`, {}).then((response) => {
            return response.json();
        });
        // console.timeEnd(`[Fetch] /${url}`);
        return response;
    } catch (err) {
        // console.log(`[Fail] /${url}`);
        return false;
    }
};

// const addZero = (number) => `${number < 10 ? "0" : ""}${number}`;

export const numberWithCommas = (number) => {
    if (!number) return number;
    if (number < 1000) return Number(Number(number).toFixed(1));
    return Math.floor(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const koreanNumberFormat = (number, simplify = true) => {
    if (!number) return "";
    let unit = "";
    let value = number;

    if (number > MILLION) {
        value = number / MILLION;
        unit = "백만";
    } else if (number > GRAND) {
        value = number / GRAND;
        unit = "만";
    } else if (number > THOUSAND) {
        value = number / THOUSAND;
        unit = "천";
    }

    if (value == 0) return "";

    if (!simplify) return numberWithCommas(number);
    return `${numberWithCommas(value)}${unit}`;
};

export const generateToolTipHtml = ({ dataSet, activeHour, mainOption, chartOptions }) => {
    const { type, range } = chartOptions;
    if (mainOption == "cases" && chartOptions.type == "daily" && Number(range) < 90 && dataSet.length == 2) {
        const domestic = dataSet[0].data[activeHour];
        const imported = dataSet[1].data[activeHour];
        return `
            <div class='chart-tooltip-stats'>
                <div class="domestic-daily-container">
                    ${domestic + imported}<span>명</span>
                    <span> (국내 ${domestic}명, 해외 ${imported}명)</span>
                </div>
            </div>
            <div class='chart-tooltip-date'>${activeHour}</div>
        `;
    } else if (type == "live") {
        const today = dataSet[0].data[activeHour];
        const other = dataSet[1].data[activeHour];
        return `
            <div class='chart-tooltip-stats'>
                <div class="live-container">
                    <div class="label">${dataSet[0].name}</div>
                    <div class="stat">${today}<span>명</span></div>
                </div>
                <div class="live-container">
                    <div class="label">${dataSet[1].name}</div>
                    <div class="stat">${other}<span>명</span></div>
                </div>
            </div>
        `;
    }
};

export const getPrevDate = (date) => {
    return new Date(new Date(date).getTime() - DAY);
};
