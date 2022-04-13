// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IronSessionOptions } from 'iron-session'
import { User } from 'pages/api/auth/user'

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'iron-session/examples/next.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}