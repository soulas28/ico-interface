import { useWeb3React } from '@web3-react/core'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'
import { useEffect } from 'react'

import { injected } from '../lib/connectors/metamask'

export function Web3Manager() {
  const { activate, error, active } = useWeb3React()

  // web3-react error handling here
  useEffect(() => {
    if (error) {
      if (error instanceof UserRejectedRequestError)
        alert('User rejected request.')
      else if (error instanceof NoEthereumProviderError)
        alert(
          'You seems not to have any wallet. Please install metamask first.'
        )
      else if (error instanceof UnsupportedChainIdError)
        alert('Unsupported chainId.')
      else {
        if (process.env.NODE_ENV !== 'production') console.error(error)
      }
    }
  }, [error])

  // auto connect metamask if already authorized
  useEffect(() => {
    if (active) {
    } else {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
