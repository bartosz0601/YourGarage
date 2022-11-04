import React from 'react';
import { format } from 'date-fns';
import { Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Service } from '../../app/models/service';
import { Link } from 'react-router-dom';

interface Props {
    service: Service
}

export default function CarServiceListIem({ service }: Props) {

    return (
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header fixed='left'>
                        <Icon name='calendar alternate' />
                        {format(new Date(service.date!), 'dd/MM/yyyy')}
                    </Item.Header>
                    <Item.Meta>
                        <Icon name='money'/>
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