import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Header, Icon, Input, Loader } from 'semantic-ui-react';
import CarsList from './CarsList';
import CarForm from './CarForm';
import { useStore } from '../../app/stores/store';
import { PagingParams } from '../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';

export default observer(function CarsPage() {
    const { carStore, commonStore, modalStore } = useStore();
    const { cars, loadCars, initFormCar, pagination, setPagingParams,
        setSearchParam, searchParam, loadingInitial } = carStore;
    const { loadClientsName } = commonStore;

    useEffect(() => {
        loadClientsName();
    }, [loadClientsName])

    useEffect(() => {
        if (cars.length < 1) loadCars();
    }, [loadCars])

    const [searchLocal, setSearchLocal] = useState(searchParam);
    const [loadingNext, setLoadingNext] = useState<boolean>();

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadCars().then(() => setLoadingNext(false));
    }

    return (
        <Container>
            <Grid columns={3} padded>
                <Grid.Column width={2}>
                    <Button animated='vertical' size='big' color='black' type='button' fluid
                        onClick={() => {
                            initFormCar();
                            modalStore.openModal(<CarForm />)
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
                            cars.length > 0 ?
                                <InfiniteScroll
                                    pageStart={0}
                                    initialLoad={false}
                                    loadMore={handleGetNext}
                                    hasMore={!!pagination && pagination.currentPage < pagination.totalPages && !loadingNext}
                                >
                                    <CarsList />
                                </InfiniteScroll>
                                :
                                <Header size='large' textAlign='center' >No results</Header>
                        }
                        </>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                    <Input fluid icon='search' size='large' placeholder='Write brand, model, vin...'
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