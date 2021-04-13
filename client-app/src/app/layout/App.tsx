import React, {useEffect, useContext} from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import NavBar from '../../feature/nav/NavBar';
import LoadingComponent from '../layout/loadingComponent'
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
   activityStore.loadActvities();
  },[activityStore]);

  if(activityStore.loadingInitial) return<LoadingComponent content="Loading activities..."/>

  return (
    <React.Fragment>
        <NavBar/>
        <Container style={{marginTop:"7em"}}>
          <ActivityDashboard/> 
        </Container>
    </React.Fragment>
  );
}

export default observer(App);
