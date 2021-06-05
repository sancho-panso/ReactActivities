import React, {useContext, useState} from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import {RootStoreContext} from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser, updateProfile} = rootStore.profileStore;
    const[addBioMode, setAddBioMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='user' content={`About ${profile?.displayName}`}/>
                    {isCurrentUser &&
                    <Button 
                        floated='right' 
                        basic 
                        content={addBioMode ? 'Cancel' : 'Edit Profile'}
                        onClick={() => setAddBioMode(!addBioMode)}/>}
                </Grid.Column>
                <Grid.Column width={16}>
                    {!addBioMode ? 
                   <span>{profile?.bio}</span> : 
                    <ProfileEditForm 
                        updateProfile={updateProfile}
                        profile={profile!}/>}
                </Grid.Column> 
            </Grid>
        </Tab.Pane>
        
    )
}

export default ProfileDescription
