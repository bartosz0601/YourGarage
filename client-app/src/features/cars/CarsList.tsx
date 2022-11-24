import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Confirm, Container, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import CarsListItem from './CarsListItem';

export default observer(function CarsList() {

    const { carStore, commonStore } = useStore();
    const { cars, getClientName, deleteCar } = carStore;
    const { clientsNames } = commonStore;
    const [confirmState, setConfirmState] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const deleteHandle = ((id: string) => {
        setConfirmState(true);
        setDeleteId(id);
    })

    return (
        <>
            <Confirm
                open={confirmState}
                onCancel={() => setConfirmState(false)}
                onConfirm={() => {
                    deleteCar(deleteId);
                    setConfirmState(false);
                }}
                confirmButton='Delete'
                header='Deleting car'
            />
            <List>
                {cars.map(car =>
                    <CarsListItem key={car.id} car={car}
                        clientName={getClientName(car.clientId, clientsNames)}
                        deleteHandle={deleteHandle}
                    />
                )}
            </List>
        </>

    )
})