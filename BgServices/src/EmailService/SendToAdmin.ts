import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../Config/Config'
import sendMail from '../Helpers/Email'

dotenv.config()
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


const SendEmailToAdmin= async()=>{
const pool = await mssql.connect(sqlConfig)
const projects:Project[]= await(await pool.request().query(`
SELECT * FROM ProjectsTable WHERE is_complete ='1'`
)).recordset
 for(let project of projects){
    ejs.renderFile('Templates/Completed.ejs',{email:project.email,name:project.project_name } ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:'testnodebg@gmail.com',
            subject:"Completed Project",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE ProjectsTable SET is_complete='2' WHERE project_id = '${project.project_id}'`)
            await pool.request().query(`UPDATE UsersTable SET isassigned='0' WHERE user_id='${project.user_id}'`)
            console.log('Email Sent Successfuly');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}


export default  SendEmailToAdmin


