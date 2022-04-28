import React, { useContext, useState } from "react";
import styled from "styled-components";

import { DomesticContext, DomesticContextProps } from "@contexts/DomesticContext";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { ThemeContext, ThemeContextProps } from "@contexts/ThemeContext";
import City from "@components/City/City";
import { useRouter } from "next/router";

const Wrapper = styled.div``;

type Props = {};

const CityPage: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { cityId } = router.query;

    const { setTheme, theme } = useContext<Partial<ThemeContextProps>>(ThemeContext);
    const data = useContext<Partial<DomesticContextProps>>(DomesticContext);

    // if (cityId == null) return <></>;

    return <City {...{ setTheme, theme, data }} cityId={cityId}></City>;
};

export default CityPage;
