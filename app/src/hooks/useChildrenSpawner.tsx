import React, { Children, isValidElement, cloneElement } from 'react';

type ExtraProps = any | null | undefined;

export default function SpawnChildren(children: React.ReactNode, extraProps?: ExtraProps) {
    
    const renderChildren = () => {
        return Children.map(children, (child) => {
            if (isValidElement(child)){
                return cloneElement(child, extraProps)
            }
        })
    };

    return renderChildren()
}