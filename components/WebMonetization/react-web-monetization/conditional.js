import React, { useState, useEffect } from 'react'

import { useMonetizationState } from './state'

export function IfWebMonetized({ children, showOnPending }) {
  const { state } = useMonetizationState()

  if (state === 'started' || (state === 'pending' && showOnPending)) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export function IfNotWebMonetized({ children, pendingTimeout = 2000 }) {
  const [pendingTimedOut, setPendingTimedOut] = useState(false)
  const { state } = useMonetizationState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setPendingTimedOut(true)
    }, pendingTimeout)

    return () => {
      clearTimeout(timer)
    }
  })

  if (state === 'started' || (state === 'pending' && !pendingTimedOut)) {
    return <></>
  } else {
    return <>{children}</>
  }
}

export function IfWebMonetizationPending({ children }) {
  const { state } = useMonetizationState()

  if (state === 'pending') {
    return <>{children}</>
  } else {
    return <></>
  }
}
