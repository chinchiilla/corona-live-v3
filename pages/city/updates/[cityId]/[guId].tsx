import DomesticUpdatesModal from "@components/City/CityUpdatesModal";
import DomesticUpdates from "@components/Domestic/DomesticUpdates";
import { Page } from "@components/Layout";
import Meta from "@components/Meta";
import { DomesticSelector } from "@states/DomesticState";
import { DomesticType } from "@types/DomesticType";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

type Props = {};

const Live: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { cityId, guId } = router.query;
    const domesticData = useRecoilValue<DomesticType>(DomesticSelector);

    if (!domesticData?.updates?.data) return <></>;

    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | 국내 코로나 실시간`,
                    canonical: `live`,
                    description: `당일 발생 국내 확진자 현황을 실시간으로 제공합니다`,
                }}
            ></Meta>
            <Page>
                <DomesticUpdatesModal
                    data={domesticData.updates.data}
                    cityId={cityId}
                    guId={guId}
                    show={true}
                ></DomesticUpdatesModal>
            </Page>
        </>
    );
};

export default Live;
