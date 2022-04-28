import React, { useCallback, useMemo } from "react";
import UpdateModal from "@components/Updates/UpdatesModal";
import { ct, getDomesticUpdates } from "@utils";
import { useRouter } from "next/router";

import { UNAVALIABLE_REGIONS } from "@consts";
import { useRecoilValue } from "recoil";
import { DomesticType } from "@types/DomesticType";
import { DomesticSelector } from "@states/DomesticState";

type Props = {
    data: any;
    show: boolean;
    onClose?: any;
    cityId?: string;
    guId?: string;
};

const DomesticUpdatesModal: React.FC<Props> = ({ data, show, onClose, cityId, guId }) => {
    const domesticData = useRecoilValue<DomesticType>(DomesticSelector);

    const history = useRouter();
    if (!domesticData?.updates) return <></>;
    const { updates } = domesticData;
    const onCloseModal = useCallback(() => history.push(`/city/${cityId}`), [cityId]);

    const updatesData = useMemo(() => getDomesticUpdates(updates.data, cityId, guId), [data, cityId, guId]);
    const areaName = useMemo(() => ct(cityId, guId), [cityId, guId]);

    return (
        <UpdateModal
            onClose={onCloseModal}
            data={updatesData}
            showModal={show}
            showCasesSummary
            showFilters={cityId == undefined && guId == undefined}
            areaName={areaName}
        ></UpdateModal>
    );
};

export default DomesticUpdatesModal;
