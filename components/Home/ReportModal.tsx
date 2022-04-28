import React, { useState, FC, useEffect, useCallback } from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import Button from "@components/Button";
import { Col, Row } from "@components/Layout";

import { theme } from "@styles/themes";
import { EMAIL_API, EMAIL, URL_REGEX, CITY_GU_NAMES, MINUTE } from "@consts";
import Spinner from "../Spinner";
import { useObjectState } from "@hooks/useObjectState";
import DropdownInput from "../DropdownInput";
import { useLocalStorage } from "@hooks/useLocalStorage";

const Wrapper = styled(Col)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  input,
  textarea {
    color: ${theme("darkGreyText")};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${theme("semigreyText")};
    }
  }
  textarea {
    font-size: 14px;
    border: none;
    padding: 10px 0px;
    background: transparent;
    border: none;
    flex: 1;
  }
  input {
    height: 40px;
    border: none;
    font-size: 14px;
    border-bottom: 1px solid ${theme("darkGreyText")}20;
    background: transparent;
    box-shadow: none;
    -webkit-border-radius: 0px;
    -webkit-appearance: none;
  }
  a {
    color: ${theme("darkGreyText")};
    margin-left: 2px;
  }
`;

interface Props {
  show: boolean;
  onClose: any;
  hideOverlay?: boolean;
  errorReport?: any;
}

const initialState = {
  message: "",
  email: "",
  src: "",
  cases: "",
  website: "",
};

const Report: FC<Props> = ({ show, onClose, errorReport }) => {
  const [isLoading, setisLoading] = useState(false);
  const [lastReport, setLastReport] = useLocalStorage("lastReportSubmit");

  const [{ email, title, cases, website }, setForm] = useObjectState({
    ...initialState,
    title: errorReport || "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setForm({ [name]: value });
  };

  useEffect(() => {
    if (show) {
      setisLoading(false);
      setForm({
        ...initialState,
        cases: "",
        title: errorReport || "",
      });
    }
  }, [show]);

  const onSumbit = async () => {
    if (isLoading) return;

    if (new Date().getTime() - lastReport < MINUTE * 5)
      return alert("제보는 5분 내에 한 번만 하실 수 있습니다");

    if (!errorReport) {
      if (title.trim().length == 0) return alert("지역을 적어주세요");
      if (!CITY_GU_NAMES.includes(title.trim())) return alert("유효한 지역을 적어주세요");
      if (website.trim().length > 0 && !website.match(URL_REGEX))
        return alert("링크란에는 링크만 적어주세요 (선택)");
    }

    if (cases.trim().length == 0) return alert("확진자수를 적어주세요");
    if (cases.match(/[^\d]/g)) return alert("확진자수 숫자만 적어주세요");

    setisLoading(true);

    await fetch(EMAIL_API, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content: `${cases}명 ${website}`, title }),
    });

    setLastReport(new Date().getTime());
    onClose();
  };

  const setDropdownValue = useCallback((value) => {
    setForm({ title: value });
  }, []);

  return (
    <Modal show={show} title={"제보하기"} onClose={onClose} dynamic zIndex={10000} portal>
      <Wrapper fadeInUp delay={1}>
        {!errorReport && (
          <>
            <DropdownInput
              name="title"
              onChange={onChange}
              value={title}
              placeholder={"지역"}
              setValue={setDropdownValue}
            ></DropdownInput>
            <input
              placeholder="링크 (선택)"
              value={website}
              onChange={onChange}
              name="website"
            ></input>
          </>
        )}
        <input placeholder="확진자수 (필수)" value={cases} onChange={onChange} name="cases"></input>
        <Row h="10px"></Row>
        <Col pt="10px" pb="20px">
          {!errorReport && (
            <>
              <Row textAlign="center" fontSize="11px" jc="center" mb="6px">
                오늘 발생하여도 어제 이미 집계로 확인된 확진자는 추가하지 않고 있습니다
              </Row>
            </>
          )}

          <Row textAlign="center" fontSize="11px" jc="center">
            개선사항이나 문의는 이메일로 보내주시기 바랍니다
          </Row>
          <Row textAlign="center" fontSize="11px" jc="center">
            <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
          </Row>
        </Col>
        <Button big onClick={onSumbit}>
          {isLoading ? (
            <Spinner size={20} color={"darkGreyText"} bg={"greyBg"}></Spinner>
          ) : (
            "제보하기"
          )}
        </Button>
      </Wrapper>
    </Modal>
  );
};

const MemoReport = React.memo(Report, (prev, next) => {
  return prev.errorReport === next.errorReport;
});

export default MemoReport;
