import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Button, Container, Icon, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientForm from './ClientForm';
import ClientsList from './ClientsList';

export default observer(function ClientPage() {

    const { clientStore } = useStore();
    const { loadClients, setFormClient, formClientState } = clientStore

    useEffect(() => {
        loadClients();
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

            <ClientsList />
        </Container>
    )
})