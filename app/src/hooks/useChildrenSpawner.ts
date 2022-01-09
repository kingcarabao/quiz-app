import React, { Children, isValidElement, cloneElement } from "react";

type ExtraProps = any | null | undefined;

/**
 * Assures that that children are valid react components
 * Also passes added props
 * @param children
 * @param extraProps
 * @returns
 */
export default function SpawnChildren(
  children: React.ReactNode,
  extraProps?: ExtraProps
) {
  const renderChildren = () =>
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, extraProps);
      }
    });

  return renderChildren();
}
