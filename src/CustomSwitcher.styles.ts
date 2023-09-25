import { createUseStyles } from 'react-jss';
import { CSSOverrides } from './CustomSwitcher.types';
import {
  DEFAULT_DIVISION_POINT_SIZE,
  DEFAULT_SWITCH_COLOR,
  DEFAULT_DIVISION_COLOR,
  DEFAULT_BORDER_SIZE,
  DEFAULT_DIVISION_LINE_HEIGHT,
} from './CustomSwitcher.constants';

type JSSProps = {
  containerWidth: number;
  switchSize: number;
  cssOverrides: CSSOverrides;
};

export default createUseStyles<string, JSSProps>(
  {
    root: {
      color: '#777',
    },

    container: {
      width: ({ containerWidth }) => containerWidth,
      height: ({ switchSize }) => switchSize,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '-webkit-tap-highlight-color': 'transparent',
      '-webkit-touch-callout': 'none',
      userSelect: 'none',
    },

    switch: ({ switchSize, cssOverrides }) => ({
      width: switchSize,
      height: switchSize,
      borderRadius: '50%',
      cursor: cssOverrides.cursorGrab ? cssOverrides.cursorGrab : 'grab',
      opacity: 1,
      transition: 'transform 100ms ease-in, border-color 0.4s, background-color 0.4s',
      pointerEvents: 'all',
      boxSizing: 'border-box',
    }),

    draggable: {
      position: 'absolute',
      zIndex: 1,
    },

    switchOverride: ({ cssOverrides }) => ({
      ...cssOverrides.switch,
    }),

    switchPrimary: {
      backgroundColor: DEFAULT_SWITCH_COLOR,
    },

    switchSecondary: {
      border: `5px solid ${DEFAULT_SWITCH_COLOR}`,
    },

    switchDisabledPrimary: {
      backgroundColor: DEFAULT_DIVISION_COLOR,
    },

    switchDisabledSecondary: {
      borderColor: DEFAULT_DIVISION_COLOR,
    },

    grabbing: ({ cssOverrides }) => ({
      cursor: cssOverrides.cursorGrabbing ? cssOverrides.cursorGrabbing : 'grabbing',
    }),

    transition: {
      transition: 'transform 100ms ease-out',
    },

    divisionsWrap: {
      position: 'absolute',
      width: ({ containerWidth, switchSize }) => containerWidth - switchSize,
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
      width: ({ switchSize }: { switchSize: number }) => switchSize,
      height: ({ switchSize }: { switchSize: number }) => switchSize,
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
      '&:after': {
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        position: 'absolute',
        content: '""',
        width: ({ switchSize }: { switchSize: number }) =>
          switchSize + Math.round(switchSize * 0.2),
        height: ({ switchSize }: { switchSize: number }) =>
          switchSize + Math.round(switchSize * 0.2),
      },
    },

    divisionPrimary: {
      borderRadius: '50%',
      backgroundColor: DEFAULT_DIVISION_COLOR,
      border: `${DEFAULT_BORDER_SIZE}px solid ${DEFAULT_DIVISION_COLOR}`,
    },

    divisionSecondary: {},

    divisionOverride: ({ cssOverrides }) => ({
      ...cssOverrides.division,
    }),

    divLine: {
      height: DEFAULT_DIVISION_LINE_HEIGHT,
      width: ({ containerWidth, switchSize }) => containerWidth - switchSize,
      borderRadius: DEFAULT_DIVISION_LINE_HEIGHT / 2,
      backgroundColor: DEFAULT_DIVISION_COLOR,
    },

    divLineSecondary: {
      backgroundColor: 'transparent',
    },

    divLineOverride: ({ cssOverrides }) => ({
      ...cssOverrides.divisionLine,
    }),

    label: {
      position: 'absolute',
      top: '150%',
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

    labelOverride: ({ cssOverrides }) => ({
      ...cssOverrides.label,
    }),

    defaultCursor: ({ cssOverrides }) => ({
      cursor: cssOverrides.cursorDisabled,
    }),

    disabledCursor: ({ cssOverrides }) => ({
      cursor: cssOverrides.cursorDisabled,
    }),

    defaultDisabledCursor: {
      cursor: 'default !important',
    },

    stopScrolling: {
      height: '100%',
      overflow: 'hidden',
    },
  },
  {
    name: 'CustomSwitcher',
  },
);
