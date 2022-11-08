import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Icon, Item } from 'semantic-ui-react';
import { Client } from '../../app/models/client';
import { useStore } from '../../app/stores/store';

interface Props {
    client: Client
    deleteHandle: Function
}

export default observer(function ClientListItem({ client, deleteHandle }: Props) {

    const { clientStore: { setEditingClient, formClientState, deleteClient } } = useStore();

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='user' />
                        {client.firstName}  {client.lastName}
                    </Item.Header>
                    <Item.Meta>
                        <Icon name='phone' />
                        {client.phone}
                        <Icon name='mail' />
                        {client.email}
                    </Item.Meta>
                    <Item.Description>
                        {client.details}
                    </Item.Description>
                    <Item.Extra>
                        {client.cars?.map(c => (
                            <NavLink key={c.id} to={'/cars/' + c.id}>{c.brand + ' ' + c.model + ' ' + c.year}</NavLink>
                        ))}
                    </Item.Extra>
                    <Button floated='right' color='red' disabled={formClientState}
                        onClick={() => deleteHandle(client.id)}>
                        Delete
                    </Button>
                    <Button floated='right' color='blue' disabled={formClientState}
                        onClick={() => setEditingClient(client.id)}>
                        Edit
                    </Button>
                </Item.Content>
            </Item>

        </Item.Group>
    )
})