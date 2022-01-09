import { Container } from '@mui/material';
import Page from '../../components/Page/index';
import Quiz from '../../components/Quiz';

/**
 *
 * Quizzer Page Component
 */

export default function QuizPage() {
  return (
    <Page>
      <Container>
        <Quiz />
      </Container>
    </Page>
  );
}
