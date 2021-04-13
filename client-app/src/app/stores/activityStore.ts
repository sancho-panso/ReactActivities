import {observable, action, computed, makeAutoObservable, configure, runInAction} from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import {IActivity} from '../models/activity';

configure({enforceActions: 'always'});

class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable activityRegistry = new Map(); 
  @observable activities:IActivity[] = [];
  @observable selectedActivity:IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activititesByDate() {
    return Array.from(this.activityRegistry.values()).slice().sort((a,b) =>Date.parse(a.date) - Date.parse(b.date))
  }

  @action loadActvities = async () =>{
      this.loadingInitial = true; 
      try{
        const activities = await agent.Activities.list();
        runInAction(() =>{
          activities.forEach(activity =>{
            activity.date = activity.date.split('.')[0];
            this.activityRegistry.set(activity.id, activity);
          });
          this.loadingInitial = false;
        })

      } catch(error){
        runInAction(()=>{
          console.log(error);
          this.loadingInitial = false;
        })
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
      runInAction(() =>{  this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;})
    } catch (error) {
      runInAction(()=>{
        this.submitting = false;
        console.log(error);
      })
    }
  }

  @action selectActivity = (id:string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  }

  @action openEditForm = (id:string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action editActivity = async (activity:IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() =>{
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction(()=>{
        this.submitting = false;
        console.log(error);
      })
    }
  }

  @action deleteActivity = async (event: React.SyntheticEvent<HTMLButtonElement>, id:string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(()=>{
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      })
    } catch (error) {
      runInAction(()=>{
        this.submitting = false;
        this.target = "";
        console.log(error);
      }) 
    }
  }
}

export default createContext(new ActivityStore())