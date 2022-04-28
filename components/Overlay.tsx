import { Row } from "./Layout";
import styled from "styled-components";
import { addIfProp } from "@styles/tools";

const Overlay = styled(Row)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000000ad;
  z-index: 999;
  ${addIfProp("zIndex")};
`;

export default Overlay;
