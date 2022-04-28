import React from "react";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import styled, { css } from "styled-components";
import { Row } from "./Layout";
import Icon from "./Icon";
import { ToggleOptionType } from "@types";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";

const Wrapper = styled(Row)<{ shadow?: boolean; full?: boolean }>`
    border-radius: 12px;
    /* border: 1px solid ${theme("lightGreyText")}80; */
    z-index: 1;
    ${ifProp(
        "shadow",
        css`
            background: ${theme("navBarShadow")};
            background: ${theme("greyBg")}50;

            background: ${theme("greyBg")};
            border: none;

            /* box-shadow: -1px 1px 8px #00000015; */
        `
    )};

    ${ifProp(
        "full",
        css`
            width: 100%;
            & > div {
                flex: 1;
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
    shadow?: boolean;
    layoutId?: string;
}
const SelectedNavbarItem = styled(motion.div)<{ shadow?: boolean }>`
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    z-index: 0;
    /* border-radius: 12px; */
    border-radius: 50px;
    border-radius: 12px;

    padding: 8px 22px;

    font-weight: bold;
    color: ${theme("blue")};
    background: ${theme("blueBg")};
    border: 1px solid ${theme("blue")}90;

    ${ifProp(
        "shadow",
        css`
            border: none;
            box-shadow: -1px 1px 14px #00000016;
            font-weight: bold;
            background: ${theme("blueBg")};
            background: ${theme("navBarShadow")};
            border: 1px solid ${theme("sectionBorder")};
        `
    )}
`;

const NavbarItem = styled.div<{ selected?: boolean; small?: boolean; shadow?: boolean }>`
    display: flex;
    margin-left: -1px;
    margin-right: -1px;
    z-index: 1;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    /* border-radius: 12px; */
    border-radius: 50px;
    border-radius: 12px;

    color: ${theme("greyText")};
    padding: 10px 22px;

    cursor: pointer;

    span {
        margin-left: 4px;
    }
    svg {
        fill: ${theme("greyText")};
    }

    ${ifProp(
        "small",
        css`
            padding: 8px 14px;
            font-size: 12px;
        `
    )};

    ${ifProp(
        "selected",
        css`
            font-weight: bold;
            color: ${theme("blue")};

            svg {
                fill: ${theme("blue")};
            }

            ${ifProp(
                "shadow",
                css`
                    border: none;
                    font-weight: bold;
                    color: ${theme("blue")};
                    color: ${theme("darkGreyText")};
                    svg {
                        fill: ${theme("blue")};
                        fill: ${theme("darkGreyText")};
                    }
                `
            )}
        `
    )}
    span {
        z-index: 1;
    }
    svg {
        z-index: 1;
    }
`;

const ToggleButtons: React.FC<Props> = ({ small, options, setOption, activeOption, shadow, full, layoutId }) => {
    return (
        <Wrapper shadow={shadow} full={full}>
            <AnimateSharedLayout>
                {options.map((option) => {
                    let { visible = true } = option;
                    if (!visible) return <></>;
                    return (
                        <NavbarItem
                            shadow={shadow}
                            small={small}
                            onClick={() => setOption(option.value)}
                            selected={activeOption == option.value}
                            className='radio-toggle'
                        >
                            {option.icon && <Icon name={option.icon} size={12}></Icon>}

                            <span style={{ fontSize: option.name.length > 5 ? "11px" : "13px" }}>{option.name}</span>
                            {activeOption == option.value && (
                                <SelectedNavbarItem
                                    layoutId={layoutId || "option-active"}
                                    shadow={shadow}
                                ></SelectedNavbarItem>
                            )}
                        </NavbarItem>
                    );
                })}
            </AnimateSharedLayout>
        </Wrapper>
    );
};

const MemoToggleButtons = React.memo(ToggleButtons, (prev, next) => {
    return prev.activeOption === next.activeOption;
});

export default MemoToggleButtons;
