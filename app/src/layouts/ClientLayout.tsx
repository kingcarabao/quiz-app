import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    
    return (
        <>
            <div>Layout</div>
            <Outlet />
        </>
    )
}