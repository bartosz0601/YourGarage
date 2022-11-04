
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { Client, ClientFormValues } from "../../app/models/client";
import { v4 as uuid } from 'uuid';
import { useStore } from "../../app/stores/store";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import MyTextArea from "../../common/form/MyTextArea";
import { observer } from 'mobx-react-lite';

export default observer( function ClientForm() {

    const { clientStore } = useStore();
    const { setFormClient, editingClient } = clientStore;
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
            clientStore.updateClient(client).then(() => setFormClient(false));
        } else {
            client.id = uuid();
            clientStore.createClient(client).then(() => setFormClient(false));
        }
    }

    return (
        <Segment clearing>
            {editingClient.id ? <Header>Client edit</Header> : <Header>Client create</Header>}
            <Formik
                initialValues={editingClient!}
                validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='firstName' placeholder='First name' />
                        <MyTextInput name='lastName' placeholder='Last name' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='phone' placeholder='Phone' />
                        <MyTextArea rows={3} placeholder='Details' name='details' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button floated='right' type='button' content='Cancel' onClick={() => setFormClient(false)} />
                    </Form>
                )}
            </Formik>
        </Segment>)
})