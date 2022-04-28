import Home from "@components/Home";
import Meta from "@components/Meta";
import World from "@components/World";
import { DomesticContext } from "@contexts/DomesticContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

type Props = {};

const Index: React.FC<Props> = ({}) => {
    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | 세계 코로나 현황`,
                    canonical: `world`,
                    description: `세계 코로나 확진자 현황을 실시간으로 제공합니다`,
                }}
            ></Meta>
            <World></World>
            {/* <Home type='WORLD'></Home> */}
        </>
    );
};

export default Index;
