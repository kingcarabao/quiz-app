import React, { useState, useEffect } from 'react';
import QuizDetails from '../QuizDetails';
import Question from '../Question';
import MultipleChoice from '../MultipleChoice';
import { StringLiteralLike } from 'typescript';

interface Props {
  quiz?: any;
}

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
  userAnswer: string;
}

interface Result {
  category: string;
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuizComponent(props: Props) {
  const { quiz } = props;
  const title = quiz ? quiz.results[0].category : 'No title';
  const [currentIdx, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(
      props.quiz.results.map((result: Result) => ({
        question: result.question,
        choices: result.incorrect_answers.push(result.correct_answer),
        correctAnswer: result.correct_answer,
        userAnswer: ''
      }))
    );
  }, [props.quiz.results])

  const setAnswer = (answer: string, idx: number) => {
    setQuestions((items) => {
      items[idx].userAnswer = answer;
      return items;
    });
  };

  const ShowQuestion = () => {
    if (!questions)
      return null;

    if (!questions[currentIdx])
      return null;
    
    return (
      <Question question={questions[currentIdx]}>
        <MultipleChoice
          choices={questions[currentIdx].choices}
          setValue={(answer: string) => { setAnswer(answer, currentIdx) }}
          value={questions[currentIdx].userAnswer}/>
      </Question>
    )
  };

  return (
    <>
      <QuizDetails title={title}/>
      { ShowQuestion() }
    </>
  );
}