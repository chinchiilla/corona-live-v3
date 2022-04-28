import React from "react";
import UpdateModal from "@components/Updates/UpdatesModal";
import { getWorldUpdates } from "@utils";
import { useRouter } from "next/router";

import { COUNTRY_NAMES } from "@consts";

type Props = {
    updatesData: any;
    countryCode?: string;
};

const WorldUpdatesModal: React.FC<Props> = ({ updatesData, countryCode }) => {
    const history = useRouter();
    if (!updatesData) return <></>;
    return (
        <UpdateModal
            data={getWorldUpdates(updatesData)}
            onClose={() => history.push("/world")}
            showModal={true}
            showFilters={false}
            areaName={countryCode == undefined ? "세계" : COUNTRY_NAMES[countryCode]}
            hideSrc
        ></UpdateModal>
    );
};

export default WorldUpdatesModal;
