import { Page } from "@components/Layout";
import Meta from "@components/Meta";
import WorldUpdatesModal from "@components/World/WorldUpdatesModal";
import { WorldSelector } from "@states/WorldState";
import { WorldType } from "@types/WolrdType";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";

type Props = {};

const Live: React.FC<Props> = ({}) => {
    const worldData = useRecoilValue<WorldType>(WorldSelector);
    if (!worldData?.updates) return <></>;
    return (
        <>
            <Meta
                data={{
                    title: `코로나 라이브 | 국내 코로나 실시간`,
                    canonical: `world/live`,
                    description: `당일 발생 국내 확진자 현황을 실시간으로 제공합니다`,
                }}
            ></Meta>
            <Page>
                <WorldUpdatesModal updatesData={worldData.updates}></WorldUpdatesModal>
            </Page>
        </>
    );
};

export default Live;
