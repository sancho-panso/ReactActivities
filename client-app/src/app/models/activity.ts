export interface IActivity {
    id?:string;
    title:string;
    description:string;
    category:string;
    date?:Date;
    city:string;
    venue:string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
}

export interface IActivityFormValue {
    id?:string;
    title:string;
    description:string;
    category:string;
    date?:Date;
    city:string;
    venue:string;
}



export class ActivityFormValue implements IActivityFormValue{
    
        id?: string = undefined;
        title: string = "";
        category: string = "";
        description: string = "";
        date?: Date = undefined;
        city: string = "";
        venue: string = "";


        constructor(init?: IActivity){
            Object.assign(this, init);
        }
    
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
}