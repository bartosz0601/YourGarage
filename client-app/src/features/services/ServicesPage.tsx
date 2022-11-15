import React, { useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ServicesList from './ServicesList';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../app/models/pagination';
import DatePicker from 'react-datepicker';

export default observer(function ServicesPage() {
    const { serviceStore } = useStore();
    const { services, loadServices, setPagingParams, pagination, startDate, endDate, setDates } = serviceStore;

    useEffect(() => {
        if (services.length < 1) loadServices();
    }, []) // empty array - call only once 

    function handleGetNext() {
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadServices();
    }

    // const [startDate, setStartDate] = useState<Date>(() => { 
    //     let date = new Date();
    //     date.setMonth(date.getMonth() - 1);
    //     return date;
    // });

    // const [endDate, setEndDate] = useState<Date>(new Date());

    return (
        <Container style={{ marginTop: "100px" }}>
            <Grid columns={2} padded>
                <Grid.Row centered>
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
                        <InfiniteScroll
                            pageStart={0}
                            initialLoad={false}
                            loadMore={handleGetNext}
                            hasMore={!!pagination && pagination.currentPage < pagination.totalPages}
                        >
                            <ServicesList />
                        </InfiniteScroll>
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
                </Grid.Row>
            </Grid>
        </Container >
    )
})