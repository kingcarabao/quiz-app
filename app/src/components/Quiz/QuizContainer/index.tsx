import React, { useState, useEffect } from 'react';
import QuizDetails from '../QuizDetails';
import Question from '../Question';
import MultipleChoice from '../MultipleChoice';
import QuizControls from '../QuizControls';
import { StringLiteralLike } from 'typescript';

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

interface Props {
  quiz?: {
    response: number;
    results: Result[];
  };
}

export default function QuizComponent(props: Props) {
  const { quiz } = props;
  const title = quiz ? quiz.results[0].category : 'No title';
  const [currentIdx, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if(quiz) {
      setQuestions(
        quiz.results.map((result: Result) => {
  
          const allChoices = result.incorrect_answers;
          allChoices.push(result.correct_answer);
  
          return {
            question: result.question,
            choices: allChoices,
            correctAnswer: result.correct_answer,
            userAnswer: ''
          }
        })
      );
    }
  }, [quiz])

  const setAnswer = (answer: string, idx: number) => {
    setQuestions((items) => {
      let modifiedItems = items;
      modifiedItems[idx].userAnswer = answer;
      return modifiedItems;
    });
  };

  const ShowControls = () => {
    const navigateQuiz = (where: string) => {
      setCurrentIndex((current) => {
        let idx = current;
        if(where === 'back'){
          if (idx <= 0)
            return idx;
          return --idx;
        } else {
          if (idx >= questions.length-1)
            return idx;
          return ++idx;
        }
      });
    };

    return (
      <QuizControls
        sx={{ mt: 0 }}
        navigate={(where: string) => navigateQuiz(where)}
        backIsDisabled={currentIdx <= 0}
        nextIsDisabled={currentIdx >= questions.length-1}
      />
    )
  }

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
          value={questions[currentIdx].userAnswer}
        />
      </Question>
    )
  };

  return (
    <>
      <QuizDetails title={title}/>
      { ShowQuestion() }
      { ShowControls() }
      { JSON.stringify(questions) }
    </>
  );
}