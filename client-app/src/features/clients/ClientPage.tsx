import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientForm from './ClientForm';
import ClientsList from './ClientsList';

export default observer(function ClientPage() {

    const { clientStore, modalStore } = useStore();
    const { loadClients, initFormClient } = clientStore

    useEffect(() => {
        loadClients();
    }, [loadClients])

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Row centered>
                    <Grid.Column width={2}>
                        <Button animated='vertical' size='big' color='black' type='button'
                            onClick={() => {
                                initFormClient();
                                modalStore.openModal(<ClientForm />);
                            }}>
                            <Button.Content visible>Add</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus square outline'></Icon>
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <ClientsList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
})