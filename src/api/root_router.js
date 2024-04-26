import express from 'express'
import { post_signup } from './post_signup.js'
import { post_login } from './post_login.js';
import { post_logout } from './post_logout.js';


export const root_router = express.Router();
root_router.post('/signup', post_signup);
root_router.post('/login', post_login);
root_router.post('/logout', post_logout);