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
exports.updateUser = exports.getUser = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const prisma_1 = __importDefault(require("../lib/prisma"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield prisma_1.default.user.findUnique({
            where: { clerkId: userId },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userId } = req.params;
        const clerkUser = yield clerk_sdk_node_1.clerkClient.users.getUser(userId);
        const user = yield prisma_1.default.user.upsert({
            where: { clerkId: userId },
            update: {
                email: ((_a = clerkUser.emailAddresses[0]) === null || _a === void 0 ? void 0 : _a.emailAddress) || '',
                name: clerkUser.firstName
                    ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
                    : null,
            },
            create: {
                clerkId: userId,
                email: ((_b = clerkUser.emailAddresses[0]) === null || _b === void 0 ? void 0 : _b.emailAddress) || '',
                name: clerkUser.firstName
                    ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
                    : null,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
