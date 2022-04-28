import React, { useContext, useEffect, useMemo, useState } from "react";
import { Background, Box, Col, Row, Section, TransparentSection } from "@components/Layout";

import { useScrollTop } from "@hooks/useScrollTop";
import { StatsType, ToggleOptionType, UpdateType } from "@types";

import DomesticMap from "./DomesticMap";
import ToggleButtons from "@components/ToggleButtons";

// import DomesticLiveBoard from "@components/Domestic/DomesticLiveBoard";
import DomesticLiveBoard from "@components/Domestic/DomesticLiveBoardV2";
import DomesticLiveBoardMock from "@components/Domestic/DomesticLiveBoardMock";
import DomesticTable from "@components/Domestic/DomesticTable";
import Footer from "@components/Footer";
import Notification from "@components/Notification";

import { DomesticContext, DomesticContextProps } from "@contexts/DomesticContext";
import styled from "styled-components";
import DomesticStats from "./DomesticStats";
import DomesticStatsMock from "./DomesticStatsMock";
import DomesticChart from "./DomesticChart";
import { useRecoilValue } from "recoil";
import { DomesticSelector } from "@states/DomesticState";
import { DomesticType } from "@types/DomesticType";
import { useRouter } from "next/router";
import Skeleton from "@components/Skeleton";

interface DataSectionProps {
    domesticData: DomesticType;
}

const ToggleButtonsContainer = styled(Row)`
    justify-content: center;
    /* margin-top: 12px; */
    /* margin-bottom: 4px; */
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 40%;
        width: 100%;
        background: #f7f7f7;
        z-index: -1;
    }
`;

const DataSectionMock = styled(Col)`
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

const DataSection: React.FC<DataSectionProps> = ({ domesticData }) => {
    const [showMap, setShowMap] = useState(false);
    const mapToggleOptions = useMemo<ToggleOptionType[]>(
        () => [
            { name: "지도", value: true, visible: true, icon: "Map" },
            { name: "지역별 표", value: false, visible: true, icon: "Table" },
        ],
        []
    );

    return (
        <>
            {/* <Row > */}
            {/* <ToggleButtonsContainer fadeInUp delay={5}> */}
            <Row mt='16px'></Row>
            <Row p='0px 20px'>
                <ToggleButtons
                    full
                    shadow
                    noBg
                    divider
                    options={mapToggleOptions}
                    activeOption={showMap}
                    setOption={setShowMap}
                ></ToggleButtons>
            </Row>

            {/* </ToggleButtonsContainer> */}
            {/* <MockTable></MockTable> */}
            {domesticData ? (
                <>
                    {showMap ? (
                        <DomesticMap domesticData={domesticData}></DomesticMap>
                    ) : (
                        <DomesticTable></DomesticTable>
                    )}
                </>
            ) : (
                <DataSectionMock>
                    {[...Array(10).keys()].map((a) => (
                        <Skeleton width={440} height={20} mb={20}></Skeleton>
                    ))}
                </DataSectionMock>
            )}
        </>
    );
};

const Domestic = ({}) => {
    const history = useRouter();
    useScrollTop();
    const domesticData = useRecoilValue(DomesticSelector);
    // const domesticData = null;
    const data = useContext<Partial<DomesticContextProps>>(DomesticContext);
    const { notification, removeNotification } = data;

    return (
        <>
            {!!notification && (
                <Notification
                    notification={notification}
                    closeModal={removeNotification}
                    openUpdates={() => history.push("/live/")}
                ></Notification>
            )}
            <>
                {domesticData ? (
                    <DomesticStats domesticData={domesticData}></DomesticStats>
                ) : (
                    <DomesticStatsMock></DomesticStatsMock>
                )}
            </>
            <Row h='16px'></Row>

            <>
                {domesticData ? (
                    <DomesticLiveBoard domesticData={domesticData}></DomesticLiveBoard>
                ) : (
                    <DomesticLiveBoardMock></DomesticLiveBoardMock>
                )}
            </>

            <Row h='8px'></Row>

            <DomesticChart></DomesticChart>
            <TransparentSection>
                <DataSection {...{ domesticData }}></DataSection>
            </TransparentSection>
            <TransparentSection>
                <Footer></Footer>
            </TransparentSection>
        </>
    );
};

export default Domestic;
