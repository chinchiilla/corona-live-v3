import MemoIcon from "@components/Icon";
import { IconBox } from "@components/IconBox";
import { Col, Row } from "@components/Layout";
import { useTheme } from "@hooks/useTheme";
import { theme } from "@styles/themes";
import { ifProp, prop } from "@styles/tools";
import { BLUE, BLUE_OPACITY } from "@utils/constsV2";
import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled(Col)<{ isExpanded: boolean; shrink?: boolean }>`
    /* padding: 0px 12px; */
    padding-left: 12px;
    overflow-x: auto;
    overflow-y: visible;
    height: fit-content;
    position: absolute;
    top: 0px;
    padding-bottom: 20px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    z-index: 100;
    &::-webkit-scrollbar {
        display: none;
    }
    ${(props) =>
        props.isExpanded &&
        css`
            position: static;
        `}

    ${(props) =>
        props.shrink &&
        css`
            width: calc(100% - 70px);
            /* &:before {
                content: "";
                position: absolute;
                right: -12px;
                height: 40px;
                box-shadow: 10px 0px 20px 0px ${theme("blue")}10;
                width: 10px;
                background: white;
                z-index: 10000;
            } */
        `}
`;

const CategoriesContainer = styled.div<{ isExpanded: boolean }>`
    display: flex;
    flex-direction: row;
    flex-wrap: false;
    & > div {
        flex-shrink: 0;
    }
    flex-direction: ${(props) => (props.isExpanded ? "column" : "row")};
`;

const CHART_OPTIONS_NAME = {
    type: "종류",
    area: "지역",
    range: "기간",
    testType: "검사",
    compare: "비교",
};

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* overflow-y: visible; */
    margin-top: 8px;
    justify-content: flex-start;
`;

const CategoryName = styled.div`
    display: flex;
    flex-shrink: 0;
    opacity: 0.4;
    padding: 6px 20px;
`;

const CategoryBox = styled.div`
    display: flex;
    flex-shrink: 0;
    margin-right: 4px;
    padding: 8px 20px;
    border-radius: 30px;
    /* border-radius: 8px; */
    font-size: 14px;
    cursor: pointer;
    color: ${theme("greyText")};
    /* border: 1px solid ${theme("greyText")}50; */
    transition: 0.3s;

    ${({ selected }) =>
        selected &&
        css`
            background: ${theme("blueBg")};
            /* background: ${theme("greyBg")}; */
            /* border: 1px solid ${theme("blue")}50; */
            font-weight: 500;
            color: ${theme("blue")};
            /* color: ${theme("semiDarkGreyText")}; */
        `}
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;
const SelectBox = styled.div<{ main?: boolean }>`
    display: flex;
    position: relative;
    /* background: ${theme("greyBg")}90; */
    border: 1px solid ${theme("lightGreyText")}90;
    /* border-radius: 12px; */
    border-radius: 30px;
    padding: 8px 16px;
    padding-right: 6px;
    flex-direction: row;
    margin-top: 8px;
    margin-right: 8px;
    font-weight: 500;
    cursor: pointer;

    ${ifProp(
        "main",
        css`
            /* background: ${theme("greyBg")}90;
            border: 1px solid ${theme("darkGreyText")}50; */

            /* border: 1px solid ${theme("blue")}50;
            background: ${theme("blueBg")}BB; */

            border: 1px solid ${prop("main")}BB;
            background: ${prop("main")}10;
            & > div:first-of-type {
                /* color: ${theme("blue")}; */
                color: ${prop("main")};

                font-weight: bold;
            }
        `
    )}
`;
const SelectModal = styled.div`
    position: absolute;
    top: 36px;
    right: 0px;
    width: 100%;
    box-sizing: border-box;
    background: ${theme("navBarShadow")};
    border: 1px solid ${theme("lightGreyText")}30;
    z-index: 2;
    border-radius: 8px;
    box-shadow: -1px 1px 12px #00000011;
    max-height: 300px;
    overflow-y: auto;
`;
const SelectActive = styled.div`
    /* font-weight: 500; */
    font-size: 12px;
    margin-right: 2px;
`;
const SelectName = styled.div`
    opacity: 0.6;
    margin-right: 4px;
    font-size: 12px;
`;
const SelectElement = styled.div`
    padding: 12px 12px;
    opacity: 1;
    font-size: 12px;
    cursor: pointer;

    background: white;
    background: ${theme("bg")};

    transition: 0.3s;
    color: ${theme("greyText")};

    :hover {
        background: ${theme("greyBg")};
    }
    ${(props) =>
        props.selected &&
        css`
            color: ${theme("darkGreyText")};
            background: #eee;
            background: ${theme("greyBg")};
            font-weight: 500;
        `}
`;

const Overlay = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    background: transparent;
    z-index: 1;
`;

const SelectButton = styled(Row)`
    display: flex;
    align-items: center;
    svg {
        stroke-width: 2px;
    }
`;

const meetsCondition = (conditions, type, chartOptions) => {
    return Object.keys(conditions).every((checkingOption) => {
        if (type == "equal") {
            return conditions[checkingOption] == chartOptions[checkingOption];
        } else {
            return conditions[checkingOption] != chartOptions[checkingOption];
        }
    });
};

const containsOption = (options, checkingOptionValue) => {
    return options.some((a) => a.value === checkingOptionValue);
};

const assignOption = (overrideOption, prevOption, optionValues) => {
    if (overrideOption) {
        return overrideOption;
    } else if (containsOption(optionValues, prevOption)) {
        return prevOption;
    } else {
        return optionValues[0].value;
    }
};

const getChartOptions = (previewOptions, overrideOptions = {}, prevOptions) => {
    return Object.keys(previewOptions).reduce((obj, optionName) => {
        if (optionName !== "conditional") {
            obj[optionName] = assignOption(overrideOptions[optionName], prevOptions[optionName], previewOptions[optionName]);
        } else {
            previewOptions["conditional"].map(({ type, conditions, optionsLists }) => {
                if (meetsCondition(conditions, type, obj)) {
                    Object.keys(optionsLists).map((optionName) => {
                        obj[optionName] = assignOption(overrideOptions[optionName], prevOptions[optionName], optionsLists[optionName]);
                    });
                }
            });
        }
        return obj;
    }, {});
};

const Select = ({ selected, onClick, currentValue, options, name, main, mainColor }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Col>
            <SelectContainer>
                <SelectBox main={main ? mainColor : null}>
                    <SelectButton onClick={() => setShowModal(true)}>
                        <SelectName>{name}</SelectName>
                        <SelectActive style={{ fontSize: selected?.length > 4 ? "12px" : "12px" }}>{selected}</SelectActive>
                        <MemoIcon name='ChevronDown'></MemoIcon>
                        {/* <SelectArrow>&#8595;</SelectArrow> */}
                    </SelectButton>

                    {showModal && (
                        <>
                            <Overlay onClick={() => setShowModal(false)}></Overlay>

                            <SelectModal>
                                {options.map(({ value, name }, j) => {
                                    return (
                                        <SelectElement
                                            key={j}
                                            selected={currentValue == value}
                                            onClick={(e) => {
                                                onClick(value);
                                                setShowModal(false);
                                            }}
                                        >
                                            {name}
                                        </SelectElement>
                                    );
                                })}
                            </SelectModal>
                        </>
                    )}
                </SelectBox>
            </SelectContainer>
            {showModal && (
                <>
                    <SelectModal style={{ position: "static", visibility: "hidden" }}>
                        {options.map(({ value, name }, j) => {
                            return (
                                <SelectElement
                                    key={j}
                                    selected={currentValue == value}
                                    onClick={(e) => {
                                        onClick(value);
                                        setShowModal(false);
                                    }}
                                >
                                    {name}
                                </SelectElement>
                            );
                        })}
                    </SelectModal>
                </>
            )}
        </Col>
    );
};

function ChartCategories({
    mainOption,
    setMainOptions,
    chartOptions,
    setChartOptions,
    CHART_OPTIONS,
    MAIN_OPTIONS,
    deleteChart,
    onAddNewChart,
    mainColor,
    // onChange,
}) {
    const _theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const onMainOptionChange = (newMainOption) => {
        setChartOptions((prevOptions) => ({ ...getChartOptions(CHART_OPTIONS[newMainOption], {}, prevOptions) }));
        setMainOptions(newMainOption);
        // onChange();
    };

    const onOptionChange = (optionType, newOption) => {
        setChartOptions((prevOptions) => getChartOptions(CHART_OPTIONS[mainOption], { [optionType]: newOption }, prevOptions));
        // onChange();
    };

    const renderSubOptions = useCallback(() => {
        return Object.keys(CHART_OPTIONS[mainOption]).map((optionType, i) => {
            if (optionType != "conditional") {
                return (
                    <>
                        {isExpanded ? (
                            <CategoryContainer key={i}>
                                <CategoryName>{CHART_OPTIONS_NAME[optionType]}</CategoryName>

                                {CHART_OPTIONS[mainOption][optionType].map(({ value, name }, j) => {
                                    return (
                                        <CategoryBox key={j} selected={value == chartOptions[optionType]} onClick={() => onOptionChange(optionType, value)}>
                                            {name}
                                        </CategoryBox>
                                    );
                                })}
                            </CategoryContainer>
                        ) : (
                            <Select
                                {...{
                                    selected: CHART_OPTIONS[mainOption][optionType].find((a) => a.value === chartOptions[optionType]).name,
                                    onClick: (value) => onOptionChange(optionType, value),
                                    currentValue: chartOptions[optionType],
                                    options: CHART_OPTIONS[mainOption][optionType],
                                    name: CHART_OPTIONS_NAME[optionType],
                                }}
                            ></Select>
                        )}
                    </>
                );
            } else {
                return CHART_OPTIONS[mainOption]["conditional"].map(({ type, conditions, optionsLists }) => {
                    if (meetsCondition(conditions, type, chartOptions)) {
                        return Object.keys(optionsLists).map((optionName, i) => {
                            return (
                                <>
                                    {isExpanded ? (
                                        <CategoryContainer key={i}>
                                            <CategoryName>{CHART_OPTIONS_NAME[optionName]}</CategoryName>
                                            {optionsLists[optionName].map(({ value, name }, j) => {
                                                return (
                                                    <CategoryBox
                                                        key={j}
                                                        selected={value == chartOptions[optionName]}
                                                        onClick={() => onOptionChange(optionName, value)}
                                                    >
                                                        {name}
                                                    </CategoryBox>
                                                );
                                            })}
                                        </CategoryContainer>
                                    ) : (
                                        <Select
                                            {...{
                                                selected: optionsLists[optionName].find((a) => a.value === chartOptions[optionName]).name,
                                                onClick: (value) => onOptionChange(optionName, value),
                                                currentValue: chartOptions[optionName],
                                                options: optionsLists[optionName],
                                                name: CHART_OPTIONS_NAME[optionName],
                                            }}
                                        ></Select>
                                    )}
                                </>
                            );
                        });
                    }
                });
            }
        });
    }, [chartOptions]);

    return (
        <>
            <Wrapper isExpanded={isExpanded} shrink={!!deleteChart || !!onAddNewChart}>
                {/* <CategoryContainer>
                {MAIN_OPTIONS.map(({ value, name }, i) => {
                    return (
                        <CategoryBox key={i} selected={value == mainOption} onClick={() => onMainOptionChange(value)}>
                            {name}
                        </CategoryBox>
                    );
                })}
            </CategoryContainer> */}

                <CategoriesContainer isExpanded={isExpanded}>
                    <Select
                        {...{
                            selected: MAIN_OPTIONS.find((a) => a.value === mainOption)?.name,
                            onClick: (value) => onMainOptionChange(value),
                            currentValue: mainOption,
                            options: MAIN_OPTIONS,
                            name: "",
                            main: true,
                            mainColor,
                        }}
                    ></Select>
                    {renderSubOptions()}
                </CategoriesContainer>
            </Wrapper>
            {deleteChart && (
                <DeleteContainer onClick={deleteChart}>
                    <MemoIcon name='X' size={24} stroke={_theme("darkGreyText")}></MemoIcon>
                </DeleteContainer>
            )}
            {/* 
            <DeleteContainer onClick={() => setIsExpanded((a) => !a)}>
                <MemoIcon name='Category' size={20} stroke={_theme("darkGreyText")}></MemoIcon>
            </DeleteContainer> */}
        </>
    );
}
const DeleteContainer = styled(Row)`
    position: absolute;
    right: 0px;
    top: 11px;
    border-left: 1px solid ${theme("darkGreyText")}20;
    /* padding-left: 10px; */
    padding: 2px 12px;
    z-index: 1000;
`;

export default ChartCategories;
