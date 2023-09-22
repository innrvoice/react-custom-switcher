import { CustomSwitcherVariant } from './CustomSwitcher.types';
import {
  DEFAULT_DIVISION_COLOR,
  DEFAULT_SCALE_WHILE_DRAG,
  DEFAULT_SWITCH_COLOR,
} from './CustomSwitcher.constants';

export const determineScale = (scale: boolean | number) => {
  if (typeof scale === 'number') {
    return scale;
  } else if (typeof scale === 'boolean' && scale) {
    return DEFAULT_SCALE_WHILE_DRAG;
  }
  return 1;
};

export const determineSwitchSize = (size: number | undefined, variant: CustomSwitcherVariant) => {
  if (!size) {
    if (variant === 'secondary') {
      return 46;
    } else {
      return 36;
    }
  }
  return size;
};

export const determineColor = (color: string | undefined, disabled: boolean) => {
  if (disabled) {
    return DEFAULT_DIVISION_COLOR;
  } else if (!color) {
    return DEFAULT_SWITCH_COLOR;
  }
  return color;
};
