import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Item } from 'semantic-ui-react';
import { Client } from '../../app/models/client';

interface Props {
    client: Client
}

export default function ClientListItem({ client }: Props) {

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='user' style={{ marginLeft: '20px' }} />
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
                        {client.cars.map(c => (                            
                            <NavLink key={c.id} to={'/cars/' + c.id}>{c.brand + ' ' + c.model + ' ' + c.year}</NavLink>
                        ))}
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}