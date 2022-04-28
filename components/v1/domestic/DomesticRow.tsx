import React, { useState } from "react";
import styled, { css } from "styled-components";

import { Row, Box, Td } from "@components/Layout";
import Icon from "@components/Icon";
import DeltaTag from "@components/DeltaTag";
import LastUpdatedTime from "@components/Updates/LastUpdatedTime";

import { numberWithCommas, ct } from "@utils";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";
import { UNAVALIABLE_REGIONS } from "@consts";

const Wrapper = styled(Row)`
    border-radius: 6px;
    height: 48px;
    padding: 0px 12px;
    margin-bottom: 2px;
    position: relative;
    cursor: pointer;
    ${ifProp(
        "even",
        css`
            background: ${theme("greyBg")};
        `
    )}
`;
const Cases = styled(Box)`
    font-size: 12px;
    color: ${theme("darkGreyText")};
    font-weight: 600;
`;

const Divider = styled(Box)`
    width: 1px;
    height: 10px;
    background: ${theme("lightGreyText")};
`;

const DomesticRow = ({ updates, data, cityId, guId, lastUpdated, tdFlex, ...props }) => {
    const [showUpdates, setShowUpdates] = useState(false);

    const { total, current } = data;

    const deltaPositive = current[1] > 0;
    const currentColor = deltaPositive ? "red" : "blue";

    const region = ct(cityId, guId);
    if (!region) return <></>;

    const onClick = () => {
        if (guId != undefined && lastUpdated) setShowUpdates(true);
    };

    return (
        <>
            {/* {cityId && (
                <DomesticUpdatesModal
                    data={updates}
                    onClose={() => setShowUpdates(false)}
                    show={showUpdates}
                    cityId={cityId}
                    guId={guId}
                ></DomesticUpdatesModal>
            )} */}

            <Wrapper {...props} onClick={onClick}>
                {/* {guId == undefined && !UNAVALIABLE_REGIONS[region] && <ALink href={`/city/${cityId}`}>{region}</ALink>} */}

                <Td flex={tdFlex[0]}>
                    <Box fontSize='12px' fontWeight={500}>
                        {region}
                    </Box>
                </Td>

                <Td flex={tdFlex[1]}>
                    <Divider></Divider>
                </Td>

                <Td flex={tdFlex[2]}>
                    {total ? (
                        <>
                            <Cases>{numberWithCommas(total[0])}</Cases>
                            <Box fontSize='10px' opacity={0.6} ml='2px'>
                                명
                            </Box>
                            <DeltaTag color={"red"} delta={total[1]} small showBg></DeltaTag>
                        </>
                    ) : (
                        <Box fontSize='12px' opacity={0.8} ml='2px'>
                            NA
                        </Box>
                    )}
                </Td>

                <Td flex={tdFlex[3]}>
                    {!UNAVALIABLE_REGIONS[region] || !!current[0] ? (
                        <>
                            <Cases>{numberWithCommas(current[0])}</Cases>
                            <Box fontSize='10px' opacity={0.6} ml='2px'>
                                명
                            </Box>
                            <DeltaTag color={currentColor} delta={current[1]} small showBg></DeltaTag>
                        </>
                    ) : (
                        <Row fontSize='11px' fontWeight={700}>
                            NA
                        </Row>
                    )}
                </Td>

                <Td end={true} flex={tdFlex[4]}>
                    {((guId == undefined && !UNAVALIABLE_REGIONS[region]) || (guId != undefined && !!lastUpdated)) && (
                        <>
                            <LastUpdatedTime isOld date={lastUpdated}></LastUpdatedTime>
                            <div style={{ width: "12px" }}></div>

                            {/* 
                            <Icon name='ChevronRight' size={20}></Icon> */}
                        </>
                    )}
                </Td>
            </Wrapper>
        </>
    );
};

const MemoDomesticRow = React.memo(DomesticRow, (prev, next) => {
    try {
        return (
            prev.even == next.even &&
            prev.lastUpdated == next.lastUpdated &&
            prev.data.total[0] == next.data.total[0] &&
            prev.data.total[1] == next.data.total[1] &&
            prev.data.current[0] == next.data.current[0] &&
            prev.data.current[1] == next.data.current[1]
        );
    } catch (err) {
        return false;
    }
});

export default MemoDomesticRow;
