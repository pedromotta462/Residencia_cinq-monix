import express from 'express'
import { get_user } from './get_user';


export const auth_router = express.Router();
auth_router.get('/user', get_user)

