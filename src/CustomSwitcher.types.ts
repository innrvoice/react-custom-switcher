import { CSSProperties } from 'react';

export type CustomSwitcherOption = {
  value: string;
  label?: string | React.ReactElement;
  color?: string;
};

export type CustomSwitcherVariant = 'primary' | 'secondary';

export type CSSOverrides = {
  cursorDefault?: CSSProperties['cursor'];
  cursorGrab?: CSSProperties['cursor'];
  cursorGrabbing?: CSSProperties['cursor'];
  cursorDisabled?: CSSProperties['cursor'];
  switch?: CSSProperties;
  division?: CSSProperties;
  divisionLine?: CSSProperties;
  label?: CSSProperties;
};

export interface ICustomSwitcherProps {
  options: CustomSwitcherOption[];
  value: string;
  containerWidth: number;
  variant?: CustomSwitcherVariant;
  switchSize?: number;
  dragEnabled?: boolean;
  disabled?: boolean;
  scaleWhileDrag?: boolean | number;
  cssOverrides?: CSSOverrides;
  callback(currentValue: string): unknown;
}
