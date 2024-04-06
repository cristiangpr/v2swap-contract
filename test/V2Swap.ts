import {
  time,
  loadFixture
} from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import hre, { ethers } from 'hardhat'

describe('Swap', function () {
  it('Should execute swap', async function () {
    const signer = await ethers.getImpersonatedSigner('0x43Fd37b3587fB30E319De4A276AD49E7969E23DD')

    const V2Swap = await hre.ethers.getContractFactory('V2Swap')
    const v2Swap = await V2Swap.deploy()
    const Iapprove = new ethers.Interface(['function approve(address spender, uint amount)'])
    const approveData = Iapprove.encodeFunctionData('approve', [await v2Swap.getAddress(), 1000000])
    const approveTx = {
      to: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      data: approveData
    }
    await signer.sendTransaction(approveTx)
    const ISwapTokens = new ethers.Interface(['function swapTokens(address tokenIn, address tokenOut, uint amountIn, uint amountOutMin, uint deadline)'])
    const data = ISwapTokens.encodeFunctionData('swapTokens', ['0x326C977E6efc84E512bB9C30f76E30c160eD06FB', '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 1000000, 1, await time.latest() + 3600])
    const tx = {
      to: await v2Swap.getAddress(),
      data
    }

    await signer.sendTransaction(tx)
  })
})
