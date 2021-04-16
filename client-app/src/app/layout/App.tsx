import React from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import NavBar from '../../feature/nav/NavBar';
import {observer} from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import HomePage from '../../feature/home/HomePage'
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';
import {ToastContainer} from 'react-toastify';
import NotFound from './NotFound';


const App:React.FC<RouteComponentProps> = ({location}) => {


  return (
    <React.Fragment>
      <ToastContainer position='bottom-right'/>
        <Route exact path='/' component={HomePage}/>
        <Route path={'/(.+)'} render={() =>(
          <React.Fragment>
            <NavBar/>
            <Container style={{marginTop:"7em"}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                <Route component={NotFound}/>
              </Switch>
            </Container>
          </React.Fragment>
        )}/>

    </React.Fragment>
  );
}

export default withRouter(observer(App));
