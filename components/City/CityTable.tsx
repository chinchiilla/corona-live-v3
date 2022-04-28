import React, { FC, useMemo, useState } from "react";
import { Row, Th } from "@components/Layout";
import styled from "styled-components";
import CityRow from "./CityRow";
import { DISTRICT_TD_FLEX } from "@utils/consts";
import { CityType } from "@types/CityType";
import Icon from "@components/Icon";
import { media } from "@styles/media";

const Wrapper = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    padding: 0px 12px;
    position: relative;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px;
    position: relative;
`;

const HeaderWrapper = styled(Row)`
    align-items: center;
    position: relative;
    justify-content: center;

    ${media.phablet} {
        justify-content: flex-start;
    }
`;

interface Props {
    cityData: CityType;
    cityId: string;
}

const domesticHeaders = [
    { flex: DISTRICT_TD_FLEX[0], name: "지역" },
    { flex: DISTRICT_TD_FLEX[2], name: "확진자", id: "cases" },
    { flex: DISTRICT_TD_FLEX[3], name: "실시간 확진자", id: "casesLive" },
];

const CityTable: FC<Props> = ({ cityData, cityId }) => {
    const [sortBy, setSortBy] = useState("casesLive");
    const [isDesc, setIsDesc] = useState(true);

    const citiesData = useMemo(() => {
        if (!cityData) return null;
        const { gus, gusLive } = cityData;
        return Object.keys(gus).reduce(
            (obj, cityId) => ((obj[cityId] = { cases: gus[cityId], casesLive: gusLive[cityId] || 0 }), obj),
            {}
        );
    }, [cityData]);

    const guKeys = useMemo(() => {
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
            <Container>
                <HeaderWrapper fadeInUp>
                    {domesticHeaders.map((data) => {
                        const { flex, name, id } = data;
                        const onClick = () => setSortingKey(id);
                        return (
                            <Th flex={flex} onClick={onClick}>
                                {name}
                                {sortBy == id && <Icon ml='2px' name={isDesc ? "ChevronUp" : "ChevronDown"}></Icon>}
                            </Th>
                        );
                    })}
                </HeaderWrapper>
                {guKeys.map((guId, i) => {
                    return (
                        <CityRow
                            data={citiesData[guId]}
                            even={i % 2 === 0}
                            cityId={cityId}
                            key={guId}
                            guId={guId}
                        ></CityRow>
                    );
                })}
            </Container>
        </Wrapper>
    );
};

export default CityTable;
