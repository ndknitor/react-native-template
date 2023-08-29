import * as Yup from 'yup';
export default function SignInRequest(lang: string = "en") {
    return Yup.object().shape({
        email: Yup
            .string()
            .email('Invalid email')
            .required('Email is required')
            .default(""),
        password: Yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .default("")
    });
}