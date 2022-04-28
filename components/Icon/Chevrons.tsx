import React from "react";
import { Row } from "@components/Layout";

const ChevronLeft = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1'
            className='feather feather-chevron-left'
            viewBox='0 0 24 24'
        >
            <path d='M15 18L9 12 15 6'></path>
        </svg>
    );
};

const ChevronRight = () => {
    return (
        <Row transform={"rotate(180deg)"}>
            <ChevronLeft></ChevronLeft>
        </Row>
    );
};

const ChevronUp = () => {
    return (
        <Row transform={"rotate(90deg)"}>
            <ChevronLeft></ChevronLeft>
        </Row>
    );
};

const ChevronDown = () => {
    return (
        <Row transform={"rotate(-90deg)"}>
            <ChevronLeft></ChevronLeft>
        </Row>
    );
};

export default {
    ChevronLeft: React.memo(ChevronLeft),
    ChevronRight: React.memo(ChevronRight),
    ChevronUp: React.memo(ChevronUp),
    ChevronDown: React.memo(ChevronDown),
};
