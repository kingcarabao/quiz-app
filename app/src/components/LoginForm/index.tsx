import { useFormik } from "formik";
import { TextField, Button, Stack, Grid, Alert } from "@mui/material";
import { validationSchema } from "./validation";
import useAuth from "../../hooks/useAuth";

interface FormValues {
  email: string;
  password: string;
  afterSubmit?: null;
}

const initialValues = {
  email: "king@email.com",
  password: "kingpass",
};

export default function LoginForm() {
  const [auth, error] = useAuth();

  /**
   * Everything to do when submitting
   */
  const onSubmitHandler = async (
    values: FormValues,
    { setErrors, setSubmitting }: any
  ) => {
    if (auth) {
      const [, err] = await auth.login(values);
      if (err) {
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

  const { touched, handleSubmit, errors, getFieldProps, isSubmitting } = formik;

  /**
   * Form component
   */
  function RenderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <Stack sx={{ mb: 2 }}>
          {!errors.afterSubmit ? null : (
            <Alert variant="filled" severity="error">
              {errors.afterSubmit}
            </Alert>
          )}
        </Stack>
        <Stack sx={{ mb: 2 }}>
          <TextField
            autoComplete="username"
            label="Email"
            type="email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            {...getFieldProps("email")}
          />
        </Stack>
        <Stack sx={{ mb: 2 }}>
          <TextField
            label="Password"
            type="password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            {...getFieldProps("password")}
          />
        </Stack>
        <Grid container justifyContent="flex-end">
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Sign In
          </Button>
        </Grid>
      </form>
    );
  }

  return RenderForm();
}
