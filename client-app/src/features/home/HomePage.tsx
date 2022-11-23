import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Header, Icon, Loader, Statistic } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';


export default observer(function HomePage() {

    const { serviceStore, carStore, userStore, clientStore} = useStore();

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

        <Container>
            <Grid>
                <Grid.Row textAlign="center" columns={1}>
                    <Grid.Column width={16}>
                        <Header as='h1'>Hello {userStore.user?.username}! <br/> Manage your workshop!</Header>
                    </Grid.Column>
                </Grid.Row>
                {serviceStatistics.length > 0 && !isNaN(carsAmount!) && !isNaN(clientAmount!) ?
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
                                        value={carsAmount!.toString()}
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
                                        value={clientAmount!.toString()}
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
})