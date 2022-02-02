import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import { Question } from '../../../@types/quiz';

interface Props {
  questions: Question[];
  children?: React.ReactNode;
}

export default function ResultBreakdown(props: Props) {
  const navigate = useNavigate();
  const { questions, children } = props;
  console.log('sadasdasd', questions);
  return (
    <Card>
      <CardHeader title="Here is your result:" align="center" />
      <CardContent>
        <Typography variant="h3" align="center">
          Breakdown
        </Typography>
        {questions.map((question) =>
          React.Children.toArray(
            <>
              <Typography variant="body1">{String(question.correctAnswer)}</Typography>
              <Typography variant="body1">{String(question.userAnswer)}</Typography>
              <Typography variant="body1">{String(question.isCorrect)}</Typography>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
}
