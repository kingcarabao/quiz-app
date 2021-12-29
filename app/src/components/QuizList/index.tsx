import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardContent, Grid } from '@mui/material';
import { quizHttp } from '../../utils/axios';

interface Quiz {
    id: number;
    category: string;
    correctAnswer: string;
}

const amount = 10;
const difficulty = 'medium';
const type = 'multiple';

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [params, setParams] = useState('?amount=10&category=27&difficulty=medium&type=multiple');
    const queries = [
        {category: 9, amount, difficulty, type},
        {category: 10, amount, difficulty, type},
        {category: 11, amount, difficulty, type},
        {category: 12, amount, difficulty, type},
        {category: 13, amount, difficulty, type},
        {category: 14, amount, difficulty, type},
        {category: 15, amount, difficulty, type}
    ];

    // const getQuizzes = useMemo(async () => {
    //     const response = await quizHttp.get(params);
    // }, [params]);

    useEffect(() => {
        (async () => {
            const response = await quizHttp.get(params);
            if (!response.data)
            return;

            if (response.data < 0)
            return;

            setQuizzes(response.data);
        })();
    }, []);

    return (
        <Card>
            <CardHeader
                title="Quiz List"
            />
            <CardContent>
                {JSON.stringify(quizzes)}
            </CardContent>
        </Card>
    )
}
