import type { Fetcher } from 'swr'

import { injected } from '../connectors/metamask'

export const metamaskFetcher: Fetcher<string, 'account'> = () => {
  return injected.getAccount().then((r) => (!r ? '' : r))
}
