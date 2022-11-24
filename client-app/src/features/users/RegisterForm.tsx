import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import MyTextInput from '../../common/form/MyTextInput';

interface Props {
    extraSubmitFuncion?: () => void,
}

export default observer(function RegisterForm(props: Props) {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', error: null }}
            onSubmit={(values, actions) => {
                userStore.register(values)
                    .catch(error => {
                        actions.setErrors({ error })
                        actions.setSubmitting(false);
                    })
                    .then(() => {
                        if (props.extraSubmitFuncion) { props.extraSubmitFuncion() }
                    });
            }}

            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to YourGarage' textAlign='center' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} color='black' content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
}) 