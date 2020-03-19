const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const config = require('./config.json');

const walletPrivateKey = process.env.walletPrivateKey;
const web3 = new Web3('https://mainnet.infura.io/v3/_your_api_key_here_');

web3.eth.accounts.wallet.add(walletPrivateKey);
const myWalletAddress = web3.eth.accounts.wallet[0].address;

const cEthAddress = config.cEthAddress;
const cEthAbi = config.cEthAbi;
const cEthContract = new web3.eth.Contract(cEthAbi, cEthAddress);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/protocol-balance/eth/').get((req, res) => {
  cEthContract.methods.balanceOfUnderlying(myWalletAddress).call()
    .then((result) => {
      const balanceOfUnderlying = web3.utils.fromWei(result);
      return res.send(balanceOfUnderlying);
    }).catch((error) => {
      console.error('[protocol-balance] error:', error);
      return res.sendStatus(400);
    });
});

app.route('/wallet-balance/eth/').get((req, res) => {
  web3.eth.getBalance(myWalletAddress).then((result) => {
    const ethBalance = web3.utils.fromWei(result);
    return res.send(ethBalance);
  }).catch((error) => {
    console.error('[wallet-balance] error:', error);
    return res.sendStatus(400);
  });
});

app.route('/wallet-balance/ceth/').get((req, res) => {
  cEthContract.methods.balanceOf(myWalletAddress).call().then((result) => {
      const cTokenBalance = result / 1e8;
      return res.send(cTokenBalance.toString());
    }).catch((error) => {
      console.error('[wallet-ctoken-balance] error:', error);
      return res.sendStatus(400);
    });
});

app.route('/supply/eth/:amount').get((req, res) => {
  if (isNaN(req.params.amount)) {
    return res.sendStatus(400);
  }

  cEthContract.methods.mint().send({
    from: myWalletAddress,
    gasLimit: web3.utils.toHex(500000),
    gasPrice: web3.utils.toHex(20000000000),
    value: web3.utils.toHex(web3.utils.toWei(req.params.amount, 'ether'))
  }).then((result) => {
    return res.sendStatus(200);
  }).catch((error) => {
    console.error('[supply] error:', error);
    return res.sendStatus(400);
  });
});

app.route('/redeem/eth/:cTokenAmount').get((req, res) => {
  if (isNaN(req.params.cTokenAmount)) {
    return res.sendStatus(400);
  }

  cEthContract.methods.redeem(req.params.cTokenAmount * 1e8).send({
    from: myWalletAddress,
    gasLimit: web3.utils.toHex(500000),
    gasPrice: web3.utils.toHex(20000000000)
  }).then((result) => {
    return res.sendStatus(200);
  }).catch((error) => {
    console.error('[redeem] error:', error);
    return res.sendStatus(400);
  });
});

app.listen(port, () => console.log(`API server running on port ${port}`));
