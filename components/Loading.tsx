import { theme } from "@styles/themes";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    @keyframes spinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .spinner5 div {
        border: 0.2rem solid ${theme("loading")};
        width: 2rem;
        height: 2rem;
        border-top-color: ${theme("bg")};
        border-right-color: ${theme("bg")};
        border-radius: 50%;
        animation: spinner 1s linear 0s infinite;
    }
`;

type Props = {};

const Loading: React.FC<Props> = ({}) => {
    return (
        <Wrapper>
            <div class='spinner5'>
                <div></div>
            </div>
        </Wrapper>
    );
};

export default Loading;
