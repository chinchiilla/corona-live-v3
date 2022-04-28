import DomesticUpdatesModal from "@components/Domestic/DomesticUpdatesModal";
import Meta from "@components/Meta";
import { DomesticSelector } from "@states/DomesticState";
import { DomesticType } from "@types/DomesticType";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";

type Props = {};

const Updates: React.FC<Props> = ({}) => {
    const domesticData = useRecoilValue<DomesticType>(DomesticSelector);
    if (!domesticData?.updates) return <></>;

    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | 국내 코로나 실시간`,
                    canonical: `live`,
                    description: `당일 발생 국내 확진자 현황을 실시간으로 제공합니다`,
                }}
            ></Meta>
            <DomesticUpdatesModal data={domesticData.updates} show={true}></DomesticUpdatesModal>;
        </>
    );
};

export default Updates;
