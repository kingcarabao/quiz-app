import React from 'react';

/**
 * Column is a simple configuration for a column to control how a row is displayed in
 * @data is key to an Object to be displayed as a row item.
 * @align refers to the alignment styling of the data in row item.
 */
export interface Column {
  data: string | React.ReactNode | ((row: any) => void);
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}
