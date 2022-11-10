import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useStore } from '../../app/stores/store';
import { Button, Grid, GridColumn, GridRow, Header, Icon, Message, Segment, Form } from 'semantic-ui-react';
import MySelectInput from '../../common/form/MySelectInput';
import MyTextInput from '../../common/form/MyTextInput';
import MyTextArea from '../../common/form/MyTextArea';
import MyDateInput from '../../common/form/MyDateInput';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceFormValues } from '../../app/models/service';
import { dropDownOption } from '../../app/models/dropDownOption';
import { Client } from '../../app/models/client';
import ClientForm from '../clients/ClientForm';
import CarForm from '../cars/CarForm';

export default observer(function ServiceForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { serviceStore, commonStore, clientStore, carStore, modalStore } = useStore();
    const { clientsNamesOptions, loadClientsName } = commonStore;
    const { loadService, loadClient, createService, updateService } = serviceStore;

    const [service, setService] = useState<ServiceFormValues>(new ServiceFormValues());
    const [client, setClient] = useState<Client>();
    const [carsNamesOptions, setCarsNamesOptions] = useState<dropDownOption<string>[]>([]);

    useEffect(() => {
        loadClientsName();
    }, [loadClientsName])

    useEffect(() => {
        if (service.clientId) {
            readClient(service.clientId);
        }
    }, [service.clientId])

    useEffect(() => {
        if (id) {
            loadService(id).then(s => {
                setService(new ServiceFormValues(s));
            });
        }
    }, [id, loadService])

    const readClient = (clientId: string) => {
        loadClient(clientId).then(c => {
            setClient(c);
            let names: dropDownOption<string>[] = [];
            c!.cars!.forEach((c => {
                names.push({ text: c.brand + ' ' + c.model + ' ' + c.year, value: c.id });
            }))
            setCarsNamesOptions(names);
        });
    }

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
            updateService(service).then(() => navigate('/services'));
        } else {
            createService(service).then(() => navigate('/services'));
        }
    }

    return (
        <Segment clearing style={{ marginTop: '100px' }}>
            {service.id ? <Header>Edit service</Header> : <Header>Create service</Header>}
            <Formik
                initialValues={service}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty, values }) => {
                    return (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Grid verticalAlign='bottom'>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={13}>
                                        <MySelectInput name='clientId' placeholder='Choose Client' label='Client'
                                            options={clientsNamesOptions}
                                            onChange={(id: string) => {
                                                setService({ ...service, clientId: id });
                                                values.carId = '';
                                            }} />
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button floated='right' content='Create new' color='green' type='button' fluid
                                            onClick={() => {
                                                clientStore.initFormClient();
                                                modalStore.openModal(<ClientForm extraSubmitFuncion={() => loadClientsName()} />);
                                            }} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            {values.clientId &&
                                <Message>
                                    <Message.Header>Client information</Message.Header>
                                    <Message.Content>
                                        <Grid columns={3} padded>
                                            <GridRow>
                                                <GridColumn>
                                                    <Icon name='phone' />{client?.phone}
                                                </GridColumn>
                                                <GridColumn>
                                                    <Icon name='mail' />{client?.email}
                                                </GridColumn>
                                                <GridColumn>
                                                    <Icon name='info circle' />{client?.details}
                                                </GridColumn>
                                            </GridRow>
                                        </Grid>
                                    </Message.Content>
                                </Message>}
                            <Grid verticalAlign='bottom'>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={13}>
                                        <MySelectInput name='carId' placeholder='Choose car' label='Car' disabled={!values.clientId}
                                            options={carsNamesOptions} />
                                    </Grid.Column>
                                    <Grid.Column width={3}>

                                        <Button floated='right' content='Create new' color='green' type='button' disabled={!values.clientId} fluid
                                            onClick={() => {
                                                carStore.initFormCar(values.clientId);
                                                modalStore.openModal(<CarForm disableClient={true} extraSubmitFuncion={() => readClient(service.clientId)} />);
                                            }}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <MyDateInput
                                label="Date"
                                dataPicker={{
                                    placeholderText: 'Date',
                                    name: 'date',
                                    dateFormat: "MMMM d, yyyy h:mm aa",
                                    showTimeSelect: true,
                                    maxDate: new Date(),
                                    disabled: !values.carId
                                }}
                            />

                            <MyTextArea name='actions' placeholder='Actions' label='Actions' rows={3} disabled={!values.carId} />
                            <MyTextInput name='mileage' placeholder='Mileage' label='Mileage' disabled={!values.carId} />
                            <MyTextInput name='time' placeholder='Time' label='Time in hours' disabled={!values.carId} />
                            <MyTextInput name='price' placeholder='Price' label='Price' disabled={!values.carId} />

                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                            <Button floated='right' type='button' content='Cancel'
                                onClick={() => navigate('/services')} />
                        </Form>
                    );
                }}
            </Formik >
        </Segment >
    )
})