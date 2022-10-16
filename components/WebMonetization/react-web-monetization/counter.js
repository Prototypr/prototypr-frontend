import { useState, useEffect } from 'react'

import { getGlobalWebMonetizationState } from './global'

export function useMonetizationCounter(url, postId) {
  // get the singleton WM state
  const webMonetizationState = getGlobalWebMonetizationState()

  webMonetizationState.init(url, postId)

  const [monetizationDetails, setMonetizationDetails] = useState(
    webMonetizationState.getState()
  )

  // create something we can mutate
  const monetizationDetailsCopy = { ...monetizationDetails }

  useEffect(() => {
    const onMonetizationStart = () => {
      // this is purposely mutating because sometimes we get multiple state
      // updates before reload
      setMonetizationDetails(
        Object.assign(monetizationDetailsCopy, webMonetizationState.getState())
      )
    }

    const onMonetizationProgress = () => {
      // this is purposely mutating because sometimes we get multiple state
      // updates before reload
      setMonetizationDetails(
        Object.assign(monetizationDetailsCopy, webMonetizationState.getState())
      )
    }

    webMonetizationState.on('monetizationstart', onMonetizationStart)
    webMonetizationState.on('monetizationprogress', onMonetizationProgress)

    return () => {
      webMonetizationState.removeListener(
        'monetizationstart',
        onMonetizationStart
      )
      webMonetizationState.removeListener(
        'monetizationprogress',
        onMonetizationProgress
      )
    }
  })

  return monetizationDetails
}
