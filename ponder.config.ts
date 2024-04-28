import { createConfig } from '@ponder/core'
import { http } from 'viem'
import { loadBalance } from '@ponder/utils'

import { RegistryAbi } from './abis/RegistryAbi'
import { RegistrarControllerV1Abi } from './abis/RegistrarControllerV1Abi'
import { RegistrarControllerV2Abi } from './abis/RegistrarControllerV2Abi'
import { NameWrapperAbi } from './abis/NameWrapperAbi'
import { BaseRegistrarAbi } from './abis/BaseRegistrarAbi'

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: loadBalance([
        http('https://ethereum-rpc.publicnode.com'),
        http('https://eth-pokt.nodies.app'),
        http('https://rpc.mevblocker.io'),
        http('https://eth.drpc.org'),
      ]),
      maxRequestsPerSecond: 500,
    },
  },
  contracts: {
    Registry: {
      abi: RegistryAbi,
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      network: 'mainnet',
      startBlock: 9380380,
    },
    BaseRegistrar: {
      abi: BaseRegistrarAbi,
      address: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
      network: 'mainnet',
      startBlock: 9380410,
    },
    RegistrarControllerV1: {
      abi: RegistrarControllerV1Abi,
      address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
      network: 'mainnet',
      startBlock: 9380471,
    },
    RegistrarControllerV2: {
      abi: RegistrarControllerV2Abi,
      address: '0x253553366Da8546fC250F225fe3d25d0C782303b',
      network: 'mainnet',
      startBlock: 16925618,
    },
    NameWrapper: {
      abi: NameWrapperAbi,
      address: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401',
      network: 'mainnet',
      startBlock: 16925608,
    },
  },
})
