import React, { useEffect, useState } from 'react'
import useUser from '@/lib/iron-session/useUser'
import Layout from 'components/Layout'
import fetchJson, { FetchError } from '@/lib/iron-session/fetchJson'
import Button from '@/components/atom/Button/Button'
import Spinner from "@/components/atom/Spinner/Spinner"

export default function Login({loginToken}) {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/account',
    redirectIfFound: true,
  })

  const [loginTokenPresent, setLoginTokenPresent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenInvalid, setTokenInvalid] = useState(false)

  useEffect(()=>{
    verifyToken()
  },[])

  const verifyToken = async ()=>{
    
    if(loginToken){

      setLoginTokenPresent(true)
      setLoading(true)
      const body = {
        token: loginToken,
      }

      try {
        mutateUser(
          await fetchJson('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        )
        setTokenInvalid(false)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (error) {
            setTokenInvalid(true)
        } else {
          setLoading(false)

          console.error('An unexpected error happened:', error)
        }
      }
    }
  }
  
  return (
    <Layout>
      <div className="login bg-white p-8 rounded-lg -mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold mb-6">Verifying your email</h1>
        {!loginTokenPresent &&
        <p>No login token present.</p>}
        {loading &&
        <div className="mx-2">
          <Spinner />
        </div>}
        
        {tokenInvalid?
        <>
        <p className="mb-6">Oh no! It looks like the email link has already been used, or is expired. Try sigining in again.</p>
        <a href="/sign-in">
          <Button color="primary">Back to sign in</Button>
        </a>
        </>
       : 
       !loading && !tokenInvalid &&<>
        <div className="mx-2">
          <Spinner />
        </div>
       </>
       }
      </div>
      <style jsx>{`
        .login {
          width: 32rem;
        }
      `}</style>
    </Layout>
  )
}

Login.getInitialProps = async (context) => {

  return {
      loginToken:context.query.loginToken
  };
};