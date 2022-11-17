import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Header, Icon, Input, Loader } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ClientForm from './ClientForm';
import ClientsList from './ClientsList';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../app/models/pagination';

export default observer(function ClientPage() {

    const { clientStore, modalStore } = useStore();
    const { clients, loadClients, initFormClient, pagination,
        setPagingParams, setSearchParam, searchParam, loadingInitial } = clientStore

    useEffect(() => {
        if (clients.length < 1) loadClients();
    }, [loadClients])

    const [searchLocal, setSearchLocal] = useState(searchParam);
    const [loadingNext, setLoadingNext] = useState<boolean>();

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadClients().then(() => setLoadingNext(false));
    }

    return (
        <Container >
            <Grid columns={2} padded>
                <Grid.Column width={2}>
                    <Button animated='vertical' size='big' color='black' type='button' fluid
                        onClick={() => {
                            initFormClient();
                            modalStore.openModal(<ClientForm />);
                        }}>
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus square outline'></Icon>
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column width={10}>
                    {(!loadingInitial || loadingNext) &&
                        <>{
                            clients.length > 0 ?
                                <InfiniteScroll
                                    pageStart={0}
                                    initialLoad={false}
                                    loadMore={handleGetNext}
                                    hasMore={!!pagination && pagination.currentPage < pagination.totalPages && !loadingNext}
                                >
                                    <ClientsList />
                                </InfiniteScroll>
                                :
                                <Header size='large' textAlign='center' >No results</Header>
                        }
                        </>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input fluid icon='search' size='large' placeholder='Write name, phone, email...'
                        defaultValue={searchLocal}
                        onChange={(e, data) => {
                            setSearchLocal(data.value);
                        }} />
                    <Button floated='right' color='black' type='button' size='large'
                        style={{ marginTop: "10px" }}
                        onClick={
                            () => setSearchParam(searchLocal)
                        }
                    >
                        Search
                    </Button>
                </Grid.Column>
                <Grid.Column width={14}>
                    <Loader active={loadingNext || loadingInitial} />
                </Grid.Column>
            </Grid>
        </Container>
    )
})