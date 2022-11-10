import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import CarsList from './CarsList';
import CarForm from './CarForm';
import { useStore } from '../../app/stores/store';

export default observer(function CarsPage() {
    const { carStore, commonStore, modalStore } = useStore();
    const { loadCars, initFormCar } = carStore;
    const { loadClientsName } = commonStore;

    useEffect(() => {
        loadClientsName();
    }, [loadClientsName])

    useEffect(() => {
        loadCars();
    }, [loadCars])

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Row centered>
                    <Grid.Column width={2}>
                        <Button animated='vertical' size='big' color='black' type='button' fluid
                            onClick={() => {
                                initFormCar();
                                modalStore.openModal(<CarForm/>)
                            }}>
                            <Button.Content visible>Add</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus square outline'></Icon>
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <CarsList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
})