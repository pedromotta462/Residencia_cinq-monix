import express from 'express'
import { get_user } from './get_user';
import { get_user_categories } from './categories/get_user_categories';
import { post_user_category } from './categories/post_user_category';
import { put_user_category } from './categories/put_user_category';
import { delete_user_category } from './categories/delete_user_category';
import { get_subcategories_by_categoryId } from './subcategories/get_subcategories_by_categoryId';
import { post_user_subcategory } from './subcategories/post_user_subcategory';
import { put_user_subcategory } from './subcategories/put_user_subcategory';
import { delete_user_subcategory } from './subcategories/delete_user_subcategory';
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
auth_router.get('/user/subcategories/:id', get_subcategories_by_categoryId)
auth_router.post('/user/subcategories', post_user_subcategory)
auth_router.put('/user/subcategories/:id', put_user_subcategory)
auth_router.delete('/user/subcategories/:id', delete_user_subcategory)
//expenses
auth_router.get('/user/expenses', get_user_expenses)
auth_router.post('/user/expenses', post_user_expense)
auth_router.put('/user/expenses/:id', put_user_expense)
auth_router.delete('/user/expenses/:id', delete_user_expense)