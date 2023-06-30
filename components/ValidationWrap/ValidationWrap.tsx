import { Form, Formik, FormikHelpers } from 'formik';
import React, { PropsWithChildren } from 'react'
import { AnyObject, Maybe, ObjectSchema } from 'yup';

interface ValidationWrapProps<T extends Maybe<AnyObject>> extends PropsWithChildren {
    validationSchema: ObjectSchema<T>;
    initialValues?: T;
    onSubmit: ((values: T, formikHelpers: FormikHelpers<T>) => void | Promise<T>) & ((values: T, { setSubmitting }: FormikHelpers<T>) => void);
}
function ValidationWrap<T extends Maybe<AnyObject>>(props: ValidationWrapProps<T>) {
    return (
        <Formik
            validationSchema={props.validationSchema}
            initialValues={props.initialValues || props.validationSchema.getDefault()}
            onSubmit={props.onSubmit}>
            {props.children}
        </Formik>
    )
}

export default ValidationWrap