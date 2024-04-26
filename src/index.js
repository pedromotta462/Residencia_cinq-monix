import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { root_router } from './api/root_router';
import { auth_router } from './api/auth/auth_router';
import { auth_middleware } from './api/auth/auth_middleware';


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', root_router);
app.use('/auth', auth_middleware)
app.use('/auth', auth_router)


app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);