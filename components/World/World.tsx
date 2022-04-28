import { getWorldUpdates } from "@utils";
import React, { useContext } from "react";
import WorldStats from "./WorldStats";
import WorldStatsMock from "./WorldStatsMock";
import WorldTable from "./WorldTable";
import WorldChart from "@components/World/WorldChart";
import WorldLiveBoard from "@components/World/WorldLiveBoard";
import WorldLiveBoardMock from "@components/World/WorldLiveBoardMock";
import { Background, MobileNoSection, Row, Section, TransparentSection } from "@components/Layout";
import Footer from "@components/Footer";
import { WorldSelector } from "@states/WorldState";
import { useRecoilValue } from "recoil";
import WorldTableMock from "./WorldTableMock";

const World = () => {
    const worldData = useRecoilValue(WorldSelector);
    return (
        <>
            {/* <Row h='12px'></Row> */}

            <Section>{worldData ? <WorldStats></WorldStats> : <WorldStatsMock></WorldStatsMock>}</Section>

            {/* <Background> */}
            <MobileNoSection>
                {worldData ? (
                    <WorldLiveBoard worldData={worldData}></WorldLiveBoard>
                ) : (
                    <WorldLiveBoardMock></WorldLiveBoardMock>
                )}
            </MobileNoSection>

            {/* </Background> */}
            {/*  */}
            {/* <Row h='12px'></Row> */}
            <WorldChart></WorldChart>
            {/* <Row h='6px'></Row> */}
            <TransparentSection>
                {worldData ? <WorldTable worldData={worldData}></WorldTable> : <WorldTableMock></WorldTableMock>}
            </TransparentSection>
            <TransparentSection>
                <Footer></Footer>
            </TransparentSection>
        </>
    );
};

export default World;
