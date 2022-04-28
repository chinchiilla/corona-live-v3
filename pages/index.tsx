import Domestic from "@components/Domestic/Domestic";
// import Domestic from "@components/Domestic/DomesticV2";
import Home from "@components/Home";
import Meta from "@components/Meta";
import Skeleton from "@components/Skeleton";
import React from "react";

type Props = {};

const Index: React.FC<Props> = ({}) => {
    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | 실시간 확진자 현황`,
                    canonical: ``,
                    description: `국내/세계 코로나 확진자수를 실시간으로 집계하여 제공합니다`,
                }}
            ></Meta>
            <Domestic></Domestic>
        </>
    );
};

export default Index;
