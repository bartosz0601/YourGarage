import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServicesList from './ServicesList';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../app/models/pagination';
import DatePicker from 'react-datepicker';

export default observer(function ServicesPage() {
    const { serviceStore } = useStore();
    const { services, loadServices, setPagingParams, pagination, startDate,
        endDate, setDates, loadingInitial } = serviceStore;

    useEffect(() => {
        if (services.length < 1) loadServices();
    }, [loadServices]) // empty array - call only once

    const [loadingNext, setLoadingNext] = useState<boolean>();

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadServices().then(() => setLoadingNext(false));
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Column width={2}>
                    <Button animated='vertical' size='big' color='black' type='button' fluid
                        as={Link} to='/createService'
                    >
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus square outline'></Icon>
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column width={10}>
                    {(!loadingInitial || loadingNext) &&
                        <>{services.length > 0 ?
                            <InfiniteScroll
                                pageStart={0}
                                initialLoad={false}
                                loadMore={handleGetNext}
                                hasMore={!!pagination && pagination.currentPage < pagination.totalPages && !loadingNext}
                            >
                                <ServicesList />
                            </InfiniteScroll>
                            :
                            <Header size='large' textAlign='center' >No results</Header>
                        }</>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()}
                        selectsRange
                        inline
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setDates(start!, end!);

                        }}
                    />
                </Grid.Column>
                <Grid.Column width={14}>
                    <Loader active={loadingNext || loadingInitial} />
                </Grid.Column>
            </Grid>
        </Container >
    )
})