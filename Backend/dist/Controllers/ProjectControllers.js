"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignNewProject = exports.deleteProject = exports.getProjects = exports.updateProject = exports.getUserProject = exports.getProject = exports.insertProject = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const Config_1 = require("../Config/Config");
const ProjectValidator_1 = require("../Helpers/ProjectValidator");
const insertProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const id = (0, uuid_1.v4)();
        const { project_name, project_description, due_date, email } = req.body;
        yield pool
            .request()
            .input("project_id", mssql_1.default.VarChar, id)
            .input("project_name", mssql_1.default.VarChar, project_name)
            .input("project_description", mssql_1.default.VarChar, project_description)
            .input("due_date", mssql_1.default.VarChar, due_date)
            .input("email", mssql_1.default.VarChar, email)
            .execute("insertProject");
        res.json({ message: "Project Added Successfully" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.insertProject = insertProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input("project_id", mssql_1.default.VarChar, id)
            .execute("getProject");
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: "Project Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProject = getProject;
const getUserProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const projects = yield pool
            .query(`SELECT * FROM ProjectsTable WHERE user_id='${id}'`);
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: "Project Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUserProject = getUserProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { project_name, project_description, due_date, is_complete, isassigned, user_id } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input("project_id", mssql_1.default.VarChar, id)
            .execute("getProject");
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: "Project Not Found!" });
        }
        else {
            yield pool.request()
                .input("project_id", mssql_1.default.VarChar, id)
                .input("project_name", mssql_1.default.VarChar, project_name)
                .input("project_description", mssql_1.default.VarChar, project_description)
                .input("due_date", mssql_1.default.VarChar, due_date)
                .input("is_complete", mssql_1.default.VarChar, is_complete)
                .input("isassigned", mssql_1.default.VarChar, isassigned)
                .input("user_id", mssql_1.default.VarChar, user_id)
                .execute("updateProject");
            res.json({
                message: "Project updated successfully!",
            });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateProject = updateProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const projects = yield pool.request().execute("getProjects");
        res.json(projects.recordset);
    }
    catch (error) {
        res.json({ Error });
    }
});
exports.getProjects = getProjects;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const projects = yield pool.request()
            .input("project_id", mssql_1.default.VarChar, id)
            .execute('getProject');
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            yield pool.request()
                .input("project_id", mssql_1.default.VarChar, id)
                .execute("deleteProject");
            res.json({ message: 'Project Deleted Successfully' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteProject = deleteProject;
const assignNewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const { project_name, user_id } = req.body;
        const { error, value } = ProjectValidator_1.ProjectSchema1.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        else {
            yield pool.request()
                .input("p_name", mssql_1.default.VarChar, project_name)
                .input("u_id", mssql_1.default.VarChar, user_id)
                .execute("assignProject");
            res.json({ message: 'project assigned' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.assignNewProject = assignNewProject;
