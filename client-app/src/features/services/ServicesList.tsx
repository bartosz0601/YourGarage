import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Container, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServiceListItem from './ServiceListIem';

export default observer(function ServicesList() {

    const { serviceStore } = useStore();
    const { loadServices, services } = serviceStore

    useEffect(() => {
        loadServices();
    }, [loadServices])

    return (
        <Container style={{ marginTop: "100px" }}>
            <List>
                {services.map(service => (
                    <ServiceListItem key={service.id} service={service} />
                ))}
            </List>
        </Container>
    )
})