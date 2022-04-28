import React, { Fragment, useRef } from "react";
import { theme, ThemeType } from "@styles/themes";
import styled, { css } from "styled-components";
import { Absolute, Row } from "@components/Layout";
import Icon from "@components/Icon";
import { ifProp } from "@styles/tools";
import { numberWithCommas } from "@utils";

const Wrapper = styled(Row)`
    background: ${theme("greyBg")};
    border: 1px solid ${theme("greyText")}50;
    padding: 8px 6px;
    align-items: center;
    border-radius: 4px;
    margin: 10px 0px;
    left: 0px;
    box-shadow: -1px 1px 16px -2px #0000001f;
    background: ${theme("shadow")};
    border: 0px;
`;

const SelectContainer = styled(Row)`
    position: relative;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 13px;
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: ${theme("darkGreyText")};
        outline: none;
        border: none;
        background: transparent;
        padding-right: 30px;
        font-weight: 700;
        z-index: 1;
        cursor: pointer;
    }
    svg {
        fill: ${theme("darkGreyText")};
    }
`;

const Info = styled(Row)<{ color: ThemeType; hideIcon: boolean }>`
    font-size: 12px;
    justify-content: center;
    display: flex;
    text-align: center;
    justify-content: center;
    color: ${(props) => theme(props.color)};
    padding: 0px 4px;
    display: flex;
    align-items: center;
    strong {
        font-weight: 700;
    }
    &:before {
        content: "";
        background: ${(props) => theme(props.color)};
        box-shadow: 0 0 0 4px ${(props) => theme(props.color)}50;
        display: flex;
        width: 6px;
        border-radius: 6px;
        height: 6px;
        margin-right: 10px;
        ${ifProp(
            "hideIcon",
            css`
                display: none;
            `
        )}
    }
`;

const Spacer = styled(Row)`
    width: 1px;
    height: 10px;
    background: ${theme("semigreyText")};
`;

type Props = {
    data: any;
    onOptionSelect?: any;
    options?: string[];
    selectedOption: any;
    optionName: any;
    flex?: any;
    showSpacer: boolean;
};

const FixedTooltip: React.FC<Props> = ({
    data,
    onOptionSelect,
    selectedOption,
    options,
    optionName,
    flex,
    showSpacer,
}) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    return (
        <Wrapper fadeInUp>
            <Row flex={flex || 1}>
                <SelectContainer>
                    <Absolute right='30px'>
                        <Icon onClick={() => selectRef!.current!.click()} name='ChevronDown'></Icon>
                    </Absolute>
                    <select ref={selectRef} value={selectedOption} onChange={(e) => onOptionSelect(e.target.value)}>
                        {options?.map((value, index) => {
                            return (
                                <option key={index} value={index}>
                                    {optionName(value)}
                                </option>
                            );
                        })}
                    </select>
                </SelectContainer>
            </Row>

            {data.map((info, i) => {
                const { color, name, value, unitName, hideIcon } = info;
                return (
                    <Fragment key={i}>
                        {(`${value}`.length <= 5 || showSpacer) && <Spacer></Spacer>}
                        <Info
                            color={color}
                            flex={flex || 1}
                            hideIcon={hideIcon}
                            style={{ fontSize: `${value}`.length > 5 ? "11px" : "12px" }}
                        >
                            {name}{" "}
                            <strong>
                                {" "}
                                &nbsp;{numberWithCommas(value) || 0}
                                {unitName == null ? "명" : unitName}
                            </strong>
                        </Info>
                    </Fragment>
                );
            })}
        </Wrapper>
    );
};

export default FixedTooltip;
