import React, { useState, useEffect } from 'react';
import QuizDetails from '../QuizDetails';
import Question from '../Question';
import MultipleChoice from '../MultipleChoice';
import QuizControls from '../QuizControls';
import ProgressBar from '../ProgressBar';
import QuizResult from '../QuizResult';
import QuizResultBreakdown from '../QuizResult/ResultBreakdown';
import LoadingScreen from '../../LoadingScreen';
import { Question as QuestionType } from '../../../@types/quiz';

interface RawQuestion {
  category: string;
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Props {
  quiz?: {
    response: number;
    results: RawQuestion[];
  };
}

export default function QuizComponent(props: Props) {
  const { quiz } = props;
  const title = quiz ? quiz.results[0].category : 'No title';
  const [currentIdx, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (quiz) {
      setQuestions(
        quiz.results.map((result: RawQuestion) => {
          const allChoices = [...result.incorrect_answers, result.correct_answer];
          allChoices.sort(() => Math.random() - 0.5); // randomizes choices;

          return {
            question: result.question,
            choices: allChoices,
            correctAnswer: result.correct_answer,
            userAnswer: '',
            isCorrect: false,
          };
        })
      );
      setIsLoading(false);
    }
  }, [quiz]);

  const scoreQuiz = () => {
    const tempScore = questions.reduce(
      (prev, curr) => (curr.correctAnswer === curr.userAnswer ? prev + 1 : prev),
      0
    );

    setScore(tempScore);
  };

  const setAnswer = (answer: string, idx: number) => {
    if (!answer) {
      return;
    }

    setQuestions((items) => {
      if (items[idx].userAnswer === '') {
        setTotalAnswered((i) => i + 1);
      }

      items[idx].userAnswer = answer;
      items[idx].isCorrect = items[idx].correctAnswer === items[idx].userAnswer;
      // console.table(items);
      return items;
    });
  };

  function ShowControls() {
    const navigateQuiz = (where: string) => {
      switch (where) {
        case 'back':
          setCurrentIndex((current) => {
            if (current <= 0) {
              return current;
            }
            return --current;
          });
          break;
        case 'next':
          setCurrentIndex((current) => {
            if (current >= questions.length - 1) {
              return current;
            }
            return ++current;
          });
          break;
        case 'end':
          scoreQuiz();
          setIsFinished(true);
          break;
      }
    };

    return (
      <QuizControls
        sx={{ mt: 0 }}
        navigate={(where: string) => navigateQuiz(where)}
        backIsDisabled={currentIdx <= 0}
        nextIsDisabled={currentIdx >= questions.length - 1}
        isComplete={totalAnswered === questions.length}
      />
    );
  }

  function ShowQuestion() {
    if (!questions) {
      return null;
    }

    if (!questions[currentIdx]) {
      return null;
    }

    return (
      <Question question={questions[currentIdx]}>
        <MultipleChoice
          choices={questions[currentIdx].choices}
          setValue={(answer: string) => {
            setAnswer(answer, currentIdx);
          }}
          value={questions[currentIdx].userAnswer}
        />
      </Question>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {isFinished ? (
            <QuizResult total={questions.length} score={score}>
              <QuizResultBreakdown questions={questions} />
            </QuizResult>
          ) : (
            <>
              <QuizDetails title={title}>
                <ProgressBar total={questions.length} current={totalAnswered} />
              </QuizDetails>
              {ShowQuestion()}
              {ShowControls()}
            </>
          )}
        </>
      )}
    </>
  );
}
