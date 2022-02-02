import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import useChildrenSpawner from '../../../hooks/useChildrenSpawner';
import { Question } from '../../../@types/quiz';

interface Props {
  question: Question;
  children?: React.ReactNode;
}

export default function QuestionComponent(props: Props) {
  const spawns = useChildrenSpawner(props.children);
  return (
    <Card>
      <CardHeader tabIndex={1} title={props.question.question} sx={{ minHeight: 65 }} />
      <CardContent>{spawns}</CardContent>
    </Card>
  );
}
