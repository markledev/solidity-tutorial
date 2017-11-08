import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Wallet from 'ethers-wallet/wallet';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bytecode: '0x6060604052341561000f57600080fd5b60405160208061038c8339810160405280805190602001909190505080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508060008190555050610306806100866000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806370a0823114610051578063a9059cbb1461009e575b600080fd5b341561005c57600080fd5b610088600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100f8565b6040518082815260200191505060405180910390f35b34156100a957600080fd5b6100de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610141565b604051808215151515815260200191505060405180910390f35b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541180156101915750600082115b156102d05781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507f8761302fd39919211f15c433cf3a700d5d794b3e76fbc406d2b5f804f1f37b1f338484604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a15b60009050929150505600a165627a7a723058206c9a2c74658c7f97c4ba2d4818b3d5e7877c1fd19161175730c63b42b339b5b00029',
      abi: [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_amount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"TransferEvt","type":"event"}],
      privateKey: '0x4f77e4c4153eaf783d33d3bb6bf935db041608871c10968c0123d2e7d2354a55',
      contractAddress: '0x5d739cb4e758da8d72effbb19a7335438c4181ad'
    }
  }

  _createContract() {
    const { bytecode, abi, privateKey } = this.state;
    const web3 = window.web3;
    const wallet = new Wallet(privateKey);

    console.log('bytecode, abi', bytecode, abi);
    const counterContract = web3.eth.contract(abi);
    const createSCData = counterContract.new.getData({
      data: bytecode,
      gas: 4700000
    });

    console.log('data to create smart contract ', createSCData);
    console.log(`account address of ${privateKey} is ${wallet.address.toString().toLowerCase()}`);
    web3.eth.getTransactionCount('0x713524e2a63b1726482db0b258d9cbcd09b3f6cf', (err1, nonce) => {
      web3.eth.getGasPrice((err2, gasPrice) => {
        console.log('nonce should be 0: ', nonce);
        console.log('gasPrice', gasPrice.toString());
        const txObj = {
          nonce: web3.toHex(19),
          gasLimit: web3.toHex(4700000),
          gasPrice: web3.toHex(web3.toWei(100, 'Gwei')),
          data: web3.toHex(createSCData)
        }

        const signedTxn = wallet.sign(txObj);

        console.log(signedTxn, ' signecTxn');

        web3.eth.sendRawTransaction(signedTxn, (err3, txHash) => {
          console.log('err3, txHash ', err3, txHash);
        })
      })
    })
    
  }

  _transfer() {
    const { bytecode, abi, privateKey, contractAddress } = this.state;
    const web3 = window.web3;
    const wallet = new Wallet(privateKey);

    console.log('bytecode, abi', bytecode, abi);
    const ICOContract = web3.eth.contract(abi);
    const instance = ICOContract.at(contractAddress);
    const transferData = instance.transfer.getData(
      '0xea517d5a070e6705cc5467858681ed953d285eb9',
      '100');

    console.log('data to increase counter smart contract ', transferData);
    console.log(`account address of ${privateKey} is ${wallet.address.toString().toLowerCase()}`);
    web3.eth.getTransactionCount('0x713524e2a63b1726482db0b258d9cbcd09b3f6cf', (err1, nonce) => {
      web3.eth.getGasPrice((err2, gasPrice) => {
        console.log('nonce should be 0: ', nonce);
        console.log('gasPrice', gasPrice.toString());
        const txObj = {
          nonce: web3.toHex(nonce),
          gasLimit: web3.toHex(4700000),
          gasPrice: web3.toHex(web3.toWei(100, 'Gwei')),
          data: web3.toHex(transferData),
          to: contractAddress
        }

        const signedTxn = wallet.sign(txObj);

        console.log(signedTxn, ' signecTxn');

        web3.eth.sendRawTransaction(signedTxn, (err3, txHash) => {
          console.log('err3, txHash ', err3, txHash);
        })
      })
    })
  }

  _getBalances() {
    const { abi, bytecode, contractAddress } = this.state;
    const web3 = window.web3;
    const contract = web3.eth.contract(abi);
    const instance = contract.at(contractAddress);

    instance.balanceOf('0x713524e2a63b1726482db0b258d9cbcd09b3f6cf', (err, myBalance) => {
      console.log('balance of from: 0x713524e2a63b1726482db0b258d9cbcd09b3f6cf', myBalance.toString());
    })

    instance.balanceOf('0xea517d5a070e6705cc5467858681ed953d285eb9', (err, myBalance) => {
      console.log('balance of to: 0xea517d5a070e6705cc5467858681ed953d285eb9', myBalance.toString());
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={evt=>this._createContract()}>Create ICO Smart Contract</button>
          <br/>
          <button onClick={evt=>this._transfer()}>Send 100 tokens to '0xea517d5a070e6705cc5467858681ed953d285eb9'</button>
          <br/>
          <button onClick={evt=>this._getBalances()}>Get Balance</button>
        </p>
      </div>
    );
  }
}

export default App;
