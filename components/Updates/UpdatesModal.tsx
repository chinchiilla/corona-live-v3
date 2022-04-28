import styled, { css } from "styled-components";
import React, { useState, useEffect, useMemo, FC, useCallback } from "react";

import UpdatesRow from "@components/Updates/UpdatesRow";
import { Col, Row, Absolute } from "@components/Layout";
import Modal from "@components/Modal";
import Icon from "@components/Icon";
import CasesSummary from "@components/CasesSummary";

import { useTheme } from "@hooks/useTheme";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { CITY_IDS } from "@consts";
import { onEnter, ct, getCasesSummary } from "@utils";
import { CasesSummaryType } from "@types";

const SearchInput = styled(Row)`
    position: relative;
    width: 100%;
    height: 30px;

    margin-bottom: 10px;

    input {
        width: 100%;
        height: 100%;
        font-size: 14px;
        outline: none;
        border: none;
        border-radius: 8px;
        color: ${theme("darkGreyText")};
        background: ${theme("greyBg")};
        padding-left: 16px;
        padding-right: 10px;
        &::placeholder {
            color: ${theme("greyText")};
        }
    }
`;

const CategoryContainer = styled(Row)`
    align-items: center;
    overflow-x: scroll;
    margin-bottom: 6px;
    flex-shrink: 0;
`;

const CategoryBox = styled(Row)<{ active: boolean }>`
    padding: 6px 10px;
    border-radius: 6px;
    margin-right: 6px;
    margin-bottom: 8px;
    transition: 0.3s;
    background: ${theme("greyBg")};
    color: ${theme("greyText")};
    flex-shrink: 0;
    font-size: 12px;
    cursor: pointer;

    ${ifProp(
        "active",
        css`
            background: ${theme("blue")}20;
            color: ${theme("blue")};
        `
    )};
`;

const CategoryCount = styled(Row)`
    font-weight: bolder;
    padding-left: 4px;
`;

const Category = ({ cityId, name, onSearchKeyword, count, active }) => {
    const onClick = useCallback(() => onSearchKeyword(name), [name]);
    return (
        <CategoryBox key={cityId} onClick={onClick} active={active}>
            {name}
            <CategoryCount>{count || 0}건</CategoryCount>
        </CategoryBox>
    );
};

const MemoCategory = React.memo(Category, (prev, next) => prev.count === next.count && prev.active === next.active);

const Categories = ({ onSearchKeyword, keyword, ct, data }) => {
    const categoryCounts = useMemo(
        () =>
            data.reduce((obj, { city }) => {
                if (!obj[city]) obj[city] = 0;
                obj[city]++;
                return obj;
            }, {}),
        []
    );

    const sortedCityIds = useMemo(
        () => CITY_IDS.sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0)),
        []
    );

    return (
        <CategoryContainer fadeInUp delay={1}>
            <CategoryBox onClick={() => onSearchKeyword("")} active={keyword == ""}>
                전체
                <CategoryCount>{data.length}건</CategoryCount>
            </CategoryBox>

            {sortedCityIds.map((cityId) => {
                let name = ct(cityId) + " ";
                return (
                    <MemoCategory
                        key={name}
                        {...{
                            cityId,
                            name,
                            onSearchKeyword,
                            count: categoryCounts[cityId],
                            active: keyword == name,
                        }}
                    ></MemoCategory>
                );
            })}
        </CategoryContainer>
    );
};

interface Props {
    showModal: boolean;
    showCasesSummary?: boolean;
    showFilters?: boolean;

    data?: any;
    onClose: any;
    areaName?: string;
    hideSrc?: boolean;
}

export const UpdatesModal: FC<Props> = React.memo(
    ({ data, areaName, showCasesSummary, showFilters, onClose, showModal, hideSrc }) => {
        const _theme = useTheme();

        const [keyword, setKeyword] = useState("");
        const [filteredData, setData] = useState(data);
        const [filterOption, setFilterOption] = useState<"category" | "search">("category");

        const casesSummary = useMemo<CasesSummaryType>(() => getCasesSummary(data), [data]);

        useEffect(() => {
            onSearchKeyword(keyword);
        }, [data]);

        const onSearchKeyword = (newKeyword) => {
            setKeyword(newKeyword);
            const filtered = data.filter(({ gu, city }) => {
                return `${ct(city)} ${ct(city, gu)}`.indexOf(newKeyword) > -1;
            });
            setData(filtered);
        };

        const onToggle = () => {
            if (filterOption == "category") {
                setData([]);
                setFilterOption("search");
            } else {
                setData(data);
                setFilterOption("category");
            }
            setKeyword("");
        };

        const title = useMemo(() => `${areaName || ""} 실시간 확진 현황`, [areaName]);
        const actionIcon = useMemo(
            () => (filterOption == "search" ? { name: "Category", size: 18 } : { name: "Search", size: 14 }),
            [filterOption]
        );

        if (!filteredData) return <></>;

        return (
            <Modal
                show={showModal}
                onClose={onClose}
                title={title}
                transparentButton
                // actionIcon={actionIcon as any}
                // hideActionIcon={!showFilters}
                // onActionClick={onToggle}
                full
            >
                {/* {showCasesSummary && (
                    <>
                        <CasesSummary data={casesSummary}></CasesSummary>
                    </>
                )} */}
                {showFilters && (
                    <>
                        {filterOption == "category" && (
                            <Categories {...{ onSearchKeyword, keyword, ct, data }}></Categories>
                        )}
                        {/* {filterOption == "search" && (
                            <>
                                <SearchInput fadeInUp delay={1}>
                                    <Absolute right='18px' verticalCenter onClick={() => onSearchKeyword(keyword)}>
                                        <Icon name='Search' fill={_theme("darkGreyText")} size={14}></Icon>
                                    </Absolute>
                                    <input
                                        placeholder='지역 검색'
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyUp={onEnter((e) => onSearchKeyword(e.target.value))}
                                        value={keyword}
                                    ></input>
                                </SearchInput>
                                {!!filteredData.length && (
                                    <Row fontSize='10px' jc='center' mb='10px' fadeInUp>
                                        <Row opacity={0.8}>{"검색 결과"}</Row>
                                        <Row fontWeight={700} ml='2px'>{`${filteredData.length}개`}</Row>
                                    </Row>
                                )}
                            </>
                        )} */}
                    </>
                )}
                <Col flex={1} overflowY='auto' overflowX='hidden' fadeInUp delay={3}>
                    {filteredData.map((update, i) => (
                        <UpdatesRow fullWidth key={`${update.datetime}${i}`} data={update} hideSrc={true}></UpdatesRow>
                    ))}
                </Col>
            </Modal>
        );
    }
);

export default UpdatesModal;
