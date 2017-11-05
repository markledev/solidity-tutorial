# solidity-tutorial
Initial setup to write your first ReactJS D-apps

## Required installation before using
- NodeJS >v8.0

## To run this D-app
```
yarn install
yarn start
```

The app will run on http://localhost:3000


## Interact with Ethereum Solidity
```
  npm install --save web3@0.15.3 (yarn add web3@0.15.3)
  npm install --save ethers-wallet (yarn add ethers-wallet)
  yarn start
```

- Write your smart contract at https://remix.ethereum.org/

## How Smart Contract looks like
```
contract SimpleCounter {
  // declare variables (must be less than 16 in total)
  uint256 counter;
  address owner;
  uint256 etherBalance; (Must record ether balance in uint256)
  
  // modifier
  modifier isOwner() {
    require(owner === msg.sender);
    _;
  }
  
  // event (the same as console.log in Javascript or System.println in Java)
  event Increment(uint256 _newCounter);
 
  // create instance of SimpleCounter
  function SimpleCounter(uint256 arg1, string arg2) public {
    counter = 0;
    owner = msg.sender // address of an Ethereum Wallet or a contract address
  }
  
  // modify data based on certain condition (without using modifier)
  function increment() public {
    if (msg.sender === owner) {
      counter += 1;
      etherBalance += msg.value; // msg.value is the amount of ether specified by sender
      Increment(counter);
    }
  }
  
  // modify data based on certain condition (using modifier)
  function specIncrement() public isOwner {
    counter += 1;
    etherBalance += msg.value; // msg.value is the amount of ether specified by sender
    Increment(counter);
  }
  
  // getter function
  function getCounter() public constant returns (uint256) {
    return counter;
  }
}
```

## Q&A (Will constantly be updated)
