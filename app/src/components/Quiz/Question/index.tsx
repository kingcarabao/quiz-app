import React from 'react'
import { Card, CardHeader, CardContent } from '@mui/material';
import useChildrenSpawner from '../../../hooks/useChildrenSpawner';

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
    userAnswer: string;
  }

interface Props {
    question: Question;
    children?: React.ReactNode;
}

export default function Question(props: Props) {
    const spawns = useChildrenSpawner(props.children);
    return (
        <Card>
            <CardHeader title={props.question.question} />
            <CardContent>
                {spawns}
            </CardContent>
        </Card>
    )
};
