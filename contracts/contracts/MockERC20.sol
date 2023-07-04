// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MockERC20 is ERC20, ERC20Burnable, Ownable {
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _initialSupply
  ) ERC20(_name, _symbol) {
    _mint(msg.sender, _initialSupply);
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}
