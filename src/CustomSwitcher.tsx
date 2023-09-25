import React from 'react';
import useStyles from './CustomSwitcher.styles';
import { DEFAULT_SCALE_WHILE_DRAG } from './CustomSwitcher.constants';
import clsx from 'clsx';
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
  containerWidth,
  switchSize,
  value,
  variant = 'primary',
  scaleWhileDrag = DEFAULT_SCALE_WHILE_DRAG,
  disabled = false,
  cssOverrides = {},
  callback,
}) => {
  const actualSwitchSize = determineSwitchSize(switchSize, variant);
  const isMobileOrTablet = React.useMemo(() => checkIfMobileOrTablet(), []);
  const classes = useStyles({
    switchSize: actualSwitchSize,
    containerWidth,
    cssOverrides,
  });
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const draggableRef = React.useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = React.useState(value);
  const [transitionEnabled, setTransitionEnabled] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const [initialXCoord, setInitialXCoord] = React.useState<number | undefined>();
  const [translate, setTranslate] = React.useState(0);
  const [initialPosition, setInitialPosition] = React.useState(0);

  const DIVISION_LENGTH = (containerWidth - actualSwitchSize) / (options.length - 1);

  const handleDragEnd = (division: number) => {
    if (currentValue !== options[division].value) {
      setCurrentValue(options[division].value);
      callback(options[division].value);
    }
    setTransitionEnabled(true);
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setTransitionEnabled(false);
  };

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
    const listener = (event: PointerEvent) => {
      if (event.relatedTarget == null) {
        enableScroll(classes.stopScrolling, isMobileOrTablet);
        const division = Math.abs(Math.round(translate / DIVISION_LENGTH));
        setInitialPosition(division * DIVISION_LENGTH);
        handleDragEnd(division);
        setIsDragging(false);
      }
    };
    document.addEventListener('pointerout', listener);

    return () => document.removeEventListener('pointerout', listener);
  }, [translate, DIVISION_LENGTH, handleDragEnd, isMobileOrTablet]);

  React.useEffect(() => {
    const listener = () => {
      const division = Math.abs(Math.round(translate / DIVISION_LENGTH));
      setTranslate(division * DIVISION_LENGTH);
      enableScroll(classes.stopScrolling, isMobileOrTablet);
      setInitialPosition(division * DIVISION_LENGTH);
      handleDragEnd(division);
      setIsDragging(false);
    };
    if (isMobileOrTablet) {
      document.body.addEventListener('touchend', listener);
      return () => document.body.removeEventListener('touchend', listener);
    } else {
      document.body.addEventListener('pointerup', listener);
      return () => document.body.removeEventListener('pointerup', listener);
    }
  }, [translate, DIVISION_LENGTH, handleDragEnd, isMobileOrTablet]);

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

    if (isDragging) {
      if (isMobileOrTablet) {
        document.body.addEventListener('touchmove', touchMoveListener);
      } else {
        document.body.addEventListener('pointermove', pointerMoveListener);
      }
    }

    return () => {
      document.body.removeEventListener('touchmove', touchMoveListener);
      document.body.removeEventListener('pointermove', pointerMoveListener);
    };
  }, [isDragging, constraintsRef, draggableRef]);

  const handlePointerDown = (event: React.PointerEvent) => {
    disableScroll(classes.stopScrolling, isMobileOrTablet);
    setIsDragging(true);
    setInitialXCoord(event.clientX);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    disableScroll(classes.stopScrolling, isMobileOrTablet);
    setIsDragging(true);
    setInitialXCoord(event.touches[0].clientX);
  };

  const findColor = (value: string, options: CustomSwitcherOption[]) => {
    const color = options.find((option) => option.value === value)?.color;
    return color;
  };

  return (
    <div className={classes.root}>
      <div className={classes.container} ref={constraintsRef}>
        <div
          className={clsx(classes.draggable, {
            [classes.transition]: transitionEnabled,
          })}
          ref={draggableRef}
          style={{
            transform: `translateX(${translate}px)`,
          }}
          onPointerDown={!isMobileOrTablet && !disabled ? handlePointerDown : undefined}
          onTouchStart={isMobileOrTablet && !disabled ? handleTouchStart : undefined}>
          <div
            className={clsx(classes.switch, {
              [classes.switchPrimary]: variant === 'primary',
              [classes.switchSecondary]: variant === 'secondary',
              [classes.grabbing]: isDragging,
              [classes.switchDisabledPrimary]: disabled && variant === 'primary',
              [classes.switchDisabledSecondary]: disabled && variant === 'secondary',
              [classes.defaultDisabledCursor]: disabled,
              [classes.switchOverride]: cssOverrides.switch,
            })}
            style={{
              transform: isDragging ? `scale(${determineScale(scaleWhileDrag)})` : 'scale(1)',
              ...(variant === 'primary'
                ? { backgroundColor: determineColor(findColor(currentValue, options), disabled) }
                : undefined),
              ...(variant === 'secondary'
                ? { borderColor: determineColor(findColor(currentValue, options), disabled) }
                : undefined),
            }}
          />
        </div>
        <div className={classes.divisionsWrap}>
          <div
            className={clsx(classes.divLine, {
              [classes.divLineSecondary]: variant === 'secondary',
              [classes.divLineOverride]: cssOverrides.divisionLine,
            })}
          />
          {options.map((option, index) => {
            return (
              <div
                className={classes.divWrap}
                key={`key-${option.value}-${index}`}
                style={{
                  transform: `translate3d(calc(${index * DIVISION_LENGTH}px - 50%), -50%, 0)`,
                }}>
                <div
                  className={clsx(classes.division, {
                    [classes.divisionPrimary]: variant === 'primary',
                    [classes.defaultCursor]: cssOverrides.cursorDefault,
                    [classes.defaultDisabledCursor]: disabled && !cssOverrides.cursorDisabled,
                    [classes.divisionOverride]: cssOverrides.division,
                    [classes.disabledCursor]: disabled && cssOverrides.cursorDisabled,
                  })}
                  onPointerDown={
                    !disabled ? (event) => handleDivisionPointerDown(index, event) : undefined
                  }
                />
                {option.label && (
                  <div
                    className={clsx(classes.label, {
                      [classes.labelPrimary]: variant === 'primary',
                      [classes.labelSecondary]: variant === 'secondary',
                      [classes.defaultCursor]: cssOverrides.cursorDefault,
                      [classes.labelOverride]: cssOverrides.label,
                      [classes.labelDisabled]: disabled,
                      [classes.disabledCursor]: disabled && cssOverrides.cursorDisabled,
                    })}
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
