import { Row } from "@components/Layout";
import { theme } from "@styles/themes";
import React, { useMemo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 6px 12px;
`;
const Title = styled.div`
    font-size: 12px;
    margin-bottom: 6px;
    opacity: 0.7;
`;
const Dday = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: ${theme("blue")};
    background: ${theme("blueBg")};
    padding: 2px 8px;
    border-radius: 8px;
    margin-right: 8px;
`;
const DateContainer = styled.div`
    font-size: 18px;
    margin-right: 8px;
    font-weight: bold;
`;

type Props = {};

const SocialDistancingBanner: React.FC<Props> = ({ date }) => {
    const [dday, koreanDate] = useMemo(() => {
        const [year, month, day] = date.split("-");

        let date1 = new Date(year, month, day);
        date1.setMonth(date1.getMonth() - 1);
        const date2 = new Date();

        const diffTime = Math.abs(date2 - date1);
        const dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const koreanDate = `${year}년 ${month}월 ${day}일`;

        return [dday, koreanDate];
    }, []);
    return (
        <Wrapper>
            {/* <Title>다음 거리두기</Title> */}
            <Row ai='center'>
                <Dday>10/17~10/31</Dday>
                <DateContainer>수도권 4단계</DateContainer>
            </Row>
        </Wrapper>
    );
};

export default SocialDistancingBanner;
