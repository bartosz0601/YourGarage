import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Confirm, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientListItem from './ClientsListItem';

export default observer(function ClientsList() {

    const { clientStore } = useStore();
    const { clients, deleteClient } = clientStore
    const [confirmState, setConfirmState] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const deleteHandle = ((id: string) => {
        setConfirmState(true);
        setDeleteId(id);
    })


    return (
        <>
            <Confirm
                open={confirmState}
                onCancel={() => setConfirmState(false)}
                onConfirm={() => {
                    deleteClient(deleteId);
                    setConfirmState(false);
                }}
                confirmButton='Delete'
                header='Deleting client'
            />
            <List>
                {clients.map(client => (
                    <ClientListItem key={client.id} client={client} deleteHandle={deleteHandle} />
                ))}
            </List>
        </>
    )
})