import { useFormik } from 'formik';
import { validationSchema } from './validation';
import { TextField, Button, Stack, Grid, Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth';

interface FormValues {
  email: string;
  password: string;
  afterSubmit?: null;
}

const initialValues = {
  email: 'foo@example.com',
  password: 'foobar',
};

export default function LoginForm() {
  const [auth, error] = useAuth();
  if (error) alert(error); 

  /**
   * Everything to do when submitting
   */
  const onSubmitHandler = async (values: FormValues, { setErrors, setSubmitting }: any) => {
    if(auth){
      const [, err] = await auth.login(values);
      if (err){
        setErrors({ afterSubmit: err.message });
      }
      setSubmitting(false);
    }
  };

  /**
   * Formik declaration
   */
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
  });

  const { touched, handleSubmit, errors, getFieldProps } = formik;

  /**
   * Form component
   */
  function RenderForm() {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Stack sx={{ mb: 2 }}>
            {
              !errors.afterSubmit
              ? null
              : <Alert variant="filled" severity="error">{errors.afterSubmit}</Alert>
            }
          </Stack>
          <Stack sx={{ mb: 2 }}>
            <TextField
              autoComplete="username"
              label="Email"
              type="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              {...getFieldProps('email')}
            />
          </Stack>
          <Stack sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              {...getFieldProps('password')}
            />
          </Stack>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </Grid>
        </form>
      </>
    );
  }

  return RenderForm();
}
