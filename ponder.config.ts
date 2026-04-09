import { createConfig } from 'ponder'

import { RegistryAbi } from './abis/RegistryAbi'
import { RegistrarControllerV1Abi } from './abis/RegistrarControllerV1Abi'
import { RegistrarControllerV2Abi } from './abis/RegistrarControllerV2Abi'
import { RegistrarControllerV3Abi } from './abis/RegistrarControllerV3Abi'
import { NameWrapperAbi } from './abis/NameWrapperAbi'
import { BaseRegistrarAbi } from './abis/BaseRegistrarAbi'

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL,
      ws: process.env.PONDER_WS_URL,
    },
  },
  contracts: {
    Registry: {
      abi: RegistryAbi,
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      chain: 'mainnet',
      startBlock: 9380380,
    },
    BaseRegistrar: {
      abi: BaseRegistrarAbi,
      address: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
      chain: 'mainnet',
      startBlock: 9380410,
    },
    RegistrarControllerV1: {
      abi: RegistrarControllerV1Abi,
      address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
      chain: 'mainnet',
      startBlock: 9380471,
    },
    RegistrarControllerV2: {
      abi: RegistrarControllerV2Abi,
      address: '0x253553366Da8546fC250F225fe3d25d0C782303b',
      chain: 'mainnet',
      startBlock: 16925618,
    },
    RegistrarControllerV3: {
      abi: RegistrarControllerV3Abi,
      address: '0x59E16fcCd424Cc24e280Be16E11Bcd56fb0CE547',
      chain: 'mainnet',
      startBlock: 22764821,
    },
    NameWrapper: {
      abi: NameWrapperAbi,
      address: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401',
      chain: 'mainnet',
      startBlock: 16925608,
    },
  },
})
