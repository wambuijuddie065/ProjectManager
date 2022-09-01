export interface projectInterface{
   
    id: number;
    title: string;
    description: string;
    date: string;
    

}


export interface Project{
    project_id:string
    project_name:string
    project_description:string
    due_date:string
    is_complete:string
    isassigned:string
    user_id:string
    email:string
}

export interface User{
    user_id:number;
    name:string;
    email:string;
    password:string;
    role: string;
    isassigned: string;
    project_id:string;
    issent: string;
}

export interface LoginInterface{
    email:string
    password:string
    error:string
    message:string
    token:string

}
export interface CheckUserInterface{
    name:string
    role:string
    email:string
}

export interface SignupInterface{
    name:string
    email:string
    password:string
    error:string
    message:string
    token?:string
}