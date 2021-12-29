import Page from '../../components/Page/index';
import Quiz from '../../components/Quiz';
import { Container } from '@mui/material';

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
