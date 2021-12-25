import React from 'react'
import { Outlet } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

export default function GuestLayout() {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}
