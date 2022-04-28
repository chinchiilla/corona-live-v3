import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 16px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: -6px;
        top: -3px;
        border-radius: 50%;
        background-color: ${theme("darkGreyText")};
        -webkit-transition: 0.4s;
        transition: 0.4s;
        /* transform: translate(-50%, -50%); */
    }

    input:checked + .slider {
        background-color: ${theme("blue")};
    }

    input:focus + .slider {
        box-shadow: 0 0 1px ${theme("blue")};
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    }

    .slider.round:before {
    }

    ${ifProp(
        "small",
        css`
            .switch {
                width: 40px;
                height: 12px;
            }
            .slider:before {
                height: 18px;
                width: 18px;
                left: -6px;
                top: -3px;
            }
        `
    )}
`;

type Props = {
    onClick: any;
    checked: any;
    small?: boolean;
};

const Switch: React.FC<Props> = ({ onClick, checked, small }) => {
    return (
        <Wrapper small={small}>
            <label className='switch'>
                <input type='checkbox' checked={checked} onClick={onClick} />
                <span className='slider round'></span>
            </label>
        </Wrapper>
    );
};

export default Switch;
