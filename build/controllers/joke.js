"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const plan_1 = require("../checkers/plan");
/** Import the methods of getting jokes */
const jokes_1 = __importDefault(require("./semi-controllers/jokes"));
/** Importing DotEnv for process.env */
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getJoke = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const private_key = process.env.PRIVATE_KEY;
    const RapidApi = req.get("x-RapidApi-private") || req.get("RapidApi-private");
    if (RapidApi !== private_key)
        return res
            .status(400)
            .send("You are only allowed to make requests through RapidApi, contact for more support.");
    const AuthKey = req.get("Authorization");
    if (!AuthKey)
        return res
            .status(403)
            .send("Authorization key is not present, contact for more support.");
    if (!(yield (0, plan_1.isNormal)(AuthKey)) && !(yield (0, plan_1.isPremium)(AuthKey)))
        return res
            .status(403)
            .send("Your key is invalid, contact for more support.");
    const tag = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.tag) || (req === null || req === void 0 ? void 0 : req.query.type) || "any";
    const tag2 = (tag === "any") ? "any" : tag;
    const blacklist = req.query.blacklist;
    const types = yield jokes_1.default.getAllTagsFromAllJokes();
    if (tag2 === "any") {
        if (blacklist) {
            // Blacklist will be : "tag1,tag2,tag3"
            // We need to split it into an array of strings
            const blacklist_array = blacklist.length > 1 ? blacklist.split(",") : [blacklist];
            const exclude_tags = blacklist_array;
            const joke = yield jokes_1.default.getRandomJoke({ exclude_tags });
            return res.json(joke);
        }
        else {
            const joke = yield jokes_1.default.getRandomJoke();
            return res.json(joke);
        }
    }
    if (!types.includes(tag)) {
        return res.status(400).send("Invalid Tag provided, available Tags are: " + types.join(", "));
    }
    if (blacklist) {
        // Blacklist will be : "tag1,tag2,tag3"
        // We need to split it into an array of strings
        const blacklist_array = blacklist.length > 1 ? blacklist.split(",") : [blacklist];
        const exclude_tags = blacklist_array;
        const joke = yield jokes_1.default.getRandomJokeWithTag(tag2, { exclude_tags });
        return res.json(joke);
    }
    else {
        const joke = yield jokes_1.default.getRandomJokeWithTag(tag2);
        return res.json(joke);
    }
});
/** Exporting the function */
exports.default = { getJoke };