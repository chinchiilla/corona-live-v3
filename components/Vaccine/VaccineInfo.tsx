import { Row } from "@components/Layout";
import ToggleButtons from "@components/ToggleButtons";
import { ifProp } from "@styles/tools";
import { ToggleOptionType } from "@utils/types";
import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";

const VACCIN_KEY = {
    madeIn: "개발국",
    numOfDoses: "수량",
    numOfShots: "접종횟수",
    shotsApart: "접종간격",
    storage: "보관",
    circulate: "유통",
};

const VACCINES = {
    pfizer: {
        madeIn: "미국/독일",
        numOfDoses: "6,600만회 분",
        numOfShots: "2회",
        shotsApart: "21일",
        storage: "-75℃±15℃ (6개월)",
        circulate: "2∼8℃ (5일)",
    },
    astrazeneca: {
        madeIn: "영국",
        numOfDoses: "2,000만회 분",
        numOfShots: "2회",
        shotsApart: "8~12주",
        storage: "2∼8℃ (6개월)",
        circulate: "2∼8℃ (6개월)",
    },
    moderna: {
        madeIn: "미국",
        numOfDoses: "4,000만회 분",
        numOfShots: "2회",
        shotsApart: "21일",
        storage: "-20℃ (6개월)",
        circulate: "2∼8℃(30일)",
    },
    janssen: {
        madeIn: "미국",
        numOfDoses: "701만회 분",
        numOfShots: "1회 * (임상결과에 따라 변경가능)",
        shotsApart: "-",
        storage: "-20℃ (24개월)",
        circulate: "2∼8℃ (4.5개월)",
    },
};

const VACCINE_TIMESERIES = {
    pfizer: {},
    astrazeneca: {},
    moderna: {},
    janssen: {},
};

const InfoContainer = styled.div`
    margin-top: 18px;
    padding: 0px 24px;
`;
const InfoLabel = styled.div`
    font-size: 14px;
    min-width: 90px;
    opacity: 0.6;
`;
const InfoValue = styled.div<{ strong?: boolean }>`
    font-size: 14px;
    ${ifProp(
        "strong",
        css`
            font-weight: bold;
        `
    )}
`;

const Wrapper = styled.div`
    padding: 12px;
    .radio-toggle {
        padding: 10px 0px;
    }
`;

type Props = {};

const VaccineInfo: React.FC<Props> = ({}) => {
    const [vaccineType, setVaccineType] = useState("pfizer");
    const mapToggleOptions = useMemo<ToggleOptionType[]>(
        () => [
            { name: "화이자", value: "pfizer", visible: true },
            { name: "아스트라제네카", value: "astrazeneca", visible: true },
            { name: "얀센", value: "janssen", visible: true },
            { name: "모더나", value: "moderna", visible: true },
        ],
        []
    );
    return (
        <Wrapper>
            <ToggleButtons
                full
                shadow
                noBg
                divider
                options={mapToggleOptions}
                activeOption={vaccineType}
                setOption={setVaccineType}
            ></ToggleButtons>
            <InfoContainer>
                {Object.keys(VACCINES[vaccineType]).map((key) => {
                    return (
                        <Row p='6px 0px'>
                            <InfoLabel>{VACCIN_KEY[key]}</InfoLabel>
                            <InfoValue strong={key == "numOfDoses"}>{VACCINES[vaccineType][key]}</InfoValue>
                        </Row>
                    );
                })}
            </InfoContainer>
        </Wrapper>
    );
};

export default VaccineInfo;
