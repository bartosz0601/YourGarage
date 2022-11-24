import React from 'react';
import { format } from 'date-fns';
import { Button, Container, Grid, GridColumn, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import { Service } from '../../app/models/service';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    service: Service,
    deleteHandle: Function
}

export default observer(function ServiceListItem({ service, deleteHandle }: Props) {

    return (
        <Segment>
            <Item.Group >
                <Item>
                    <Item.Content>
                        <Item.Header as={Link} to={'/cars/' + service.carId}>
                            <Icon name='car' />
                            {service.carName}
                        </Item.Header>
                        <Item.Meta>
                            <List horizontal>
                                <List.Item>
                                    <Icon name='calendar alternate' />
                                    {" " + format(new Date(service.date!), 'MMMM d, yyyy h:mm aa')}
                                </List.Item>
                                <List.Item>
                                    <Icon name='money' />
                                    {" " + service.price.toString()}zł
                                </List.Item>
                                <List.Item>
                                    <Icon name='clock outline' />
                                    {" " + service.time.toString()}h
                                </List.Item>
                                <List.Item>
                                    <Icon name='tachometer alternate' />
                                    {" " + service.mileage.toString()}km
                                </List.Item>
                            </List>
                        </Item.Meta>
                        <Item.Description>
                            {service.actions}
                        </Item.Description>
                        <Item.Extra>
                            <Label size='large'>
                                <Icon name='user'></Icon>
                                {service.clientName}
                            </Label>
                        </Item.Extra>
                        <Button floated='right' color='blue'
                            onClick={() => deleteHandle(service.id)}
                        >
                            Delete
                        </Button>
                        <Button floated='right'
                            as={Link} to={'/editService/' + service.id}>
                            Edit
                        </Button>
                    </Item.Content>
                </Item>
            </Item.Group >
        </Segment>
    )
})