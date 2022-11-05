import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Container, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import CarsListItem from './CarsListItem';

export default observer(function CarsList() {

    const { carStore } = useStore();
    const { cars, getClientName } = carStore

    return (
        <List>
            {cars.map(car =>
                <CarsListItem key={car.id} car={car} clientName={getClientName(car.clientId)} />
            )}
        </List>
    )
})