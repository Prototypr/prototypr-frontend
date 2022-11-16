import { useState, useEffect } from 'react'

import { getGlobalWebMonetizationState } from './global'

export function useMonetizationState() {
  // get the singleton WM state
  const webMonetizationState = getGlobalWebMonetizationState()

  webMonetizationState.init()

  const {
    state,
    requestId,
    paymentPointer,
    hasPaid
  } = webMonetizationState.getState()

  const [monetizationState, setMonetizationState] = useState({
    state,
    requestId,
    paymentPointer,
    hasPaid
  })

  useEffect(() => {
    if (!document.monetization) return

    const stateChange = () => {
      const {
        state,
        requestId,
        paymentPointer,
        hasPaid
      } = webMonetizationState.getState()

      setMonetizationState({
        state,
        requestId,
        paymentPointer,
        hasPaid
      })
    }

    webMonetizationState.on('monetizationpending', stateChange)
    webMonetizationState.on('monetizationstart', stateChange)
    webMonetizationState.on('monetizationstop', stateChange)

    return () => {
      webMonetizationState.removeListener('monetizationstart', stateChange)
      webMonetizationState.removeListener('monetizationpending', stateChange)
      webMonetizationState.removeListener('monetizationstop', stateChange)
    }
  })

  return monetizationState
}
