import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

interface Props {
    title: string;
    children?: React.ReactNode;
};

export default function QuizDetails (props: Props) {
    const { title, children } = props;
    return (
        <>
            <Card>
                <CardHeader
                    title={title}
                />
                {
                    children
                    ? <CardContent>{children}</CardContent>
                    : null
                }
                
            </Card>
        </>
    );
};