import React, { useCallback } from "react";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import styled, { css } from "styled-components";
import { Row } from "../Layout";
import Icon from "@components/Icon";
import { ToggleOptionType } from "./types";

const Button = styled(Row)<{ active: boolean; noBg?: boolean; small?: boolean }>`
    font-size: 12px;
    padding: 6px 14px;
    background: ${theme("greyBg")};
    color: ${theme("greyText")};
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
        fill: ${theme("greyText")};
    }
    &:not(:first-child) {
        border-left: 0px;
    }
    &:not(:last-child) {
        border-right: 1px solid ${theme("lightGreyText")}90;
    }
    &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }
    &:first-child {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }
    ${ifProp(
        "noBg",
        css`
            border: 1px solid ${theme("greyText")}30;
            background: transparent;
            background: ${theme("bg")};
        `
    )};
    ${ifProp(
        "small",
        css`
            font-size: 12px;
            padding: 2px 8px;
        `
    )};

    ${ifProp(
        "active",
        css`
            font-weight: bold;
            background: ${theme("blueBg")};
            color: ${theme("blue")};
            svg {
                fill: ${theme("blue")};
            }
            ${ifProp(
                "noBg",
                css`
                    border: 1px solid ${theme("blue")}30!important;
                `
            )};
        `
    )};
`;

const Wrapper = styled(Row)<{ divider?: boolean }>`
    ${ifProp(
        "divider",
        css`
            position: relative;
            width: 100%;
            justify-content: center;
            align-items: center;

            &:before,
            &:after {
                content: "";
                display: flex;
                flex: 1;
                height: 1px;
                background: ${theme("greyText")}30;
                z-index: -100;
            }
        `
    )};
`;

interface Props {
    options: ToggleOptionType[];
    setOption: any;
    activeOption: any;
    noBg?: boolean;
    small?: boolean;
    divider?: boolean;
}

const ToggleButton = ({ noBg, activeOption, small, option, setOption }) => {
    let { name, value, icon } = option;

    const onClick = useCallback(() => {
        setOption(value);
    }, [value]);

    return (
        <Button noBg={noBg} active={activeOption == value} onClick={onClick} small={small}>
            {icon && (
                <>
                    <Icon name={icon} size={12}></Icon>
                    <Row w='4px'></Row>
                </>
            )}
            <Row>{name}</Row>
        </Button>
    );
};

const MemoToggleButton = React.memo(ToggleButton, (prev, next) => {
    return (prev.option.value === prev.activeOption) === (next.option.value === next.activeOption);
});

const ToggleButtons: React.FC<Props> = ({ options, setOption, activeOption, noBg, small, divider }) => {
    return (
        <Wrapper divider={divider}>
            {options.map((option) => {
                let { visible = true } = option;
                if (!visible) return <></>;
                return (
                    <MemoToggleButton
                        key={option.name}
                        {...{ noBg, activeOption, small, setOption, option }}
                    ></MemoToggleButton>
                );
            })}
        </Wrapper>
    );
};

const MemoToggleButtons = React.memo(ToggleButtons, (prev, next) => {
    return prev.activeOption === next.activeOption;
});

export default MemoToggleButtons;
