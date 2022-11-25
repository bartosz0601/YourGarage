import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Card, Icon, List, Loader, Placeholder } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';

interface Props {
    id: string
}

export default observer(function ClientCard({ id }: Props) {

    const { clientStore } = useStore();
    const { loadClient, client, loadingClient } = clientStore;

    useEffect(() => {
        loadClient(id);
    }, [id])

    return (
        <Card>
            <Card.Content>
                {loadingClient || !client ?
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='long' />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='long' />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                    :
                    <>
                        <Card.Header>
                            <Icon name='user' />
                            {client!.firstName}  {client!.lastName}
                        </Card.Header>
                        <Card.Meta>
                            <List horizontal>
                                <List.Item>
                                    <Icon name='phone' />
                                    {client!.phone}
                                </List.Item>
                                <List.Item>
                                    <Icon name='mail' />
                                    {client!.email}
                                </List.Item>
                            </List>
                        </Card.Meta>
                        <Card.Description>
                            {client!.details}
                        </Card.Description>
                    </>
                }
            </Card.Content>
        </Card>
    )
})