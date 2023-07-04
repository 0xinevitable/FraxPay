// SPDX-License-Identifier: LGPL-3.0
pragma solidity >=0.8.0;

interface IERC20 {
  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);

  function transfer(address recipient, uint256 amount) external returns (bool);
}

contract FraxPayCore {
  address feeRecipient;
  uint256 feeNumerator;
  uint256 feeDenominator;

  constructor(
    address _feeRecipient,
    uint256 _feeNumerator,
    uint256 _feeDenominator
  ) {
    feeRecipient = _feeRecipient;
    feeNumerator = _feeNumerator;
    feeDenominator = _feeDenominator;
  }

  struct RecipientAndAmount {
    address recipient;
    uint256 amount;
  }

  event NativePayment(
    address indexed sender,
    address indexed recipient,
    uint256 transferAmount,
    string identifier
  );

  event ERC20Payment(
    address indexed sender,
    address indexed recipient,
    address indexed tokenAddress,
    uint256 transferAmount,
    string identifier
  );

  event SplitNativePayment(
    address indexed sender,
    address indexed recipient,
    uint256 transferAmount,
    RecipientAndAmount[] splitData,
    string identifier
  );

  event SplitERC20Payment(
    address indexed sender,
    address indexed recipient,
    address indexed tokenAddress,
    uint256 transferAmount,
    RecipientAndAmount[] splitData,
    string identifier
  );

  function nativePayment(
    address recipient,
    uint256 amount,
    string memory identifier
  ) public payable {
    require(msg.value >= amount, 'FraxPay: Insufficient ETH sent');
    uint256 feeAmount = (amount * feeNumerator) / feeDenominator;
    payable(recipient).transfer(amount - feeAmount);
    payable(feeRecipient).transfer(feeAmount);
    emit NativePayment(msg.sender, recipient, amount, identifier);
  }

  function erc20Payment(
    address recipient,
    address tokenAddress,
    uint256 amount,
    string memory identifier
  ) public {
    IERC20 token = IERC20(tokenAddress);
    uint256 feeAmount = (amount * feeNumerator) / feeDenominator;
    require(
      token.transferFrom(msg.sender, recipient, amount - feeAmount),
      'FraxPay: Transfer failed'
    );
    require(
      token.transferFrom(msg.sender, feeRecipient, feeAmount),
      'FraxPay: Transfer failed'
    );
    emit ERC20Payment(msg.sender, recipient, tokenAddress, amount, identifier);
  }

  function splitNativePayment(
    address recipient,
    uint256 amount,
    RecipientAndAmount[] memory splitData,
    string memory identifier
  ) public payable {
    require(msg.value >= amount, 'FraxPay: Insufficient ETH sent');
    uint256 feeAmount = (amount * feeNumerator) / feeDenominator;
    uint256 remaining = amount - feeAmount;
    uint256 amountToSplit = remaining;

    for (uint256 i = 0; i < splitData.length; i++) {
      uint256 transferAmount = (splitData[i].amount * amountToSplit) / amount;
      require(
        remaining >= transferAmount,
        'FraxPay: Insufficient amount to split'
      );
      payable(splitData[i].recipient).transfer(transferAmount);
      remaining -= transferAmount;
    }

    payable(feeRecipient).transfer(feeAmount);

    emit SplitNativePayment(
      msg.sender,
      recipient,
      amount,
      splitData,
      identifier
    );
  }

  function splitERC20Payment(
    address recipient,
    address tokenAddress,
    uint256 amount,
    RecipientAndAmount[] memory splitData,
    string memory identifier
  ) public {
    IERC20 token = IERC20(tokenAddress);
    uint256 feeAmount = (amount * feeNumerator) / feeDenominator;
    uint256 remaining = amount - feeAmount;
    uint256 amountToSplit = remaining;

    for (uint256 i = 0; i < splitData.length; i++) {
      uint256 transferAmount = (splitData[i].amount * amountToSplit) / amount;
      require(
        remaining >= transferAmount,
        'FraxPay: Insufficient amount to split'
      );
      require(
        token.transferFrom(msg.sender, splitData[i].recipient, transferAmount),
        'FraxPay: Transfer failed'
      );
      remaining -= transferAmount;
    }

    require(
      token.transferFrom(msg.sender, feeRecipient, feeAmount),
      'FraxPay: Transfer failed'
    );

    emit SplitERC20Payment(
      msg.sender,
      recipient,
      tokenAddress,
      amount,
      splitData,
      identifier
    );
  }
}
