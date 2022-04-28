import React, { FC, useMemo, useRef, useState } from "react";

import { Row, Th } from "@components/Layout";

import styled from "styled-components";
import { useRecoilValue } from "recoil";
import DomesticRow from "./DomesticRow";
import { DomesticType } from "@types/DomesticType";
import { DomesticSelector } from "@states/DomesticState";
import { CITY_TD_FLEX } from "@utils/consts";
import Icon from "@components/Icon";

import throttle from "lodash.throttle";

const Wrapper = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    position: relative;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    overflow-x: auto;
    padding: 0px;
    position: relative;
`;

const HeaderWrapper = styled(Row)`
    align-items: center;
    position: relative;
    & > div {
        margin-left: 4px;
    }
`;

interface Props {}

const domesticHeaders = [
    { flex: CITY_TD_FLEX[0], name: "지역" },
    { flex: CITY_TD_FLEX[3], name: "오늘 확진자", id: "casesLive" },
    { flex: CITY_TD_FLEX[2], name: "총 확진자", id: "cases" },
    { flex: CITY_TD_FLEX[4], name: "총 사망자", id: "deaths" },
    // { flex: CITY_TD_FLEX[5], name: "백신 접종자", id: "vaccine" },
    { flex: CITY_TD_FLEX[5], name: "총 완치자", id: "recovered" },
    { flex: CITY_TD_FLEX[6], name: "10만명당 확진자", id: "per100k" },
];

const toFit = (cb, { dismissCondition = () => false, triggerCondition = () => true }) => {
    if (!cb) {
        throw Error("Invalid required arguments");
    }

    let tick = false;

    return function () {
        if (tick) {
            return;
        }

        tick = true;
        return requestAnimationFrame(() => {
            if (dismissCondition()) {
                tick = false;
                return;
            }

            if (triggerCondition()) {
                tick = false;
                return cb();
            }
        });
    };
};

const DomesticTable: FC<Props> = () => {
    const domesticData = useRecoilValue<DomesticType>(DomesticSelector);
    const [sortBy, setSortBy] = useState("casesLive");
    const [isDesc, setIsDesc] = useState(true);

    const [showShadow, setShowShadow] = useState(false);
    const containerRef = useRef();

    const citiesData = useMemo(() => {
        if (!domesticData?.cities) return null;
        const { cities, citiesLive } = domesticData;
        return Object.keys(cities).reduce(
            (obj, cityId) => ((obj[cityId] = { ...cities[cityId], casesLive: citiesLive[cityId] || 0 }), obj),
            {}
        );
    }, [domesticData]);

    const cityKeys = useMemo(() => {
        if (!citiesData) return <></>;
        return Object.keys(citiesData).sort(
            (a, b) => citiesData[isDesc ? b : a][sortBy][0] - citiesData[isDesc ? a : b][sortBy][0]
        );
    }, [citiesData, isDesc, sortBy]);

    if (!citiesData) return <></>;

    const setSortingKey = (key) => {
        if (key) {
            if (key == sortBy) {
                setIsDesc((prev) => !prev);
            } else {
                setSortBy(key);
            }
        }
    };

    return (
        <Wrapper>
            <Container
                ref={containerRef}
                onScroll={throttle((e) => {
                    if (e.target.scrollLeft > 20) {
                        setShowShadow(true);
                    } else {
                        setShowShadow(false);
                    }
                }, 100)}
            >
                <HeaderWrapper fadeInUp>
                    {domesticHeaders.map((data) => {
                        const { flex, name, id } = data;
                        const onClick = () => setSortingKey(id);
                        return (
                            <Th flex={flex} onClick={onClick} key={id}>
                                {name}
                                {sortBy == id && (
                                    <Icon ml='2px' strokeWidth='2px' name={isDesc ? "ChevronUp" : "ChevronDown"}></Icon>
                                )}
                            </Th>
                        );
                    })}
                </HeaderWrapper>
                {cityKeys.map((cityId, i) => {
                    return (
                        <DomesticRow
                            showShadow={showShadow}
                            data={
                                cityId === "-1"
                                    ? { ...citiesData[-1], casesLive: domesticData.citiesLive[17] as any }
                                    : citiesData[cityId]
                            }
                            even={i % 2 === 0}
                            cityId={cityId}
                            key={cityId}
                        ></DomesticRow>
                    );
                })}
            </Container>
        </Wrapper>
    );
};

export default DomesticTable;
