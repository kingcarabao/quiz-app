export interface Quiz {
  quizName: string;
}

export interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
