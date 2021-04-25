import React, {useState, useContext, useEffect} from 'react';
import {Segment,Form, Button, Grid} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import {ActivityFormValue} from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import { observer } from 'mobx-react-lite';
import {Form as FinalForm, Field} from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import {category} from '../../../app/common/options/categoryOptions';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import TimeInput from '../../../app/common/form/TimeInput';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({message:'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date:composeValidators(
        isRequired('Date'),
        // matchesPattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)({message:'Date pattern YYYY-mm-dd'})
    )(),
    time: isRequired('Time')
})

interface DetailsParams {
    id: string;
}

const ActivityForm:React.FC<RouteComponentProps<DetailsParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {createActivity, editActivity, submitting,loadActivity} = rootStore.activityStore;

    const [activity, setActivity] = useState(new ActivityFormValue());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(match.params.id){
            setLoading(true);
            loadActivity(match.params.id)
            .then((activity) =>setActivity(new ActivityFormValue(activity)))
            .finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id])

    const handleFinalFormSubmit = (values:any) => {
        const {...activity} = values;
        console.log(activity);
        if (!activity.id){
        let newActivity = {
            ...activity,
            id:uuid(),
            date: new Date("2021-04-20 06:49:00")
        }
        console.log(newActivity);
        createActivity(newActivity)
        }else{
        editActivity(activity)
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
            <FinalForm
                    validate={validate}
                    initialValues={activity}
                    onSubmit={handleFinalFormSubmit}
                    render={({handleSubmit, invalid, pristine}) =>(
                        <Form onSubmit={handleSubmit} loading={loading}> 
                        <Field name="title" placeholder="Title" value={activity.title} component={TextInput}/>
                        <Field rows={3} name="description" placeholder="Description" value={activity.description} component={TextAreaInput}/>
                        <Field options={category} name="category" placeholder="Category" value={activity.category} component={SelectInput}/>
                        <Form.Group width='equal'>
                            <Field  name="date" placeholder="Date" value={activity.date} component={DateInput}/>
                            <Field  name="time" placeholder="Time" value={activity.date} component={TimeInput}/>
                        </Form.Group>
                        <Field name="city" placeholder="City" value={activity.city} component={TextInput}/> 
                        <Field name="venue" placeholder="Venue" value={activity.venue} component={TextInput}/>
                        <Button 
                            disabled={loading || invalid || pristine} 
                            loading={submitting} 
                            floated="right" 
                            positive 
                            type="submit" 
                            content="Submit"/>
                        <Button 
                            disabled={loading} 
                            onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities') } 
                            floated="right" type="submit" 
                            content="Cancel"/>
                    </Form>
                    )}/>
            </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm);
