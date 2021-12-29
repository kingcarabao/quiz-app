import React from 'react'
import { Card, CardHeader, CardContent } from '@mui/material';

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface Props {
    question: Question;
}

export default function Question(props: Props) {
    return (
        <Card>
            <CardHeader title={props.question.question} />
            <CardContent>

            </CardContent>
        </Card>
    )
};
