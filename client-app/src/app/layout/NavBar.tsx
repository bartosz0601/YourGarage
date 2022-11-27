import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Menu,  Button } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {

    const { userStore: { logout, isLoggedIn } } = useStore();

    const navigate = useNavigate();

    return (
        <Menu inverted >
            <Container>
                <Menu.Item as={NavLink} to='/home' name='Home' />
                <Menu.Item as={NavLink} to='/services' name='Services' />
                <Menu.Item as={NavLink} to='/cars' name='Cars' />
                <Menu.Item as={NavLink} to='/clients' name='Clients' />
                <Menu.Item position='right' >
                    {isLoggedIn &&
                        <Button onClick={() => {
                            navigate('/');
                            logout();
                        }}>Logout</Button>}
                </Menu.Item>
            </Container>
        </Menu>
    )
})