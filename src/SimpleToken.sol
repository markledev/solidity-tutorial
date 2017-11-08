pragma solidity ^0.4.0;

contract SimpleToken {
    uint256 supply;
    mapping(address => uint256) balances;
    
    event TransferEvt(address _from, address _to, uint _amount);
    
    function SimpleToken(uint256 _amount) public {
        balances[msg.sender] = _amount;
        supply= _amount;
    }
    
    function balanceOf(address _owner) constant returns (uint) {
        return balances[_owner];
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        if (balances[msg.sender] > _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            TransferEvt(msg.sender, _to, _value);
        }
        
        return false;
    }
}

