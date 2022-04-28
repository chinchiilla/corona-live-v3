import React from "react";
import styled from "styled-components";

import { IMPORTANT_MESSAGE } from "@consts";

import { Col, Row } from "@components/Layout";
import Modal from "@components/Modal";
import Icon from "@components/Icon";
import Button from "@components/Button";
import SocialMedia from "../SocialMedia";

const Wrapper = styled(Col)`
  overflow-y: auto;
  overflow-x: hidden;
  p {
    text-align: center;
    h3 {
      font-weight: bold;
    }
    ol {
      padding-left: 1.8em;
    }
    margin-bottom: 10px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    word-break: keep-all;
    strong {
      font-weight: 500;
    }
    span {
      font-size: 10px;
      opacity: 0.6;
    }
    br {
      content: "";
      display: block;
      margin-top: 12px;
    }
  }
`;

const Popup = ({ show, onClose }) => {
  return (
    <Modal show={show} noHeader style={{ height: "initial" }} zIndex={10000000}>
      <Wrapper fadeInUp ai="center">
        <Row
          bg="#1a1f2c"
          borderRadius="10px"
          flexShrink={0}
          minHeight="110px"
          transform={"translateY(-20px)"}
        >
          <Icon height="150px" width="150px" name="LogoIcon" transform="translateY(-10px)"></Icon>
        </Row>
        <h3>코로나 라이브 이용시 유의사항</h3>
        <Row minHeight="10px"></Row>
        <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
        <SocialMedia></SocialMedia>

        <Button big onClick={onClose}>
          닫기
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default Popup;
