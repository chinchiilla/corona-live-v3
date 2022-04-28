import React, { Suspense, lazy, useState, useEffect } from "react";
import { Background, Page, BackgroundLine, Section, TransparentSection, Row } from "@components/Layout";

import CityStats from "@components/City/CityStats";
import Footer from "@components/Footer";
import Notification from "@components/Notification";

import { ct } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import Header from "@components/Home/Header";
import Meta from "@components/Meta";
import CityChart from "./CityChart";
import CityTable from "./CityTable";
import { useRecoilValue } from "recoil";
import { CitySelector } from "@states/CityState";
import CityLiveBoard from "./CityLiveBoard";
import CityLiveBoardMock from "./CityLiveBoardMock";
import { useRouter } from "next/router";
import CityStatsMock from "./CityStatsMock";
import Skeleton from "@components/Skeleton";

const City = ({ theme, setTheme, cityId, data }) => {
    useScrollTop();
    const history = useRouter();
    const cityData = useRecoilValue(CitySelector);
    const { isLoading, notification, removeNotification } = data;

    useEffect(() => {
        if (Number(cityId) > 16) history.push("/");
    }, [cityId]);

    if (Number(cityId) > 16) return <></>;

    const noCityData = !cityData || !cityData[cityId];
    // if (!cityData || !cityData[cityId]) return <></>;
    // console.log(cityData[cityId]);
    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | ${ct(cityId)}`,
                    canonical: `city/${cityId}`,
                    description: `${ct(cityId)}에서 발생한 당일 확진자를 실시간으로 제공합니다`,
                }}
            ></Meta>

            {!isLoading && !!notification && (
                <Notification notification={notification} closeModal={removeNotification}></Notification>
            )}

            <TransparentSection>
                {cityId != null ? (
                    <Header {...{ theme, setTheme }} title={ct(cityId)}></Header>
                ) : (
                    <Row jc='center' p='12px 0px'>
                        <Skeleton width={80} height={20}></Skeleton>
                    </Row>
                )}
            </TransparentSection>

            {/* <BackgroundLine></BackgroundLine> */}
            {/* <Row h='18px'></Row> */}
            <TransparentSection>
                {!noCityData ? <CityStats cityData={cityData[cityId]}></CityStats> : <CityStatsMock></CityStatsMock>}
            </TransparentSection>
            <>
                {!noCityData ? (
                    <CityLiveBoard cityData={cityData[cityId]} cityId={cityId}></CityLiveBoard>
                ) : (
                    <CityLiveBoardMock></CityLiveBoardMock>
                )}
            </>
            <Row h='18px'></Row>
            <Section>
                <CityChart cityId={cityId}></CityChart>
            </Section>

            <TransparentSection>
                {!noCityData ? <CityTable cityData={cityData[cityId]} cityId={cityId}></CityTable> : <></>}
            </TransparentSection>

            <Section>
                <Footer></Footer>
            </Section>
        </>
    );
};

export default City;
