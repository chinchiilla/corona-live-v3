import MemoFooter from "@components/Footer";
import { Section, TransparentSection } from "@components/Layout";
import Meta from "@components/Meta";
import SocialDistancingBanner from "@components/SocialDistancing/SocialDistancingBanner";
import SocialDistancingBannerMock from "@components/SocialDistancing/SocialDistancingBannerMock";
import SocialDistancingInfo from "@components/SocialDistancing/SocialDistancingInfo";
import SocialDistancingMap from "@components/SocialDistancing/SocialDistancingMap";
import SocialDistancingMapMock from "@components/SocialDistancing/SocialDistancingMapMock";
import { SocialDistancingSelector } from "@states/SocialDistancingState";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div``;

type Props = {};

const SocialDistancingPage: React.FC<Props> = ({}) => {
    const data = useRecoilValue(SocialDistancingSelector);
    return (
        <Wrapper>
            <Meta
                data={{
                    title: `코로나 라이브 | 거리 두기 단계`,
                    canonical: `social-distancing`,
                    description: `지역별 거리 두기 단계 제공합니다`,
                }}
            ></Meta>
            {/* <Section>
                {data ? (
                    <SocialDistancingBanner date={data.date}></SocialDistancingBanner>
                ) : (
                    <SocialDistancingBannerMock></SocialDistancingBannerMock>
                )}
            </Section> */}

            <Section>{data ? <SocialDistancingMap data={data}></SocialDistancingMap> : <SocialDistancingMapMock></SocialDistancingMapMock>}</Section>
            <Section>
                <SocialDistancingInfo></SocialDistancingInfo>
            </Section>
            <TransparentSection>
                <MemoFooter></MemoFooter>
            </TransparentSection>
        </Wrapper>
    );
};

export default SocialDistancingPage;
