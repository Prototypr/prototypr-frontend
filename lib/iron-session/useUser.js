'use client';

import { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import useSWR from 'swr'
import { checkLoginCookie } from './checkLoginCookie'
import Cookies from 'js-cookie'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(() => checkLoginCookie())

  const { data: user, mutate: mutateUser, isValidating:isLoading } = useSWR(`/api/auth/user`, fetcher)
 
  useEffect(() => {
    if (user) {
      setIsLoggedIn(user.isLoggedIn)
      if(user.isLoggedIn){
        Cookies.set('isLoggedIn', 'true', { expires: 7 }) // Cookie expires in 7 days
      }else{
        Cookies.remove('isLoggedIn')
      }
    }
  }, [user])

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo)
    }
  }, [isLoggedIn,user, redirectIfFound, redirectTo])

  return { user, mutateUser, isLoading, isLoggedIn: isLoggedIn }
}