import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Header, Icon, Loader, Ref, Statistic, Sticky } from 'semantic-ui-react';
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
    const contextRef = useRef(null);

    useEffect(() => {
        if (services.length < 1) loadServices();
    }, [loadServices, services.length]) 

    const [loadingNext, setLoadingNext] = useState<boolean>();

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadServices().then(() => setLoadingNext(false));
    }

    return (
        <Container style={{ height: '100vh' }}>
            <Grid columns={3} padded>
                <Ref innerRef={contextRef}>
                    <>
                        <Grid.Column width={2}>
                            <Sticky context={contextRef} offset={20}>
                                <Button animated='vertical' color='black' size='big' type='button' fluid
                                    as={Link} to='/createService'
                                >
                                    <Button.Content visible>Add</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='plus square outline'></Icon>
                                    </Button.Content>
                                </Button>
                            </Sticky>
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
                            <Sticky context={contextRef} offset={20}>
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

                                {(!loadingInitial || loadingNext) && <Statistic label='Services' value={pagination?.totalItems} />}
                            </Sticky>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Loader style={{ marginTop:'20px'}} active={loadingNext || loadingInitial} />
                        </Grid.Column>
                    </>
                </Ref>
            </Grid>
        </Container >
    )
})