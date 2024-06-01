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
import { post_user_expenses } from './expenses/post_user_expenses';
import { put_user_expenses } from './expenses/put_user_expenses';
import { delete_user_expenses } from './expenses/delete_user_expenses';
import { get_user_planned_expense } from './planned_expense/get_user_planned_expense';
import { post_user_planned_expense } from './planned_expense/post_user_planned_expenses';
import { get_user_typeofexpenses } from './type_expenses/get_user_typeofexpenses';
import { put_user_typeofexpenses } from './type_expenses/put_user_typeofexpenses';
import { put_user_planned_expense } from './planned_expense/put_user_planned_expense';
import { delete_user_planned_expense } from './planned_expense/delete_user_planned_expense';
import { get_user_members } from './members/get_user_members';
import { post_user_members } from './members/post_user_members';
import { put_user_members } from './members/put_user_members';
import { delete_user_members } from './members/delete_user_members';
import { get_user_cards, post_user_cards, put_user_cards, delete_user_cards } from './controllers/cardsController';
import { get_user_investments } from './investments/get_user_investments';
import { post_user_investments } from './investments/post_user_investments';
import { put_user_investments } from './investments/put_user_investments';
import { delete_user_investments } from './investments/delete_user_investments';
import { get_user_planned_incoming_category_by_planned_incoming_id } from './planned_incoming_category/get_user_planned_incoming_category';
import { post_user_planned_incoming_category } from './planned_incoming_category/post_user_planned_incoming_category';
import { put_user_planned_incoming_category } from './planned_incoming_category/put_user_planned_incoming_category';
import { delete_user_planned_incoming_category } from './planned_incoming_category/delete_user_planned_incoming_category';
import { get_user_goals } from './goals/get_user_goals';
import { post_user_goals } from './goals/post_user_goals';
import { put_user_goals } from './goals/put_user_goals';
import { delete_user_goals } from './goals/delete_user_goals';
import { get_user_incomings } from './incomings/get_user_incomings';
import { post_user_incomings } from './incomings/post_user_incomings';
import { put_user_incomings } from './incomings/put_user_incomings';
import { delete_user_incomings } from './incomings/delete_user_incomings';
import { get_financial_summary } from './financial_summary/get_financial_summary';
import { get_user_planned_expense_subcategory_by_planned_expense_category_id } from './planned_expense_subcategory/get_user_planned_expense_subcategory';
import { post_user_planned_expense_subcategory } from './planned_expense_subcategory/post_user_planned_expense_subcategory';
import { put_user_planned_expense_subcategory } from './planned_expense_subcategory/put_user_planned_expense_subcategory';
import { delete_user_planned_expense_subcategory } from './planned_expense_subcategory/delete_user_planned_expense_subcategory';
import { get_user_planned_expense_category_by_planned_expense_id } from './planned_expense_category/get_user_planned_expense_category';
import { post_user_planned_expense_category } from './planned_expense_category/post_user_planned_expense_category';
import { post_user_planned_incoming } from './planned_incoming/post_user_planned_incoming';
import { get_user_planned_incoming } from './planned_incoming/get_user_planned_incoming';
import { put_user_planned_incoming } from './planned_incoming/put_user_planned_incoming';
import { delete_user_planned_incoming } from './planned_incoming/delete_user_planned_incoming';
import { get_user_planned_investment_category_by_planned_investment_id } from './planned_investment_category/get_user_planned_investment_category';
import { post_user_planned_investment_category } from './planned_investment_category/post_user_planned_investment_category';
import { put_user_planned_investment_category } from './planned_investment_category/put_user_planned_investment_category';
import { delete_user_planned_investment_category } from './planned_investment_category/delete_user_planned_investment_category';
import { delete_user_planned_expense_category } from './planned_expense_category/delete_user_planned_expense_category';
import { put_user_planned_expense_category } from './planned_expense_category/put_user_planned_expense_category';


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
auth_router.post('/user/expenses', post_user_expenses)
auth_router.put('/user/expenses/:id', put_user_expenses)
auth_router.delete('/user/expenses/:id', delete_user_expenses)
//goals
auth_router.get('/user/goals', get_user_goals)
auth_router.post('/user/goals', post_user_goals)
auth_router.put('/user/goals/:id', put_user_goals)
auth_router.delete('/user/goals/:id', delete_user_goals)
//typesofexpenses
auth_router.get('/user/typeofexpenses', get_user_typeofexpenses)
auth_router.put('/user/typeofexpenses/:id', put_user_typeofexpenses)
//planned_expenses
auth_router.get('/user/planned_expenses', get_user_planned_expense)
auth_router.post('/user/planned_expenses', post_user_planned_expense)
auth_router.put('/user/planned_expenses/:id', put_user_planned_expense)
auth_router.delete('/user/planned_expenses/:id', delete_user_planned_expense)
//planned_expenses_category
auth_router.get('/user/planned_expense_category/:id', get_user_planned_expense_category_by_planned_expense_id)
auth_router.post('/user/planned_expense_category', post_user_planned_expense_category)
auth_router.put('/user/planned_expense_category/:id', put_user_planned_expense_category)
auth_router.delete('/user/planned_expense_category/:id', delete_user_planned_expense_category)
//planned_expenses_subcategory
auth_router.get('/user/planned_expenses_subcategory/:id', get_user_planned_expense_subcategory_by_planned_expense_category_id)
auth_router.post('/user/planned_expenses_subcategory', post_user_planned_expense_subcategory)
auth_router.put('/user/planned_expenses_subcategory/:id', put_user_planned_expense_subcategory)
auth_router.delete('/user/planned_expenses_subcategory/:id', delete_user_planned_expense_subcategory)
//planned_incoming
auth_router.get('/user/planned_incoming', get_user_planned_incoming)
auth_router.post('/user/planned_incoming', post_user_planned_incoming)
auth_router.put('/user/planned_incoming/:id', put_user_planned_incoming)
auth_router.delete('/user/planned_incoming/:id', delete_user_planned_incoming)
//planned_incoming_category
auth_router.get('/user/planned_incoming_category/:id', get_user_planned_incoming_category_by_planned_incoming_id)
auth_router.post('/user/planned_incoming_category', post_user_planned_incoming_category)
auth_router.put('/user/planned_incoming_category/:id', put_user_planned_incoming_category)
auth_router.delete('/user/planned_incoming_category/:id', delete_user_planned_incoming_category)
//planned_investment_category
auth_router.get('/user/planned_investment_category/:id', get_user_planned_investment_category_by_planned_investment_id)
auth_router.post('/user/planned_investment_category', post_user_planned_investment_category)
auth_router.put('/user/planned_investment_category/:id', put_user_planned_investment_category)
auth_router.delete('/user/planned_investment_category/:id', delete_user_planned_investment_category)
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
//incomings
auth_router.get('/user/incomings', get_user_incomings)
auth_router.post('/user/incomings', post_user_incomings)
auth_router.put('/user/incomings/:id', put_user_incomings)
auth_router.delete('/user/incomings/:id', delete_user_incomings)
//views
auth_router.get('/user/financial_summary', get_financial_summary)
