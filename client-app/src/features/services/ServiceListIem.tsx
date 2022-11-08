import React from 'react';
import { format } from 'date-fns';
import { Button, Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Service } from '../../app/models/service';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    service: Service,
    deleteHandle: Function
}

export default observer(function ServiceListItem({ service, deleteHandle }: Props) {

    const { serviceStore, modalStore } = useStore();
    const { formServiceState, setEditingService } = serviceStore;

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='car' />
                        <Link to={'/cars/' + service.carId}>{service.carName}</Link>
                        <Icon name='user' style={{ marginLeft: '20px' }} />
                        {service.clientName}
                    </Item.Header>
                    <Item.Meta>
                        <Icon name='calendar alternate' />
                        {format(new Date(service.date!), 'MMMM d, yyyy h:mm aa')}

                        <Icon name='money' style={{ marginLeft: '20px' }} />
                        {service.price.toString()}zł

                        <Icon name='clock outline' style={{ marginLeft: '20px' }} />
                        {service.time.toString()}h
                    </Item.Meta>
                    <Item.Description>
                        {service.actions}
                    </Item.Description>
                    <Item.Extra>
                        <>
                            Mileage: {service.mileage}km
                        </>
                    </Item.Extra>
                    <Button floated='right' color='red' disabled={formServiceState}
                        onClick={() => deleteHandle(service.id)}
                    >
                        Delete
                    </Button>
                    <Button floated='right' color='blue' disabled={formServiceState}
                        onClick={() => setEditingService(service.id)}>
                        Edit
                    </Button>
                </Item.Content>
            </Item>
        </Item.Group>
    )
})