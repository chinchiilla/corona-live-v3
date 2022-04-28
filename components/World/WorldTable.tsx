import { Box, Col, Row, Th } from "@components/Layout";
import { COUNTRY_TD_FLEX } from "@consts";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WorldRow from "./WorldRow";

import throttle from "lodash.throttle";

type Props = { data };

const Wrapper = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: column;
    padding: 0px 12px;
    box-sizing: border-box;

    position: relative;
    width: 100%;
    flex: 1;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: auto;
    flex: 1;
    padding: 0px;
    position: relative;
`;

const HeaderWrapper = styled(Row)`
    align-items: center;
    position: relative;
`;

const Header = ({ tdFlex }) => {
    return (
        <Row alignItems='center' mb='2px' mt='6px' fadeInUp>
            <Th flex={tdFlex[0]}>
                <Box width='8px'></Box>
                나라
            </Th>
            <Th flex={tdFlex[1]}>
                <Box width='8px'></Box>
                확진자
            </Th>
            <Th flex={tdFlex[2]}>
                <Box width='8px'></Box>
                사망자
            </Th>
            <Th flex={tdFlex[3]}>
                <Box width='8px'></Box>
                완치자
            </Th>
            <Th flex={tdFlex[3]}>
                <Box width='8px'></Box>
                100만명당 확진
            </Th>
            {/* <Th flex={tdFlex[3]}>
                <Box width='8px'></Box>
                검사
            </Th> */}
        </Row>
    );
};

const WorldTable: React.FC<Props> = ({ worldData }) => {
    if (!worldData) return <></>;
    const { countries } = worldData;
    const [rowsCount, setRowsCount] = useState(30);

    const [showShadow, setShowShadow] = useState(false);
    const containerRef = useRef();

    useEffect(() => {
        const loadMore = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1500 >
                document.scrollingElement.scrollHeight
            ) {
                // Do load more content here!
                let n = Object.keys(countries).length;
                setRowsCount((a) => Math.min(a + 30, n));
            }
        };

        window.addEventListener("scroll", loadMore);

        return () => {
            window.removeEventListener("scroll", loadMore);
        };
    }, []);
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
                {/* <HeaderWrapper> */}
                <Header tdFlex={COUNTRY_TD_FLEX}></Header>
                {/* </HeaderWrapper> */}

                <Col>
                    {Object.keys(countries)
                        .slice(0, rowsCount)
                        .filter((countryCode) => countryCode.length < 3)
                        .sort((countryA, countryB) => countries[countryB].cases - countries[countryA].cases)
                        .map((code, i) => {
                            // let lastUpdated = worldUpdates.find(({ country }) => country == code)?.datetime as string;
                            return (
                                <WorldRow
                                    showShadow={showShadow}
                                    tdFlex={COUNTRY_TD_FLEX}
                                    key={i}
                                    data={countries[code]}
                                    code={code}
                                    index={i}
                                    // lastUpdated={lastUpdated}
                                    // updates={worldUpdates}
                                ></WorldRow>
                            );
                        })}
                </Col>
            </Container>
        </Wrapper>
    );
};

export default WorldTable;
