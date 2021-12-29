import React, { useState, useEffect } from 'react';
import QuizDetails from '../QuizDetails';
import Question from '../Question';

interface Props {
    quiz?: any;
}

export default function QuizComponent(props: Props) {
  const { quiz } = props;
  const title = quiz ? quiz.results[0].category : 'No title';
  const [questionIdx, setQuestionIdx] = useState(0);

  const ShowQuestion = () => {
    if (!quiz)
    return null;

    if (!quiz.results)
    return null;

    if (quiz.results[questionIdx])
    return <Question question={quiz.results[questionIdx]}/>
  };

  return (
    <>
      <QuizDetails title={title}/>
      { ShowQuestion() }
    </>
  );
}