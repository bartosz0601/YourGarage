import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Icon, Loader, Segment, Statistic } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';


export default observer(function HomePage() {

    const { serviceStore, carStore, userStore, clientStore } = useStore();

    const [serviceStatistics, setServiceStatistics] = useState<number[]>([]);
    const [carsAmount, setCarsAmout] = useState<number>();
    const [clientAmount, setClientAmout] = useState<number>();

    useEffect(() => {
        serviceStore.loadStatistics().then((result) => {
            setServiceStatistics(result as number[]);
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
    }, [carStore.loadAmount])

    return (
        <Container text>
            <Segment.Group  style={{ maxWidth: '800px' }}>
                <Segment textAlign='center'>
                    <Header as='h1'>Hello {userStore.user?.username}! <br /> Manage your workshop</Header>
                </Segment>
                <Segment style={{ minHeight: '100px' }}>
                    {serviceStatistics.length > 0 && !isNaN(carsAmount!) && !isNaN(clientAmount!) ?
                        <Grid>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column width={7}>
                                    <Header as='h2' floated='right'><Icon name='wrench' size='large' /> Services</Header>
                                </Grid.Column>
                                <Grid.Column width={9} textAlign='center'>
                                    <Statistic.Group size='small'>
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
                                    <Header as='h2' floated='right'><Icon name='car'  />Cars</Header>
                                </Grid.Column>
                                <Grid.Column width={9} textAlign='center'>
                                    <Statistic.Group>
                                        <Statistic
                                            value={carsAmount!.toString()}
                                            label="Total">
                                        </Statistic>
                                    </Statistic.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column width={7} textAlign='center'>
                                    <Header as='h2' floated='right'><Icon name='users' />Users</Header>
                                </Grid.Column>
                                <Grid.Column width={9} textAlign='center'>
                                    <Statistic.Group>
                                        <Statistic
                                            value={clientAmount!.toString()}
                                            label="Total">
                                        </Statistic>
                                    </Statistic.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        :
                        <Loader active />
                    }
                </Segment>
            </Segment.Group>
        </Container >
    )
})