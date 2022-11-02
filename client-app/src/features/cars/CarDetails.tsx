import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { Container, Icon, Item } from 'semantic-ui-react';

export default observer(function CarDetails() {
    const { carStore } = useStore();
    const { loadCar, car } = carStore
    const { id } = useParams();

    useEffect(() => {
        loadCar(id!);
    }, [car])

    return (
        <Container style={{ marginTop: "100px" }}>
        <Item.Group >
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='car' style={{ marginLeft: '20px' }} />
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
                        Owner
                    </Item.Extra>
                </Item.Content>
            </Item>
            </Item.Group>
        </Container>
    )
})