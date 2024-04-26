import express from 'express'
import { get_user } from './get_user';
import { get_user_categories } from './get_user_categories';
import { post_user_categorie } from './post_user_categorie';
import { put_user_categorie } from './put_user_categorie';


export const auth_router = express.Router();
auth_router.get('/user', get_user)
auth_router.get('/user/categories', get_user_categories)
auth_router.post('/user/categories', post_user_categorie)
auth_router.put('/user/categories', put_user_categorie)
