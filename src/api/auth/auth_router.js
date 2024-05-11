import express from 'express'
import { get_user } from './get_user';
import { get_user_categories } from './categories/get_user_categories';
import { post_user_category } from './categories/post_user_category';
import { put_user_category } from './categories/put_user_category';
import { delete_user_category } from './categories/delete_user_category';
import { get_subcategories_by_categoryId } from './subcategories/get_subcategories_by_categoryId';
import { post_user_subcategorie } from './subcategories/post_user_subcategorie';
import { put_user_subcategorie } from './subcategories/put_user_subcategorie';
import { delete_user_subcategorie } from './subcategories/delete_user_subcategorie';
import { get_user_expenses } from './expenses/get_user_expenses';
import { post_user_expense } from './expenses/post_user_expenses';
import { put_user_expense } from './expenses/put_user_expenses';
import { delete_user_expense } from './expenses/delete_user_expenses';



export const auth_router = express.Router();
//user
auth_router.get('/user', get_user)
//categories
auth_router.get('/user/categories', get_user_categories)
auth_router.post('/user/categories', post_user_category)
auth_router.put('/user/categories/:id', put_user_category)
auth_router.delete('/user/categories/:id', delete_user_category)
//subcategories
auth_router.get('/user/subcategories/:categoryId', get_subcategories_by_categoryId)
auth_router.post('/user/subcategories', post_user_subcategorie)
auth_router.put('/user/subcategories/:subCategoryId', put_user_subcategorie)
auth_router.delete('/user/subcategories/:subCategoryId', delete_user_subcategorie)
//expenses
auth_router.get('/user/expenses', get_user_expenses)
auth_router.post('/user/expenses', post_user_expense)
auth_router.put('/user/expenses/:id', put_user_expense)
auth_router.delete('/user/expenses/:id', delete_user_expense)