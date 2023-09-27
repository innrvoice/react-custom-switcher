# react-custom-switcher

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/demo.gif?raw=true" width="400px" />
</p>

Typed React multi-option toggle/switcher component with dragging, snap and customizable UI.

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/custom-switcher.png?raw=true" />
</p>


## Installation

```
npm install react-custom-switcher
```
or
```
yarn add react-custom-switcher
```

## Basic Usage

```typescript
import React from 'react';
import { CustomSwitcher } from 'react-custom-switcher';

export const CustomSwitcherExample: React.FC = () => {
    return (
        <CustomSwitcher
            options={[
                {
                    value: 'off',
                    label: 'OFF,
                },
                {
                    value: 'on',
                    label: 'ON',
                }
            ]}
            value={'off'}
            containerSize={300}
            callback={(currentValue: string) => console.log(currentValue)}
        >
    )
}
```

## API

CustomSwitcher component accepts a list of props corresponding to **ICustomSwitcherProps** interface:

```typescript
interface ICustomSwitcherProps {
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
```

Lets look at them one by one.

### options (required)
type: *CustomerSwitcherOption[]*

Required array of options to switch between. Every option is array should have a shape corresponding to **CustomSwitcherOption**:

```typescript
type CustomSwitcherOption = {
  value: string;
  label?: string | React.ReactElement;
  color?: string;
};
```

<hr>

### value (required)
type: *string*

A value from options there switch will be set by default. You can use it as a controlled value.

<hr>

### containerWidth (required)
*type:* **number**

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/container-width.png?raw=true" width="400px" />
</p>


Width of the container where all the options will be rendered.

<hr>

### variant (optional, defaults to *'primary'*)
type: *CustomSwitcherVariant* = *'primary' | 'secondary'*


There are only two basic variants of CustomSwitcher UI. All the customizations are based on one of those variants.

#### The anatomy of primary variant

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/variant-primary.png?raw=true" width="400px" />
</p>

Primary variant has all the elements like switch, division line, divisions and options labels at the bottom. 

Switcher is filled and background color is transitioned in case optional **color** properties were provided in **options** array.

#### The anatomy of secondary variant

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/variant-secondary.png?raw=true" width="400px" />
</p>


Secondary variant has only main switch and labels at the center of divisions areas. Divisions and division line elements are hidden but this can be overridden by **cssOverrides** prop (*see below*).

Switch element is transparent but has a border. Border color is transitioned in case optional **color** properties were provided in **options** array.

<hr>

### switchSize (optional)
type: *number*

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/switch-size.png?raw=true" width="400px" />
</p>

As is.

<hr>

### dragEnabled (optional, defaults to *true*)
type: *boolean*

You can disable drag and it can be useful in some cases, for example when using value as a controlled value.

<hr>

### disabled (optional, defaults to *false*)
type: *boolean*

In case you need to disable interaction with CustomSwitcher.

<hr>

### scaleWhileDrag (optional, defaults to *true*)
type: *boolean | number*

You can turn off scaling of switch element while dragging by providing *false*. Or you can define a custom scale by providing a number, e.g *1.5* will mean a 150% switch size while dragging like when using CSS scale property.

<hr>

### cssOverrides (optional)
type: *CSSOverrides*

You can pass an object of CSS overrides corresponding to this shape:

```typescript
type CSSOverrides = {
  cursorDefault?: CSSProperties['cursor'];
  cursorGrab?: CSSProperties['cursor'];
  cursorGrabbing?: CSSProperties['cursor'];
  cursorDisabled?: CSSProperties['cursor'];
  switch?: CSSProperties;
  division?: CSSProperties;
  divisionLine?: CSSProperties;
  label?: CSSProperties;
};
```

With this you can add and/or modify existing CSS properties of different elements and some behaviors. 

<hr>

### callback (required)
type: *(currentValue: number) => unknown*

A callback which is fired when user selects an option either by using drag or just clicking on needed option. 
