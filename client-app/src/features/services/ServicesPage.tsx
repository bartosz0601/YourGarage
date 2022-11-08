import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, GridColumn, GridRow, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServicesList from './ServicesList';
import ServiceForm from './ServiceForm';

export default observer(function ServicesPage() {

    const { serviceStore, commonStore } = useStore();
    const { loadServices, formServiceState, setFormService } = serviceStore;
    const { loadClientsName } = commonStore;

    useEffect(() => {
        loadClientsName();
    }, [loadClientsName])

    useEffect(() => {
        loadServices();
    }, [loadServices])

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Row centered>
                    <Grid.Column width={2}>
                        {!formServiceState &&
                            <Button animated='vertical' size='big' color='black' type='button'
                                onClick={() => setFormService(true)}
                            >
                                <Button.Content visible>Add</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='plus square outline'></Icon>
                                </Button.Content>
                            </Button>
                        }
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <ServicesList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {formServiceState && < ServiceForm />}
        </Container>
    )
})