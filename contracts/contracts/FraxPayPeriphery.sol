// SPDX-License-Identifier: LGPL-3.0
pragma solidity >=0.8.0;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

interface IFraxPayCore {
  function erc20Payment(
    address recipient,
    address tokenAddress,
    uint256 amount,
    string memory identifier
  ) external;
}

interface IERC20 {
  function balanceOf(address account) external view returns (uint256);
}

contract FraxPayPeriphery {
  address private fraxPayCoreAddr;
  address private fraxSwapRouterAddr;

  constructor(address _fraxPayCoreAddr, address _fraxSwapRouterAddr) {
    fraxPayCoreAddr = _fraxPayCoreAddr;
    fraxSwapRouterAddr = _fraxSwapRouterAddr;
  }

  function swapEthForFraxAndSendPayment(
    address _recipient,
    uint256 _ethAmount,
    uint256 _fraxOutMin,
    address _fraxTokenAddress,
    string memory identifier
  ) public payable {
    require(msg.value >= _ethAmount, 'FraxPay: Insufficient ETH sent');
    address[] memory path = new address[](2);
    path[0] = IUniswapV2Router02(fraxSwapRouterAddr).WETH();
    path[1] = _fraxTokenAddress;

    IUniswapV2Router02(fraxSwapRouterAddr)
      .swapExactETHForTokensSupportingFeeOnTransferTokens{ value: _ethAmount }(
      _fraxOutMin,
      path,
      address(this),
      block.timestamp + 15 // 15 seconds from now
    );

    IERC20 fraxToken = IERC20(_fraxTokenAddress);
    uint256 fraxBalance = fraxToken.balanceOf(address(this));

    IFraxPayCore(fraxPayCoreAddr).erc20Payment(
      _recipient,
      _fraxTokenAddress,
      fraxBalance,
      identifier
    );
  }
}
