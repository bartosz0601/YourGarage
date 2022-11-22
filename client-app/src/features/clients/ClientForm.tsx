
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { ClientFormValues } from "../../app/models/client";
import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import MyTextArea from "../../common/form/MyTextArea";
import { observer } from 'mobx-react-lite';

interface Props {
    extraSubmitFuncion?: (text: string) => void,
}

export default observer(function ClientForm(props: Props) {

    const { clientStore, modalStore } = useStore();
    const { editingClient, updateClient, createClient } = clientStore;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        firstName: Yup.string().required('The client first name is required'),
        lastName: Yup.string().required('The client last name is required'),
        email: Yup.string().required().email(),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
        details: Yup.string().required(),
    })

    function handleFormSubmit(client: ClientFormValues) {
        if (client.id) {
            updateClient(client).then(() => modalStore.closeModal());
        } else {
            createClient(client).then((id) => {
                if (props.extraSubmitFuncion) props.extraSubmitFuncion(id!);
                modalStore.closeModal();
            });
        }
    }

    return (
        // <Segment clearing>

        <Formik
            initialValues={editingClient}
            validationSchema={validationSchema}
            onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    {editingClient.id ? <Header>Edit client</Header> : <Header>Create client</Header>}
                    <MyTextInput name='firstName' placeholder='First name' label='First name' />
                    <MyTextInput name='lastName' placeholder='Last name' label='Last name' />
                    <MyTextInput name='email' placeholder='example@example.pl' label='Email address' />
                    <MyTextInput name='phone' placeholder='xxxxxxxxx' label='Phone number' />
                    <MyTextArea rows={3} placeholder='Details' name='details' label="Details" />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                    <Button
                        floated='right' type='button' content='Cancel'
                        onClick={() => modalStore.closeModal()}
                        style={{ marginBottom: '10px' }} />
                </Form>
            )}
        </Formik>
        // </Segment>
    )
})