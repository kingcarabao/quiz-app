import { Container } from '@mui/material';
import Page from '../../components/Page/index';
import QuizList from '../../components/QuizList';

/**
 *
 * Quiz List Page Component
 */

export default function QuizPage() {
  return (
    <Page>
      <Container>
        <QuizList />
      </Container>
    </Page>
  );
}
