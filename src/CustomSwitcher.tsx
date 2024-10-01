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
  const isMobileOrTablet = React.useMemo(() => checkIfMobileOrTablet(), []);

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
    height: document.body.style.height,
    overflow: document.body.style.overflow,
  });

  const DIVISION_LENGTH = (containerWidth - actualSwitchSize) / (options.length - 1);

  const handleDragEnd = React.useCallback(
    (division: number) => {
      if (currentValue !== options[division].value) {
        setCurrentValue(options[division].value);
        callback(options[division].value);
      }
      setTransitionEnabled(true);
      setIsDragging(false);
    },
    [callback, options, currentValue],
  );

  const handleDragStart = React.useCallback(() => {
    setIsDragging(true);
    setTransitionEnabled(false);
  }, []);

  const handleDivisionPointerDown = (
    division: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    setTransitionEnabled(true);
    if (currentValue !== options[division].value) {
      setCurrentValue(options[division].value);
      callback(options[division].value);
    }
  };

  React.useEffect(() => {
    const currentValueIndex = options.findIndex((option) => option.value === currentValue);

    if (currentValueIndex >= 0) {
      setTranslate(DIVISION_LENGTH * currentValueIndex);
      setInitialPosition(DIVISION_LENGTH * currentValueIndex);
    }
  }, [currentValue, options, DIVISION_LENGTH]);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  React.useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (event.relatedTarget == null) {
        enableScroll(isMobileOrTablet, selectBodyStyles);
        const division = Math.abs(Math.round(translate / DIVISION_LENGTH));
        setInitialPosition(division * DIVISION_LENGTH);
        handleDragEnd(division);
        setIsDragging(false);
      }
    };

    if (dragEnabled) {
      document.addEventListener('pointerout', listener);
    }

    return () => document.removeEventListener('pointerout', listener);
  }, [translate, DIVISION_LENGTH, handleDragEnd, dragEnabled, isMobileOrTablet, selectBodyStyles]);

  React.useEffect(() => {
    const listener = () => {
      const division = Math.abs(Math.round(translate / DIVISION_LENGTH));
      setTranslate(division * DIVISION_LENGTH);
      enableScroll(isMobileOrTablet, selectBodyStyles);
      setInitialPosition(division * DIVISION_LENGTH);
      handleDragEnd(division);
      setIsDragging(false);
    };

    if (dragEnabled) {
      if (isMobileOrTablet) {
        document.body.addEventListener('touchend', listener);
      } else {
        document.body.addEventListener('pointerup', listener);
      }
    }

    return () => {
      document.body.removeEventListener('touchend', listener);
      document.body.removeEventListener('pointerup', listener);
    };
  }, [translate, DIVISION_LENGTH, handleDragEnd, dragEnabled, isMobileOrTablet, selectBodyStyles]);

  React.useEffect(() => {
    const touchMoveListener = (event: TouchEvent) => {
      event.preventDefault();
      handleDragStart();
      if (draggableRef.current && constraintsRef.current) {
        const translate = initialPosition + (event.touches[0].clientX - initialXCoord!);
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
      event.preventDefault();
      handleDragStart();
      if (draggableRef.current && constraintsRef.current) {
        const translate = initialPosition + (event.clientX - initialXCoord!);
        setTranslate(
          applyConstraints(
            translate,
            constraintsRef.current.offsetWidth,
            draggableRef.current.offsetWidth,
          ),
        );
      }
    };

    if (dragEnabled) {
      if (isDragging) {
        if (isMobileOrTablet) {
          document.body.addEventListener('touchmove', touchMoveListener);
        } else {
          document.body.addEventListener('pointermove', pointerMoveListener);
        }
      }
    }

    return () => {
      document.body.removeEventListener('touchmove', touchMoveListener);
      document.body.removeEventListener('pointermove', pointerMoveListener);
    };
  }, [
    isDragging,
    constraintsRef,
    draggableRef,
    dragEnabled,
    handleDragStart,
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
          }}
          ref={draggableRef}
          onPointerDown={
            !isMobileOrTablet && !disabled && dragEnabled ? handlePointerDown : undefined
          }
          onTouchStart={
            isMobileOrTablet && !disabled && dragEnabled ? handleTouchStart : undefined
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
                ? { backgroundColor: determineColor(findColor(currentValue, options), disabled) }
                : undefined),
              ...(variant === 'secondary'
                ? { borderColor: determineColor(findColor(currentValue, options), disabled) }
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
                  !disabled && option.value !== currentValue
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
                      !disabled ? (event) => handleDivisionPointerDown(index, event) : undefined
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
