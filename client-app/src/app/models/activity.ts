export interface IActivity {
    id?:string;
    title:string;
    description:string;
    category:string;
    date?:Date;
    city:string;
    venue:string;
}



export class ActivityFormValue implements IActivity{
    
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