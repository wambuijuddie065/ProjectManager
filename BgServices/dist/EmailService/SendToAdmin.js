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
const Config_1 = require("../Config/Config");
const Email_1 = __importDefault(require("../Helpers/Email"));
dotenv_1.default.config();
const SendEmailToAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
    const projects = yield (yield pool.request().query(`
SELECT * FROM ProjectsTable WHERE is_complete ='1'`)).recordset;
    for (let project of projects) {
        ejs_1.default.renderFile('Templates/Completed.ejs', { email: project.email, name: project.project_name }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: 'testnodebg@gmail.com',
                subject: "Completed Project",
                html: data,
            };
            try {
                yield (0, Email_1.default)(messageoption);
                yield pool.request().query(`UPDATE ProjectsTable SET is_complete='2' WHERE project_id = '${project.project_id}'`);
                yield pool.request().query(`UPDATE UsersTable SET isassigned='0' WHERE user_id='${project.user_id}'`);
                console.log('Email Sent Successfuly');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = SendEmailToAdmin;
