import styled, { css } from "styled-components";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";

interface ButtonProps {
  light?: boolean;
  white?: boolean;
  blue?: boolean;
  primary?: boolean;
  big?: boolean;
  small?: boolean;
  full?: boolean;
  icon?: boolean;
  square?: boolean;
  transparent?: boolean;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;

  width: 72px;
  min-height: 40px;

  color: ${theme("darkGreyText")};
  background: ${theme("greyBg")};
  cursor: pointer;

  ${ifProp(
    "light",
    css`
      border: 1px solid ${theme("lightGreyText")};
      background: transparent;
    `
  )}

  ${ifProp(
    "white",
    css`
      background: transparent;
    `
  )}

  ${ifProp(
    "blue",
    css`
      background: ${theme("blueBg")};
      color: ${theme("blue")};
    `
  )}


  ${ifProp(
    "big",
    css`
      height: 40px;
      width: 100%;
      font-size: 14px;
    `
  )}



  ${ifProp(
    "full",
    css`
      width: 100%;
    `
  )}

  ${ifProp(
    "icon",
    css`
      width: 60px;
      height: 32px;
      svg {
        transition: 0.3s;
        :hover {
          transform: scale(0.9);
        }
      }
    `
  )}

  ${ifProp(
    "square",
    css`
      width: 40px;
      height: 40px;
      padding: 0px;
    `
  )}

${ifProp(
    "transparent",
    css`
      background: transparent;
    `
  )}

${ifProp(
    "small",
    css`
      min-height: 30px;
      height: 30px;
      width: 100%;
      font-size: 12px;
    `
  )}
`;

export default Button;
