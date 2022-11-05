import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import {List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientListItem from './ClientsListItem';

export default observer(function ClientsList() {

    const { clientStore } = useStore();
    const { clients } = clientStore

    return (
        <List>
            {clients.map(client => (
                <ClientListItem key={client.id} client={client} />
            ))}
        </List>
    )
})