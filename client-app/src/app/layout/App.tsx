import React, {useState, useEffect, useContext} from 'react';
import {Container} from 'semantic-ui-react';
import {IActivity} from '../models/activity';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import NavBar from '../../feature/nav/NavBar';
import LoadingComponent from '../layout/loadingComponent'
import agent from '../api/agent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore)
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target,setTarget] = useState("")





  const handleEditActivity = (activity:IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: React.SyntheticEvent<HTMLButtonElement>, id:string) =>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() =>{
    setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
   activityStore.loadActvities();
  },[activityStore]);

  if(activityStore.loadingInitial) return<LoadingComponent content="Loading activities..."/>

  return (
    <React.Fragment>
        <NavBar/>
        <Container style={{marginTop:"7em"}}>
          <ActivityDashboard 
            setSelectedActivity={setSelectedActivity}
            setEditMode={setEditMode}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
            target={target}/> 
        </Container>
    </React.Fragment>
  );
}

export default observer(App);
