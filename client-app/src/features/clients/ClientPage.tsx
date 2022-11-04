import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Button, Container, Icon, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientListItem from './ClientsListItem';
import ClientForm from './ClientForm';

export default observer(function ClientPage() {

    const { clientStore } = useStore();
    const { loadClients, clients, setFormClient, formClientState } = clientStore

    useEffect(() => {
        loadClients();
        clientStore.setFormClient(false);
    }, [loadClients])

    return (
        <Container style={{ marginTop: "100px" }}>
            {!formClientState &&
                <Button animated='vertical' size='big' color='black' type='button'
                    onClick={() => setFormClient(true)}>
                    <Button.Content visible>Add</Button.Content>
                    <Button.Content hidden>
                        <Icon name='plus square outline'></Icon>
                    </Button.Content>
                </Button>}

            {formClientState && <ClientForm />}

            <List>
                {clients.map(client => (
                    <ClientListItem key={client.id} client={client} />
                ))}
            </List>
        </Container>
    )
})