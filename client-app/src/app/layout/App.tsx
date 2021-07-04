import React, {useContext, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import NavBar from '../../feature/nav/NavBar';
import {observer} from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import ProfilePage from '../../feature/profiles/ProfilePage';
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';
import {ToastContainer} from 'react-toastify';
import NotFound from './NotFound';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import PrivateRoute from './PrivateRoute';


const App:React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded,token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
      if(token){
        getUser().finally(() => setAppLoaded())
      } else {
        setAppLoaded()
      }
  },[token, getUser, setAppLoaded])

  if (!appLoaded) return <LoadingComponent content='Loading app..'/>

  return (
    <React.Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right'/>
        <Route exact path='/' component={HomePage}/>
        <Route path={'/(.+)'} render={() =>(
          <React.Fragment>
            <NavBar/>
            <Container style={{marginTop:"7em"}}>
              <Switch>
                <PrivateRoute exact path='/activities' component={ActivityDashboard}/>
                <PrivateRoute path='/activities/:id' component={ActivityDetails}/>
                <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                <PrivateRoute path='/profile/:username' component={ProfilePage}/>
                <Route component={NotFound}/>
              </Switch>
            </Container>
          </React.Fragment>
        )}/>

    </React.Fragment>
  );
}

export default withRouter(observer(App));
