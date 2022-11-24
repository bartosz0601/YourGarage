import React from 'react';
import { format } from 'date-fns';
import { Grid, Icon, Item, List, Segment } from 'semantic-ui-react';
import { Service } from '../../app/models/service';
import { Link } from 'react-router-dom';

interface Props {
    service: Service
}

export default function CarServiceListIem({ service }: Props) {

    return (
        <Segment>


            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header fixed='left'>
                            <Icon name='calendar alternate' />
                            {format(new Date(service.date!), 'dd/MM/yyyy')}
                        </Item.Header>
                        <Item.Meta>
                            <List horizontal>
                                <List.Item>
                                    <Icon name='money' />
                                    {service.price.toString()}zł
                                </List.Item>
                                <List.Item>
                                    <Icon name='clock outline' />
                                    {service.time.toString()}h
                                </List.Item>
                                <List.Item>
                                    <Icon name='tachometer alternate' />
                                    {service.mileage.toString()}km
                                </List.Item>
                            </List>
                        </Item.Meta>
                        <Item.Description>
                            {service.actions}
                        </Item.Description>
                        <Item.Extra>

                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
}