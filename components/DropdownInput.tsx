import { CITY_GU_NAMES } from "@consts";
import { theme } from "@styles/themes";
import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "./Layout";

const Wrapper = styled(Col)`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  min-height: 40px;
  border: 1px solid #eee;
  border-radius: 0px;
  width: 100%;
`;

const Dropdown = styled(Col)`
  position: absolute;
  top: 100%;
  width: 100%;
  background: ${theme("greyBg")};
  max-height: 180px;
  overflow-y: scroll;
`;
const DropdownItem = styled(Row)`
  padding: 0px 10px;
  font-size: 12px;
  min-height: 40px;
  line-height: 40px;
  color: ${theme("greyText")};
`;

type Props = {
  setValue: any;
  name: string;
  onChange: any;
  value: string;
  placeholder: string;
};

const DropdownInput: React.FC<Props> = ({ setValue, ...inputProps }) => {
  const [dropdownItems, setDropdownItems] = useState([]);

  const onKeyUp = (e) => {
    const { value } = e.target;
    if (!!value && value.length > 0) {
      setDropdownItems(CITY_GU_NAMES.filter((cityName) => cityName.indexOf(value) > -1) as any);
    } else {
      setDropdownItems([]);
    }
  };

  return (
    <Wrapper>
      <Input {...inputProps} onKeyUp={onKeyUp}></Input>
      <Dropdown>
        {dropdownItems.map((item) => (
          <DropdownItem
            onClick={() => {
              setValue(item);
              setDropdownItems([]);
            }}
          >
            {item}
          </DropdownItem>
        ))}
      </Dropdown>
    </Wrapper>
  );
};

export default DropdownInput;
