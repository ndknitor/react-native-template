import * as Yup from 'yup';

export default Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required')
        .max(48, "Email can't longer than 48 characters")
        .default(""),
    password: Yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(512, "Password can't longer than 512 characters")
        .required('Password is required')
        .default("")
});