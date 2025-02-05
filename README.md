# ENS Indexer

A simpler, less complete version of the [ENS Subgraph](https://thegraph.com/hosted-service/subgraph/ensdomains/ens). Built with [Ponder](https://ponder.sh/).

Indexes the following contracts:

| Name                            | Contract Address                           |
| ------------------------------- | ------------------------------------------ |
| Registry                        | 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e |
| Base Registrar                  | 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 |
| Legacy ETH Registrar Controller | 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 |
| ETH Registrar Controller        | 0x253553366Da8546fC250F225fe3d25d0C782303b |
| Name Wrapper                    | 0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401 |

## Example queries

Get all names owned by an address:

```graphql
{
  names(
    where: {
      OR: [
        { owner: "0x179A862703a4adfb29896552DF9e307980D19285" }
        { wrappedOwner: "0x179A862703a4adfb29896552DF9e307980D19285" }
      ]
    }
  ) {
    items {
      id
      name
      resolver
      createdAt
      expiresAt
    }
  }
}
```

Get the most recent .eth names registered:

```graphql
{
  names(
    where: {
      parentId: "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae" # namehash('eth')
    }
    orderBy: "createdAt"
    orderDirection: "desc"
  ) {
    items {
      id
      name
      createdAt
    }
  }
}
```

Get all subnames of a given node:

```graphql
{
  names(
    where: {
      parentId: "0x4e34d3a81dc3a20f71bbdf2160492ddaa17ee7e5523757d47153379c13cb46df" # namehash('ens.eth')
    }
  ) {
    items {
      id
      name
      createdAt
    }
  }
}
```

You can also access the database directly for more complex SQL queries. [Learn more here](https://ponder.sh/docs/query/direct-sql).

## Notes to self while building

- The first record of a .eth 2LD onchain is a `Transfer` event from the Base Registrar

  - [Example from latest ETH Registrar Controller](https://etherscan.io/tx/0x4fb6fd154195a6a2e6e20104886a333cfb5d6427e29c130d500b3fbf1b3213f6#eventlog)
  - [Example from Legacy ETH Registrar Controller](https://etherscan.io/tx/0x79dd3a0474bff4c5bd977376801a0137875d86ea3c590c7a30dac3eda5c01b1a#eventlog)

- The first record of a 3LD+ onchain is a `NewOwner` event from the Registry

  - [Example](https://etherscan.io/tx/0xd37b5a426b6b50e57d7b67ac0743717a8daf482233380c51be4d7d8854b45518#eventlog)

- Trace of a .eth registration from the latest ETH Registrar ontroller:

  - user calls `controller.register`
    - controller calls `nameWrapper.registerAndWrapETH2LD`
      - wrapper calls `registrar.register`
        - registrar emits `Transfer` (from ERC721), this is the first time the name is recorded onchain
        - registrar calls `registry.setSubnodeOwner`
          - registry emits `Transfer`
          - registry emits `NewOwner`
        - registrar emits `NameRegistered`
    - controller emits `NameRegistered`

- `tokenId` from the `Transfer` event of the Base Registrar is the uint256 representation of the labelhash of the 2LD, where the parent is always `eth`

- `label` from all events is the labelhash

- `name` from the registrar controller events is the label as a string

- `name` from the Name Wrapper events is a base64 encoded string of the full name
