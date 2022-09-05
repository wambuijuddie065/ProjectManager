"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectControllers_1 = require("../Controllers/ProjectControllers");
const routerP = (0, express_1.Router)();
routerP.post('/add', ProjectControllers_1.insertProject); //insertProject
routerP.post('/'); //asignProject
routerP.get('/:id', ProjectControllers_1.getProject); //getProject
routerP.get('/', ProjectControllers_1.getProjects); //getProjects
// routerP.put('/:id/update',updateProject)
routerP.patch('/:id/complete', ProjectControllers_1.markComplete); //updateProject
routerP.delete('/:id', ProjectControllers_1.deleteProject); //deleteProject
routerP.get('/:id/getone', ProjectControllers_1.getUserProject);
exports.default = routerP;
