import React from 'react';
import { format } from 'date-fns';
import { Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Service } from '../../app/models/service';

interface Props {
    service: Service
}

export default function ServiceListItem({ service }: Props) {

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='car'/>
                        {service.carName}
                        <Icon name='user' style={{ marginLeft: '20px' }} />
                        {service.clientName}
                    </Item.Header>
                    <Item.Meta>
                        <Icon name='calendar alternate' />
                        {format(new Date(service.date!), 'dd/MM/yyyy')}

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
                </Item.Content>
            </Item>
        </Item.Group>
    )
}