import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container, Menu, Icon, Button, MenuHeader } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {

    const { userStore: { user, logout, isLoggedIn } } = useStore();

    return (
        <Menu inverted >
            <Container>
                <Menu.Item as={NavLink} to='/home' name='Home' />
                <Menu.Item as={NavLink} to='/services' name='Services' />
                <Menu.Item as={NavLink} to='/cars' name='Cars' />
                <Menu.Item as={NavLink} to='/clients' name='Clients' />
                <Menu.Item position='right' >
                    {isLoggedIn && <Button onClick={logout}>Logout</Button>}
                </Menu.Item>
            </Container>
        </Menu>
    )
})