import express from 'express'
import { get_user } from './get_user';
import { get_user_categories } from './categories/get_user_categories';
import { post_user_categorie } from './categories/post_user_categorie';
import { put_user_categorie } from './categories/put_user_categorie';
import { delete_user_categorie } from './categories/delete_user_categorie';
import { get_subcategories_by_categoryId } from './subcategories/get_subcategories_by_categoryId';
import { post_user_subcategorie } from './subcategories/post_user_subcategorie';
import { put_user_subcategorie } from './subcategories/put_user_subcategorie';
import { delete_user_subcategorie } from './subcategories/delete_user_subcategorie';



export const auth_router = express.Router();
//user
auth_router.get('/user', get_user)
//categories
auth_router.get('/user/categories', get_user_categories)
auth_router.post('/user/categories', post_user_categorie)
auth_router.put('/user/categories', put_user_categorie)
auth_router.delete('/user/categories', delete_user_categorie)
//subcategories
auth_router.get('/user/subcategories/:categoryId', get_subcategories_by_categoryId)
auth_router.post('/user/subcategories', post_user_subcategorie)
auth_router.put('/user/subcategories/:subCategoryId', put_user_subcategorie)
auth_router.delete('/user/subcategories/:subCategoryId', delete_user_subcategorie)