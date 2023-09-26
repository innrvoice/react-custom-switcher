# react-custom-switcher

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/demo.gif?raw=true"
</p>

React multi-option toggle/switcher component with dragging, snap and customizable UI written in Typescript.

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/custom-switcher.png?raw=true"
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
            callback={(currentValue: string) => console.log(newValue)}
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

A value from options there switch will be set by default. You can use it as a controlled value.  [See example](https://codesandbox.io/)

<hr>

### containerWidth (required)
*type:* **number**

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/container-width.png?raw=true"
</p>


Width of the container where all the options will be rendered.

<hr>

### variant (optional, defaults to *'primary'*)
type: *'primary' | 'secondary'*


There are only two basic variants of CustomSwitcher UI. All the customizations are based on one of those variants.

#### The anatomy of primary variant

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/variant-primary.png?raw=true"
</p>

Primary variant has all the elements like division line, divisions, switcher and option labels at tbe bottom. 

Switcher is filled and background color is transitioned in case optional color properties were provided in **options** array.

#### The anatomy of secondary variant

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/variant-secondary.png?raw=true"
</p>


Secondary variant has only main switch and labels at the center of divisions areas. Divisions and division line elements are hidden but this can be overridden by **cssOverrides** prop (*see below*).

Switcher is transparent but has a border. Border color is transitioned in case optional color properties were provided in **options** array.

<hr>

### switchSize (optional)
type: *number*

<p align="center">
    <img src="https://github.com/innrvoice/files/blob/main/react-custom-switcher/switch-size.png?raw=true"
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

You can turn off scaling of switch element while drag by providing *false*. Or you can define a custom scale by providing a number e.g *1.5* which will mean a 150% switch size while dragging like when using CSS scale property.

<hr>

### cssOverrides (optional)
type: *CSSOverrides*

You can pass an object of css overrides corresponding to this shape:

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

You can add and/or modify existing CSS properties of different elements and some behaviors. [See customization examples](https://codesandbox.io/)

<hr>

### callback (required)
type: *(currentValue: number) => unknown*

A callback which is fired when user selects some options either by using drag or just clicking on some option. 
