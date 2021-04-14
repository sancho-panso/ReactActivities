import React from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import NavBar from '../../feature/nav/NavBar';
import {observer} from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter} from 'react-router-dom';
import HomePage from '../../feature/home/HomePage'
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';


const App:React.FC<RouteComponentProps> = ({location}) => {


  return (
    <React.Fragment>
        <Route exact path='/' component={HomePage}/>
        <Route path={'/(.+)'} render={() =>(
          <React.Fragment>
            <NavBar/>
            <Container style={{marginTop:"7em"}}>
              <Route exact path='/activities' component={ActivityDashboard}/>
              <Route path='/activities/:id' component={ActivityDetails}/>
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
            </Container>
          </React.Fragment>
        )}/>

    </React.Fragment>
  );
}

export default withRouter(observer(App));
