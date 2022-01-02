import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';

interface Props {
    score: number;
    total: number;
    children?: React.ReactNode;
}

export default function Question(props: Props) {
    const navigate = useNavigate();
    const { score, total } = props;
    return (
        <Card>
            <CardHeader title="Here is your result:" align="center"/>
            <CardContent>
                <Typography variant="h3" align="center">
                    {score} out of {total}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{ justifyContent: 'center', textAlign: 'center' }}
                        onClick={() => {navigate('/app/quiz-list')}}>
                        Go back to Quiz List
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
};
