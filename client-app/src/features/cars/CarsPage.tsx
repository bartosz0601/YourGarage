import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Icon } from 'semantic-ui-react';
import CarsList from './CarsList';
import CarForm from './CarForm';
import { useStore } from '../../app/stores/store';

export default observer( function CarsPage() {
    const { carStore } = useStore();
    const { loadCars, loadClientsName, formCarState, setFormCar } = carStore

    useEffect(() => {
        loadClientsName();
    }, [loadClientsName])

    useEffect(() => {
        loadCars();
    }, [loadCars])

    return (
        <Container style={{ marginTop: "100px" }}>
            {!formCarState &&
                <Button animated='vertical' size='big' color='black' type='button'
                onClick={() => setFormCar(true)}>
                <Button.Content visible>Add</Button.Content>
                <Button.Content hidden>
                    <Icon name='plus square outline'></Icon>
                </Button.Content>
            </Button>}

            {formCarState && <CarForm />}

            <CarsList/>
        </Container>
    )
})