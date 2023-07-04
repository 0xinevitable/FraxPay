import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { parseEther } from 'ethers';
import { ethers } from 'hardhat';

import {
  FraxPayCore,
  FraxPayCore__factory,
  MockERC20,
  MockERC20__factory,
} from '../typechain-types';

describe('FraxPayCore', () => {
  let FraxPayCore: FraxPayCore;
  let ERC20Token: MockERC20;
  let owner: HardhatEthersSigner;
  let feeRecipient: HardhatEthersSigner;
  let recipient: HardhatEthersSigner;
  let splitRecipient1: HardhatEthersSigner;
  let splitRecipient2: HardhatEthersSigner;

  beforeEach(async () => {
    // given
    [owner, feeRecipient, recipient, splitRecipient1, splitRecipient2] =
      await ethers.getSigners();

    const ERC20TokenFactory = (await ethers.getContractFactory(
      'MockERC20',
      owner,
    )) as unknown as MockERC20__factory;
    ERC20Token = await ERC20TokenFactory.deploy(
      'Token',
      'TKN',
      parseEther('10000'),
    );

    const FraxPayCoreFactory = (await ethers.getContractFactory(
      'FraxPayCore',
      owner,
    )) as unknown as FraxPayCore__factory;
    FraxPayCore = await FraxPayCoreFactory.deploy(feeRecipient, 5, 1_000); // 0.5% fee
  });

  describe('nativePayment', () => {
    it('should transfer native tokens correctly', async () => {
      // given
      const initialOwnerBalance = await ethers.provider.getBalance(
        owner.address,
      );
      const initialReceipientBalance = await ethers.provider.getBalance(
        recipient.address,
      );
      const initialFeeRecipientBalance = await ethers.provider.getBalance(
        feeRecipient.address,
      );
      const amountToTransfer = parseEther('10');

      // when
      const tx = await FraxPayCore.connect(owner).nativePayment(
        recipient.address,
        amountToTransfer,
        'identifier',
        { value: amountToTransfer },
      );
      const receipt = await tx.wait();
      const gasUsed =
        BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.gasPrice);

      // then
      const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
      const recipientBalance = await ethers.provider.getBalance(
        recipient.address,
      );
      const feeRecipientBalance = await ethers.provider.getBalance(
        feeRecipient.address,
      );

      const feeAmount = (amountToTransfer * 5n) / 1000n; // 0.5% fee

      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance - amountToTransfer - gasUsed,
      );
      expect(recipientBalance).to.equal(
        initialReceipientBalance + amountToTransfer - feeAmount,
      );
      expect(feeRecipientBalance).to.equal(
        initialFeeRecipientBalance + feeAmount,
      );
    });
  });

  describe('splitNativePayment', () => {
    it('should split native tokens correctly', async () => {
      // given
      const initialOwnerBalance = await ethers.provider.getBalance(
        owner.address,
      );
      const initialSplitRecipient1Balance = await ethers.provider.getBalance(
        splitRecipient1.address,
      );
      const initialSplitRecipient2Balance = await ethers.provider.getBalance(
        splitRecipient2.address,
      );
      const initialFeeRecipientBalance = await ethers.provider.getBalance(
        feeRecipient.address,
      );
      const amountToTransfer = parseEther('10');
      const splitData = [
        { recipient: splitRecipient1.address, amount: parseEther('3') },
        { recipient: splitRecipient2.address, amount: parseEther('7') },
      ];

      // when
      const tx = await FraxPayCore.connect(owner).splitNativePayment(
        recipient.address,
        amountToTransfer,
        splitData,
        'identifier',
        { value: amountToTransfer },
      );
      const receipt = await tx.wait();
      const gasUsed =
        BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.gasPrice);

      // then
      const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
      const splitRecipient1Balance = await ethers.provider.getBalance(
        splitRecipient1.address,
      );
      const splitRecipient2Balance = await ethers.provider.getBalance(
        splitRecipient2.address,
      );
      const feeRecipientBalance = await ethers.provider.getBalance(
        feeRecipient.address,
      );

      const feeAmount = (amountToTransfer * 5n) / 1000n; // 0.5% fee

      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance - amountToTransfer - gasUsed,
      );
      expect(splitRecipient1Balance).to.equal(
        initialSplitRecipient1Balance +
          splitData[0].amount -
          (splitData[0].amount * 5n) / 1000n,
      );
      expect(splitRecipient2Balance).to.equal(
        initialSplitRecipient2Balance +
          splitData[1].amount -
          (splitData[1].amount * 5n) / 1000n,
      );
      expect(feeRecipientBalance).to.equal(
        initialFeeRecipientBalance + feeAmount,
      );
    });
  });

  describe('erc20Payment', () => {
    it('should transfer ERC20 tokens correctly', async () => {
      // given
      const initialOwnerBalance = await ERC20Token.balanceOf(owner.address);
      const amountToTransfer = parseEther('10');

      await ERC20Token.connect(owner).approve(
        await FraxPayCore.getAddress(),
        parseEther('10000'),
      );

      // when
      await FraxPayCore.connect(owner).erc20Payment(
        recipient.address,
        await ERC20Token.getAddress(),
        amountToTransfer,
        'identifier',
      );

      // then
      const finalOwnerBalance = await ERC20Token.balanceOf(owner.address);
      const recipientBalance = await ERC20Token.balanceOf(recipient.address);
      const feeRecipientBalance = await ERC20Token.balanceOf(
        feeRecipient.address,
      );

      const feeAmount = (amountToTransfer * 5n) / 1000n; // 0.5% fee

      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance - amountToTransfer,
      );
      expect(recipientBalance).to.equal(amountToTransfer - feeAmount);
      expect(feeRecipientBalance).to.equal(feeAmount);
    });
  });

  describe('splitERC20Payment', () => {
    it('should split ERC20 tokens correctly', async () => {
      // given
      const initialOwnerBalance = await ERC20Token.balanceOf(owner.address);
      const amountToTransfer = parseEther('10');
      const splitData = [
        {
          recipient: splitRecipient1.address,
          amount: parseEther('3'),
        },
        {
          recipient: splitRecipient2.address,
          amount: parseEther('7'),
        },
      ];

      await ERC20Token.connect(owner).approve(
        await FraxPayCore.getAddress(),
        parseEther('10000'),
      );

      // when
      await FraxPayCore.connect(owner).splitERC20Payment(
        recipient.address,
        await ERC20Token.getAddress(),
        amountToTransfer,
        splitData,
        'identifier',
      );

      // then
      const finalOwnerBalance = await ERC20Token.balanceOf(owner.address);
      const splitRecipient1Balance = await ERC20Token.balanceOf(
        splitRecipient1.address,
      );
      const splitRecipient2Balance = await ERC20Token.balanceOf(
        splitRecipient2.address,
      );
      const feeRecipientBalance = await ERC20Token.balanceOf(
        feeRecipient.address,
      );

      const feeAmount = (amountToTransfer * 5n) / 1000n; // 0.5% fee

      expect(finalOwnerBalance).to.equal(
        initialOwnerBalance - amountToTransfer,
      );
      expect(feeRecipientBalance).to.equal(feeAmount);
      expect(splitRecipient1Balance).to.equal(
        splitData[0].amount - (splitData[0].amount * 5n) / 1000n,
      );
      expect(splitRecipient2Balance).to.equal(
        splitData[1].amount - (splitData[1].amount * 5n) / 1000n,
      );
    });
  });
});
