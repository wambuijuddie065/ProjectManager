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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getUsers = exports.checkUser = exports.getHomepage = exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const Config_1 = require("../Config/Config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserValidator_1 = require("../Helpers/UserValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const id = (0, uuid_1.v4)();
        const { name, email, password } = req.body;
        const { error, value } = UserValidator_1.UserSchemaReg.validate(req.body);
        if (error) {
            res.json({ error: error.details[0].message });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("name", mssql_1.default.VarChar, name)
            .input("email", mssql_1.default.VarChar, email)
            .input("password", mssql_1.default.VarChar, hashedPassword)
            .execute("insertUser");
        res.json({ message: "User Registered Successfully" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const { error, value } = UserValidator_1.UserSchemaLog.validate(req.body);
        if (error) {
            res.json({ error: error.details[0].message });
        }
        const user = yield (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .execute("getUser")).recordset;
        if (!user[0]) {
            return res.json({ message: "User Not Found", success: false });
        }
        else {
            const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
            if (!validPassword) {
                return res.json({ message: 'Invalid Password!', success: false });
            }
            const payload = user.map((item) => {
                const { password } = item, rest = __rest(item, ["password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(payload[0], process.env.KEY, {
                expiresIn: "3600s",
            });
            return res.json({ message: "User logged in Successfully!", token, success: true });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.loginUser = loginUser;
const getHomepage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ message: `Dear ${req.info.email} Welcome to the homepage!!` });
    }
});
exports.getHomepage = getHomepage;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ user_id: req.info.user_id, name: req.info.name, role: req.info.role, email: req.info.email });
    }
});
exports.checkUser = checkUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const users = yield pool.request().execute("getUsers");
        res.json(users.recordset);
    }
    catch (error) {
        res.json({ Error });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const users = yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        const { recordset } = users;
        if (!users.recordset[0]) {
            res.json({ message: "User Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { user_id, name, email, password, role, isassigned, project_id, issent } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const users = yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        const { recordset } = users;
        if (!users.recordset[0]) {
            res.json({ message: "User Not Found!" });
        }
        else {
            yield pool.request()
                .input("user_id", mssql_1.default.VarChar, id)
                .input("name", mssql_1.default.VarChar, name)
                .input("email", mssql_1.default.VarChar, email)
                .input("password", mssql_1.default.VarChar, password)
                .input("role", mssql_1.default.VarChar, role)
                .input("isassigned", mssql_1.default.VarChar, isassigned)
                .input("project_id", mssql_1.default.VarChar, project_id)
                .execute("updateUser");
            res.json({
                message: "User updated successfully!",
            });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateUser = updateUser;
