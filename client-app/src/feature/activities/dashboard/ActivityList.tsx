import React, {useContext} from 'react'
import {Item, Label} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {format} from 'date-fns';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityList:React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {activititesByDate} = rootStore.activityStore;
    return (
        <React.Fragment>
            {activititesByDate.map(([group, activities]) => (
                <React.Fragment key ={group}>
                    <Label size='large' color='blue'>
                        {format(group, 'eeee do MMMM')}
                    </Label>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity}/>
                            ))}
                        </Item.Group>
                </React.Fragment>
            ))}
        </React.Fragment>

    )
}

export default observer(ActivityList);
