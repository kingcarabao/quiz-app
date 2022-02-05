import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
