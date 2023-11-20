import session from 'express-session';
export const sessionConfig: session.SessionOptions = {
  secret: 'auth',
  resave: false,
  saveUninitialized: false,
};