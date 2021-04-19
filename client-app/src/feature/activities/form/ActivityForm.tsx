import React, {useState, useContext, useEffect} from 'react';
import {Segment,Form, Button, Grid} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import {IActivityFormValues } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import {Form as FinalForm, Field} from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import {category} from '../../../app/common/options/categoryOptions';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import TimeInput from '../../../app/common/form/TimeInput';

interface DetailsParams {
    id: string;
}

const ActivityForm:React.FC<RouteComponentProps<DetailsParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity} = activityStore;

    const [dateNow]=useState(new Date());
    const [activity, setActivity] = useState<IActivityFormValues>({
        id:undefined,
        title: "",
        category: "",
        description: "",
        date: undefined,
        time: undefined,
        city: "",
        venue: "",
    });

    useEffect(() => {
        if(match.params.id && activity.id){
            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
        }
        return () => {
            clearActivity();
        }
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id])

    // const handleSubmit = () => {
    //     if (activity.id.length === 0){
    //         let newActivity = {
    //             ...activity,
    //             id:uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    //     }else{
    //        editActivity(activity).then(() => history.push(`/activities/${activity.id}`)) 
    //     }
    // }

    const handleFinalFormSubmit = (values:any) => {
        console.log(values.date);
        
    }

    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
            <FinalForm
                    onSubmit={handleFinalFormSubmit}
                    render={({handleSubmit}) =>(
                        <Form onSubmit={handleSubmit}> 
                        <Field name="title" placeholder="Title" value={activity.title} component={TextInput}/>
                        <Field rows={3} name="description" placeholder="Description" value={activity.description} component={TextAreaInput}/>
                        <Field options={category} name="category" placeholder="Category" value={activity.category} component={SelectInput}/>
                        <Form.Group width='equal'>
                            <Field  name="date" placeholder="Date" value={activity.date} component={DateInput}/>
                            <Field  name="date" placeholder="Time" value={activity.date} component={TimeInput}/>
                        </Form.Group>
                        <Field name="city" placeholder="City" value={activity.city} component={TextInput}/> 
                        <Field name="venue" placeholder="Venue" value={activity.venue} component={TextInput}/>
                        <Button loading={submitting} floated="right" positive type="submit" content="Submit"/>
                        <Button onClick={() => history.push('/activities')} floated="right" type="submit" content="Cancel"/>
                    </Form>
                    )}/>
            </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm);
