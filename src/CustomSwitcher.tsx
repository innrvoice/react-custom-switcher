import React from 'react';
import { DEFAULT_SCALE_WHILE_DRAG } from './CustomSwitcher.constants';
import { styles } from './CustomSwitcher.styles';
import {
  determineColor,
  determineScale,
  determineSwitchSize,
  checkIfMobileOrTablet,
  applyConstraints,
  enableScroll,
  disableScroll,
} from './CustomSwitcher.utils';
import { CustomSwitcherOption, ICustomSwitcherProps } from './CustomSwitcher.types';

const warningMessages = new Set<string>();

const warnOnce = (message: string) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof console !== 'undefined' &&
    !warningMessages.has(message)
  ) {
    warningMessages.add(message);
    console.warn(message);
  }
};

export const CustomSwitcher: React.FC<ICustomSwitcherProps> = ({
  options,
  value,
  containerWidth,
  variant = 'primary',
  switchSize,
  dragEnabled = true,
  scaleWhileDrag = DEFAULT_SCALE_WHILE_DRAG,
  disabled = false,
  cssOverrides = {},
  callback,
}) => {
  const actualSwitchSize = React.useMemo(
    () => determineSwitchSize(switchSize, variant),
    [switchSize, variant],
  );
  const canUseDOM = typeof document !== 'undefined';
  const isMobileOrTablet = React.useMemo(() => checkIfMobileOrTablet(), []);
  const hasEnoughOptions = options.length >= 2;
  const hasOptions = options.length > 0;

  const switcherStyles = React.useMemo(
    () => styles({ containerWidth, switchSize: actualSwitchSize, cssOverrides }),
    [containerWidth, actualSwitchSize, cssOverrides],
  );

  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const draggableRef = React.useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = React.useState(value);
  const [transitionEnabled, setTransitionEnabled] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const [initialXCoord, setInitialXCoord] = React.useState<number | undefined>();
  const [translate, setTranslate] = React.useState(0);
  const [initialPosition, setInitialPosition] = React.useState(0);

  const [selectBodyStyles, setSelectBodyStyles] = React.useState({
    height: '',
    overflow: '',
  });

  const DIVISION_LENGTH = hasEnoughOptions
    ? (containerWidth - actualSwitchSize) / (options.length - 1)
    : 0;

  const clampDivision = React.useCallback(
    (division: number) => {
      if (!hasOptions) {
        return 0;
      }

      return Math.min(Math.max(division, 0), options.length - 1);
    },
    [hasOptions, options.length],
  );

  const getOptionByDivision = React.useCallback(
    (division: number) => {
      if (!hasOptions) {
        return undefined;
      }

      return options[clampDivision(division)];
    },
    [clampDivision, hasOptions, options],
  );

  const getDivisionFromTranslate = React.useCallback(() => {
    if (!hasEnoughOptions || DIVISION_LENGTH <= 0) {
      return 0;
    }

    return clampDivision(Math.abs(Math.round(translate / DIVISION_LENGTH)));
  }, [DIVISION_LENGTH, clampDivision, hasEnoughOptions, translate]);

  const handleDragEnd = React.useCallback(
    (division: number) => {
      const option = getOptionByDivision(division);

      if (!option) {
        setTransitionEnabled(true);
        setIsDragging(false);
        return;
      }

      if (currentValue !== option.value) {
        setCurrentValue(option.value);
        callback(option.value);
      }
      setTransitionEnabled(true);
      setIsDragging(false);
    },
    [callback, currentValue, getOptionByDivision],
  );

  const handleDragStart = React.useCallback(() => {
    setIsDragging(true);
    setTransitionEnabled(false);
  }, []);

  const handleDivisionPointerDown = (
    division: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const option = getOptionByDivision(division);

    if (!option) {
      return;
    }

    event.stopPropagation();
    setTransitionEnabled(true);
    if (currentValue !== option.value) {
      setCurrentValue(option.value);
      callback(option.value);
    }
  };

  React.useEffect(() => {
    if (!hasEnoughOptions) {
      warnOnce(
        '[react-custom-switcher] `options` should include at least 2 entries to render a functional switcher.',
      );
    }
  }, [hasEnoughOptions]);

  React.useEffect(() => {
    if (hasOptions && !options.some((option) => option.value === value)) {
      warnOnce(
        '[react-custom-switcher] The provided `value` does not match any option. The switcher will fall back to the first option position.',
      );
    }
  }, [hasOptions, options, value]);

  React.useEffect(() => {
    const currentValueIndex = options.findIndex((option) => option.value === currentValue);
    const safeValueIndex = currentValueIndex >= 0 ? currentValueIndex : 0;

    if (hasOptions) {
      setTranslate(DIVISION_LENGTH * safeValueIndex);
      setInitialPosition(DIVISION_LENGTH * safeValueIndex);
    } else {
      setTranslate(0);
      setInitialPosition(0);
    }
  }, [currentValue, options, DIVISION_LENGTH, hasOptions]);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  React.useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (event.relatedTarget == null) {
        enableScroll(isMobileOrTablet, selectBodyStyles);
        const division = getDivisionFromTranslate();
        setInitialPosition(division * DIVISION_LENGTH);
        handleDragEnd(division);
        setIsDragging(false);
      }
    };

    if (canUseDOM && dragEnabled && hasEnoughOptions) {
      document.addEventListener('pointerout', listener);
    }

    return () => {
      if (canUseDOM) {
        document.removeEventListener('pointerout', listener);
      }
    };
  }, [
    DIVISION_LENGTH,
    canUseDOM,
    dragEnabled,
    getDivisionFromTranslate,
    handleDragEnd,
    hasEnoughOptions,
    isMobileOrTablet,
    selectBodyStyles,
  ]);

  React.useEffect(() => {
    const listener = () => {
      const division = getDivisionFromTranslate();
      setTranslate(division * DIVISION_LENGTH);
      enableScroll(isMobileOrTablet, selectBodyStyles);
      setInitialPosition(division * DIVISION_LENGTH);
      handleDragEnd(division);
      setIsDragging(false);
    };

    if (canUseDOM && dragEnabled && hasEnoughOptions) {
      if (isMobileOrTablet) {
        document.body.addEventListener('touchend', listener);
        // Add touchcancel for mobile reliability
        document.body.addEventListener('touchcancel', listener);
      } else {
        document.body.addEventListener('pointerup', listener);
      }
    }

    return () => {
      document.body.removeEventListener('touchend', listener);
      document.body.removeEventListener('touchcancel', listener);
      document.body.removeEventListener('pointerup', listener);
    };
  }, [
    DIVISION_LENGTH,
    canUseDOM,
    dragEnabled,
    getDivisionFromTranslate,
    handleDragEnd,
    hasEnoughOptions,
    isMobileOrTablet,
    selectBodyStyles,
  ]);

  React.useEffect(() => {
    const touchMoveListener = (event: TouchEvent) => {
      if (initialXCoord == null) {
        return;
      }

      event.preventDefault();
      handleDragStart();
      if (draggableRef.current && constraintsRef.current) {
        const translate = initialPosition + (event.touches[0].clientX - initialXCoord);
        setTranslate(
          applyConstraints(
            translate,
            constraintsRef.current.offsetWidth,
            draggableRef.current.offsetWidth,
          ),
        );
      }
    };

    const pointerMoveListener = (event: PointerEvent) => {
      if (initialXCoord == null) {
        return;
      }

      event.preventDefault();
      handleDragStart();
      if (draggableRef.current && constraintsRef.current) {
        const translate = initialPosition + (event.clientX - initialXCoord);
        setTranslate(
          applyConstraints(
            translate,
            constraintsRef.current.offsetWidth,
            draggableRef.current.offsetWidth,
          ),
        );
      }
    };

    if (canUseDOM && dragEnabled && hasEnoughOptions) {
      if (isDragging) {
        if (isMobileOrTablet) {
          document.body.addEventListener('touchmove', touchMoveListener, {
            passive: false,
          });
        } else {
          document.body.addEventListener('pointermove', pointerMoveListener);
        }
      }
    }

    return () => {
      if (canUseDOM) {
        document.body.removeEventListener('touchmove', touchMoveListener);
        document.body.removeEventListener('pointermove', pointerMoveListener);
      }
    };
  }, [
    canUseDOM,
    isDragging,
    constraintsRef,
    draggableRef,
    dragEnabled,
    handleDragStart,
    hasEnoughOptions,
    initialPosition,
    initialXCoord,
    isMobileOrTablet,
  ]);

  const handlePointerDown = (event: React.PointerEvent) => {
    disableScroll(isMobileOrTablet, setSelectBodyStyles);
    setIsDragging(true);
    setInitialXCoord(event.clientX);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    // Prevent default to stop scrolling and other touch behaviors
    event.preventDefault();
    disableScroll(isMobileOrTablet, setSelectBodyStyles);
    setIsDragging(true);
    setInitialXCoord(event.touches[0].clientX);
  };

  const findColor = (value: unknown, options: CustomSwitcherOption<unknown>[]) => {
    const color = options.find((option) => option.value === value)?.color;
    return color;
  };

  return (
    <div style={switcherStyles.root}>
      <div style={switcherStyles.container} ref={constraintsRef}>
        <div
          style={{
            ...switcherStyles.draggable,
            ...(transitionEnabled ? { ...switcherStyles.transition } : undefined),
            transform: `translateX(${translate}px)`,
            // Add touch-action to prevent browser interference on mobile
            touchAction: dragEnabled && !disabled && hasEnoughOptions ? 'none' : 'auto',
          }}
          ref={draggableRef}
          onPointerDown={
            !isMobileOrTablet && !disabled && dragEnabled && hasEnoughOptions
              ? handlePointerDown
              : undefined
          }
          onTouchStart={
            isMobileOrTablet && !disabled && dragEnabled && hasEnoughOptions
              ? handleTouchStart
              : undefined
          }>
          <div
            style={{
              ...switcherStyles.switch,
              ...(variant === 'primary' ? { ...switcherStyles.switchPrimary } : undefined),
              ...(variant === 'secondary' ? { ...switcherStyles.switchSecondary } : undefined),
              ...(isDragging ? { ...switcherStyles.grabbing } : undefined),
              ...(disabled && variant === 'primary'
                ? { ...switcherStyles.switchDisabledPrimary }
                : undefined),
              ...(disabled && variant === 'secondary'
                ? { ...switcherStyles.switchDisabledSecondary }
                : undefined),
              ...(disabled && cssOverrides.switchDisabled
                ? { ...switcherStyles.switchDisabled }
                : undefined),
              ...(disabled || !dragEnabled
                ? { ...switcherStyles.defaultDisabledCursor }
                : undefined),
              transform: isDragging ? `scale(${determineScale(scaleWhileDrag)})` : 'scale(1)',
              ...(variant === 'primary'
                ? {
                    backgroundColor: determineColor(findColor(currentValue, options), disabled),
                  }
                : undefined),
              ...(variant === 'secondary'
                ? {
                    borderColor: determineColor(findColor(currentValue, options), disabled),
                  }
                : undefined),
              ...switcherStyles.switchOverride,
            }}
          />
        </div>
        <div style={switcherStyles.divisionsWrap}>
          <div
            style={{
              ...switcherStyles.divLine,
              ...(variant === 'secondary' ? { ...switcherStyles.divLineSecondary } : undefined),
              ...switcherStyles.divLineOverride,
            }}
          />
          {options.map((option, index) => {
            return (
              <div
                key={`key-${option.value}-${index}`}
                style={{
                  ...switcherStyles.divWrap,
                  ...switcherStyles.defaultCursor,
                  transform: `translate3d(calc(${index * DIVISION_LENGTH}px - 50%), -50%, 0)`,
                }}
                onPointerDown={
                  !disabled && hasEnoughOptions && option.value !== currentValue
                    ? (event) => handleDivisionPointerDown(index, event)
                    : undefined
                }>
                <div
                  style={{
                    ...switcherStyles.division,
                    ...(variant === 'primary' ? { ...switcherStyles.divisionPrimary } : undefined),
                    ...(disabled && !cssOverrides.cursorDisabled
                      ? { ...switcherStyles.defaultDisabledCursor }
                      : undefined),
                    ...switcherStyles.divisionOverride,
                    ...(disabled && cssOverrides.cursorDisabled
                      ? { ...switcherStyles.disabledCursor }
                      : undefined),
                  }}
                />
                {option.label && (
                  <div
                    style={{
                      ...switcherStyles.label,
                      ...(variant === 'primary' ? { ...switcherStyles.labelPrimary } : undefined),
                      ...(variant === 'secondary'
                        ? { ...switcherStyles.labelSecondary }
                        : undefined),
                      ...switcherStyles.defaultCursor,
                      ...switcherStyles.labelOverride,
                      ...(disabled ? { ...switcherStyles.labelDisabled } : undefined),
                      ...(!cssOverrides.cursorDisabled &&
                      (disabled || currentValue === option.value)
                        ? { ...switcherStyles.defaultDisabledCursor }
                        : undefined),
                      ...(cssOverrides.cursorDisabled && (disabled || currentValue === option.value)
                        ? { ...switcherStyles.disabledCursor }
                        : undefined),
                    }}
                    onPointerDown={
                      !disabled && hasEnoughOptions
                        ? (event) => handleDivisionPointerDown(index, event)
                        : undefined
                    }>
                    {option.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
