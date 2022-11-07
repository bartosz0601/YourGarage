import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Container, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServiceListItem from './ServiceListIem';

export default observer(function ServicesList() {

    const { serviceStore } = useStore();
    const { services } = serviceStore

    return (
        <List>
            {services.map(service => (
                <ServiceListItem key={service.id} service={service} />
            ))}
        </List>
    )
})