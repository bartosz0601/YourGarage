import React from 'react';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useStore } from '../../app/stores/store';
import { Button, Grid, GridColumn, GridRow, Icon, IconGroup, Message, Segment } from 'semantic-ui-react';
import MySelectInput from '../../common/form/MySelectInput';
import MyTextInput from '../../common/form/MyTextInput';
import MyTextArea from '../../common/form/MyTextArea';
import MyDateInput from '../../common/form/MyDateInput';

export default observer(function CarForm() {

    const { serviceStore, commonStore } = useStore();
    const { clientsNamesOptions } = commonStore;
    const { loadClient, serviceFormClient, carsNamesOptions, editingService,
        setFormService, createService, updateService } = serviceStore;

    const validationSchema = Yup.object({
        mileage: Yup.number().required('Please write mileage'),
        actions: Yup.string().required('Please write actions'),
        price: Yup.number().required('Please write price'),
        time: Yup.number().required('Please write time'),
        date: Yup.string().required('Date is required').nullable(),
        clientId: Yup.string().required('Please choose client'),
        carId: Yup.string().required('Please choose car')
    })

    function handleFormSubmit(service: any) {
        if (service.id) {
            updateService(service).then(() => setFormService(false));
        } else {
            createService(service).then(() => setFormService(false));
        }
    }

    return (
        <Segment clearing>
            {/* {editingClient.id ? <Header>Client edit</Header> : <Header>Client create</Header>} */}
            <Formik
                initialValues={editingService}
                validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty, values }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput name='clientId' placeholder='Choose Client' label='Client'
                            options={clientsNamesOptions}
                            onChange={(id: string) => {
                                loadClient(id)
                                values.carId = '';
                            }}

                        />
                        {values.clientId &&
                            <Message>
                                <Message.Header>Client information</Message.Header>
                                <Message.Content>
                                    <Grid columns={3} padded>
                                        <GridRow >
                                            <GridColumn>
                                                <Icon name='phone' />{serviceFormClient?.phone}
                                            </GridColumn>
                                            <GridColumn>
                                                <Icon name='mail'/>{serviceFormClient?.email}
                                            </GridColumn>
                                            <GridColumn>
                                                <Icon name='info circle'/>{serviceFormClient?.details}
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                                </Message.Content>
                            </Message>
                        }
                        <MySelectInput name='carId' placeholder='Choose car' label='Car' disabled={!values.clientId}
                            options={carsNamesOptions} />

                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            maxDate={new Date()}
                            disabled={!values.carId}
                        />

                        <MyTextArea name='actions' placeholder='Actions' label='Actions' rows={3} disabled={!values.carId} />
                        <MyTextInput name='mileage' placeholder='Mileage' label='Mileage' disabled={!values.carId} />
                        <MyTextInput name='time' placeholder='Time' label='Time in hours' disabled={!values.carId} />
                        <MyTextInput name='price' placeholder='Price' label='Price' disabled={!values.carId} />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button floated='right' type='button' content='Cancel'
                            onClick={() => setFormService(false)}
                        />
                    </Form>
                )}
            </Formik >
        </Segment >
    )
})