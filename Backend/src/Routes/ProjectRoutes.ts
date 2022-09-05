import { Router } from "express";
import { deleteProject, getProject, getProjects, getUserProject, insertProject, markComplete } from "../Controllers/ProjectControllers";
import { VerifyToken } from "../Middleware/VerifyToken";
const routerP=Router()


routerP.post('/add',insertProject)//insertProject
routerP.post('/')//asignProject
routerP.get('/:id',getProject)//getProject
routerP.get('/',getProjects)//getProjects
// routerP.put('/:id/update',updateProject)
routerP.patch('/:id/complete',markComplete)//updateProject
routerP.delete('/:id',deleteProject)//deleteProject

routerP.get('/:id/getone',getUserProject)


export default routerP;