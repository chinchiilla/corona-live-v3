import MemoFooter from "@components/Footer";
import { Row, Section, TransparentSection } from "@components/Layout";
import Loading from "@components/Loading";
import Meta from "@components/Meta";
import VaccineChart from "@components/Vaccine/VaccineChart";
import VaccineChartV2 from "@components/Vaccine/VaccineChartV2";
import VaccineInfo from "@components/Vaccine/VaccineInfo";
import VaccineStats from "@components/Vaccine/VaccineStats";
import VaccineStatsMock from "@components/Vaccine/VaccineStatsMock";
import { VaccineSelector, VaccineState } from "@states/VaccineState";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div``;

type Props = {};

const SocialDistancingPage: React.FC<Props> = ({}) => {
    const data = useRecoilValue(VaccineSelector);
    return (
        <Wrapper>
            <Meta
                data={{
                    title: `코로나 라이브 | 백신 현황`,
                    canonical: `vaccine`,
                    description: `백신현황을 제공합니다`,
                }}
            ></Meta>
            <Section>
                {data ? <VaccineStats stats={data?.stats}></VaccineStats> : <VaccineStatsMock></VaccineStatsMock>}
            </Section>

            {/* <Section>
                {data ? <VaccineMap cities={data?.cities}></VaccineMap> : <VaccineMapMock></VaccineMapMock>}
            </Section> */}
            {/* <Section>
                {data?.timeseries ? (
                    <VaccineChart dataSet={data?.timeseries}> </VaccineChart>
                ) : (
                    <Row ai='center' jc='center' h='300px'>
                        <Loading></Loading>
                    </Row>
                )}
            </Section> */}

            <VaccineChartV2></VaccineChartV2>
            <Section>
                <VaccineInfo></VaccineInfo>
            </Section>
            <TransparentSection>
                <MemoFooter></MemoFooter>
            </TransparentSection>
        </Wrapper>
    );
};

export default SocialDistancingPage;
