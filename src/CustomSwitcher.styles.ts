import { CSSOverrides } from './CustomSwitcher.types';
import {
  DEFAULT_DIVISION_POINT_SIZE,
  DEFAULT_SWITCH_COLOR,
  DEFAULT_DIVISION_COLOR,
  DEFAULT_BORDER_SIZE,
  DEFAULT_DIVISION_LINE_HEIGHT,
} from './CustomSwitcher.constants';
import { CSSProperties } from 'react';

export const styles = ({
  containerWidth,
  switchSize,
  cssOverrides,
}: {
  containerWidth: number;
  switchSize: number;
  cssOverrides: CSSOverrides;
}) =>
  ({
    root: {
      color: '#777',
    },

    container: {
      width: containerWidth,
      height: switchSize,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      userSelect: 'none',
    },

    switch: {
      width: switchSize,
      height: switchSize,
      borderRadius: '50%',
      cursor: cssOverrides.cursorGrab ? cssOverrides.cursorGrab : 'grab',
      opacity: 1,
      transition: 'all 0.4s',
      pointerEvents: 'all',
      boxSizing: 'border-box',
    },

    draggable: {
      position: 'absolute' as CSSProperties['position'],
      zIndex: 1,
    },

    switchOverride: {
      ...cssOverrides.switch,
    },

    switchPrimary: {
      backgroundColor: DEFAULT_SWITCH_COLOR,
    },

    switchSecondary: {
      border: `5px solid ${DEFAULT_SWITCH_COLOR}`,
    },

    switchDisabled: {
      ...cssOverrides.switchDisabled,
    },

    switchDisabledPrimary: {
      backgroundColor: DEFAULT_DIVISION_COLOR,
    },

    switchDisabledSecondary: {
      borderColor: DEFAULT_DIVISION_COLOR,
    },

    grabbing: {
      cursor: cssOverrides.cursorGrabbing ? cssOverrides.cursorGrabbing : 'grabbing',
    },

    transition: {
      transition: 'transform 200ms ease-out',
    },

    divisionsWrap: {
      position: 'absolute',
      width: containerWidth - switchSize,
      height: '100%',
      top: '50%',
      left: '50%',
      transform: 'translate3d(-50%,-50%,0)',
      display: 'flex',
      alignItems: 'center',
    },

    divWrap: {
      position: 'absolute',
      top: '50%',
      width: switchSize,
      height: switchSize,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    division: {
      boxSizing: 'border-box',
      position: 'absolute',
      width: DEFAULT_DIVISION_POINT_SIZE,
      height: DEFAULT_DIVISION_POINT_SIZE,
      cursor: 'pointer',
    },

    divisionPrimary: {
      borderRadius: '50%',
      backgroundColor: DEFAULT_DIVISION_COLOR,
      border: `${DEFAULT_BORDER_SIZE}px solid ${DEFAULT_DIVISION_COLOR}`,
    },

    divisionSecondary: {},

    divisionOverride: {
      ...cssOverrides.division,
    },

    divLine: {
      height: DEFAULT_DIVISION_LINE_HEIGHT,
      width: containerWidth - switchSize,
      borderRadius: DEFAULT_DIVISION_LINE_HEIGHT / 2,
      backgroundColor: DEFAULT_DIVISION_COLOR,
    },

    divLineSecondary: {
      backgroundColor: 'transparent',
    },

    divLineOverride: {
      ...cssOverrides.divisionLine,
    },

    label: {
      position: 'absolute',
      cursor: 'pointer',
    },

    labelPrimary: {
      top: '130%',
      fontSize: 13,
    },

    labelSecondary: {
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 14,
    },

    labelDisabled: {
      opacity: 0.6,
    },

    labelOverride: {
      ...cssOverrides.label,
    },

    defaultCursor: {
      cursor: cssOverrides.cursorDefault ? cssOverrides.cursorDefault : 'pointer',
    },

    disabledCursor: {
      cursor: cssOverrides.cursorDisabled,
    },

    defaultDisabledCursor: {
      cursor: 'default !important',
    },

    stopScrolling: {
      height: '100%',
      overflow: 'hidden',
    },
  }) as Record<string, CSSProperties>;
