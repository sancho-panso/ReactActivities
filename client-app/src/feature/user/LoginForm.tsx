import React, {useContext} from 'react'
import {Form as FinalForm, Field} from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import {Button, Divider, Form, Header} from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import ErrorMessage from '../../app/common/form/ErrorMessage'
import SocialLogin from './SocialLogin';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
    email:isRequired('email'),
    password:isRequired('password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login, fbLogin, loading} = rootStore.userStore;
    return (
        <FinalForm
            onSubmit = {(values: IUserFormValues) => login(values).catch(error => ({FORM_ERROR:error}))}
            validate={validate}
            render = {({
                handleSubmit,
                submitting, 
                form, 
                submitErrors, 
                invalid, 
                pristine,
                dirtySinceLastSubmit
            })=>(
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to ReactActivities' color='teal' textAling='center'/>
                    <Field name='email' component={TextInput} placeholder='Email'/>
                    <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                    {/* {submitErrors && !dirtySinceLastSubmit && <Label color='red' basic content={submitErrors.FORM_ERROR.statusText}/>} */}
                    {submitErrors && !dirtySinceLastSubmit && <ErrorMessage error={submitErrors.FORM_ERROR} text='Invalid email or password'/>}
                    <br/>
                    <Button 
                        loading={submitting}
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        color='teal' 
                        content='Login'
                        fluid
                    />
                    <Divider horizontal>Or</Divider>
                    <SocialLogin  loading={loading} fbCallback={fbLogin}/>
                    {/* <pre>{ JSON.stringify(form.getState(), null, 2)}</pre> */}
                </Form>
            )}
        />
    )
}

export default observer(LoginForm);
