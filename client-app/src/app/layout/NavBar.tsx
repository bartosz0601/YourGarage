import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container style={{ height: '70px' }}>
                <Menu.Item as={NavLink} to='/' name='Home' />
                <Menu.Item as={NavLink} to='/services' name='Services' />
                <Menu.Item as={NavLink} to='/cars' name='Cars' />
                <Menu.Item as={NavLink} to='/clients' name='Clients' />
            </Container>
        </Menu>
    )
}