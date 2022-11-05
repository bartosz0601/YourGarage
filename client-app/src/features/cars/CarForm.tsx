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

export default observer(function CarForm() {

    const { carStore } = useStore();
    const { editingCar, setFormCar, updateCar, createCar, clientsNames } = carStore;

    const validationSchema = Yup.object({
        brand: Yup.string().required('The car brand is required'),
        model: Yup.string().required('The car model is required'),
        year: Yup.number().required(),
        vin: Yup.string().required(),
        clientId: Yup.string().required()
    })

    let yearsOptions: dropDownOption<number>[] = [];
    let clientsNamesOptions: dropDownOption<string>[] = [];

    //update years list
    for (let i = new Date().getFullYear(); i >= 1950; i--) {
        yearsOptions.push({ text: i.toString(), value: i });
    }

    //update clients names list
    clientsNames.forEach((cn => { 
        clientsNamesOptions.push({ text: cn.name, value: cn.id })
    }))

    function handleFormSubmit(car: CarFormValues) {
        if (car.id) {
            updateCar(car).then(() => setFormCar(false));
        } else {
            createCar(car).then(() => setFormCar(false));
        }
    }

    return (
        <Segment clearing>
            {/* {editingClient.id ? <Header>Client edit</Header> : <Header>Client create</Header>} */}
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
                        <MySelectInput name='clientId' placeholder='Client' label='Client' options={clientsNamesOptions}/>
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button floated='right' type='button' content='Cancel'
                            onClick={() => setFormCar(false)} />
                    </Form>
                )}
            </Formik >
        </Segment>
    )
})