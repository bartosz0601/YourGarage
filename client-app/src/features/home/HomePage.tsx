import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Icon, Label, Loader, Statistic } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';


export default function HomePage() {

    const { serviceStore, carStore, clientStore } = useStore();

    const [serviceStatistics, setServiceStatistics] = useState<Number[]>([]);
    const [carsAmount, setCarsAmout] = useState<Number>();
    const [clientAmount, setClientAmout] = useState<Number>();

    useEffect(() => {
        serviceStore.loadStatistics().then((result) => {
            setServiceStatistics(result as Number[]);
        });
    }, [serviceStore.loadStatistics])

    useEffect(() => {
        carStore.loadAmount().then((result) => {
            setCarsAmout(result);
        })
    }, [carStore.loadAmount])

    useEffect(() => {
        clientStore.loadAmount().then((result) => {
            setClientAmout(result);
        })
    }, [clientStore.loadAmount])

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid>
                <Grid.Row textAlign="center" columns={1}>
                    <Grid.Column width={16}>
                        <Header as='h1'>Manage your workshop!</Header>
                    </Grid.Column>
                </Grid.Row>
                {serviceStatistics.length > 0 && carsAmount && clientAmount ?
                    <>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width={7}>
                                <Header as='h1' floated='right'><Icon name='wrench' /> Services</Header>
                            </Grid.Column>
                            <Grid.Column width={9} textAlign='center'>
                                <Statistic.Group>
                                    <Statistic
                                        value={serviceStatistics[3].toString()}
                                        label="7 days">
                                    </Statistic>
                                    <Statistic
                                        value={serviceStatistics[2].toString()}
                                        label="30 days">
                                    </Statistic>
                                    <Statistic
                                        value={serviceStatistics[1].toString()}
                                        label="1 year">
                                    </Statistic>
                                    <Statistic
                                        value={serviceStatistics[0].toString()}
                                        label="Total">
                                    </Statistic>
                                </Statistic.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width={7} textAlign='center'>
                                <Header as='h1' floated='right'><Icon name='car' />Cars</Header>
                            </Grid.Column>
                            <Grid.Column width={9} textAlign='center'>
                                <Statistic.Group>
                                    <Statistic
                                        value={carsAmount.toString()}
                                        label="Total">
                                    </Statistic>
                                </Statistic.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width={7} textAlign='center'>
                                <Header as='h1' floated='right'><Icon name='users' />Users</Header>
                            </Grid.Column>
                            <Grid.Column width={9} textAlign='center'>
                                <Statistic.Group>
                                    <Statistic
                                        value={clientAmount.toString()}
                                        label="Total">
                                    </Statistic>
                                </Statistic.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </> :
                    <Loader active />
                }
            </Grid>
        </Container>
    )
}