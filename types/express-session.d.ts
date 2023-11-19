import { Session } from 'express';

declare module 'express-session' {
  interface Session {
    user: any;
    freelancer: any;
  }
}
