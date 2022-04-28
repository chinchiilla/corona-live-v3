import { Col, Row } from "@components/Layout";
import ToggleButtons from "@components/ToggleButtons";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

const SOCIAL_DISTANCING_CATEGORIES = [`기준`, `모임`, `스포츠 관람`, `행사`, `집회`];

const SOCIAL_DISTANCING_INFOS = {
    1: [
        `
        인구 10만명 당 1명 미만 (주간 평균)<br/><br/>

        *서울 96명 미만 / 경기 135명 미만 / 부산 34명 미만
        `,
        `방역수칙을 준수하면서 사적모임 가능`,
        `실내: 수용인원의 <b>50%</b><br/>
         실외: 수용인원의 <b>70%</b>`,
        "참여인원 500명 이상시 관할 지자체에 사전신고 필요",
        "500명 이상 금지",
    ],
    2: [
        `
        인구 10만명 당 1명 이상 (주간 평균이 3일 이상 기준 초과) <br/><br/>

        *서울 96명 이상 / 경기 135명 이상 / 부산 34명 이상 
         `,
        `<b>8명</b>까지 사적모임 가능 (9인 이상 금지)`,
        `실내: 수용인원의 <b>30%</b> <br/>
          실외: 수용인원의 <b>50%</b>`,
        "100명 이상 금지",
        "100명 이상 금지",
    ],
    3: [
        `
        인구 10만명 당 2명 이상 (주간 평균이 3일 이상 기준 초과) <br/><br/>

        *서울 192명 이상 / 경기 270명 이상 / 부산 67명 이상 
         `,
        `<b>4명</b>까지 사적모임 가능 (5인 이상 금지)`,
        `실내: 수용인원의 <b>20%</b><br/>
         실외: 수용인원의 <b>30%</b>`,
        "50명 이상 금지",
        "50명 이상 금지",
    ],
    4: [
        `
        인구 10만명 당 4명 이상 (주간 평균이 3일 이상 기준 초과) <br/><br/>

        *서울 384명 이상 / 경기 539명 이상 / 부산 135명 이상 
         `,
        `
        18시 이전: <b>4명</b>까지 사적모임 가능 (5인 이상 금지) <br/>
        18시 이후: <b>2명</b>까지 사적모임 가능 (3인 이상 금지)
        `,
        "무관중 경기",
        `행사 금지`,
        `1인 시위 외 집회 금지`,
    ],
};

const Wrapper = styled.div`
    padding: 12px;
    padding-bottom: 0px;
`;

const InfoContainer = styled.div`
    margin-top: 18px;
    padding: 0px 12px;
`;
const InfoLabel = styled.div`
    font-size: 14px;
    min-width: 90px;
    margin-bottom: 4px;
    font-weight: bold;
`;
const InfoValue = styled.div<{ strong?: boolean }>`
    font-size: 14px;
    opacity: 0.8;
    br {
        content: "" !important;
        display: block !important;
        margin-bottom: 4px !important;
    }
    b {
        font-weight: bold;
    }
`;

type Props = {};

const SocialDistancingInfo: React.FC<Props> = ({}) => {
    const [level, setLevel] = useState(1);
    const mapToggleOptions = useMemo<ToggleOptionType[]>(
        () => [
            { name: "1단계", value: "1", visible: true },
            { name: "2단계", value: "2", visible: true },
            { name: "3단계", value: "3", visible: true },
            { name: "4단계", value: "4", visible: true },
        ],
        []
    );
    return (
        <Wrapper>
            <ToggleButtons
                layoutId='social-distancing-active'
                full
                shadow
                noBg
                divider
                options={mapToggleOptions}
                activeOption={level}
                setOption={setLevel}
            ></ToggleButtons>
            <InfoContainer>
                {SOCIAL_DISTANCING_INFOS[level].map((value, i) => {
                    return (
                        <Col mb='16px'>
                            <InfoLabel
                                dangerouslySetInnerHTML={{ __html: SOCIAL_DISTANCING_CATEGORIES[i] }}
                            ></InfoLabel>
                            <InfoValue dangerouslySetInnerHTML={{ __html: value }}></InfoValue>
                        </Col>
                    );
                })}
            </InfoContainer>
        </Wrapper>
    );
};

export default SocialDistancingInfo;
