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
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const Email_1 = __importDefault(require("../Helpers/Email"));
const Config_1 = require("../Config/Config");
dotenv_1.default.config();
const SendAssignedEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
    const tasks = (yield pool.request()
        .query(`SELECT U.user_id, U.email,U.name ,P.project_description,P.project_name,P.due_date FROM
  UsersTable U LEFT JOIN ProjectsTable P ON U.user_id = P.user_id 
 WHERE P.user_id IS NOT NULL AND P.isassigned='0'`)).recordset;
    for (let atask of tasks) {
        ejs_1.default.renderFile('Templates/Assigned.ejs', { name: atask.name, project_name: atask.project_name, project_description: atask.project_description,
            due_date: atask.due_date
        }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: process.env.EMAIL,
                to: atask.email,
                subject: 'Group Judy Project',
                html: data,
                attachments: [
                    {
                        filename: 'task.txt',
                        content: `You have been assigned a task  : ${atask.project_name}`
                    }
                ]
            };
            try {
                console.log(atask);
                yield (0, Email_1.default)(mailOptions);
                yield pool.request().query(`UPDATE UsersTable SET isassigned='1' WHERE user_id='${atask.user_id}'`);
                yield pool.request().query(`UPDATE ProjectsTable SET isassigned='1' WHERE user_id='${atask.user_id}'`);
                console.log('EMAIL SENT SUCCESSFULLY');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = SendAssignedEmails;
