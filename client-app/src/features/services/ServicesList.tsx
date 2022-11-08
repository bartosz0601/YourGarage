import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Confirm, Container, List } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServiceListItem from './ServiceListIem';
import { string } from 'yup';

export default observer(function ServicesList() {

    const { serviceStore } = useStore();
    const { services, deleteService } = serviceStore
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
                    deleteService(deleteId);
                    setConfirmState(false);
                }}
                confirmButton='Delete'
                header='Deleting service'
            />
            <List>
                {services.map(service => (
                    <ServiceListItem key={service.id} service={service} deleteHandle={deleteHandle} />
                ))}
            </List>
        </>

    )
})