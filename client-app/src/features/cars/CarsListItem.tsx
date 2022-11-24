import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import { Car } from '../../app/models/car';
import { useStore } from '../../app/stores/store';
import CarForm from './CarForm';

interface Props {
    car: Car
    clientName: string
    deleteHandle?: Function
}

export default observer(function CarsListItem({ car, clientName, deleteHandle }: Props) {

    const { carStore, modalStore } = useStore();

    return (
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header as={Link} to={'/cars/' + car.id}>
                            <Icon name='car' />
                            {car.brand} {car.model}
                        </Item.Header>
                        <Item.Meta>
                            <List horizontal>
                                <List.Item>
                                    <Icon name='calendar plus outline' />
                                    {car.year}
                                </List.Item>
                                <List.Item>
                                    <Icon name='barcode' />
                                    {car.vin}
                                </List.Item>
                            </List>
                        </Item.Meta>
                        <Item.Extra>
                            <Label size='large'>
                                <Icon name='user'></Icon>
                                {clientName}
                            </Label>
                        </Item.Extra>

                        <Button floated='right' color='blue'
                            onClick={() => { if (deleteHandle) deleteHandle(car.id) }}>
                            Delete
                        </Button>
                        <Button floated='right'
                            onClick={() => {
                                carStore.setEditingCar(car.id);
                                modalStore.openModal(<CarForm />);
                            }}>
                            Edit
                        </Button>

                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
})