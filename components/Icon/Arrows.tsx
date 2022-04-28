import React from "react";
import { Box, Flex } from "@components/Layout";

const ArrowLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H6m6-7l-7 7 7 7"></path>
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <Flex transform={"rotate(180deg)"} m="0px">
      <ArrowLeft></ArrowLeft>
    </Flex>
  );
};

const ArrowUp = () => {
  return (
    <Flex transform={"rotate(90deg)"} m="0px">
      <ArrowLeft></ArrowLeft>
    </Flex>
  );
};

const ArrowDown = () => {
  return (
    <Flex transform={"rotate(-90deg)"} m="0px">
      <ArrowLeft></ArrowLeft>
    </Flex>
  );
};

export default {
  ArrowLeft: React.memo(ArrowLeft),
  ArrowRight: React.memo(ArrowRight),
  ArrowUp: React.memo(ArrowUp),
  ArrowDown: React.memo(ArrowDown),
};
