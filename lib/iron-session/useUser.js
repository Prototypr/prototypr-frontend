'use client';

import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
// import { User } from 'pages/api/auth/user'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser, isValidating:isLoading } = useSWR(`/api/auth/user`, fetcher)
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
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser, isLoading }
}