import NextAuth from 'next-auth'
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      idToken: false
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {

      const isSignIn = user ? true : false;
      if (isSignIn) {
        let url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback`
        )
        if(account && account.provider){
          // https://gitmemory.com/issue/strapi/strapi/9492/784032615
          if(account.provider=='twitter'){
            url.searchParams.set("access_token", account.oauth_token)
            url.searchParams.set("access_secret", account.oauth_token_secret) // sending the refreshToken as access_secret
          }else if(account.provider=='github'){
            url.searchParams.set("access_token", account.access_token)
            url.searchParams.set("access_secret", account.refreshToken) // sending the refreshToken as access_secret
          }
          else{
            if(account && account.provider){
              // https://gitmemory.com/issue/strapi/strapi/9492/784032615
              url.searchParams.set("access_token", account.access_token)
              url.searchParams.set("access_secret", account.refreshToken) // sending the refreshToken as access_secret
            }
          }
        }
        const response = await fetch(
          url.toString(), 
        );
        const data = await response.json();
        /**
         * a given email address can only sign in with 1 provider
         * if they already registered with twitter, and try to sign in with GitHub
         * strapi will give an error - so redirect them to the nextauth unauthorized
         * page for now. Not pretty but it works until a custom error page is made
         */
        if(data?.error){
          return '/unauthorized'
        }

        token.jwt = data.jwt;
        token.id = user.id;
        token.avatar = user.image;
      }
      // return Promise.resolve(token);
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      //user session param comes from jwt callback
      session.jwt = token.jwt;
      session.id = token.id;
      session.avatar = token.avatar;
      session.picture = token.picture;
      return Promise.resolve(session);
    }
  },
};

export default (req,res)=> NextAuth(req, res, options);