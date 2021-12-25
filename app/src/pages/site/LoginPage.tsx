import Page from '../../components/Page/index';
import LoginForm from '../../components/LoginForm';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

/**
 *
 * Login Page Component
 */

export default function LoginPage() {
  return (
    <Page>
      <Grid
        container
        justifyContent="center"
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
