import NextAuth from 'next-auth'
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
// import CredentialsProvider from "next-auth/providers/credentials";
import CredentialsProvider from "@/lib/next-auth/cred-provider";
import MyAdapter from '@/lib/next-auth/custom-adapter'
import CustomProvider from '@/lib/next-auth/custom-provider';

var axios = require('axios');


const options = {
  adapter: MyAdapter(),
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        /* your function */
        var data = JSON.stringify({
          "email": email
        });

        // console.log(url)

        var config = {
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/passwordless/send-link`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };

        // console.log(config)
// return false
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

      },
    }),
    CredentialsProvider({
      name: 'Sign in with Email',
      
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      credentials: {
        email: { label: 'Email', type: 'text' },
        // password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        // console.log(req)
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          console.log('hi')
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
    CustomProvider({
      clientId:0,
      clientSecret:1,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      console.log('jwt',user)
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
          }else{
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

        token.jwt = data.jwt;
        token.id = user.id;
        token.avatar = user.image;
      }
      // return Promise.resolve(token);
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      console.log('session',user)

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


function signIn({ email, password }) {
  console.log('wa')


    /* your function */
    var data = JSON.stringify({
      "email": email
    });

    var config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/passwordless/send-link`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    console.log(data)

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  // const res = await axios.post(`${strapiUrl}/api/auth/local`, {
  //   identifier: email,
  //   password,
  // });
  // return res.data;
}