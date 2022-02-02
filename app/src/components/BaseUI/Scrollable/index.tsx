import React from 'react';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
  direction?: 'x' | 'y' | 'both';
  value?: 'auto' | 'scroll' | 'hidden' | 'visible';
}

type Overflows = {
  [key: string]: string;
};

const overflows: Overflows = {
  x: 'overflowX',
  y: 'overflowY',
  both: 'overflow',
};

export default function Scrollable({ children, direction = 'both', value = 'auto' }: Props) {
  return <Box sx={{ [overflows[direction]]: value }}>{children}</Box>;
}
