import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});

const initialValues = {
    email: 'foobar@example.com',
    password: 'foobar',
};

export default function LoginForm() {
    const onSubmitHandler = (values) => {
        JSON.stringify(values, null, 2)
    };


    /**
     * Formik declaration
     */
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: onSubmitHandler
    });

    const { values, touched, handleSubmit, errors, getFieldProps } = formik;

    
    /**
     * Form component
     * @returns 
     */
    const RenderForm = () => {
        return (
            <>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        label="Email"
                        type="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        {...getFieldProps('email')}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        {...getFieldProps('password')}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </>
        )
    };

    return RenderForm()
}