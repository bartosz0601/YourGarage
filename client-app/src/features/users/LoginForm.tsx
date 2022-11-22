import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import MyTextInput from '../../common/form/MyTextInput';

interface Props {
    extraSubmitFuncion?: () => void,
}

export default observer(function LoginForm(props: Props) {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ username: '', password: '', error: null }}

            onSubmit={(values, actions) => {
                userStore.login(values)
                    .catch(error => {
                        actions.setErrors({ error: 'Invalid username or password' })
                        actions.setSubmitting(false);
                    })
                    .then(() => {
                        if (props.extraSubmitFuncion) { props.extraSubmitFuncion() }
                    });
            }
            }>

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to YourGarage' textAlign='center' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
}) 