import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Grid, Header, Icon, Item, Label, List, ListDescription, Segment } from 'semantic-ui-react';
import { Client } from '../../app/models/client';
import { useStore } from '../../app/stores/store';
import ClientForm from './ClientForm';

interface Props {
    client: Client
    deleteHandle: Function
}

export default observer(function ClientListItem({ client, deleteHandle }: Props) {

    const { clientStore, modalStore } = useStore();

    return (
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header fixed='left'>
                            <Icon name='user' />
                            {client.firstName}  {client.lastName}
                        </Item.Header>
                        <Item.Meta>
                            <List horizontal>
                                <List.Item>
                                    <Icon name='phone' />
                                    {client.phone}
                                </List.Item>
                                <List.Item>
                                    <Icon name='mail' />
                                    {client.email}
                                </List.Item>
                            </List>
                        </Item.Meta>
                        <Item.Description>
                            {client.details}
                        </Item.Description>
                        <Item.Extra>
                            <List horizontal>
                                {client.cars?.map(c => (
                                    <List.Item key={c.id}>
                                        <Label as={Link} to={'/cars/' + c.id}>
                                            <Icon name='car'></Icon>
                                            {c.brand + ' ' + c.model + ' ' + c.year}
                                        </Label>
                                    </List.Item>
                                ))}
                            </List>
                        </Item.Extra>
                        <Button floated='right' color='blue'
                            onClick={() => deleteHandle(client.id)}>
                            Delete
                        </Button>
                        <Button floated='right'
                            onClick={() => {
                                clientStore.setEditingClient(client.id);
                                modalStore.openModal(<ClientForm />);
                            }}>
                            Edit
                        </Button>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
})