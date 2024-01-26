import * as Yup from 'yup';
import useLanguage from '../../context/hooks/useLanguage';

export default function SignInRequest() {
    const { language } = useLanguage();
    return Yup.object().shape({
        email: Yup
            .string()
            .email(language.validations.signInRequest.email.email)
            .required(language.validations.signInRequest.email.required)
            .max(48, language.validations.signInRequest.email.max)
            .default(""),
        password: Yup
            .string()
            .min(6, language.validations.signInRequest.password.min)
            .max(512, language.validations.signInRequest.password.max)
            .required(language.validations.signInRequest.password.required)
            .default(""),
        date : Yup
            .date()
            .required("Date is required")
    });
}