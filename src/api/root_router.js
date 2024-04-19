import express from 'express'
import { post_signup } from './post_signup.js'
import { post_login } from './post_login.js';


export const root_router = express.Router();
root_router.post('/signup', post_signup)
root_router.post('/login', post_login)
