import React from "react";
import { Page } from "@components/Layout";

import WorldUpdatesModal from "@components/World/WorldUpdatesModal";
import Meta from "@components/Meta";

const WorldLive = ({ worldOverview }) => {
    if (!worldOverview) return <></>;
    return (
        <Page>
            <WorldUpdatesModal data={worldOverview.updates} show={true}></WorldUpdatesModal>
        </Page>
    );
};

export default WorldLive;
