import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, GridColumn, GridRow, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServicesList from './ServicesList';
import ServiceForm from './ServiceForm';
import { Link} from 'react-router-dom';

export default observer(function ServicesPage() {

    const { serviceStore} = useStore();
    const { loadServices } = serviceStore;

    useEffect(() => {
        loadServices();
    }, [loadServices])

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Row centered>
                    <Grid.Column width={2}>
                        <Button animated='vertical' size='big' color='black' type='button' fluid
                            as={Link} to='/createService'
                        >
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus square outline'></Icon>
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column width={14}>
                    <ServicesList />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container >
    )
})