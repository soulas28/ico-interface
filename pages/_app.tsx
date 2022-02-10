import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import type { AppProps } from 'next/app'

import { Web3Manager } from '../components/Web3Manager'
import '../styles/globals.css'

const getLibrary = (provider: any, connector: any) => {
  return new ethers.providers.Web3Provider(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Manager />
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
