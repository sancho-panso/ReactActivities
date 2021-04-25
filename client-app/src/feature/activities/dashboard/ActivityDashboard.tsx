import React, {useEffect, useContext} from 'react'
import {Grid} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

import LoadingComponent from '../../../app/layout/loadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadActvities, loadingInitial} = rootStore.activityStore;

    useEffect(() => {
     loadActvities();
    },[loadActvities]);
  
    if(loadingInitial) return<LoadingComponent content="Loading activities..."/>
    return (
        <Grid>
            <Grid.Column width={10}> 
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h3>Activity Filters</h3>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
