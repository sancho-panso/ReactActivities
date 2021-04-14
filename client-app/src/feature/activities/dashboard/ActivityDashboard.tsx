import React, {useEffect, useContext} from 'react'
import {Grid} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

import LoadingComponent from '../../../app/layout/loadingComponent'
import ActivityStore from '../../../app/stores/activityStore';

const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore)

    useEffect(() => {
     activityStore.loadActvities();
    },[activityStore]);
  
    if(activityStore.loadingInitial) return<LoadingComponent content="Loading activities..."/>
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
