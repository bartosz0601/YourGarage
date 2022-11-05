import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { Container, Icon, Item, List } from 'semantic-ui-react';
import CarServiceListIem from './CarServiceListIem';

export default observer(function CarDetails() {
    const { carStore } = useStore();
    const { loadCar, car } = carStore
    const { id } = useParams();

    useEffect(() => {
        loadCar(id!);
    }, [id])

    return (
        <>
            <Container style={{ marginTop: "100px" }}>
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
            </Container>
        </>
    )
})