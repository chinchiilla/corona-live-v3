import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    MobileNoBgSection,
    Background,
    Col,
    Row,
    Section,
    TransparentSection,
    MobileNoSection,
    NoPaddingMobileSection,
} from "@components/Layout";

import { useScrollTop } from "@hooks/useScrollTop";
import { StatsType, ToggleOptionType, UpdateType } from "@types";

import DomesticMap from "./DomesticMap";
import ToggleButtons from "@components/ToggleButtons";

// import DomesticLiveBoard from "@components/Domestic/DomesticLiveBoard";
import DomesticLiveBoard from "@components/Domestic/DomesticLiveBoardMobile";
import DomesticLiveBoardMock from "@components/Domestic/DomesticLiveBoardMobileMock";
import DomesticTable from "@components/Domestic/DomesticTable";
import Footer from "@components/Footer";
import Notification from "@components/Notification";

import { DomesticContext, DomesticContextProps } from "@contexts/DomesticContext";
import styled from "styled-components";
import DomesticStats from "./DomesticStats";
import DomesticStatsMobileV2 from "./DomesticStatsMobileV2";
import DomesticStatsMobile from "./DomesticStatsV2";
import DomesticStatsMock from "./DomesticStatsMock";
import DomesticChart from "./DomesticChart";
import { useRecoilValue } from "recoil";
import { DomesticSelector } from "@states/DomesticState";
import { DomesticType } from "@types/DomesticType";
import { useRouter } from "next/router";
import Skeleton from "@components/Skeleton";
import Loading from "@components/Loading";
import FinishedPopup from "@components/Home/FinishedPopup";
import { media } from "@styles/media";

interface DataSectionProps {
    domesticData: DomesticType;
}

const DataSectionMock = styled(Col)`
    justify-content: center;
    align-items: center;
    height: 500px;
    /* margin-top: 30px; */
`;

const DesktopVisible = styled.div`
    ${media.desktop} {
        display: block;
    }

    ${media.phablet} {
        display: none;
    }
`;

const MobileVisible = styled.div`
    display: none;

    ${media.phablet} {
        display: block;
    }
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
            <Row mt='12px'></Row>
            <>
                <Row p='0px 12px'>
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
            </>

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
                    <Loading></Loading>
                    {/* {[...Array(10).keys()].map((a) => (
                        <Skeleton width={200} height={20} mb={20}></Skeleton>
                    ))} */}
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
    // const data = useContext<Partial<DomesticContextProps>>(DomesticContext);
    // const { notification, removeNotification } = data;
    return (
        <>
            {domesticData && (
                <FinishedPopup
                    casesSummary={domesticData?.statsLive}
                    openMenu={() => {
                        history.push("/faq");
                    }}
                ></FinishedPopup>
            )}
            {/* {!!notification && (
                <Notification
                    notification={notification}
                    closeModal={removeNotification}
                    openUpdates={() => history.push("/live/")}
                ></Notification>
            )} */}
            {domesticData ? (
                <>
                    <DesktopVisible>
                        <Section>
                            <DomesticStats domesticData={domesticData}></DomesticStats>
                        </Section>
                    </DesktopVisible>

                    <MobileVisible>
                        <MobileNoSection>
                            <Section>
                                <DomesticStatsMobile domesticData={domesticData}></DomesticStatsMobile>
                            </Section>

                            {/* <MobileNoBgSection>
                                <DomesticStatsMobile domesticData={domesticData}></DomesticStatsMobile>
                            </MobileNoBgSection> */}

                            {/* <Section>
                                <DomesticStatsMobileV2 domesticData={domesticData}></DomesticStatsMobileV2>
                            </Section> */}
                        </MobileNoSection>
                    </MobileVisible>
                </>
            ) : (
                <Section>
                    <DomesticStatsMock></DomesticStatsMock>
                </Section>
            )}
            {/* <Background>
                {domesticData ? (
                    <DomesticLiveBoard domesticData={domesticData}></DomesticLiveBoard>
                ) : (
                    <DomesticLiveBoardMock></DomesticLiveBoardMock>
                )}
            </Background> */}

            {/* <MobileNoBgSection>
                {domesticData ? (
                    <DomesticLiveBoard domesticData={domesticData}></DomesticLiveBoard>
                ) : (
                    <DomesticLiveBoardMock></DomesticLiveBoardMock>
                )}
            </MobileNoBgSection> */}

            <MobileNoSection>
                {domesticData ? (
                    <DomesticLiveBoard domesticData={domesticData}></DomesticLiveBoard>
                ) : (
                    <DomesticLiveBoardMock></DomesticLiveBoardMock>
                )}
            </MobileNoSection>

            {/* <Row h='8px'></Row> */}

            <DomesticChart></DomesticChart>
            <Section>
                <DataSection {...{ domesticData }}></DataSection>
            </Section>
            <TransparentSection>
                <Footer></Footer>
            </TransparentSection>
        </>
    );
};

export default Domestic;
