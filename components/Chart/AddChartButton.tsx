import { Row } from "@components/Layout";
import { media } from "@styles/media";
import { theme } from "@styles/themes";
import styled from "styled-components";

const AddChartButton = styled(Row)`
    /* background: ${theme("greyBg")}; */
    justify-content: center;
    align-items: center;
    width: fit-content;
    /* border-radius: 8px; */
    border-radius: 50px;
    margin: 0px auto;
    margin-bottom: 2px;
    /* width: 100%; */
    padding: 10px 24px;
    padding-left: 18px;
    /* margin: 12px auto; */
    /* margin-top: 14px; */
    /* border: 1px solid ${theme("lightGreyText")}60; */

    /* 
    border: 1px solid ${theme("lightGreyText")}80; */
    background: ${theme("bg")}CC;
    /* box-shadow: -1px 1px 4px #00000015; */
    font-size: 14px;
    /* border: none; */

    cursor: pointer;
    strong {
        font-weight: bold;
        margin-right: 2px;
    }
    width: 100%;
    font-size: 14px;
    margin: 0px;
    padding: 8px 0px;

    /* border: 0px; */

    ${media.phablet} {
        /* width: 100%;
        font-size: 12px;
        margin: 0px;
        padding: 6px 0px;
        border: 0px; */
        margin: auto;
        width: fit-content;
        font-size: 12px;
        padding: 14px 0px;
        padding: 6px 0px;
        border-radius: 0px;
        border: none;
        padding: 8px 14px;
        border-radius: 20px;
        border: 1px solid ${theme("sectionBorder")};
        border: 1px solid ${theme("darkGreyText")}30;
        box-shadow: -1px 1px 6px #00000006;
        margin-top: 12px;
        margin-bottom: 8px;
    }
`;

export default AddChartButton;
