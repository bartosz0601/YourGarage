import React from 'react';
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
                        <Icon name='car' style={{ marginLeft: '20px' }} />
                        {car.brand}  {car.model}
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
                        Owner
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}