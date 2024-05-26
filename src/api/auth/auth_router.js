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
import { get_user_planned_expense } from './planned_expense/get_user_planned_expense';
import { post_user_planned_expense } from './planned_expense/post_user_planned_expenses';
import { put_user_planned_expense } from './planned_expense/put_user_planned_expense';
import { delete_user_planned_expense } from './planned_expense/delete_user_planned_expense';
import { get_user_members } from './members/get_user_members';
import { post_user_members } from './members/post_user_members';
import { put_user_members } from './members/put_user_members';
import { delete_user_members } from './members/delete_user_members';
import { get_user_cards } from './cards/get_user_cards';
import { post_user_cards } from './cards/post_user_cards';
import { put_user_cards } from './cards/put_user_cards';
import { delete_user_cards } from './cards/delete_user_cards';
import { get_user_investments } from './investments/get_user_investments';
import { post_user_investments } from './investments/post_user_investments';
import { put_user_investments } from './investments/put_user_investments';
import { delete_user_investments } from './investments/delete_user_investments';
import { get_user_planned_incoming_category_by_category_id } from './planned_incoming_category/get_user_planned_incoming_category';
import { post_user_planned_incoming_category } from './planned_incoming_category/post_user_planned_incoming_category';
import { put_user_planned_incoming_category } from './planned_incoming_category/put_user_planned_incoming_category';
import { delete_user_planned_incoming_category } from './planned_incoming_category/delete_user_planned_incoming_category';
import { get_financial_summary } from './financial_summary/get_financial_summary';



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
//planned_expenses
auth_router.get('/user/planned_expenses', get_user_planned_expense)
auth_router.post('/user/planned_expenses', post_user_planned_expense)
auth_router.put('/user/planned_expenses/:id', put_user_planned_expense)
auth_router.delete('/user/planned_expenses/:id', delete_user_planned_expense)
//planned_incoming_category
auth_router.get('/user/planned_incoming_category/:id', get_user_planned_incoming_category_by_category_id)
auth_router.post('/user/planned_incoming_category', post_user_planned_incoming_category)
auth_router.put('/user/planned_incoming_category/:id', put_user_planned_incoming_category)
auth_router.delete('/user/planned_incoming_category/:id', delete_user_planned_incoming_category)
//members
auth_router.get('/user/members', get_user_members)
auth_router.post('/user/members', post_user_members)
auth_router.put('/user/members/:id', put_user_members)
auth_router.delete('/user/members/:id', delete_user_members)
//cards
auth_router.get('/user/cards', get_user_cards)
auth_router.post('/user/cards', post_user_cards)
auth_router.put('/user/cards/:id', put_user_cards)
auth_router.delete('/user/cards/:id', delete_user_cards)
//investments
auth_router.get('/user/investments', get_user_investments)
auth_router.post('/user/investments', post_user_investments)
auth_router.put('/user/investments/:id', put_user_investments)
auth_router.delete('/user/investments/:id', delete_user_investments)
//views
auth_router.get('/user/financial_summary', get_financial_summary)