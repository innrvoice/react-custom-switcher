declare module '*.jpg';
declare module '*.svg';

declare namespace JSX {
  type ElementType = import('react').JSX.ElementType;
  type Element = import('react').JSX.Element;
  type ElementClass = import('react').JSX.ElementClass;
  type ElementAttributesProperty = import('react').JSX.ElementAttributesProperty;
  type ElementChildrenAttribute = import('react').JSX.ElementChildrenAttribute;
  type IntrinsicAttributes = import('react').JSX.IntrinsicAttributes;
  type IntrinsicClassAttributes<T> = import('react').JSX.IntrinsicClassAttributes<T>;
  type IntrinsicElements = import('react').JSX.IntrinsicElements;
  type LibraryManagedAttributes<C, P> = import('react').JSX.LibraryManagedAttributes<C, P>;
}
