pragma solidity ^0.8.9;

contract Point {
    // Address of person deploying the contract
    address public owner;

    uint public totalSupply = 1000000;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint) balances;

        // The Transfer event helps off-chain aplications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Add(address indexed _to, uint _value);


    /**
     * Contract initialization.
     */
    constructor() {
        // The totalSupply is assigned to the transaction sender, which is the
        // account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to add tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function add(address to, uint amount) external {
        // Add the amount.
        balances[to] += amount;

        // Notify off-chain applications of the add.
        emit Add(to, amount);
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transfer(address to, uint amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}