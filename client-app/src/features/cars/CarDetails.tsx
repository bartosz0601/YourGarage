import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { Card, Container, Grid, Icon, Item, Label, List, Loader, Segment } from 'semantic-ui-react';
import CarServiceListIem from './CarServiceListIem';
import CarsListItem from './CarsListItem';

export default observer(function CarDetails() {
    const { carStore } = useStore();
    const { loadCar, car, loadingInitial } = carStore
    const { id } = useParams();

    useEffect(() => {
        loadCar(id!);
    }, [id])

    return (
        <>{!loadingInitial &&
            <Container>
                <Grid columns={3}>
                    <Grid.Column width={2} />
                    <Grid.Column width={10}>
                        <Segment textAlign='center'>
                            <Item>
                                <Item.Content>
                                    <List horizontal>
                                        <List.Item>
                                            <Item.Header as='h3'>
                                                <Icon name='car' />
                                                {car?.brand} {car?.model}
                                            </Item.Header>
                                        </List.Item>
                                        <List.Item>
                                            <Item.Meta>
                                                <Icon name='calendar plus outline' />
                                                {car?.year}
                                            </Item.Meta>
                                        </List.Item>
                                        <List.Item>
                                            <Item.Meta>
                                                <Icon name='barcode' />
                                                {car?.vin}
                                            </Item.Meta>
                                        </List.Item>
                                        <List.Item>
                                            <Item.Meta>
                                                <Label size='large'>
                                                    <Icon name='user'></Icon>
                                                    {car?.client!.firstName + ' ' + car?.client!.lastName}
                                                </Label>
                                            </Item.Meta>
                                        </List.Item>
                                    </List>
                                </Item.Content>
                            </Item>
                        </Segment>
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