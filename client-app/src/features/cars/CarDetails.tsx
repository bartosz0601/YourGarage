import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { Container, Grid, Icon, Item, List, Loader } from 'semantic-ui-react';
import CarServiceListIem from './CarServiceListIem';

export default observer(function CarDetails() {
    const { carStore } = useStore();
    const { loadCar, car, loadingInitial } = carStore
    const { id } = useParams();

    useEffect(() => {
        loadCar(id!);
    }, [id])

    return (
        <>{!loadingInitial &&
            <Container style={{ marginTop: "100px" }}>
                <Grid columns={3} padded>
                    <Grid.Column width={2} />
                    <Grid.Column width={10} >
                        <Item.Group >
                            <Item>
                                <Item.Content>
                                    <Item.Header fixed='left'>
                                        <Icon name='car' />
                                        {car?.brand}  {car?.model}
                                    </Item.Header>
                                    <Item.Meta>
                                        {car?.year}
                                        {' '}
                                        {car?.vin}
                                    </Item.Meta>
                                    <Item.Description>
                                        Description
                                    </Item.Description>
                                    <Item.Extra>
                                        {car?.client!.firstName + ' ' + car?.client!.lastName}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                        {!!car?.services ? <List>
                            {car?.services.map(s => (
                                <CarServiceListIem key={s.id} service={s} />
                            ))}
                        </List> : <h3>No services</h3>}
                    </Grid.Column>
                    <Grid.Column width={4} />
                </Grid>
            </Container>}
            <Loader active={loadingInitial} />
        </>
    )
})