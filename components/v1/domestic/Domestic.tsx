import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "@components/Layout";

import { getDomesticUpdates, sortByDate } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import { ToggleOptionType, UpdateType } from "./types";

import Chart from "../chart/Chart";
import Board from "./DomesticBoard";
import Table from "./DomesticTable";

import Footer from "@components/Footer";
import Updates from "./UpdatesLiveDisplay";

import Meta from "@components/Meta";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { DomesticSelector } from "@states/DomesticState";
import Menu from "@components/Menu";
import MemoHeader from "@components/Home/Header";
import MemoToggleButtons from "../ToggleButtons";
import MapExplorer from "./MapExplorer";
import FinishedPopup from "@components/Home/FinishedPopup";

export const CITY_TD_FLEX = ["0.45", "0.2", "1.4", "1", "0 1 82px"];

interface DataSectionProps {
    current: any;
    overall: any;
    updatesData: UpdateType[];
}

const Wrapper = styled(Col)`
    width: 100%;
    align-items: stretch;
`;

const DataSection: React.FC<DataSectionProps> = ({ current, overall, updatesData }) => {
    const [showMap, setShowMap] = useState(false);
    const sortedUpdatesData = useMemo(() => sortByDate(updatesData), [updatesData]);

    const mapToggleOptions = useMemo<ToggleOptionType[]>(
        () => [
            { name: "지도", value: true, visible: true, icon: "Map" },
            { name: "지역별 표", value: false, visible: true, icon: "Table" },
        ],
        []
    );

    return (
        <>
            {true && (
                <>
                    {current && overall && (
                        <Row jc='center' mt='12px' mb='4px' fadeInUp delay={5}>
                            <MemoToggleButtons
                                noBg
                                divider
                                options={mapToggleOptions}
                                activeOption={showMap}
                                setOption={setShowMap}
                            ></MemoToggleButtons>
                        </Row>
                    )}

                    {current && overall && !showMap && (
                        <Table
                            current={current}
                            overall={overall}
                            updates={sortedUpdatesData}
                            tdFlex={CITY_TD_FLEX}
                        ></Table>
                    )}
                </>
            )}

            {current && overall && showMap && <MapExplorer stats={{ current, overall }}></MapExplorer>}
        </>
    );
};

// const MemoDataSection = React.memo(DataSection, (prev, next) => {
//     return (
//         prev.statsData.overview.confirmed[0] == next.statsData.overview.confirmed[0] &&
//         prev.statsData.overview.confirmed[1] == next.statsData.overview.confirmed[1] &&
//         prev.statsData.overview.current[0] == next.statsData.overview.current[0] &&
//         prev.statsData.overview.current[1] == next.statsData.overview.current[1]
//     );
// });

// const UPDATES_LIVE_LINK = { href: "/live", name: "실시간" };
const UPDATES_LIVE_LINK = { href: "", name: "실시간" };

const Domestic = ({ history }) => {
    useScrollTop();
    const data = useRecoilValue(DomesticSelector);
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => setShowMenu(false);

    if (!data) return <></>;

    const { updatesPreview, statsLive, stats, cities, citiesLive, updates } = data;

    return (
        <Col>
            <Wrapper>
                <Meta
                    data={{
                        title: `코로나 라이브 | 실시간 확진자 현황`,
                        canonical: ``,
                        description: `국내/세계 코로나 확진자수를 실시간으로 집계하여 제공합니다`,
                    }}
                ></Meta>
                {statsLive && (
                    <FinishedPopup
                        casesSummary={statsLive}
                        openMenu={() => {
                            history.push("/faq");
                        }}
                    ></FinishedPopup>
                )}

                {updatesPreview ? (
                    <Updates data={getDomesticUpdates(updatesPreview)} link={UPDATES_LIVE_LINK}></Updates>
                ) : (
                    <Row h='30px'></Row>
                )}
                {statsLive && stats && <Board {...{ statsLive, stats }}></Board>}
                <Chart></Chart>

                {cities && citiesLive && updates && (
                    <>
                        <DataSection
                            {...{
                                overall: Object.keys(cities).reduce((obj, cityId) => {
                                    obj[cityId] = cities[cityId].cases;
                                    return obj;
                                }, {}),
                                current: citiesLive,
                                updatesData: updates.data,
                            }}
                        ></DataSection>
                    </>
                )}
                {/* {statsData && ( */}
                {/* )} */}
                {/* {statsData && casesSummary && (
                        <Board
                            data={statsData.overview}
                            casesSummary={casesSummary}
                            lastUpdatedDate={lastUpdatedDate}
                            lastUpdatedTime={lastUpdated}
                        ></Board>
                    )}

                   
                    {statsData && updatesData && (
                        <>
                            <MemoDataSection {...{ updatesData, statsData }}></MemoDataSection>
                        </>
                    )} 
                    
                    */}
            </Wrapper>
            {/* </Row> */}
            {updatesPreview && (
                <>
                    <Footer></Footer>
                </>
            )}
        </Col>
    );
};

export default Domestic;
