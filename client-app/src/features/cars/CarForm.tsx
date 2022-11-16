import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/form/MyTextInput';
import MySelectInput from '../../common/form/MySelectInput';
import { useStore } from '../../app/stores/store';
import { CarFormValues } from '../../app/models/car';
import { dropDownOption } from '../../app/models/dropDownOption';

interface Props {
    extraSubmitFuncion?: Function,
    disableClient?: boolean
}

export default observer(function CarForm(props: Props) {

    const { carStore, commonStore, modalStore } = useStore();
    const { editingCar, updateCar, createCar } = carStore;
    const { clientsNamesOptions } = commonStore;

    const validationSchema = Yup.object({
        brand: Yup.string().required('The car brand is required'),
        model: Yup.string().required('The car model is required'),
        year: Yup.number().required(),
        vin: Yup.string().required(),
        clientId: Yup.string().required()
    })

    let yearsOptions: dropDownOption<number>[] = [];

    //update years list
    for (let i = new Date().getFullYear(); i >= 1950; i--) {
        yearsOptions.push({ text: i.toString(), value: i });
    }

    function handleFormSubmit(car: CarFormValues) {
        if (car.id) {
            updateCar(car).then(() => modalStore.closeModal());

        } else {
            createCar(car).then(() => {
                if (props.extraSubmitFuncion) props.extraSubmitFuncion();
                modalStore.closeModal();
                
            });
        }
    }

    return (
        <Segment clearing>
            {editingCar.id ? <Header>Edit car</Header> : <Header>Create car</Header>}
            <Formik
                initialValues={editingCar}
                validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='brand' placeholder='Brand' label='Brand' />
                        <MyTextInput name='model' placeholder='Model' label='Model' />
                        <MySelectInput name='year' placeholder='Year' label='Built year' options={yearsOptions} />
                        <MyTextInput name='vin' placeholder='Vin' label='VIN' />
                        <MySelectInput name='clientId' placeholder='Client' label='Client'
                            options={clientsNamesOptions} disabled={props.disableClient} />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button floated='right' type='button' content='Cancel'
                            onClick={() => modalStore.closeModal()} />
                    </Form>
                )}
            </Formik >
        </Segment>
    )
})