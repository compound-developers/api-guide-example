# Smart Contract API Example

Example code for building your own Ethereum smart contract API in [Node.js](https://nodejs.org/en/download/).

## Setup

```
git clone git@github.com:compound-developers/api-guide-example.git
cd api-guide-example
npm install
```

**config.json**

The listed contract addresses and ABIs might be out of date. They can be confirmed here https://compound.finance/docs#networks.

**server.js**

1. Be sure to set an environment variable for the Ethereum wallet private 
key.
2. Replace the HTTP Provider URL with your own. [Infura provides free API keys](https://infura.io/).

```js
const walletPrivateKey = process.env.walletPrivateKey;
const web3 = new Web3('https://mainnet.infura.io/v3/_your_api_key_here_');
```

## Running

```
node server.js
```

## API Endpoint Example Calls

These are the possible calls that can be made with [cURL](https://curl.haxx.se/download.html).

```bash
curl localhost:3000/wallet-balance/eth/
curl localhost:3000/wallet-balance/ceth/
curl localhost:3000/supply/eth/9000
curl localhost:3000/protocol-balance/eth/
curl localhost:3000/redeem/eth/123
```

Here is an example of outputs for a series of API calls. The wallet started out with 100 ETH.

```bash
curl localhost:3000/wallet-balance/eth/
> 100

curl localhost:3000/wallet-balance/ceth/
> 0

curl localhost:3000/supply/eth/5
> OK

curl localhost:3000/protocol-balance/eth/
> 4.999999999885010676

curl localhost:3000/wallet-balance/eth/
> 94.99788632

curl localhost:3000/wallet-balance/ceth/
> 249.85542658

curl localhost:3000/redeem/eth/249.85542658
> OK

curl localhost:3000/protocol-balance/eth/
> 0

curl localhost:3000/wallet-balance/ceth/
> 0

curl localhost:3000/wallet-balance/eth/
> 99.995909700269046879

```
