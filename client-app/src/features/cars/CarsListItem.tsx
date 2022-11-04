import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Item } from 'semantic-ui-react';
import { Car } from '../../app/models/car';

interface Props {
    car: Car
}

export default function CarsListItem({ car }: Props) {

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='car'/>
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
                        {car.client!.firstName + ' ' + car.client!.lastName}
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}