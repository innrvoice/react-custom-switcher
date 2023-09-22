import React from 'react';
import useStyles from './CustomSwitcher.styles';
import { DEFAULT_SCALE_WHILE_DRAG } from './CustomSwitcher.constants';
import { motion, useAnimationControls } from 'framer-motion';
import clsx from 'clsx';
import { determineColor, determineScale, determineSwitchSize } from './CustomSwitcher.utils';
import { ICustomSwitcherProps } from './CustomSwitcher.types';

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
  const classes = useStyles({
    switchSize: actualSwitchSize,
    containerWidth,
    cssOverrides,
  });
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = React.useState(value);
  const [transitionEnabled, setTransitionEnabled] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const animationControls = useAnimationControls();

  const DIVISION_LENGTH = Math.ceil((containerWidth - actualSwitchSize) / (options.length - 1));

  const handleDragEnd = () => {
    if (sliderRef.current) {
      const translateXvalue = sliderRef.current.style.transform.match(/translateX\(([-0-9.]+)/i);
      if (translateXvalue) {
        const translateXValueRounded = Math.round(parseFloat(translateXvalue[1]));

        const division = Math.abs(Math.round(translateXValueRounded / DIVISION_LENGTH));

        animationControls.set({
          x: division * DIVISION_LENGTH,
        });

        setCurrentValue(options[division].value);
        callback(options[division].value);
        setTransitionEnabled(true);
      }
    }
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
    setCurrentValue(options[division].value);
    callback(options[division].value);
  };

  React.useEffect(() => {
    const currentValueIndex = options.findIndex((option) => option.value === currentValue);

    if (currentValueIndex >= 0) {
      animationControls.start({
        x: DIVISION_LENGTH * currentValueIndex,
        transition: transitionEnabled ? { duration: 0.25 } : { duration: 0 },
        backgroundColor:
          variant === 'primary'
            ? determineColor(options[currentValueIndex].color, disabled)
            : undefined,
        borderColor:
          variant === 'secondary'
            ? determineColor(options[currentValueIndex].color, disabled)
            : undefined,
      });
    }
  }, [
    currentValue,
    disabled,
    options,
    variant,
    DIVISION_LENGTH,
    transitionEnabled,
    animationControls,
  ]);

  return (
    <div className={classes.root} ref={rootRef}>
      <div className={classes.container} ref={constraintsRef}>
        <motion.div
          transition={{ ease: 'easeOut', duration: 0.2 }}
          ref={sliderRef}
          className={clsx(classes.switch, {
            [classes.switchPrimary]: variant === 'primary',
            [classes.switchSecondary]: variant === 'secondary',
            [classes.grabbing]: isDragging,
            [classes.switchDisabledPrimary]: disabled && variant === 'primary',
            [classes.switchDisabledSecondary]: disabled && variant === 'secondary',
            [classes.defaultDisabledCursor]: disabled,
            [classes.switchOverride]: cssOverrides.switch,
          })}
          drag={!disabled ? 'x' : false}
          whileDrag={{
            scale: determineScale(scaleWhileDrag),
          }}
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          animate={animationControls}
        />

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
