import {observable, action, computed, makeAutoObservable} from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import {IActivity} from '../models/activity';

class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable activities:IActivity[] = [];
  @observable selectedActivity:IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activititesByDate() {
    return this.activities.slice().sort((a,b) =>Date.parse(a.date) - Date.parse(b.date))
  }

  @action loadActvities = async () =>{
      this.loadingInitial = true; 
      try{
        const activities = await agent.Activities.list();
        activities.forEach(activity =>{
          activity.date = activity.date.split('.')[0];
          this.activities.push(activity) 
        });
        this.loadingInitial = false;
      } catch(error){
        console.log(error);
        this.loadingInitial = false;
      }
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  }

  @action createActivity = async(activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activities.push(activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
      
    }
  }

  @action selectActivity = (id:string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.editMode = false;
  }
}

export default createContext(new ActivityStore())