import { EventEmitter } from 'events'

// TODO: is there a more elegant pattern for this?
export class GlobalWebMonetizationState extends EventEmitter {
  constructor() {
    super()

    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
    this.resetState()

    this.initialized = false

    this.onMonetizationStart = this.onMonetizationStart.bind(this)
    this.onMonetizationProgress = this.onMonetizationProgress.bind(this)
    this.onMonetizationStop = this.onMonetizationStop.bind(this)
    this.onMonetizationPending = this.onMonetizationPending.bind(this)
  }

  resetState() {
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
    this.receipt = null
    this.formattedTotal = 0
  }
  setPage(url) {
    this.totalAmount = 0
    this.url = url
    this.formattedTotal = 0
  }

  getState() {
    return {
      state: this.state,
      paymentPointer: this.paymentPointer,
      requestId: this.requestId,
      assetCode: this.assetCode,
      assetScale: this.assetScale,
      totalAmount: this.totalAmount,
      receipt: this.receipt,
      url:this.url,
      formattedTotal:this.formattedTotal,
      // synthetic state
      hasPaid: this.totalAmount !== 0 || this.state === 'started'
    }
  }

  init(url) {
    if (
      !this.initialized &&
      typeof document !== 'undefined' &&
      document.monetization
    ) {
      this.url = url
      this.initialized = true
      document.monetization.addEventListener(
        'monetizationstart',
        this.onMonetizationStart
      )
      document.monetization.addEventListener(
        'monetizationprogress',
        this.onMonetizationProgress
      )
      document.monetization.addEventListener(
        'monetizationpending',
        this.onMonetizationPending
      )
      document.monetization.addEventListener(
        'monetizationstop',
        this.onMonetizationStop
      )
    }
  }

  terminate() {
    if (
      this.initialized &&
      typeof document !== 'undefined' &&
      document.monetization
    ) {
      this.initialized = false
      document.monetization.removeEventListener(
        'monetizationstart',
        this.onMonetizationStart
      )
      document.monetization.removeEventListener(
        'monetizationprogress',
        this.onMonetizationProgress
      )
      document.monetization.removeEventListener(
        'monetizationpending',
        this.onMonetizationPending
      )
      document.monetization.removeEventListener(
        'monetizationstop',
        this.onMonetizationStop
      )
    }
  }

  onMonetizationStop() {
    const metaTag = document.head.querySelector('meta[name="monetization"]')
    if (!metaTag || metaTag.content !== this.paymentPointer) {
      this.resetState()
    }

    this.setStateFromDocumentMonetization()
    this.emit('monetizationstop')
  }

  setStateFromDocumentMonetization() {
    this.state =
      typeof document !== 'undefined' &&
      document.monetization &&
      document.monetization.state
  }

  onMonetizationPending(ev) {
    const { paymentPointer, requestId } = ev.detail

    if (this.requestId !== requestId) {
      this.resetState()
    }

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationStart(ev) {
    const { paymentPointer, requestId } = ev.detail

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationProgress(ev) {
    const { amount, assetCode, assetScale, receipt } = ev.detail

    this.totalAmount = this.totalAmount + Number(amount)
    this.assetCode = assetCode
    this.assetScale = assetScale
    this.receipt = receipt

    const formatted = (this.totalAmount * Math.pow(10, -assetScale)).toFixed(assetScale)
    this.formattedTotal = formatted

    this.emit('monetizationprogress')
  }
}

let globalWebMonetizationState

export function getGlobalWebMonetizationState() {
  if (!globalWebMonetizationState) {
    globalWebMonetizationState = new GlobalWebMonetizationState()
  }
  return globalWebMonetizationState
}

export function initGlobalWebMonetizationState() {
  getGlobalWebMonetizationState().init()
}
export function resetGlobalWebMonetizationPage(url) {
  getGlobalWebMonetizationState().setPage(url)
}
