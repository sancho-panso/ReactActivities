import React, {useContext} from 'react'
import {Form as FinalForm, Field} from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import {Button, Form, Header} from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import ErrorMessage from '../../app/common/form/ErrorMessage'

const validate = combineValidators({
    email:isRequired('email'),
    username:isRequired('username'),
    displaynname:isRequired('dispaly name'),
    password:isRequired('password')
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;
    return (
        <FinalForm
            onSubmit = {(values: IUserFormValues) => register(values).catch(error => ({FORM_ERROR:error}))}
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
                    <Header as='h2' content='Sign up to ReactActivities' color='teal' textAling='center'/>
                    <Field name='username' component={TextInput} placeholder='Username'/>
                    <Field name='displayName' component={TextInput} placeholder='Display Name'/>
                    <Field name='email' component={TextInput} placeholder='Email'/>
                    <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                    {/* {submitErrors && !dirtySinceLastSubmit && <Label color='red' basic content={submitErrors.FORM_ERROR.statusText}/>} */}
                    {submitErrors && !dirtySinceLastSubmit && <ErrorMessage error={submitErrors.FORM_ERROR}/>}
                    <br/>
                    <Button 
                        loading={submitting}
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        color='teal' 
                        content='Register'
                        fluid
                    />
                    {/* <pre>{ JSON.stringify(form.getState(), null, 2)}</pre> */}
                </Form>
            )}
        />
    )
}

export default RegisterForm
