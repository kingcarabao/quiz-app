import Page from '../../components/Page/index';
import QuizList from '../../components/QuizList';
import { Container } from '@mui/material';

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
