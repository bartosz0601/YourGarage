import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item } from 'semantic-ui-react';
import { Car } from '../../app/models/car';
import { useStore } from '../../app/stores/store';

interface Props {
    car: Car
    clientName: string
    deleteHandle: Function
}

export default observer(function CarsListItem({ car, clientName, deleteHandle }: Props) {

    const { carStore: { setEditingCar, formCarState } } = useStore();

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='car' />
                        <Link to={'/cars/' + car.id}>{car.brand}  {car.model}</Link>
                    </Item.Header>
                    <Item.Meta>
                        {car.year}
                        {' '}
                        {car.vin}
                    </Item.Meta>
                    <Item.Description>
                        Description
                    </Item.Description>
                    <Item.Extra>
                        {clientName}
                    </Item.Extra>
                    <Button floated='right' color='red' disabled={formCarState}
                        onClick={() => deleteHandle(car.id)}>
                        Delete
                    </Button>
                    <Button floated='right' color='blue' disabled={formCarState}
                        onClick={() => setEditingCar(car.id)}>
                        Edit
                    </Button>
                </Item.Content>
            </Item>
        </Item.Group>
    )
})