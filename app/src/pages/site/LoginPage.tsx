import Page from '../../components/Page/index';
import LoginForm from '../../components/LoginForm';
import { Container, Grid, Card, CardContent, CardHeader, Typography } from '@mui/material';

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
        alignItems="center"
        sx={{height: '100vh'}}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card>
            <CardHeader
              title="Login to Quiz App"
            />
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
