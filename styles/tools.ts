import CSS from "csstype";
export type CssType = keyof CSS.Properties;

const kebabToCamelCases = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const prop = (propKey: string) => (props) => {
  return props[propKey];
};

export const ifProp = (condition: object | string, css: any) => (props: any) => {
  let propKey = typeof condition == "object" ? Object.keys(condition)[0] : condition;
  if (props[propKey]) return css;
};

export const ifProps = (conditions: object, css: any) => (props) => {
  let valid = true;
  Object.keys(conditions).map((propKey) => {
    let propValue = conditions[propKey];
    if (props[propKey] != propValue) valid = false;
  });
  return valid ? css : "";
};

export const addIfProp = (cssType: CssType, propKey?: string) => (props) => {
  let value = props[propKey || cssType];
  if (!value) return ``;

  return `${kebabToCamelCases(cssType)}: ${value};`;
};
