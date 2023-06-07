import 'dotenv/config';
import express from 'express';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import pg from 'pg';

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
// import authorizationMiddleware from './lib/authorization-middleware';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username"
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "users"
        where "username" = $1
      `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.post('/api/breweries', async (req, res, next) => {
  try {
    console.log(req.body)
    const {name, street, website_url} = req.body.brewery;
    const {userId} = req.body.user;
    console.log(userId);
    console.log( name, street, website_url);
    const sql = `
      insert into "breweries" ("name", "street", "rating", "website_url", "userId")
values ($1, $2, $3, $4, $5);
      `;
    // const params = [name, street, website_url];
    const result = await db.query(sql, [name, street, 10, website_url, userId]);
    // const [brew] = result.rows;
  } catch (err) {
    console.log('hi');
    next(err);
  }
});

app.post('/api/favorites', async(req, res, next) => {
  try {
    console.log(req.body)
    const {userId} = req.body.user;
    console.log(userId)
    const sql = `
      select "breweryId", "name", "street", "rating", "website_url", "userId"
        from "breweries"
        where "userId" = $1
    `;
        const result = await db.query(sql, [
          userId,
        ]);
        const {rows} = result
        console.log(rows);
        res.json(rows)
  } catch(err) {
    next(err)
  }
})

// app.get('/api/exercises', authMiddleware, async (req, res, next) => {
//   try {
//     const sql = `
//       select * from "entries"
//         where "userId" = $1
//         order by "entryId" desc;
//     `;
//     const result = await db.query(sql, [req.user.userId]);
//     res.status(201).json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
