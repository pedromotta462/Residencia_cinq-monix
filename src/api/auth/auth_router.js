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
import { get_user_members } from './members/get_user_members';
import { post_user_members } from './members/post_user_members';
import { put_user_members } from './members/put_user_members';
import { delete_user_members } from './members/delete_user_members';
import { get_user_cards } from './cards/get_user_cards';
import { post_user_cards } from './cards/post_user_cards';
import { put_user_cards } from './cards/put_user_cards';
import { delete_user_cards } from './cards/delete_user_cards';



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