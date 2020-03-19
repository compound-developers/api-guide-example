# Smart Contract API Example

Example of accessing Ethereum smart contracts with an API in [Node.js](https://nodejs.org/en/download/).

## Setup

```
git clone git@github.com:compound-developers/api-guide-example.git
cd api-guide-example
npm install
```

**config.json**

The listed contract addresses and ABIs might be out of date. They can be confirmed here https://compound.finance/developers#networks.

**server.js**

1. Be sure to set an environment variable for the Ethereum wallet private 
key.
2. Replace the HTTP Provider URL with your own. Infura provides free API keys.

```js
const walletPrivateKey = process.env.walletPrivateKey;
const web3 = new Web3('https://mainnet.infura.io/v3/_your_api_key_here_');
```

## Running

```
node server.js
```

## API Endpoint Example Calls

```bash
curl localhost:3000/wallet-balance/eth/
curl localhost:3000/wallet-balance/ceth/
curl localhost:3000/supply/eth/9000
curl localhost:3000/protocol-balance/eth/
curl localhost:3000/redeem/eth/123
```
