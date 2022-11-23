import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Header, Segment, } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';


export default observer(function StartPage() {

    const { modalStore, userStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userStore.isLoggedIn) navigate("/home")
    }, [userStore.isLoggedIn])

    return (
        <Container className='startpage'>
            <Segment size='big' textAlign='center' >
                <Header as='h1'>Welcome on YourGarage</Header>
                {!userStore.isLoggedIn &&
                    <Grid columns={2}>
                        <Grid.Column >
                            <Button fluid size='big' color='black' type='button'
                                onClick={() => {
                                    modalStore.openModal(<LoginForm
                                        extraSubmitFuncion={() => {
                                            if (userStore.user) {
                                                modalStore.closeModal();
                                                navigate("/home");
                                            }
                                        }} />);
                                }}>
                                Login
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button fluid size='big' color='black' type='button'
                                onClick={() => {
                                    modalStore.openModal(<RegisterForm
                                        extraSubmitFuncion={() => {
                                            if (userStore.user) {
                                                modalStore.closeModal();
                                                navigate("/home");
                                            }
                                        }} />);
                                }}>
                                Register
                            </Button>
                        </Grid.Column>
                    </Grid>


                }
            </Segment >
        </Container>
    )

})