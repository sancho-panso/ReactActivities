import React, {useEffect, useContext, useState} from 'react'
import {Grid, Loader} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../../../app/stores/rootStore';
import InfintiteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadActvities, loadingInitial, setPage, page, totalPages} = rootStore.activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handlerGetNext = () => {
        setLoadingNext(true);
        setPage(page +1);
        loadActvities().then(() => setLoadingNext(false))
    }

    useEffect(() => {
     loadActvities();
    },[loadActvities]);
  
    return (
        <Grid>
            <Grid.Column width={10}> 
            {loadingInitial && page === 0 ? <ActivityListItemPlaceholder/> :(
                <InfintiteScroll
                pageStart={0}
                loadMore={handlerGetNext}
                hasMore={!loadingNext && page + 1 < totalPages}
                initialLoad={false}>
                <ActivityList />
                </InfintiteScroll>
            )}
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
